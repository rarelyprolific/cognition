/**
 * Load an image from a URL and return a promise that resolves to the image element.
 * @param imageUrl URL of the image to load.
 * @returns Promise that resolves to the image element.
 */
export function loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;

        image.src = imageUrl;
    });
}
