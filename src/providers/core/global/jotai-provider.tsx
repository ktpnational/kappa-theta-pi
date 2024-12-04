import { Provider } from 'jotai/react';
import type { ReactNode } from 'react';

type ComponentWithChildren<P = {}> = React.ComponentType<P & { children?: ReactNode }>;

interface JotaiProviderProps<T extends ComponentWithChildren> {
  Component: T;
  componentProps?: T extends ComponentWithChildren<infer P> ? P : never;
}

export const JotaiProvider = <T extends ComponentWithChildren>({
  Component,
  componentProps,
}: JotaiProviderProps<T>) => {
  return (
    <Provider>
      <Component {...(componentProps as any)} />
    </Provider>
  );
};

JotaiProvider.displayName = 'JotaiProvider';
export default JotaiProvider;
