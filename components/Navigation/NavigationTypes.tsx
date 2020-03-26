type NavigatorScreenItem = {
  name: string;
  component: React.ComponentType;
};
type NavigatorProps = {
  pages: NavigatorScreenItem[];
};

export { NavigatorScreenItem, NavigatorProps };
