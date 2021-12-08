import * as React from "react";
import { calcDistRatio } from "~utils";

interface ImageWrapProps {
  imgSrc: string;
  center: number[];
  id: number;
  displayEl: HTMLElement | null;
  displayPad: number;
  imageTransformRadius: number;
}

const ImageWrapComponent: React.FC<ImageWrapProps> = ({
  imgSrc,
  center,
  displayEl,
  displayPad,
  imageTransformRadius,
  id,
}) => {
  const defaultScale = 1.0;

  const [scale, setScale] = React.useState<string>(`scale(${defaultScale}`);
  const [trans, setTrans] = React.useState<string>("");

  const updateScale = (sx: number) => {
    setScale(`scale(${sx}`);
  };

  const updateTrans = (x: number, y: number) =>
    setTrans(`translate(${x}px, ${y}px)`);

  const originalImgDim = React.useRef<number[]>([]);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const onLoad = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();

      originalImgDim.current = [width, height];

      updateTrans(center[0] - width / 2, center[1] - height / 2);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (displayEl) {
      const distRatio = calcDistRatio(
        displayEl,
        displayPad,
        [e.clientX, e.clientY],
        [center[0], center[1]],
        imageTransformRadius,
      );

      if (distRatio && distRatio > 0) {
        updateScale(distRatio + defaultScale);
      }
    }
  };
  React.useEffect(() => {
    if (displayEl) {
      displayEl.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      displayEl && displayEl.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      id={id + "-image-wrap"}
      style={{
        display: "inline",
        position: "absolute",
        transform: trans,
      }}
    >
      <div style={{ position: "absolute" }}>
        <img
          src={imgSrc}
          alt=""
          style={{
            transform: scale,
            transformOrigin: "center center",
            transition: "transform 0.2s ease-out",
          }}
          ref={imageRef}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};

export const ImageWrap = React.memo(ImageWrapComponent);
