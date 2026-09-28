import { useState, useEffect } from 'react';
import TemplateEternalLoveMobile from './TemplateEternalLoveMobile';
import TemplateEternalLoveDesktop from './TemplateEternalLove';
import TemplateMinimalCoupleMobile from './TemplateMinimalCoupleMobile';
import TemplateMinimalCoupleDesktop from './TemplateMinimalCouple';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

export function EternalLovePage() {
  const isMobile = useIsMobile();
  return isMobile ? <TemplateEternalLoveMobile /> : <TemplateEternalLoveDesktop />;
}

export function MinimalCouplePage() {
  const isMobile = useIsMobile();
  return isMobile ? <TemplateMinimalCoupleMobile /> : <TemplateMinimalCoupleDesktop />;
}
