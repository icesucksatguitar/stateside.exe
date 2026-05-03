import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Yearcount() {
  const startYear = 2015;
  const endYear = 3000;
  const [year, setYear] = useState(startYear);
  const navigate = useNavigate();

  useEffect(() => {
    const durationMs = 6500;
    const startTime = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const nextYear = Math.round(startYear + (endYear - startYear) * progress);
      setYear(nextYear);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="yearcount-screen">
      <aside className="yearcount-stats" aria-label="Telemetry">
        <div className="yearcount-stats__rail" />
        <div className="yearcount-stats__inner">
          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">ALPHA METRICS</h2>
            <dl className="yearcount-stats__grid">
              <div className="yearcount-stats__row">
                <dt>Radianite Stability</dt>
                <dd>91%</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>ENERGY OUTPUT</dt>
                <dd>0.92x</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>INTEGRITY</dt>
                <dd>87</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>DENSITY</dt>
                <dd>42</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>CO2</dt>
                <dd>408ppm</dd>
              </div>
            </dl>
          </section>

          <div className="yearcount-stats__divider" />

          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">PLANET COORDINATES</h2>
            <dl className="yearcount-stats__grid">
              <div className="yearcount-stats__row">
                <dt>X</dt>
                <dd>-2.14E6</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>Y</dt>
                <dd>7.82E5</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>Z</dt>
                <dd>1.12E4</dd>
              </div>
            </dl>
          </section>

          <div className="yearcount-stats__divider" />

          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">EVENT STATUS</h2>
            <ul className="yearcount-stats__status">
              <li>SYSTEM STABLE</li>
              <li>ALL FUNCTIONS NOMINAL</li>
            </ul>
          </section>
        </div>
      </aside>

      <aside className="yearcount-stats yearcount-stats--right" aria-label="Telemetry">
        <div className="yearcount-stats__rail" />
        <div className="yearcount-stats__inner">
          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">OMEGA METRICS</h2>
            <dl className="yearcount-stats__grid">
              <div className="yearcount-stats__row">
                <dt>Radianite Stability</dt>
                <dd>23%</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>OVERLOAD</dt>
                <dd>2.37x</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>ENV COLLAPSE</dt>
                <dd>19</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>DENSITY</dt>
                <dd>91</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>CO2</dt>
                <dd>982ppm</dd>
              </div>
            </dl>
          </section>

          <div className="yearcount-stats__divider" />

          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">COORDINATES</h2>
            <dl className="yearcount-stats__grid">
              <div className="yearcount-stats__row">
                <dt>X</dt>
                <dd>-3.14e6</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>Y</dt>
                <dd>8.92e5</dd>
              </div>
              <div className="yearcount-stats__row">
                <dt>Z</dt>
                <dd>1.45e4</dd>
              </div>
            </dl>
          </section>

          <div className="yearcount-stats__divider" />

          <section className="yearcount-stats__block">
            <h2 className="yearcount-stats__heading">EVENT STATUS</h2>
            <ul className="yearcount-stats__status">
              <li>SYSTEM FAILURE</li>
              <li>CASCADE INITIATED</li>
            </ul>
          </section>
        </div>
      </aside>

      <div className="yearcount-bg yearcount-bg--wind" />
      <div className="yearcount-bg yearcount-bg--dust" />
      <h1 className="yearcount-title">{year}</h1>
      <button
        type="button"
        className="yearcount-bottom-nav"
        onClick={() => navigate("/fracturedreactor")}
      >
        Continue
      </button>
    </main>
  );
}
