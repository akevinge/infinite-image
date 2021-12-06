import * as React from "react";
import PoissonDiskSampling from "poisson-disk-sampling";

export const usePoissonGeneration = ({
  displayEl,
  displayElPadding: pad,
}: {
  displayEl: HTMLElement | null;
  displayElPadding?: number;
}) => {
  const [points, setPoints] = React.useState<number[][]>([]);

  React.useEffect(() => {
    if (displayEl) {
      const { width, height } = displayEl.getBoundingClientRect();

      // respects padding on both sides
      const dimensions = [
        pad ? width - pad * 2 : width,
        pad ? height - pad * 2 : height,
      ];

      const pds = new PoissonDiskSampling({
        shape: dimensions,
        minDistance: dimensions[0] / 7,
        maxDistance: dimensions[0] / 5,
        tries: 20,
      });

      setPoints(pds.fill());
    }
  }, [displayEl]);

  return points;
};
