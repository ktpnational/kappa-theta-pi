'use client';

import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

/**
 * A wrapper component that creates a resizable panel group container.
 * @component
 * @param {Object} props - The component properties
 * @param {string} [props.className] - Additional CSS classes to apply to the panel group
 * @param {ResizablePrimitive.PanelGroupProps} props - All properties from react-resizable-panels PanelGroup
 * @returns {JSX.Element} A resizable panel group component that can contain multiple panels
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
);

/**
 * A basic resizable panel component that can be used within a ResizablePanelGroup.
 * Direct export of ResizablePrimitive.Panel for use in resizable layouts.
 * @type {ResizablePrimitive.Panel}
 */
const ResizablePanel = ResizablePrimitive.Panel;

/**
 * A customizable resize handle component that appears between resizable panels.
 * @component
 * @param {Object} props - The component properties
 * @param {boolean} [props.withHandle] - Whether to show a visual grip handle
 * @param {string} [props.className] - Additional CSS classes to apply to the resize handle
 * @param {ResizablePrimitive.PanelResizeHandleProps} props - All properties from react-resizable-panels PanelResizeHandle
 * @returns {JSX.Element} A resize handle component that can be placed between panels
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
