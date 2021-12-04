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
      <InfiniteCanvas>
        {Array.from({ length: 20 }, (_, i) => (
          <img src="https://picsum.photos/400/500" alt="" key={i} />
        ))}
      </InfiniteCanvas>
    </div>
  );
}
