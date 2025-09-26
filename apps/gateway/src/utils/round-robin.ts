let idx = 0;

export function roundRobin<T>(instances: T[]): T {
  if (!instances || instances.length === 0) {
    throw new Error('No instances available');
  }
  const choice = instances[idx];
  idx = (idx + 1) % instances.length;
  return choice;
}
