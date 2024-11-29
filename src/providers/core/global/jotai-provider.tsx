import { Provider } from 'jotai';
import type React from 'react';

type ComponentWithChildren<P = {}> = React.ComponentType<P>;

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
