import { useState, useEffect } from 'react';
import PricingDesktop from './Pricing';
import PricingMobile from './PricingMobile';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function PricingResponsive() {
  const isMobile = useIsMobile();
  return isMobile ? <PricingMobile /> : <PricingDesktop />;
}
