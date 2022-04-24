/**
 * Wait for X milliseconds
 */
export async function sleep(time: number) {
	return await new Promise((resolve) => setTimeout(resolve, time));
}
