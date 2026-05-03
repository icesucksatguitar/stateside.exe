import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Geninst() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={`geninst-screen ${isVisible ? "geninst-screen--visible" : ""}`}>
      <header className="geninst-top-banner">
        <span className="geninst-banner-bar" />
        <h1 className="geninst-title">SAGE.EXE</h1>
        <span className="geninst-banner-bar" />
      </header>
      <button
        type="button"
        className="ascend-button"
        onClick={() => navigate("/yearcount")}
      >
        Ascend
      </button>
    </div>
  );
}