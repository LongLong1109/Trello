export const retryDelay = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
