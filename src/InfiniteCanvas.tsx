import * as React from "react";
import { calcDisplayCenter, calcDisplayOffset } from "~utils";

export interface InfiniteCanvasProps {
  randomImagePos?: boolean;
  frameWidth?: number | string;
  frameHeight?: number | string;
  displayWidth?: number | string;
  displayHeight?: number | string;
  displayPadding?: number | string;
}

const defaultFrameWidth = "100vw";
const defaultFrameHeight = "100vh";
const defaultDisplayWidth = "200vw";
const defaultDisplayHeight = "200vh";
const defaultDisplayPadding = "50px";

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  children,
  frameWidth = defaultFrameWidth,
  frameHeight = defaultFrameHeight,
  displayWidth = defaultDisplayWidth,
  displayHeight = defaultDisplayHeight,
  displayPadding = defaultDisplayPadding,
}) => {
  const [displayTrans, setDisplayTrans] =
    React.useState<string>("translate(0px,0px)");

  const updateTrans = (x: number, y: number) => {
    setDisplayTrans(`translate(${x}px, ${y}px)`);
  };

  const frameRef = React.useRef(null);
  const displayRef = React.useRef(null);

  React.useEffect(() => {
    if (frameRef.current && displayRef.current) {
      const { x, y } = calcDisplayCenter(frameRef.current, displayRef.current);
      updateTrans(x, y);
    }
  }, []);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (frameRef.current && displayRef.current) {
      const offsets = calcDisplayOffset(frameRef.current, displayRef.current, [
        e.clientX,
        e.clientY,
      ]);
      if (offsets) {
        updateTrans(-offsets.offsetX, -offsets.offsetY);
      }
    }
  };

  return (
    <div
      id="inf-canvas-frame"
      onMouseMove={onMouseMove}
      style={{
        overflow: "hidden",
        width: frameWidth,
        height: frameHeight,
        position: "relative",
        background: "green",
      }}
      ref={frameRef}
    >
      <div
        id="inf-canvas-display"
        style={{
          width: displayWidth,
          height: displayHeight,
          position: "absolute",
          background: "red",
          transform: displayTrans,
          transition: "transform 0.25s ease-out",
        }}
        ref={displayRef}
      >
        <div
          id="inf-canvas-display-padding"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "content-box",
            padding: displayPadding,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
