'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

/**
 * Root Drawer component that manages the state and behavior of the drawer.
 * @param {boolean} shouldScaleBackground - Controls whether the background should scale when drawer opens. Defaults to true.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Root>} props - Additional props to pass to the drawer root.
 * @returns {React.JSX.Element} A drawer component that can be triggered to slide up from the bottom of the screen.
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

/** Trigger element that controls opening/closing the drawer */
const DrawerTrigger = DrawerPrimitive.Trigger;

/** Portal component that renders drawer content in a portal outside the DOM hierarchy */
const DrawerPortal = DrawerPrimitive.Portal;

/** Close button component for the drawer */
const DrawerClose = DrawerPrimitive.Close;

/**
 * Semi-transparent overlay that appears behind the drawer content
 * @param {string} className - Additional CSS classes to apply to the overlay
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>} props - Additional props for the overlay
 * @param {React.Ref<ElementRef>} ref - Forwarded ref for the overlay element
 * @returns {React.JSX.Element} The drawer overlay component
 */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/**
 * Main content container for the drawer
 * @param {string} className - Additional CSS classes to apply to the content
 * @param {React.ReactNode} children - Child elements to render inside the drawer
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>} props - Additional props for the content
 * @param {React.Ref<ElementRef>} ref - Forwarded ref for the content element
 * @returns {React.JSX.Element} The drawer content component with overlay and pull indicator
 */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

/**
 * Header section of the drawer
 * @param {string} className - Additional CSS classes to apply to the header
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Additional props for the header div
 * @returns {React.JSX.Element} The drawer header component
 */
const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

/**
 * Footer section of the drawer
 * @param {string} className - Additional CSS classes to apply to the footer
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Additional props for the footer div
 * @returns {React.JSX.Element} The drawer footer component
 */
const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

/**
 * Title component for the drawer
 * @param {string} className - Additional CSS classes to apply to the title
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>} props - Additional props for the title
 * @param {React.Ref<ElementRef>} ref - Forwarded ref for the title element
 * @returns {React.JSX.Element} The drawer title component
 */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

/**
 * Description component for the drawer
 * @param {string} className - Additional CSS classes to apply to the description
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>} props - Additional props for the description
 * @param {React.Ref<ElementRef>} ref - Forwarded ref for the description element
 * @returns {React.JSX.Element} The drawer description component
 */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
