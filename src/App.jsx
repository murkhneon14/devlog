import React, { useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';

/* ── SEO helper ── */
function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [title, description]);
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    setTimeout(() => { document.documentElement.style.scrollBehavior = ''; }, 10);
  }, [pathname]);
  return null;
}

/* ── Heatmap data generator ── */
function generateHeatmap(rows, cols) {
  const cells = [];
  for (let i = 0; i < rows * cols; i++) {
    const r = Math.random();
    let level;
    if (r < 0.35) level = 0;
    else if (r < 0.55) level = 1;
    else if (r < 0.72) level = 2;
    else if (r < 0.88) level = 3;
    else level = 4;
    cells.push(level);
  }
  return cells;
}

const githubHeatmap = generateHeatmap(7, 26);
const leetcodeHeatmap = generateHeatmap(7, 26);
const codeforcesHeatmap = generateHeatmap(7, 26);

/* ── SVG icons for platforms ── */
function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

function CodeforcesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 010 19.5V9a1.5 1.5 0 011.5-1.5h3zm9-4.5A1.5 1.5 0 0115 4.5v15a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 19.5v-15A1.5 1.5 0 0110.5 3h3zm9 7.5A1.5 1.5 0 0124 12v7.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h3z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════ */
function Home() {
  const iphoneRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const iphone = iphoneRef.current;
    const section = sectionRef.current;
    if (!iphone || !section) return;

    const screens = document.querySelectorAll('.app-screen');
    const labels = document.querySelectorAll('.screen-label');
    const TOTAL = screens.length;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const raw = -rect.top / (sectionH - viewH);
      const p = clamp(raw, 0, 1);

      const tiltProgress = clamp(p / 0.25, 0, 1);
      const tiltDeg = lerp(58, 0, easeOut(tiltProgress));
      let baseScale = 1;
      if (window.innerWidth <= 600) { baseScale = 0.75; }
      const scale = lerp(0.82 * baseScale, 1 * baseScale, easeOut(tiltProgress));
      const translateY = lerp(60, 0, easeOut(tiltProgress));
      const floatPhase = p > 0.25 ? (p - 0.25) / 0.75 : 0;
      const sway = Math.sin(floatPhase * Math.PI * 2) * 4;

      iphone.style.transform = `perspective(1200px) rotateX(${tiltDeg}deg) scale(${scale}) translateY(${translateY}px) translateX(${sway}px)`;

      if (p > 0.25) {
        const screenProgress = (p - 0.25) / 0.75;
        const screenIdx = Math.min(Math.floor(screenProgress * TOTAL), TOTAL - 1);

        screens.forEach((s, i) => {
          if (i === screenIdx) {
            s.classList.add('active');
            s.style.opacity = '1';
            s.style.zIndex = '5';
          } else {
            s.classList.remove('active');
            s.style.opacity = '0';
            s.style.zIndex = '1';
          }
        });

        labels.forEach((l, i) => {
          const targetOpacity = i === screenIdx ? 1 : 0;
          l.style.opacity = targetOpacity;
          l.style.transform = i === screenIdx
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(12px)';
          l.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
      } else {
        labels.forEach(l => { l.style.opacity = 0; });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));
    document.querySelectorAll('.feature-tile.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  usePageMeta(
    'DevLog – Track Your Coding Journey | GitHub, LeetCode & Codeforces Widgets',
    'DevLog gives you beautiful heatmap widgets for GitHub, LeetCode & Codeforces on your Android home screen. Track contributions, problems solved, and coding progress at a glance.'
  );

  return (
    <main>
      {/* ── HERO ── */}
      <section id="hero">
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', animation: 'fadeUp 0.8s ease both' }}>
          <div className="hero-eyebrow" style={{ marginBottom: 0, animation: 'none' }}>
            <div className="hero-eyebrow-dot"></div>
            Live on Play Store
          </div>
        </div>

        <h1 className="hero-title">
          Track Your<br /><span className="accent">Coding Journey.</span>
        </h1>

        <p className="hero-sub">
          Beautiful heatmap widgets for GitHub, LeetCode & Codeforces — right on your home screen. See your progress at a glance.
        </p>

        <div className="hero-actions">
          <button className="btn-green" onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}>
            Download on Play Store
          </button>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item"><span>GitHub</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>LeetCode</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Codeforces</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Heatmaps</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Widgets</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Dark Theme</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Real-time Sync</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Multiple Sizes</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>GitHub</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>LeetCode</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Codeforces</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Heatmaps</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Widgets</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Dark Theme</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Real-time Sync</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Multiple Sizes</span><div className="ticker-dot"></div></div>
        </div>
      </div>

      {/* ── PHONE SCROLL ── */}
      <section id="phone-scroll" ref={sectionRef}>
        <div className="phone-sticky">
          <div className="phone-scene">
            <div className="screen-label" id="label-0">
              <div className="screen-label-title">GitHub at a glance.</div>
              <div className="screen-label-sub">See your total contributions & heatmap instantly.</div>
            </div>
            <div className="screen-label" id="label-1" style={{ opacity: 0 }}>
              <div className="screen-label-title">LeetCode progress.</div>
              <div className="screen-label-sub">Track problems solved out of the full catalog.</div>
            </div>
            <div className="screen-label" id="label-2" style={{ opacity: 0 }}>
              <div className="screen-label-title">Configure everything.</div>
              <div className="screen-label-sub">Set your username. Choose platforms. Toggle sync.</div>
            </div>
            <div className="screen-label" id="label-3" style={{ opacity: 0 }}>
              <div className="screen-label-title">Pick your size.</div>
              <div className="screen-label-sub">Small, medium, or large — fit your layout perfectly.</div>
            </div>

            <div className="iphone" id="iphone" ref={iphoneRef}>
              <div className="iphone-shell"></div>
              <div className="iphone-btn-left"></div>
              <div className="iphone-btn-left2"></div>
              <div className="iphone-btn-left3"></div>
              <div className="iphone-btn-right"></div>
              <div className="iphone-screen">
                <div className="dynamic-island"></div>

                {/* Screen 1: GitHub Widget */}
                <div className="app-screen screen-widgets active" id="screen-0">
                  <div className="widget-card">
                    <div className="widget-header">
                      <div>
                        <div className="widget-label github">Progress</div>
                        <div className="widget-count">67 <span className="widget-count-sub">total</span></div>
                        <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>GitHub</div>
                      </div>
                      <div className="widget-platform-icon" style={{ background: '#161b22' }}>
                        <GitHubIcon />
                      </div>
                    </div>
                    <div className="widget-heatmap">
                      {githubHeatmap.map((level, i) => (
                        <div key={i} className={`heatmap-cell gh-${level}`}></div>
                      ))}
                    </div>
                    <div className="widget-months">
                      <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>

                  <div className="widget-card">
                    <div className="widget-header">
                      <div>
                        <div className="widget-label leetcode">Progress</div>
                        <div className="widget-count">539 <span className="widget-count-sub">/3991</span></div>
                        <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>LeetCode</div>
                      </div>
                      <div className="widget-platform-icon" style={{ background: '#1a1a2e' }}>
                        <LeetCodeIcon />
                      </div>
                    </div>
                    <div className="widget-heatmap">
                      {leetcodeHeatmap.map((level, i) => (
                        <div key={i} className={`heatmap-cell lc-${level}`}></div>
                      ))}
                    </div>
                    <div className="widget-months">
                      <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>

                  <div className="widget-card">
                    <div className="widget-header">
                      <div>
                        <div className="widget-label codeforces">Progress</div>
                        <div className="widget-count">428 <span className="widget-count-sub">/9500</span></div>
                        <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>Codeforces</div>
                      </div>
                      <div className="widget-platform-icon" style={{ background: '#1a1a2e' }}>
                        <CodeforcesIcon />
                      </div>
                    </div>
                    <div className="widget-heatmap">
                      {codeforcesHeatmap.map((level, i) => (
                        <div key={i} className={`heatmap-cell cf-${level}`}></div>
                      ))}
                    </div>
                    <div className="widget-months">
                      <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>

                  <div className="phone-bottom-nav">
                    <div className="phone-nav-item active"><div className="phone-nav-icon">📊</div>Widgets</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">⚙️</div>Settings</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">👤</div>Profile</div>
                  </div>
                </div>

                {/* Screen 2: LeetCode focus */}
                <div className="app-screen screen-widgets" id="screen-1">
                  <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>LeetCode Stats</div>
                    <div style={{ fontSize: '11px', color: '#555' }}>Your competitive programming journey</div>
                  </div>

                  <div className="widget-card" style={{ marginBottom: '12px' }}>
                    <div className="widget-header">
                      <div>
                        <div className="widget-label leetcode">Total Solved</div>
                        <div className="widget-count" style={{ fontSize: '36px' }}>539</div>
                      </div>
                      <div className="widget-platform-icon" style={{ background: '#1a1a2e' }}>
                        <LeetCodeIcon />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ background: '#161b22', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>210</div>
                      <div style={{ fontSize: '9px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Easy</div>
                    </div>
                    <div style={{ background: '#161b22', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>276</div>
                      <div style={{ fontSize: '9px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Medium</div>
                    </div>
                    <div style={{ background: '#161b22', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>53</div>
                      <div style={{ fontSize: '9px', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hard</div>
                    </div>
                  </div>

                  <div className="widget-card">
                    <div className="widget-heatmap">
                      {leetcodeHeatmap.map((level, i) => (
                        <div key={i} className={`heatmap-cell lc-${level}`}></div>
                      ))}
                    </div>
                    <div className="widget-months">
                      <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>

                  <div className="phone-bottom-nav">
                    <div className="phone-nav-item active"><div className="phone-nav-icon">📊</div>Widgets</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">⚙️</div>Settings</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">👤</div>Profile</div>
                  </div>
                </div>

                {/* Screen 3: Settings */}
                <div className="app-screen screen-settings" id="screen-2">
                  <div className="settings-title">Settings</div>

                  <div className="settings-card">
                    <div className="settings-row">
                      <span className="settings-label">GitHub Username</span>
                      <span className="settings-value">@nikhil</span>
                    </div>
                    <div className="settings-row">
                      <span className="settings-label">LeetCode Username</span>
                      <span className="settings-value">nikhil_dev</span>
                    </div>
                    <div className="settings-row">
                      <span className="settings-label">Codeforces Handle</span>
                      <span className="settings-value">nikhil_cf</span>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-row">
                      <span className="settings-label">Auto Sync</span>
                      <div className="settings-toggle"></div>
                    </div>
                    <div className="settings-row">
                      <span className="settings-label">Dark Theme Widgets</span>
                      <div className="settings-toggle"></div>
                    </div>
                    <div className="settings-row">
                      <span className="settings-label">Sync Interval</span>
                      <span className="settings-value">Every 6 hours</span>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-row">
                      <span className="settings-label">App Version</span>
                      <span style={{ fontSize: '12px', color: '#555' }}>1.0.0</span>
                    </div>
                  </div>

                  <div className="phone-bottom-nav">
                    <div className="phone-nav-item"><div className="phone-nav-icon">📊</div>Widgets</div>
                    <div className="phone-nav-item active"><div className="phone-nav-icon">⚙️</div>Settings</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">👤</div>Profile</div>
                  </div>
                </div>

                {/* Screen 4: Widget Sizes */}
                <div className="app-screen screen-sizes" id="screen-3">
                  <div className="sizes-title">Widget Sizes</div>
                  <div className="sizes-sub">Choose the perfect size for your home screen</div>

                  <div className="size-option active">
                    <div>
                      <div className="size-name">4×2 Large</div>
                      <div className="size-desc">Full heatmap with stats & months</div>
                    </div>
                    <div className="size-check active">✓</div>
                  </div>

                  <div className="size-option">
                    <div>
                      <div className="size-name">4×1 Medium</div>
                      <div className="size-desc">Compact heatmap with total count</div>
                    </div>
                    <div className="size-check"></div>
                  </div>

                  <div className="size-option">
                    <div>
                      <div className="size-name">2×2 Small</div>
                      <div className="size-desc">Quick stats counter only</div>
                    </div>
                    <div className="size-check"></div>
                  </div>

                  <div className="size-option">
                    <div>
                      <div className="size-name">4×3 Extra Large</div>
                      <div className="size-desc">All platforms in one widget</div>
                    </div>
                    <div className="size-check"></div>
                  </div>

                  <div className="phone-bottom-nav">
                    <div className="phone-nav-item active"><div className="phone-nav-icon">📊</div>Widgets</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">⚙️</div>Settings</div>
                    <div className="phone-nav-item"><div className="phone-nav-icon">👤</div>Profile</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features">
        <p className="features-eyebrow reveal">Built for developers</p>
        <h2 className="features-title reveal">Everything you need.<br />Nothing you don't.</h2>
        <p className="features-sub reveal">DevLog brings your coding journey to your home screen — clean, beautiful, and always up to date.</p>

        <div className="features-grid">
          <div className="feature-tile reveal">
            <span className="feature-icon">📊</span>
            <div className="feature-title">Beautiful Heatmaps</div>
            <div className="feature-desc">Stunning contribution heatmaps for GitHub, LeetCode & Codeforces — rendered right on your home screen widget.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🔢</span>
            <div className="feature-title">Total at a Glance</div>
            <div className="feature-desc">See your total contributions or problems solved instantly. No need to open any app — just glance at your home screen.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🌙</span>
            <div className="feature-title">Dark-Themed Design</div>
            <div className="feature-desc">Clean, dark-themed widgets that blend seamlessly with your home screen. Designed to look stunning on any wallpaper.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">📐</span>
            <div className="feature-title">Multiple Sizes</div>
            <div className="feature-desc">Choose from small, medium, large, or extra large widget sizes. Fit your layout perfectly, no compromises.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🔄</span>
            <div className="feature-title">Real-time Sync</div>
            <div className="feature-desc">Your widgets stay up to date automatically. Configurable sync intervals to keep your stats fresh without draining battery.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">⚡</span>
            <div className="feature-title">Lightweight & Fast</div>
            <div className="feature-desc">Minimal battery usage, fast loading, and zero bloat. DevLog does one thing and does it exceptionally well.</div>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS SECTION ── */}
      <section id="platforms">
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p className="features-eyebrow reveal" style={{ marginBottom: '1rem' }}>Supported Platforms</p>
          <h2 className="features-title reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '1.5rem' }}>
            Track All Your<br />Coding Platforms
          </h2>
          <p className="features-sub reveal" style={{ maxWidth: '660px', margin: '0 auto 3rem' }}>
            Whether you're pushing commits on GitHub, grinding LeetCode problems, or competing on Codeforces —
            DevLog tracks them all in beautiful, unified widgets.
          </p>
        </div>

        <div className="platforms-grid reveal">
          <div className="platform-card">
            <span className="platform-icon">🐙</span>
            <div className="platform-name">GitHub</div>
            <div className="platform-desc">Track total contributions, commit streaks, and your green heatmap grid.</div>
            <div className="platform-color-bar github"></div>
          </div>
          <div className="platform-card">
            <span className="platform-icon">💻</span>
            <div className="platform-name">LeetCode</div>
            <div className="platform-desc">Monitor problems solved across Easy, Medium, and Hard difficulties.</div>
            <div className="platform-color-bar leetcode"></div>
          </div>
          <div className="platform-card">
            <span className="platform-icon">🏆</span>
            <div className="platform-name">Codeforces</div>
            <div className="platform-desc">Keep tabs on your submissions, rating changes, and contest activity.</div>
            <div className="platform-color-bar codeforces"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════ */
function AboutPage() {
  usePageMeta(
    'About DevLog – Coding Progress Widget App',
    'Learn about DevLog, a beautiful widget app that brings your GitHub, LeetCode, and Codeforces progress to your Android home screen.'
  );
  return (
    <section className="about-section" style={{ minHeight: '80vh' }}>
      <div className="about-container">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-heading"
        >
          About DevLog
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="about-text"
        >
          DevLog is a developer tool born out of a simple frustration — wanting to see coding progress without opening multiple apps and websites. Whether you're tracking GitHub contributions, grinding LeetCode problems, or competing on Codeforces, DevLog puts beautiful heatmap widgets right on your Android home screen.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-heading"
          style={{ marginTop: '3.5rem' }}
        >
          Why DevLog?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="about-text"
        >
          We believe that visibility breeds consistency. When you can see your coding streak on your home screen every time you pick up your phone, you're more likely to keep the streak going. DevLog is designed to motivate developers by making their progress impossible to ignore — beautifully.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════ */
function ContactPage() {
  usePageMeta(
    'Contact DevLog – Get in Touch',
    'Contact the DevLog team for feedback, suggestions, or partnership inquiries.'
  );
  return (
    <section className="about-section" style={{ minHeight: '85vh', alignItems: 'center' }}>
      <div className="about-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', marginBottom: '3.5rem' }}
        >
          Get in touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ width: '100%', maxWidth: '900px', marginBottom: '4rem' }}
        >
          <p className="about-text" style={{ textAlign: 'center' }}>
            Have feedback, feature requests, or found a bug? We'd love to hear from you. Reach out via email and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className="btn-black" onClick={() => window.location.href = 'mailto:devlog@example.com'} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={18} /> Email Us
          </button>
          <button className="btn-outline" onClick={() => window.open('#', '_blank', 'noopener,noreferrer')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            🐙 GitHub
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PRIVACY POLICY
   ═══════════════════════════════════════ */
function PrivacyPolicy() {
  usePageMeta(
    'Privacy Policy – DevLog',
    'Read the Privacy Policy for DevLog — the coding heatmap widget app for Android.'
  );
  return (
    <section className="about-section" style={{ minHeight: '80vh', paddingBottom: '6rem' }}>
      <div className="about-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Privacy Policy</h2>
        <p className="about-text" style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '3rem' }}>Last updated: July 2026</p>

        <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>What data we collect</h3>
          <p style={{ marginBottom: '1rem' }}>DevLog collects only the minimal data necessary to provide widget functionality:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Your GitHub, LeetCode, and Codeforces usernames (stored locally on your device).</li>
            <li style={{ marginBottom: '0.5rem' }}>Widget preferences and settings (stored locally).</li>
            <li style={{ marginBottom: '0.5rem' }}>Public API data fetched from the respective platforms (contributions, problem counts, etc.).</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>How we use your data</h3>
          <p style={{ marginBottom: '1.5rem' }}>All data is processed locally on your device. We do not send your data to our servers. DevLog fetches publicly available data from GitHub, LeetCode, and Codeforces APIs to display on your widgets.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Third-party services</h3>
          <p style={{ marginBottom: '1.5rem' }}>DevLog accesses public APIs provided by GitHub, LeetCode, and Codeforces. Your use of those platforms is subject to their respective privacy policies and terms of service.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Contact</h3>
          <p style={{ marginBottom: '1.5rem' }}>If you have questions about this Privacy Policy, please contact us at devlog@example.com.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TERMS OF SERVICE
   ═══════════════════════════════════════ */
function TermsOfService() {
  usePageMeta(
    'Terms of Service – DevLog',
    'Read the Terms of Service for DevLog — the coding heatmap widget app for Android.'
  );
  return (
    <section className="about-section" style={{ minHeight: '80vh', paddingBottom: '6rem' }}>
      <div className="about-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Terms of Service</h2>
        <p className="about-text" style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '3rem' }}>Last updated: July 2026</p>

        <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Acceptance of Terms</h3>
          <p style={{ marginBottom: '1.5rem' }}>By downloading and using DevLog, you agree to be bound by these Terms of Service. If you do not agree, do not use the App.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Use of the App</h3>
          <p style={{ marginBottom: '1.5rem' }}>DevLog is provided for personal, non-commercial use. You may install and use the App on Android devices that you own or control. You may not reverse engineer, decompile, or create derivative works based on the App.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Disclaimer</h3>
          <p style={{ marginBottom: '1.5rem' }}>DevLog is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of data fetched from third-party APIs. The App depends on publicly available APIs from GitHub, LeetCode, and Codeforces, which may change or become unavailable at any time.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Contact</h3>
          <p style={{ marginBottom: '1.5rem' }}>For questions about these Terms, please contact us at devlog@example.com.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════ */
function App() {
  return (
    <div className="app">
      <ScrollToTop />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/" className="logo-container">
              <div className="logo-icon">{ }</div>
              DevLog
            </Link>
            <div className="nav-divider"></div>
            <div className="nav-links">
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>

          <div className="nav-right">
            <button className="btn-green" onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}>
              Download on Play Store
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* Footer */}
      <footer>
        <div className="footer-left">
          DevLog 2026
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <Link to="/terms-of-service" className="footer-link">terms of service</Link>
            <Link to="/privacy-policy" className="footer-link">privacy policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
