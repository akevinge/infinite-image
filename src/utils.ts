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
  if (!clientX || !clientY) return;

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

  const top = (frameHeight - displayHeight) / 2;
  const left = (frameWidth - displayWidth) / 2;

  return { top, left };
};
