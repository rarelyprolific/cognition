import { setFullScreen } from "./fullscreen-toggle";

/**
 * Gets a 2D rendering context for an HTML CANVAS element.
 * @param canvasHtmlElement Target HTML CANVAS element to get a 2D rendering context from.
 */
export function get2dDisplayContextFromCanvasElement(canvasHtmlElement: HTMLElement): CanvasRenderingContext2D {
    const canvasElement = validateCanvasHtmlElement(canvasHtmlElement);

    const displayContext = canvasElement.getContext("2d");

    if (!displayContext) {
        throw new Error("Initialisation error! Canvas not supported.");
    }

    // Toggle fullscreen when user clicks canvas
    canvasElement.addEventListener("click", setFullScreen);

    return displayContext;
}

/**
 * Validate the target element is an HTML CANVAS element.
 * @param htmlElement Target HTML CANVAS element.
 */
function validateCanvasHtmlElement(htmlElement: HTMLElement): HTMLCanvasElement {
    if (!htmlElement) {
        throw new Error(
            `Initialisation error! Target element must be <canvas>. No element found.`
        );
    }

    if (!(htmlElement instanceof HTMLCanvasElement)) {
        throw new Error(
            `Initialisation error! Target element must be <canvas>. #${htmlElement.id
            } element is <${htmlElement.tagName.toLowerCase()}>.`
        );
    }

    return htmlElement as HTMLCanvasElement;
}