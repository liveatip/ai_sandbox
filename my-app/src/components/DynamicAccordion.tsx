"use client";

import React, { useState, useEffect } from "react";
import { 
  CustomAccordion, 
  CustomAccordionContent, 
  CustomAccordionItem, 
  CustomAccordionTrigger 
} from "@/components/ui/custom-accordion";
import { AccordionConfig, AccordionLayerConfig, ComponentRegistry } from "@/types/accordion-config";

interface DynamicAccordionProps {
  config: AccordionConfig;
  componentRegistry: ComponentRegistry;
  stateMap: Record<string, any>;
  setStateMap: Record<string, (value: any) => void>;
  onPinToggle?: (itemId: string) => void;
  pinnedItems?: Set<string>;
}

export function DynamicAccordion({
  config,
  componentRegistry,
  stateMap,
  setStateMap,
  onPinToggle,
  pinnedItems = new Set()
}: DynamicAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(config.defaultOpenItems || []);

  const handleValueChange = (value: string[]) => {
    // If an item was just opened (added to the array)
    const newlyOpened = value.find(item => !openItems.includes(item));
    
    if (newlyOpened) {
      // Keep only the newly opened item and pinned items
      const itemsToKeep = [newlyOpened, ...Array.from(pinnedItems)];
      setOpenItems(itemsToKeep);
    } else {
      // If an item was closed, just update the state normally
      setOpenItems(value);
    }
  };

  const renderComponent = (layerConfig: AccordionLayerConfig) => {
    const Component = componentRegistry[layerConfig.componentName];
    
    if (!Component) {
      console.error(`Component ${layerConfig.componentName} not found in registry`);
      return <div>Component not found: {layerConfig.componentName}</div>;
    }

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

    return <Component {...resolvedProps} />;
  };

  const getMergedLayerAttributes = (layerConfig: AccordionLayerConfig) => {
    return {
      maxHeight: layerConfig.maxHeight ?? config.defaultLayer.maxHeight,
      marginLeft: layerConfig.marginLeft ?? config.defaultLayer.marginLeft,
      marginRight: layerConfig.marginRight ?? config.defaultLayer.marginRight,
      bottomMargin: layerConfig.bottomMargin ?? config.defaultLayer.bottomMargin,
    };
  };

  const getContextForLayer = (layerConfig: AccordionLayerConfig) => {
    const Component = componentRegistry[layerConfig.componentName];
    if (Component && typeof Component.getContext === 'function') {
      // Map props to actual values for context calculation
      const resolvedProps: Record<string, any> = {};
      Object.entries(layerConfig.componentProps).forEach(([key, value]) => {
        if (typeof value === 'string' && stateMap[value] !== undefined) {
          resolvedProps[key] = stateMap[value];
        } else {
          resolvedProps[key] = value;
        }
      });
      
      return Component.getContext(resolvedProps);
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
      {config.layers.map((layer) => {
        const mergedAttributes = getMergedLayerAttributes(layer);
        return (
          <CustomAccordionItem 
            key={layer.id}
            value={layer.id}
            maxHeight={mergedAttributes.maxHeight}
            marginLeft={mergedAttributes.marginLeft}
            marginRight={mergedAttributes.marginRight}
            bottomMargin={mergedAttributes.bottomMargin}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has(layer.id)}
              onPinToggle={() => onPinToggle?.(layer.id)}
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