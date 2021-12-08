/**
 * @param frame
 * Frame Element
 * @param display
 * Display Element
 * @param clientXY
 * mouse position relative to browser window [X,Y]: refer to https://i.stack.imgur.com/4C3no.png
 * @description Diagram: https://i.imgur.com/JeTsDDq.png
 * @returns additive inverse of css transform values for display element
 */
export const calcDisplayOffset = (
  frame: HTMLElement,
  display: HTMLElement,
  [clientX, clientY]: number[],
) => {
  if (clientX === undefined || clientY === undefined) return;

  const {
    width: frameWidth,
    height: frameHeight,
    top: frameTop,
    left: frameLeft,
  } = frame.getBoundingClientRect();

  const { width: displayWidth, height: displayHeight } =
    display.getBoundingClientRect();

  // mouse pos relative to frame
  const mouseX = clientX - frameLeft;
  const mouseY = clientY - frameTop;

  // ratio of mouse pos to container dimensions
  const ratioX = mouseX / frameWidth;
  const ratioY = mouseY / frameHeight;

  // distance from edges of display (not frame!)
  const displayLeft = displayWidth * ratioX;
  const displayTop = displayHeight * ratioY;

  // distance between mouse pos and distance from edge of display = offset
  const offsetX = displayLeft - mouseX;
  const offsetY = displayTop - mouseY;

  return { offsetX, offsetY };
};

/**
 * @param frame
 * Frame Element
 * @param display
 * Display Element
 * @returns css top and left for centering display element in frame element
 */
export const calcDisplayCenter = (frame: HTMLElement, display: HTMLElement) => {
  const { height: frameHeight, width: frameWidth } =
    frame.getBoundingClientRect();

  const { height: displayHeight, width: displayWidth } =
    display.getBoundingClientRect();

  const x = (frameWidth - displayWidth) / 2;
  const y = (frameHeight - displayHeight) / 2;

  return { x, y };
};

/**
 * @param el
 * Parent element
 * @param clientArray
 * Coordinates of mouse relative to the viewport
 * @param originArray
 * Coordinates of center of el relative to parent, currently doesn't respect padding but matters little if randomly generated
 * @returns distance ratio
 */
export const calcDistRatio = (
  el: HTMLElement,
  [clientX, clientY]: number[],
  [originX, originY]: number[],
  radius: number, // not actually radius! (more like a square)
) => {
  if (
    clientX === undefined ||
    clientY === undefined ||
    originX === undefined ||
    originY === undefined
  )
    return;

  const { left, top } = el.getBoundingClientRect();

  // calc mouse position relative to parent, respects padding
  const mouseX = clientX - left - 150;
  const mouseY = clientY - top - 150;

  // dist of mouse from origin
  const dist = Math.sqrt((mouseX - originX) ** 2 + (mouseY - originY) ** 2);

  const ratio = (radius - dist) / radius;

  return ratio;
};
