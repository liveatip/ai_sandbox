"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CustomAccordion, 
  CustomAccordionContent, 
  CustomAccordionItem, 
  CustomAccordionTrigger 
} from "@/components/ui/custom-accordion";

export default function Home() {
  const [pinnedItems, setPinnedItems] = useState<Set<string>>(new Set());
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleClick = () => {
    alert("Hello! This is a popup message from the ghost button!");
  };

  const handlePinToggle = (itemId: string) => {
    setPinnedItems(prev => {
      const newPinned = new Set(prev);
      if (newPinned.has(itemId)) {
        newPinned.delete(itemId);
        // If unpinning and this item is currently open, close it
        if (openItems.includes(itemId)) {
          setOpenItems(prev => prev.filter(id => id !== itemId));
        }
      } else {
        newPinned.add(itemId);
        // If pinning and this item is not open, open it
        if (!openItems.includes(itemId)) {
          setOpenItems(prev => [...prev, itemId]);
        }
      }
      return newPinned;
    });
  };

  const handleValueChange = (value: string[]) => {
    // Find the newly clicked item (the one that's in value but not in openItems)
    const newlyClicked = value.find(id => !openItems.includes(id));
    
    if (newlyClicked) {
      // Keep only pinned items and the newly clicked item
      const pinnedArray = Array.from(pinnedItems);
      setOpenItems([...pinnedArray, newlyClicked]);
    } else {
      // If no new item was clicked, it means we're closing items
      // Keep only pinned items
      setOpenItems(Array.from(pinnedItems));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Custom Accordion Component
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Featuring 4-sided borders, centered titles, and smart pin toggle functionality
          </p>
          <Button variant="ghost" onClick={handleClick}>
            Click me for a popup!
          </Button>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Click the pin icon (left) on any accordion item to keep it open. 
            When you click on a new item, all unpinned items will collapse except the newly clicked one and pinned items.
          </p>
        </div>

        {/* Custom Accordion */}
        <CustomAccordion 
          type="multiple" 
          value={openItems}
          onValueChange={handleValueChange}
          className="w-full"
        >
          <CustomAccordionItem value="item-1">
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-1")}
              onPinToggle={() => handlePinToggle("item-1")}
            >
              What is shadcn/ui?
            </CustomAccordionTrigger>
            <CustomAccordionContent>
              shadcn/ui is a collection of beautifully designed, accessible, and customizable React components built on top of Radix UI and Tailwind CSS. It provides a set of reusable components that you can copy and paste into your apps, giving you full control over the styling and behavior.
            </CustomAccordionContent>
          </CustomAccordionItem>

          <CustomAccordionItem value="item-2">
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-2")}
              onPinToggle={() => handlePinToggle("item-2")}
            >
              How to customize components?
            </CustomAccordionTrigger>
            <CustomAccordionContent>
              You can customize shadcn/ui components by modifying their source code directly. Since the components are copied into your project, you have complete control over their styling, behavior, and functionality. You can also extend them with additional features or create entirely new variants.
            </CustomAccordionContent>
          </CustomAccordionItem>

          <CustomAccordionItem value="item-3">
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-3")}
              onPinToggle={() => handlePinToggle("item-3")}
            >
              Why use Radix UI primitives?
            </CustomAccordionTrigger>
            <CustomAccordionContent>
              Radix UI provides unstyled, accessible UI primitives that handle complex functionality like keyboard navigation, focus management, and ARIA attributes. This allows you to focus on styling and user experience while ensuring your components are accessible to all users.
            </CustomAccordionContent>
          </CustomAccordionItem>

          <CustomAccordionItem value="item-4">
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-4")}
              onPinToggle={() => handlePinToggle("item-4")}
            >
              Benefits of this custom accordion
            </CustomAccordionTrigger>
            <CustomAccordionContent>
              This custom accordion features 4-sided borders around each item, creating a box-like appearance. The titles are perfectly centered, and the component maintains all the accessibility features of the original while providing a unique visual design. The hover effects and smooth animations enhance the user experience. Now with smart pin functionality that keeps important sections open while automatically collapsing others!
            </CustomAccordionContent>
          </CustomAccordionItem>
        </CustomAccordion>
      </div>
    </div>
  );
}
