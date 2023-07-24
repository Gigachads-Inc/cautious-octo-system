/**
 * Sleep function that waits for a specified amount of time.
 * @param {*} ms time to wait in ms.
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(null), ms));