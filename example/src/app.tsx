import * as React from "react";
import { InfiniteCanvas } from "@infinite-images";

export default function App(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InfiniteCanvas
        imageSrcs={Array(20).fill("https://picsum.photos/200/300")}
      />
    </div>
  );
}
