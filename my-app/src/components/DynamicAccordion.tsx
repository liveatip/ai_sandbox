"use client";

import React, { useState, useEffect } from "react";
import { 
  CustomAccordion, 
  CustomAccordionContent, 
  CustomAccordionItem, 
  CustomAccordionTrigger 
} from "@/components/ui/custom-accordion";
import { AccordionConfig, AccordionLayerConfig } from "@/types/accordion-config";
import { createComponent, ComponentRegistry } from "./ComponentRegistry";
import { BaseComponent } from "./BaseComponent";

interface DynamicAccordionProps {
  config: AccordionConfig;
  componentRegistry: ComponentRegistry;
  stateMap: Record<string, any>;
  setStateMap: Record<string, (value: any) => void>;
  onPinToggle?: (itemId: string, shouldExpand?: boolean) => void;
  pinnedItems?: Set<string>;
  openItems?: string[];
  setOpenItems?: (items: string[]) => void;
}

export function DynamicAccordion({
  config,
  componentRegistry,
  stateMap,
  setStateMap,
  onPinToggle,
  pinnedItems = new Set(),
  openItems: externalOpenItems,
  setOpenItems: externalSetOpenItems
}: DynamicAccordionProps) {
  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(config.defaultOpenItems || []);
  
  // Use external state if provided, otherwise use internal state
  const openItems = externalOpenItems || internalOpenItems;
  const setOpenItems = externalSetOpenItems || setInternalOpenItems;

  const handleValueChange = (value: string[]) => {
    // Check if this is an opening action (value has more items than current openItems)
    if (value.length > openItems.length) {
      // Find the newly opened item
      const newlyOpened = value.find(item => !openItems.includes(item));
      
      if (newlyOpened) {
        // Keep only the newly opened item and pinned items
        const itemsToKeep = [newlyOpened, ...Array.from(pinnedItems)];
        setOpenItems(itemsToKeep);
        return;
      }
    }
    
    // If an item was closed, check if it was a pinned item and unpin it
    const closedItem = openItems.find(item => !value.includes(item));
    if (closedItem && pinnedItems.has(closedItem)) {
      // Unpin the item that was manually closed
      onPinToggle?.(closedItem, false);
    }
    
    // Update the state normally
    setOpenItems(value);
  };

  const renderComponent = (layerConfig: AccordionLayerConfig) => {
    // Map component props to actual state values and setters
    const resolvedProps: Record<string, any> = {};
    
    Object.entries(layerConfig.componentProps).forEach(([key, value]) => {
      if (typeof value === 'string') {
        if (value.startsWith('set') && setStateMap[value]) {
          // This is a setter function reference
          resolvedProps[key] = setStateMap[value];
        } else if (stateMap[value] !== undefined) {
          // This is a state value reference
          resolvedProps[key] = stateMap[value];
        } else {
          // This is a direct string value
          resolvedProps[key] = value;
        }
      } else {
        // This is a direct value (number, boolean, etc.)
        resolvedProps[key] = value;
      }
    });

    // Create component instance using factory
    const componentInstance = createComponent(layerConfig.componentName, resolvedProps);
    
    if (!componentInstance) {
      return <div>Component not found: {layerConfig.componentName}</div>;
    }

    // Render the component
    return componentInstance.render();
  };

  const getMergedLayerAttributes = (layerConfig: AccordionLayerConfig) => {
    return {
      maxHeight: layerConfig.maxHeight ?? config.defaultLayer.maxHeight,
      marginLeft: layerConfig.marginLeft ?? config.defaultLayer.marginLeft,
      marginRight: layerConfig.marginRight ?? config.defaultLayer.marginRight,
      bottomMargin: layerConfig.bottomMargin ?? config.defaultLayer.bottomMargin,
      layerVerticalPadding: layerConfig.layerVerticalPadding ?? config.defaultLayer.layerVerticalPadding,
    };
  };

  const getContextForLayer = (layerConfig: AccordionLayerConfig) => {
    // Map props to actual values for context calculation
    const resolvedProps: Record<string, any> = {};
    Object.entries(layerConfig.componentProps).forEach(([key, value]) => {
      if (typeof value === 'string' && stateMap[value] !== undefined) {
        resolvedProps[key] = stateMap[value];
      } else {
        resolvedProps[key] = value;
      }
    });
    
    // Create component instance to get context
    const componentInstance = createComponent(layerConfig.componentName, resolvedProps);
    
    if (componentInstance) {
      return componentInstance.getContext();
    }
    
    return {};
  };

  return (
    <CustomAccordion 
      type="multiple" 
      value={openItems}
      onValueChange={handleValueChange}
      className="w-full"
    >
      {config.layers.map((layer, index) => {
        const mergedAttributes = getMergedLayerAttributes(layer);
        const isLastItem = index === config.layers.length - 1;
        return (
          <CustomAccordionItem 
            key={layer.id}
            value={layer.id}
            maxHeight={mergedAttributes.maxHeight}
            marginLeft={mergedAttributes.marginLeft}
            marginRight={mergedAttributes.marginRight}
            bottomMargin={mergedAttributes.bottomMargin}
            layerVerticalPadding={mergedAttributes.layerVerticalPadding}
            isLastItem={isLastItem}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has(layer.id)}
              onPinToggle={() => {
                const isCurrentlyOpen = openItems.includes(layer.id);
                const isCurrentlyPinned = pinnedItems.has(layer.id);
                
                // If we're pinning an item that's not open, expand it
                if (!isCurrentlyPinned && !isCurrentlyOpen) {
                  onPinToggle?.(layer.id, true);
                } else {
                  onPinToggle?.(layer.id, false);
                }
              }}
            >
              {layer.name}
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight={mergedAttributes.maxHeight}
              marginLeft={mergedAttributes.marginLeft}
              marginRight={mergedAttributes.marginRight}
              bottomMargin={mergedAttributes.bottomMargin}
            >
              {renderComponent(layer)}
            </CustomAccordionContent>
            {!openItems.includes(layer.id) && (
              <ContextDisplay context={getContextForLayer(layer)} />
            )}
          </CustomAccordionItem>
        );
      })}
    </CustomAccordion>
  );
}

// Context Display Component
function ContextDisplay({ context }: { context: { [key: string]: string | number } }) {
  return (
    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
      <div className="flex flex-wrap gap-4 text-sm">
        {Object.entries(context).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="font-medium text-slate-600 dark:text-slate-400">{key}:</span>
            <span className="text-slate-800 dark:text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 