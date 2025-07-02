"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DynamicAccordion } from "@/components/DynamicAccordion";
import { componentRegistry } from "@/components/ComponentRegistry";
import accordionConfig from "@/config/accordion-config.json";

export default function Home() {
  // Accordion state
  const [pinnedItems, setPinnedItems] = useState<Set<string>>(new Set());
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Component states - lifted up to parent
  const [counterValue, setCounterValue] = useState(0);
  const [themeToggleState, setThemeToggleState] = useState(false);
  const [themeAnimating, setThemeAnimating] = useState(false);
  const [progressValue, setProgressValue] = useState(45);
  const [selectedColorValue, setSelectedColorValue] = useState('#3b82f6');
  const [graphDataPoints, setGraphDataPoints] = useState(20);
  const [graphType, setGraphType] = useState('line');

  const handleClick = () => {
    alert("Hello! This is a popup message from the ghost button!");
  };

  const handlePinToggle = (itemId: string, shouldExpand?: boolean) => {
    setPinnedItems(prev => {
      const newPinned = new Set(prev);
      if (newPinned.has(itemId)) {
        newPinned.delete(itemId);
      } else {
        newPinned.add(itemId);
      }
      return newPinned;
    });

    // If we should expand the item and it's not already open, open it
    if (shouldExpand && !openItems.includes(itemId)) {
      setOpenItems(prev => [...prev, itemId]);
    }
  };

  // State maps for dynamic binding
  const stateMap = {
    counterValue,
    themeToggleState,
    themeAnimating,
    progressValue,
    selectedColorValue,
    graphDataPoints,
    graphType
  };

  const setStateMap = {
    setCounterValue,
    setThemeToggleState,
    setThemeAnimating,
    setProgressValue,
    setSelectedColorValue,
    setGraphDataPoints,
    setGraphType
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dynamic Accordion Component
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Fully configurable via JSON with OOP class-based components, 4-sided borders, centered titles, and interactive data visualization
          </p>
          <Button variant="ghost" onClick={handleClick}>
            Click me for a popup!
          </Button>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> This accordion now uses Object-Oriented Programming with class-based components! 
            Each component extends a common BaseComponent interface with constructor, render, and getContext methods.
            Click the pin icon (left) on any accordion item to keep it open. 
            Each layer has configurable margins (left, right, bottom) and the graph component uses ObservableHQ Plot for interactive data visualization!
          </p>
        </div>

        {/* Dynamic Accordion */}
        <DynamicAccordion
          config={accordionConfig}
          componentRegistry={componentRegistry}
          stateMap={stateMap}
          setStateMap={setStateMap}
          onPinToggle={handlePinToggle}
          pinnedItems={pinnedItems}
          openItems={openItems}
          setOpenItems={setOpenItems}
        />
      </div>
    </div>
  );
} 