"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  CustomAccordion, 
  CustomAccordionContent, 
  CustomAccordionItem, 
  CustomAccordionTrigger 
} from "@/components/ui/custom-accordion";
import * as Plot from "@observablehq/plot";

// Dynamic Component 1: Counter with Reset
function CounterComponent({ count, setCount }: { count: number; setCount: (count: number) => void }) {
  const getContext = () => ({
    "Current Count": count,
    "Status": count > 0 ? "Positive" : count < 0 ? "Negative" : "Zero"
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Interactive Counter</h3>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {count}
        </div>
        <div className="flex gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCount(count - 1)}
          >
            Decrease
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCount(count + 1)}
          >
            Increase
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

// Dynamic Component 2: Theme Toggle with Animation
function ThemeToggleComponent({ 
  isDark, 
  setIsDark, 
  isAnimating, 
  setIsAnimating 
}: { 
  isDark: boolean; 
  setIsDark: (isDark: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}) {
  const getContext = () => ({
    "Current Mode": isDark ? "Dark" : "Light",
    "Animation Status": isAnimating ? "Animating" : "Idle"
  });

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsDark(!isDark);
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Theme Toggle</h3>
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Light
          </span>
          <button
            onClick={handleToggle}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
              isDark ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                isDark ? 'translate-x-8' : 'translate-x-1'
              } ${isAnimating ? 'scale-110' : 'scale-100'}`}
            />
          </button>
          <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            Dark
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Current: {isDark ? 'Dark Mode' : 'Light Mode'}
        </p>
      </div>
    </div>
  );
}

// Dynamic Component 3: Progress Bar with Controls
function ProgressComponent({ progress, setProgress }: { progress: number; setProgress: (progress: number) => void }) {
  const getContext = () => ({
    "Progress": `${progress}%`,
    "Status": progress === 100 ? "Complete" : progress > 50 ? "In Progress" : "Getting Started"
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Progress Tracker</h3>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {progress}%
        </div>
        <div className="flex gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            -10%
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            +10%
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setProgress(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

// Dynamic Component 4: Color Picker with Preview
function ColorPickerComponent({ selectedColor, setSelectedColor }: { selectedColor: string; setSelectedColor: (color: string) => void }) {
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  
  const getContext = () => ({
    "Selected Color": selectedColor,
    "Color Name": getColorName(selectedColor)
  });

  const getColorName = (hex: string) => {
    const colorMap: { [key: string]: string } = {
      '#3b82f6': 'Blue',
      '#ef4444': 'Red',
      '#10b981': 'Green',
      '#f59e0b': 'Yellow',
      '#8b5cf6': 'Purple',
      '#ec4899': 'Pink'
    };
    return colorMap[hex] || 'Unknown';
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Color Picker</h3>
        <div 
          className="w-24 h-24 mx-auto rounded-lg border-2 border-slate-200 dark:border-slate-700 mb-4 transition-colors duration-300"
          style={{ backgroundColor: selectedColor }}
        />
        <div className="flex gap-2 justify-center flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color 
                  ? 'border-slate-800 dark:border-slate-200 scale-110' 
                  : 'border-slate-300 dark:border-slate-600 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Selected: {selectedColor}
        </p>
      </div>
    </div>
  );
}

// Dynamic Component 5: Interactive Graph with Plot
function GraphComponent({ 
  dataPoints, 
  setDataPoints, 
  graphType, 
  setGraphType,
  maxHeight,
  bottomMargin = 4
}: { 
  dataPoints: number; 
  setDataPoints: (points: number) => void;
  graphType: string;
  setGraphType: (type: string) => void;
  maxHeight?: string;
  bottomMargin?: number;
}) {
  const graphRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic height for graph container
  const calculateGraphHeight = () => {
    if (!maxHeight) return 800; // Default height if no maxHeight provided
    
    // Parse maxHeight (e.g., "600px" -> 600)
    const maxHeightValue = parseInt(maxHeight.replace('px', ''));
    
    // Reserve space for controls and padding
    const controlsHeight = 120; // Title + controls + margins
    const padding = 32; // Top and bottom padding
    
    // Calculate bottom margin in pixels (bottomMargin * 0.25rem = bottomMargin * 4px)
    const bottomMarginPixels = bottomMargin * 4;
    
    // Calculate available height for graph (subtract bottom margin)
    const availableHeight = maxHeightValue - controlsHeight - padding - bottomMarginPixels;
    
    // Ensure minimum height and return
    return Math.max(availableHeight, 400);
  };

  const graphContainerHeight = calculateGraphHeight();
  
  // Calculate dynamic width for plot (full container width minus padding)
  const calculatePlotWidth = () => {
    // Since we have marginLeft=0 and marginRight=0, the plot should take full width
    // Use a large width to ensure it fills the container
    // The plot will automatically scale to fit the container
    return 800; // Use a large width that will scale down to fit
  };

  const plotWidth = calculatePlotWidth();

  const getContext = () => ({
    "Data Points": dataPoints,
    "Graph Type": graphType,
    "Status": "Rendered"
  });

  useEffect(() => {
    if (graphRef.current) {
      // Clear previous content
      graphRef.current.innerHTML = '';

      // Generate sample data
      const data = Array.from({ length: dataPoints }, (_, i) => ({
        x: i,
        y: Math.sin(i * 0.5) * 10 + Math.random() * 5,
        category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
      }));

            let plotElement;

      // Calculate plot height to be 1.5x the container height to ensure scrolling
      const plotHeight = Math.max(graphContainerHeight * 1.5, 600);
      
      switch (graphType) {
        case 'line':
          plotElement = Plot.plot({
            width: plotWidth,
            height: plotHeight,
            style: {
              background: 'transparent',
              color: '#374151'
            },
            marks: [
              Plot.line(data, { x: "x", y: "y", stroke: "#3b82f6", strokeWidth: 2 }),
              Plot.dot(data, { x: "x", y: "y", fill: "#3b82f6", r: 3 })
            ],
            x: { label: "Index" },
            y: { label: "Value" }
          });
          break;
        case 'scatter':
          plotElement = Plot.plot({
            width: plotWidth,
            height: plotHeight,
            style: {
              background: 'transparent',
              color: '#374151'
            },
            marks: [
              Plot.dot(data, { 
                x: "x", 
                y: "y", 
                fill: "category",
                r: 5,
                title: (d: any) => `Index: ${d.x}, Value: ${d.y.toFixed(2)}`
              })
            ],
            x: { label: "Index" },
            y: { label: "Value" },
            color: { range: ["#3b82f6", "#ef4444", "#10b981"] }
          });
          break;
        case 'bar':
          plotElement = Plot.plot({
            width: plotWidth,
            height: plotHeight,
            style: {
              background: 'transparent',
              color: '#374151'
            },
            marks: [
              Plot.barY(data, { 
                x: "x", 
                y: "y", 
                fill: "#3b82f6",
                title: (d: any) => `Index: ${d.x}, Value: ${d.y.toFixed(2)}`
              })
            ],
            x: { label: "Index" },
            y: { label: "Value" }
          });
          break;
        default:
          plotElement = Plot.plot({
            width: plotWidth,
            height: plotHeight,
            style: {
              background: 'transparent',
              color: '#374151'
            },
            marks: [
              Plot.line(data, { x: "x", y: "y", stroke: "#3b82f6", strokeWidth: 2 })
            ],
            x: { label: "Index" },
            y: { label: "Value" }
          });
      }

      graphRef.current.appendChild(plotElement);
    }
  }, [dataPoints, graphType, graphContainerHeight]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Interactive Graph</h3>
        
        {/* Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Data Points:</label>
            <input
              type="range"
              min="5"
              max="50"
              value={dataPoints}
              onChange={(e) => setDataPoints(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-slate-600">{dataPoints}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Graph Type:</label>
            <select
              value={graphType}
              onChange={(e) => setGraphType(e.target.value)}
              className="px-3 py-1 border border-slate-300 rounded-md text-sm"
            >
              <option value="line">Line Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>
        </div>

        {/* Graph Container with Internal Scroll */}
        <div 
          ref={graphRef}
          className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
          style={{ 
            height: `${graphContainerHeight}px`,
            minHeight: `${graphContainerHeight}px`
          }}
        />
      </div>
    </div>
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

  // Get context for each component
  const getCounterContext = () => ({
    "Current Count": counterValue,
    "Status": counterValue > 0 ? "Positive" : counterValue < 0 ? "Negative" : "Zero"
  });

  const getThemeContext = () => ({
    "Current Mode": themeToggleState ? "Dark" : "Light",
    "Animation Status": themeAnimating ? "Animating" : "Idle"
  });

  const getProgressContext = () => ({
    "Progress": `${progressValue}%`,
    "Status": progressValue === 100 ? "Complete" : progressValue > 50 ? "In Progress" : "Getting Started"
  });

  const getColorContext = () => ({
    "Selected Color": selectedColorValue,
    "Color Name": (() => {
      const colorMap: { [key: string]: string } = {
        '#3b82f6': 'Blue',
        '#ef4444': 'Red',
        '#10b981': 'Green',
        '#f59e0b': 'Yellow',
        '#8b5cf6': 'Purple',
        '#ec4899': 'Pink'
      };
      return colorMap[selectedColorValue] || 'Unknown';
    })()
  });

  const getGraphContext = () => ({
    "Data Points": graphDataPoints,
    "Graph Type": graphType,
    "Status": "Rendered"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Custom Accordion Component
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Featuring 4-sided borders, centered titles, and interactive data visualization
          </p>
          <Button variant="ghost" onClick={handleClick}>
            Click me for a popup!
          </Button>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Click the pin icon (left) on any accordion item to keep it open. 
            Each layer has configurable margins (left, right, bottom) and the graph component uses ObservableHQ Plot for interactive data visualization!
          </p>
        </div>

        {/* Custom Accordion */}
        <CustomAccordion 
          type="multiple" 
          value={openItems}
          onValueChange={handleValueChange}
          className="w-full"
        >
          <CustomAccordionItem 
            value="item-1"
            maxHeight="400px"
            marginLeft={6}
            marginRight={6}
            bottomMargin={6}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-1")}
              onPinToggle={() => handlePinToggle("item-1")}
            >
              Interactive Counter
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight="400px"
              marginLeft={6}
              marginRight={6}
              bottomMargin={6}
            >
              <CounterComponent count={counterValue} setCount={setCounterValue} />
            </CustomAccordionContent>
            {!openItems.includes("item-1") && (
              <ContextDisplay context={getCounterContext()} />
            )}
          </CustomAccordionItem>

          <CustomAccordionItem 
            value="item-2"
            maxHeight="350px"
            marginLeft={4}
            marginRight={4}
            bottomMargin={8}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-2")}
              onPinToggle={() => handlePinToggle("item-2")}
            >
              Theme Toggle
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight="350px"
              marginLeft={4}
              marginRight={4}
              bottomMargin={8}
            >
              <ThemeToggleComponent 
                isDark={themeToggleState} 
                setIsDark={setThemeToggleState}
                isAnimating={themeAnimating}
                setIsAnimating={setThemeAnimating}
              />
            </CustomAccordionContent>
            {!openItems.includes("item-2") && (
              <ContextDisplay context={getThemeContext()} />
            )}
          </CustomAccordionItem>

          <CustomAccordionItem 
            value="item-3"
            maxHeight="300px"
            marginLeft={8}
            marginRight={8}
            bottomMargin={4}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-3")}
              onPinToggle={() => handlePinToggle("item-3")}
            >
              Progress Tracker
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight="300px"
              marginLeft={8}
              marginRight={8}
              bottomMargin={4}
            >
              <ProgressComponent progress={progressValue} setProgress={setProgressValue} />
            </CustomAccordionContent>
            {!openItems.includes("item-3") && (
              <ContextDisplay context={getProgressContext()} />
            )}
          </CustomAccordionItem>

          <CustomAccordionItem 
            value="item-4"
            maxHeight="450px"
            marginLeft={2}
            marginRight={2}
            bottomMargin={10}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-4")}
              onPinToggle={() => handlePinToggle("item-4")}
            >
              Color Picker
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight="450px"
              marginLeft={2}
              marginRight={2}
              bottomMargin={10}
            >
              <ColorPickerComponent selectedColor={selectedColorValue} setSelectedColor={setSelectedColorValue} />
            </CustomAccordionContent>
            {!openItems.includes("item-4") && (
              <ContextDisplay context={getColorContext()} />
            )}
          </CustomAccordionItem>

          <CustomAccordionItem 
            value="item-5"
            maxHeight="600px"
            marginLeft={0}
            marginRight={0}
            bottomMargin={20}
          >
            <CustomAccordionTrigger
              isPinned={pinnedItems.has("item-5")}
              onPinToggle={() => handlePinToggle("item-5")}
            >
              Interactive Graph
            </CustomAccordionTrigger>
            <CustomAccordionContent
              maxHeight="600px"
              marginLeft={0}
              marginRight={0}
              bottomMargin={20}
            >
              <GraphComponent 
                dataPoints={graphDataPoints} 
                setDataPoints={setGraphDataPoints}
                graphType={graphType}
                setGraphType={setGraphType}
                maxHeight="600px"
                bottomMargin={20}
              />
            </CustomAccordionContent>
            {!openItems.includes("item-5") && (
              <ContextDisplay context={getGraphContext()} />
            )}
          </CustomAccordionItem>
        </CustomAccordion>
      </div>
    </div>
  );
}
