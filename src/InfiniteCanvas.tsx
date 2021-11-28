import * as React from "react";
import { calcDisplayCenter, calcDisplayOffset } from "~utils";

export const InfiniteCanvas: React.FC = () => {
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  const frameRef = React.useRef(null);
  const displayRef = React.useRef(null);

  React.useEffect(() => {
    if (frameRef.current && displayRef.current) {
      const { top, left } = calcDisplayCenter(
        frameRef.current,
        displayRef.current,
      );
      setTop(top);
      setLeft(left);
    }
  }, []);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (frameRef.current && displayRef.current) {
      const offsets = calcDisplayOffset(frameRef.current, displayRef.current, [
        e.clientX,
        e.clientY,
      ]);
      if (offsets) {
        setLeft(-offsets.offsetX);
        setTop(-offsets.offsetY);
      }
    }
  };

  return (
    <div
      id="inf-canvas-frame"
      onMouseMove={onMouseMove}
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "green",
      }}
      ref={frameRef}
    >
      <div
        id="inf-canvas-display"
        style={{
          width: "200vw",
          height: "200vh",
          position: "absolute",
          background: "red",
          top: top,
          left: left,
        }}
        ref={displayRef}
      >
        <div
          style={{
            background: "yellow",
            width: "50px",
            height: "50px",
            position: "absolute",
            borderRadius: "100%",
            top: "100px",
            left: "100px",
          }}
        ></div>
        <div
          style={{
            background: "blue",
            width: "50px",
            height: "50px",
            position: "absolute",
            borderRadius: "100%",
            bottom: "100px",
            right: "100px",
          }}
        ></div>
      </div>
    </div>
  );
};
