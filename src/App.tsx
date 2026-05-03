import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './headphones.css';

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showHeadphones, setShowHeadphones] = useState(false);
  const [isHeadphonesFadingOut, setIsHeadphonesFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3500;
    const intervalMs = 45;
    const steps = duration / intervalMs;
    let currentStep = 0;

    const intervalId = window.setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);

      setLoadingProgress(nextProgress);

      if (currentStep >= steps) {
        window.clearInterval(intervalId);
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      setIsFadingOut(true);

      const timeoutId = window.setTimeout(() => {
        setIsLoading(false);
        setShowHeadphones(true);
      }, 400);

      return () => window.clearTimeout(timeoutId);
    }
  }, [loadingProgress]);

  useEffect(() => {
    if (showHeadphones) {
      // Show for 5 seconds total
      // 3500ms of display, then 1500ms of fade out
      const fadeOutTimeout = window.setTimeout(() => {
        setIsHeadphonesFadingOut(true);
      }, 3500);

      const navigateTimeout = window.setTimeout(() => {
        navigate('/geninst');
      }, 5000);

      return () => {
        window.clearTimeout(fadeOutTimeout);
        window.clearTimeout(navigateTimeout);
      };
    }
  }, [showHeadphones, navigate]);

  return (
    <>
      {isLoading && (
        <main className={`loading-screen ${isFadingOut ? 'loading-screen--fade-out' : ''}`}>
          <div className="loading-shell">
            <div className="loading-bar">
              <div
                className="loading-bar__fill"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="loading-text">{loadingProgress}%</p>
          </div>
        </main>
      )}

      {showHeadphones && (
        <main className={`headphones-screen ${isHeadphonesFadingOut ? 'headphones-screen--fade-out' : ''}`}>
          <div className="headphones-container">
            <svg className="headphones-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V18C21 19.6569 19.6569 21 18 21H17C15.3431 21 14 19.6569 14 18V15C14 13.3431 15.3431 12 17 12H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V12H7C8.65685 12 10 13.3431 10 15V18C10 19.6569 8.65685 21 7 21H6C4.34315 21 3 19.6569 3 18V12Z" fill="white"/>
            </svg>
            <p className="headphones-text">Use earphones for the best experience</p>
          </div>
        </main>
      )}

    </>
  );
}


export default App;