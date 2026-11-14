/**
 * SiteHeader.tsx
 * Top bar shown on every page: logo, subtitle and main navigation.
 */

import "./SiteHeader.css";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="logo">
          <span className="logo-mark" aria-hidden="true" />
          BoroughLens
        </div>
        <span className="site-subtitle">London · 32 boroughs</span>
        <nav className="site-nav">
          <a href="#" className="active">
            Compare
          </a>
          <a href="#">Data status</a>
          <a href="#">Sources & limitations</a>
        </nav>
      </div>
    </header>
  );
}
