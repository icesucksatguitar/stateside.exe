import { useEffect, useRef, useState } from "react";
import "./App.css";
import image1 from "./assets/parallax images/parallax image 1.png";
import image2 from "./assets/parallax images/parallax image 2.png";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

export default function FracturedReactor() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const dragStateRef = useRef<{ active: boolean; lastY: number }>({
    active: false,
    lastY: 0,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousDragOffset = body.style.getPropertyValue("--reactor-drag-offset");

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const updateProgress = (delta: number) => {
      targetProgressRef.current = clamp(
        targetProgressRef.current + delta,
        0,
        1,
      );
    };

    let frameId = 0;

    const animate = () => {
      const targetProgress = targetProgressRef.current;
      const currentProgress = progressRef.current;
      const nextProgress =
        Math.abs(targetProgress - currentProgress) < 0.0005
          ? targetProgress
          : lerp(currentProgress, targetProgress, 0.085);

      progressRef.current = nextProgress;
      setProgress(nextProgress);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) {
        return;
      }

      body.classList.add("reactor-dragging");
      body.style.setProperty("--reactor-drag-offset", "0px");

      dragStateRef.current = {
        active: true,
        lastY: event.clientY,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStateRef.current.active) {
        return;
      }

      const deltaY = event.clientY - dragStateRef.current.lastY;
      dragStateRef.current.lastY = event.clientY;

      body.style.setProperty(
        "--reactor-drag-offset",
        `${clamp(deltaY * 0.9, -18, 18)}px`,
      );
      updateProgress(deltaY * 0.0022);
    };

    const stopDragging = () => {
      dragStateRef.current.active = false;
      body.classList.remove("reactor-dragging");
      body.style.setProperty("--reactor-drag-offset", "0px");
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("blur", stopDragging);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("blur", stopDragging);
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      if (previousDragOffset) {
        body.style.setProperty("--reactor-drag-offset", previousDragOffset);
      } else {
        body.style.removeProperty("--reactor-drag-offset");
      }
      body.classList.remove("reactor-dragging");
    };
  }, []);

  const backgroundShift = -progress * 8;
  const backgroundScale = 1.08 + progress * 0.03;

  return (
    <main ref={sceneRef} className="fracturedreactor-screen">
      <section
        className="fracturedreactor-scene"
        aria-label="Fractured reactor parallax scene"
        onContextMenu={(event) => event.preventDefault()}
      >
        <div
          className="fracturedreactor-background"
          style={{
            transform: `translate3d(0, ${backgroundShift}%, 0) scale(${backgroundScale})`,
          }}
        >
          <img
            src={image1}
            alt=""
            aria-hidden="true"
            className="fracturedreactor-layer"
            style={{ opacity: 1 - progress }}
            draggable="false"
          />
          <img
            src={image2}
            alt=""
            aria-hidden="true"
            className="fracturedreactor-layer fracturedreactor-layer--second"
            style={{ opacity: progress }}
            draggable="false"
          />
        </div>
      </section>
    </main>
  );
}
