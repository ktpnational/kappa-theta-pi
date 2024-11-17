import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Base menu component from Radix UI's Menubar.Menu.
 * Provides the container for a single menu in the menubar.
 * @see https://www.radix-ui.com/primitives/docs/components/menubar#menu
 */
const MenubarMenu = MenubarPrimitive.Menu;

/**
 * Groups menu items together for organizational purposes.
 * Useful for creating logical sections within a menu.
 * @see https://www.radix-ui.com/primitives/docs/components/menubar#group
 */
const MenubarGroup = MenubarPrimitive.Group;

/**
 * Creates a portal for rendering menu content outside of its parent DOM hierarchy.
 * Ensures proper layering and positioning of menus.
 * @see https://www.radix-ui.com/primitives/docs/components/menubar#portal
 */
const MenubarPortal = MenubarPrimitive.Portal;

/**
 * Creates a submenu within the menubar.
 * Enables nested menu structures for complex menu hierarchies.
 * @see https://www.radix-ui.com/primitives/docs/components/menubar#sub
 */
const MenubarSub = MenubarPrimitive.Sub;

/**
 * Groups radio menu items together to create a single-select menu group.
 * Ensures only one item in the group can be selected at a time.
 * @see https://www.radix-ui.com/primitives/docs/components/menubar#radiogroup
 */
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

/**
 * Root menubar component that contains the entire menu structure.
 * Provides the main container and styling for the menubar.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply to the menubar
 * @param {React.RefObject} ref - React ref forwarded to the root element
 * @param {Object} props - Additional props to spread to the root element
 * @returns {JSX.Element} Rendered menubar component
 * 
 * @example
 * ```tsx
 * <Menubar className="my-menubar">
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>...</MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-10 items-center space-x-1 rounded-md border bg-background p-1',
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

/**
 * Trigger button that opens a menu when clicked.
 * Provides user interaction point for expanding menus.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.RefObject} ref - React ref forwarded to the trigger element
 * @param {Object} props - Additional props to spread to the trigger element
 * @returns {JSX.Element} Rendered menu trigger button
 * 
 * @example
 * ```tsx
 * <MenubarTrigger className="custom-trigger">File</MenubarTrigger>
 * ```
 */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

/**
 * Trigger for opening a submenu within a menubar item.
 * Enables nested menu structures with visual indicators.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Whether to inset the trigger padding
 * @param {React.ReactNode} children - Content to render inside the trigger
 * @param {React.RefObject} ref - React ref forwarded to the subtrigger element
 * @param {Object} props - Additional props to spread to the subtrigger element
 * @returns {JSX.Element} Rendered submenu trigger
 * 
 * @example
 * ```tsx
 * <MenubarSubTrigger inset>More Options</MenubarSubTrigger>
 * ```
 */
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

/**
 * Content container for submenus within a menubar.
 * Handles positioning and styling of nested menu content.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.RefObject} ref - React ref forwarded to the subcontent element
 * @param {Object} props - Additional props to spread to the subcontent element
 * @returns {JSX.Element} Rendered submenu content container
 */
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

/**
 * Main content container for a menu in the menubar.
 * Handles positioning and animation of top-level menu content.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {string} [align='start'] - Alignment relative to trigger ('start' | 'center' | 'end')
 * @param {number} [alignOffset=-4] - Offset from alignment position in pixels
 * @param {number} [sideOffset=8] - Offset from side in pixels
 * @param {React.RefObject} ref - React ref forwarded to the content element
 * @param {Object} props - Additional props to spread to the content element
 * @returns {JSX.Element} Rendered menu content container
 */
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

/**
 * Individual menu item component within a menubar.
 * Represents a clickable option in the menu.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Whether to inset the item padding
 * @param {React.RefObject} ref - React ref forwarded to the item element
 * @param {Object} props - Additional props to spread to the item element
 * @returns {JSX.Element} Rendered menu item
 * 
 * @example
 * ```tsx
 * <MenubarItem onSelect={() => console.log('Selected')}>
 *   Menu Option
 * </MenubarItem>
 * ```
 */
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

/**
 * Checkbox menu item component with selectable state.
 * Provides a toggleable menu option with visual indicator.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to render inside the item
 * @param {boolean} [checked] - Whether the checkbox is checked
 * @param {React.RefObject} ref - React ref forwarded to the checkbox item element
 * @param {Object} props - Additional props to spread to the checkbox item element
 * @returns {JSX.Element} Rendered checkbox menu item
 * 
 * @example
 * ```tsx
 * <MenubarCheckboxItem checked={isEnabled} onCheckedChange={setIsEnabled}>
 *   Enable Feature
 * </MenubarCheckboxItem>
 * ```
 */
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

/**
 * Radio menu item component for selecting one of multiple options.
 * Part of a radio group where only one item can be selected.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to render inside the item
 * @param {React.RefObject} ref - React ref forwarded to the radio item element
 * @param {Object} props - Additional props to spread to the radio item element
 * @returns {JSX.Element} Rendered radio menu item
 * 
 * @example
 * ```tsx
 * <MenubarRadioGroup value={selected} onValueChange={setSelected}>
 *   <MenubarRadioItem value="option1">Option 1</MenubarRadioItem>
 *   <MenubarRadioItem value="option2">Option 2</MenubarRadioItem>
 * </MenubarRadioGroup>
 * ```
 */
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

/**
 * Label component for menu sections.
 * Provides a non-interactive text label for grouping menu items.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Whether to inset the label padding
 * @param {React.RefObject} ref - React ref forwarded to the label element
 * @param {Object} props - Additional props to spread to the label element
 * @returns {JSX.Element} Rendered menu label
 * 
 * @example
 * ```tsx
 * <MenubarLabel inset>Section Title</MenubarLabel>
 * ```
 */
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

/**
 * Visual separator between menu items.
 * Creates a horizontal line to separate groups of menu items.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.RefObject} ref - React ref forwarded to the separator element
 * @param {Object} props - Additional props to spread to the separator element
 * @returns {JSX.Element} Rendered menu separator
 * 
 * @example
 * ```tsx
 * <MenubarItem>First Item</MenubarItem>
 * <MenubarSeparator />
 * <MenubarItem>Second Item</MenubarItem>
 * ```
 */
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

/**
 * Component for displaying keyboard shortcuts in menu items.
 * Shows keyboard combination hints next to menu items.
 * 
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {Object} props - Additional props to spread to the span element
 * @returns {JSX.Element} Rendered keyboard shortcut indicator
 * 
 * @example
 * ```tsx
 * <MenubarItem>
 *   Save File
 *   <MenubarShortcut>⌘S</MenubarShortcut>
 * </MenubarItem>
 * ```
 */
const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
MenubarShortcut.displayname = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
