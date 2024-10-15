import { FindElementProps } from "./../util/util.d";
export function findElement({ startElement, selector }: FindElementProps) {
  let currentElement: HTMLElement | null = startElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}
