/**
 * @param componentLazy
 * @param time - default time 300ms
 * @returns Promise<{ default: () => JSX.Element }>
 */
export const delayLazyLoad = (
  componentLazy: Promise<{ default: () => JSX.Element }>,
  time = 300
): Promise<{ default: () => JSX.Element }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(componentLazy), time);
  });
};
