import React from 'react';
import * as Plot from "@observablehq/plot";
import { BaseComponent } from './BaseComponent';

// Functional component wrapper for the graph
function GraphRenderer({ 
  dataPoints, 
  graphType, 
  maxHeight, 
  bottomMargin, 
  plotHeight,
  graphRef 
}: { 
  dataPoints: number; 
  graphType: string; 
  maxHeight: string; 
  bottomMargin: number; 
  plotHeight: number;
  graphRef: React.RefObject<HTMLDivElement | null>;
}) {
  React.useEffect(() => {
    if (graphRef.current) {
      // Clear previous plot
      graphRef.current.innerHTML = '';
      
      // Calculate plot width
      const plotWidth = graphRef.current.clientWidth - 32; // Account for padding
      
      // Generate data based on dataPoints
      const data = Array.from({ length: dataPoints }, (_, i) => ({
        x: i,
        y: Math.sin(i * 0.5) * 50 + Math.random() * 20
      }));
      
      let plotElement: HTMLElement | SVGSVGElement;
      
      switch (graphType) {
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
                fill: "#3b82f6",
                r: 4,
                title: (d: any) => `Index: ${d.x}, Value: ${d.y.toFixed(2)}`
              })
            ],
            x: { label: "Index" },
            y: { label: "Value" }
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
  }, [dataPoints, graphType, maxHeight, bottomMargin, plotHeight, graphRef]);

  return null; // This component only handles the effect, doesn't render anything
}

export class GraphComponent extends BaseComponent {
  private graphRef = React.createRef<HTMLDivElement>();

  render(): React.JSX.Element {
    const dataPoints = this.getProp<number>('dataPoints', 20);
    const setDataPoints = this.getSetter<number>('setDataPoints');
    const graphType = this.getProp<string>('graphType', 'line');
    const setGraphType = this.getSetter<string>('setGraphType');
    const maxHeight = this.getProp<string>('maxHeight', '600px');
    const bottomMargin = this.getProp<number>('bottomMargin', 4);

    // Calculate container height based on maxHeight
    const maxHeightNum = parseInt(maxHeight);
    // Account for layer padding: top (1rem = 16px) + bottom (bottomMargin * 0.25rem)
    const layerPadding = 16 + (bottomMargin * 0.25);
    const availableHeight = maxHeightNum - layerPadding;
    const graphContainerHeight = Math.max(200, availableHeight); // Minimum 200px height
    const plotHeight = graphContainerHeight + 200; // Plot is taller than container to enable scrolling

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
                onChange={(e) => setDataPoints?.(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-slate-600">{dataPoints}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Graph Type:</label>
              <select
                value={graphType}
                onChange={(e) => setGraphType?.(e.target.value)}
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
            ref={this.graphRef}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
            style={{ 
              height: `${graphContainerHeight}px`,
              minHeight: `${graphContainerHeight}px`
            }}
          />
          
          {/* Graph Renderer Component */}
          <GraphRenderer
            dataPoints={dataPoints}
            graphType={graphType}
            maxHeight={maxHeight}
            bottomMargin={bottomMargin}
            plotHeight={plotHeight}
            graphRef={this.graphRef}
          />
        </div>
      </div>
    );
  }

  getContext(): { [key: string]: string | number } {
    const dataPoints = this.getProp<number>('dataPoints', 20);
    const graphType = this.getProp<string>('graphType', 'line');
    return {
      "Data Points": dataPoints,
      "Graph Type": graphType,
      "Status": "Rendered"
    };
  }
} 