/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Toggles fullscreen.
 * @param clickEvent Click event to toggle fullscreen.
 */
export function toggleFullScreen(clickEvent: MouseEvent) {
    const element = clickEvent.currentTarget as HTMLElement;

    if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
            // Safari probably doesn't support Fullscreen API so this probably works as an alternative.. maybe! :)
            (element as any).webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            // Safari probably doesn't support Fullscreen API so this probably works as an alternative.. maybe! :)
            (document as any).webkitExitFullscreen();
        }
    }
}