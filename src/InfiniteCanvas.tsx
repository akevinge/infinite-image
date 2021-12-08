import * as React from "react";
import { ImageWrap } from "~ImageWrap";
import { usePoissonGeneration } from "~usePoissonGeneration";
import { calcDisplayCenter, calcDisplayOffset, pxToNum } from "~utils";

export interface InfiniteCanvasProps {
  imageSrcs: string[];
  randomImagePos?: boolean;
  frameWidth?: number | string;
  frameHeight?: number | string;
  displayWidth?: number | string;
  displayHeight?: number | string;
  displayPadding?: number | string;
  imageTransformRadius?: number; // radius must be in pixels
}

const defaultRandomImagePos = true;
const defaultFrameWidth = "100vw";
const defaultFrameHeight = "100vh";
const defaultDisplayWidth = "200vw";
const defaultDisplayHeight = "200vh";
const defaultDisplayPadding = "150px";
const defaultImageTransformRadius = 600;

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  children,
  imageSrcs,
  randomImagePos = defaultRandomImagePos,
  frameWidth = defaultFrameWidth,
  frameHeight = defaultFrameHeight,
  displayWidth = defaultDisplayWidth,
  displayHeight = defaultDisplayHeight,
  displayPadding = defaultDisplayPadding,
  imageTransformRadius = defaultImageTransformRadius,
}) => {
  const [displayTrans, setDisplayTrans] =
    React.useState<string>("translate(0px,0px)");

  const updateTrans = (x: number, y: number) => {
    setDisplayTrans(`translate(${x}px, ${y}px)`);
  };

  const frameRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const displayInnerRef = React.useRef(null);

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

  const points = usePoissonGeneration({
    displayEl: displayInnerRef.current,
    displayElPadding: pxToNum(displayPadding),
  });

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
          transition: "transform 0.45s ease-out",
        }}
        ref={displayRef}
      >
        <div
          id="inf-canvas-display-padding"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            padding: displayPadding,
            position: "relative",
          }}
          ref={displayInnerRef}
        >
          {!randomImagePos && children}
          {randomImagePos &&
            points.length > 0 &&
            imageSrcs.map((src, i) => (
              <React.Fragment key={i + "frag"}>
                {typeof points[i] !== "undefined" && (
                  <ImageWrap
                    imgSrc={src}
                    key={i}
                    displayPad={pxToNum(displayPadding)}
                    imageTransformRadius={imageTransformRadius}
                    id={i}
                    center={points[i]}
                    displayEl={displayInnerRef.current}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
