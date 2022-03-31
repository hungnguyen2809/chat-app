export type AppRouteType = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};
