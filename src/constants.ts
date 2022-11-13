/**
 * This regex is used to validate that a base64 dataUrl is in the proper format.
 * 1. checks first that the string starts with `data:`
 * 2. checks for `image` word, then a type of image (jpg, jpeg, png, gif, avif, webp) separated by `/`
 * 3. checks for an optional `;`
 * 4. checks for a word
 * 5. checks for a `,`
 * 6. checks for a optional `;base64`
 * 7. allows for any string as value
 */
export const imageBase64Regex = /data:(image+\/(?:\b|')(avif|gif|jpeg|jpg|png|webp)(?:\b|')+)?(;?\w+=[-\w]+)*(;base64)?,.*/;
