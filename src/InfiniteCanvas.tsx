import * as React from "react";
import { calcDisplayCenter, calcDisplayOffset } from "~utils";

export const InfiniteCanvas: React.FC = () => {
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const frame = document.getElementById("inf-canvas-frame");
    const display = document.getElementById("inf-canvas-display");

    if (frame && display) {
      const { top, left } = calcDisplayCenter(frame, display);

      setTop(top);
      setLeft(left);
    }
  }, []);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const frame = document.getElementById("inf-canvas-frame");
    const display = document.getElementById("inf-canvas-display");

    if (frame && display) {
      const offsets = calcDisplayOffset(frame, display, [e.clientX, e.clientY]);
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
