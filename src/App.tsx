import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
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
        setIsLoading(false); 
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if (loadingProgress === 100) {
      setIsFadingOut(true);

      const timeoutId = window.setTimeout(() => {
        setIsLoading(false);
        navigate('/geninst');
      }, 400);

      return () => window.clearTimeout(timeoutId);
    }
  }, [loadingProgress, navigate]);

  return (
    <>
      {isLoading ? (
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
      ) : null}
    </>
  );
}

export default App;