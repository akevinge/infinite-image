import * as React from "react";

interface ImageWrapProps {
  imgSrc: string;
  center: number[];
  id: number;
  displayEl: HTMLElement | null;
  imageTransformRadius: number;
}

const ImageWrapComponent: React.FC<ImageWrapProps> = ({
  imgSrc,
  children,
  center,
  displayEl,
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
  const imageRef = React.useRef(null);

  const onLoad = () => {
    if (imageRef.current) {
      const { width, height } = (
        imageRef.current as HTMLElement
      ).getBoundingClientRect();

      originalImgDim.current = [width, height];

      updateTrans(center[0] - width / 2, center[1] - height / 2);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (displayEl) {
      const { width, height, left, top } = displayEl.getBoundingClientRect();
      const mouseX = e.clientX - left - 150;
      const mouseY = e.clientY - top - 150;

      const dist = Math.sqrt(
        (mouseX - center[0]) ** 2 + (mouseY - center[1]) ** 2,
      );

      const newScale = (imageTransformRadius - dist) / imageTransformRadius;
      if (newScale > 0) {
        updateScale(newScale + defaultScale);
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
