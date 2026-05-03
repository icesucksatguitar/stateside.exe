import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Geninst from './geninst.tsx';
import Yearcount from './yearcount.tsx';
import FracturedReactor from './fracturedreactor.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import App from './App.tsx';

type CursorPosition = {
  x: number;
  y: number;
};

function AppRouter() {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/geninst" element={<Geninst />} />
        <Route path="/yearcount" element={<Yearcount />} />
        <Route path="/fracturedreactor" element={<FracturedReactor />} />
      </Routes>
      <div
        className={`custom-cursor ${isPressed ? 'pressed' : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
);
