/**
 * Wait for X milliseconds
 *
 * @param {number} time milliseconds to wait
 * @return {Promise<void>}
 */
export async function sleep(time: number): Promise<void> {
	return await new Promise((resolve) => setTimeout(resolve, time));
}
