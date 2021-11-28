import * as React from "react";

export const InfiniteCanvas: React.FC = () => {
  React.useEffect(() => {
    console.log("Test useeff");
    return () => {};
  }, []);

  return (
    <div
      id="inf-canvas-container"
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "120vw",
          height: "120vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "red",
        }}
      ></div>
    </div>
  );
};
