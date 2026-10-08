#!/usr/bin/env bash
# Post-deploy smoke test for CoupleStory. Run it before and after every deploy:
#   SLUG=huyen-truong ./scripts/smoke-test.sh
# SLUG must be a published story. Exit code 1 when any check fails.
#
# It encodes the incidents we already had: wildcard subdomains answering 502 (tunnel pointed at the
# wrong port), the apex domain missing from CORS, and story pages rendering blank on a subdomain.
set -u

DOMAIN="${DOMAIN:-couplestory.site}"
SLUG="${SLUG:-huyen-truong}"
MAIN="main.${DOMAIN}"
fail=0

code() { curl -s -m 20 -o /dev/null -w '%{http_code}' "$@"; }

check() { # name, expected, actual
  if [ "$2" = "$3" ]; then
    echo "OK   $1 ($3)"
  else
    echo "FAIL $1 (expected $2, got $3)"
    fail=1
  fi
}

header_present() { # name, url, header-regex
  if curl -sI -m 20 "$2" | tr -d '\r' | grep -qiE "^$3"; then
    echo "OK   $1"
  else
    echo "FAIL $1 (header missing)"
    fail=1
  fi
}

echo "== Pages"
check "apex domain"                    200 "$(code "https://${DOMAIN}/")"
check "main"                           200 "$(code "https://${MAIN}/")"
check "story subdomain ${SLUG}"        200 "$(code "https://${SLUG}.${DOMAIN}/")"

echo "== API"
check "public story '${SLUG}' is published (else pass SLUG=<a published story>)" 200 \
  "$(code "https://${SLUG}.${DOMAIN}/api/public/story?slug=${SLUG}")"
check "templates via apex"             200 "$(code "https://${DOMAIN}/api/templates")"
check "unauthenticated request is 401" 401 "$(code "https://${MAIN}/api/stories")"

echo "== CORS (a browser on each origin must be allowed to call the API)"
for origin in "https://${DOMAIN}" "https://${MAIN}" "https://${SLUG}.${DOMAIN}"; do
  check "preflight from ${origin}" 200 "$(code -X OPTIONS "https://${MAIN}/api/auth/google" \
    -H "Origin: ${origin}" -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type')"
done
check "preflight from a foreign origin is refused" 403 "$(code -X OPTIONS "https://${MAIN}/api/auth/google" \
  -H 'Origin: https://evil.example.com' -H 'Access-Control-Request-Method: POST')"

echo "== Hardening"
check "swagger ui is off"              404 "$(code "https://${MAIN}/swagger-ui/index.html")"
check "api docs are off"               404 "$(code "https://${MAIN}/v3/api-docs")"
header_present "X-Content-Type-Options: nosniff" "https://${MAIN}/" 'x-content-type-options: *nosniff'
header_present "CSP report-only header"          "https://${MAIN}/" 'content-security-policy-report-only:'

echo
if [ "$fail" -eq 0 ]; then echo "SMOKE TEST PASSED"; else echo "SMOKE TEST FAILED"; fi
exit "$fail"
