import type { CSSProperties } from 'react';
import { Link, useInRouterContext } from 'react-router-dom';

interface Props {
  className?: string;
  style?: CSSProperties;
}

// A story opened on <name>.couplestory.site is rendered without a Router, where <Link> would crash the whole page.
export default function BackToTemplatesLink({ className, style }: Props) {
  const inRouter = useInRouterContext();
  if (!inRouter) return null;
  return (
    <Link to="/templates" className={className} style={style} aria-label="Quay lại kho giao diện">
      <span className="material-symbols-outlined text-[20px] block">arrow_back</span>
    </Link>
  );
}
