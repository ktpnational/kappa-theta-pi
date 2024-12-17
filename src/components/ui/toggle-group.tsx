'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

/**
 * Context for sharing toggle group variant and size props with child items
 * @type {React.Context<VariantProps<typeof toggleVariants>>}
 */
const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

/**
 * A component that groups multiple toggle buttons together
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.variant] - The visual variant of the toggle group
 * @param {string} [props.size] - The size variant of the toggle group
 * @param {React.ReactNode} props.children - The toggle group items
 * @param {React.Ref<HTMLDivElement>} ref - The forwarded ref
 * @returns {React.JSX.Element} The toggle group component
 */
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/**
 * An individual toggle button item within a toggle group
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.ReactNode} props.children - The content of the toggle item
 * @param {string} [props.variant] - The visual variant of the toggle item, overrides group variant
 * @param {string} [props.size] - The size variant of the toggle item, overrides group size
 * @param {React.Ref<HTMLButtonElement>} ref - The forwarded ref
 * @returns {React.JSX.Element} The toggle group item component
 */
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
