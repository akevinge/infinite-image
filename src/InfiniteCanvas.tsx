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
  imageScaleCoeff: number; // the size that the image can grow too, affects visible scale speed too
}

const defaultProps: Required<Omit<InfiniteCanvasProps, "imageSrcs">> = {
  randomImagePos: true,
  frameWidth: "100vw",
  frameHeight: "100vh",
  displayWidth: "200vw",
  displayHeight: "200vh",
  displayPadding: "150px",
  imageTransformRadius: 600,
  imageScaleCoeff: 1.4,
};

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  children,
  imageSrcs,
  randomImagePos = defaultProps.randomImagePos,
  frameWidth = defaultProps.frameWidth,
  frameHeight = defaultProps.frameHeight,
  displayWidth = defaultProps.displayWidth,
  displayHeight = defaultProps.displayHeight,
  displayPadding = defaultProps.displayPadding,
  imageTransformRadius = defaultProps.imageTransformRadius,
  imageScaleCoeff = defaultProps.imageScaleCoeff,
}) => {
  const [displayTrans, setDisplayTrans] =
    React.useState<string>("translate(0px,0px)");

  const updateTrans = (x: number, y: number) => {
    setDisplayTrans(`translate(${x}px, ${y}px)`);
  };

  const frameRef = React.useRef<HTMLDivElement>(null);
  const displayRef = React.useRef<HTMLDivElement>(null);
  const displayInnerRef = React.useRef<HTMLDivElement>(null);

  const setCenter = () => {
    if (frameRef.current && displayRef.current) {
      const { x, y } = calcDisplayCenter(frameRef.current, displayRef.current);
      updateTrans(x, y);
    }
  };

  React.useEffect(() => setCenter(), []);

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
      }}
      ref={frameRef}
    >
      <div
        id="inf-canvas-display"
        style={{
          width: displayWidth,
          height: displayHeight,
          position: "absolute",
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
                    scaleCoeff={imageScaleCoeff}
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
