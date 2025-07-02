import React from 'react';
import { Button } from '@/components/ui/button';
import { BaseComponent } from './BaseComponent';

export class ColorPickerComponent extends BaseComponent {
  render(): React.JSX.Element {
    const selectedColor = this.getProp<string>('selectedColor', '#3b82f6');
    const setSelectedColor = this.getSetter<string>('setSelectedColor');

    const predefinedColors = [
      '#3b82f6', // Blue
      '#ef4444', // Red
      '#10b981', // Green
      '#f59e0b', // Yellow
      '#8b5cf6', // Purple
      '#f97316', // Orange
      '#06b6d4', // Cyan
      '#ec4899', // Pink
      '#84cc16', // Lime
      '#6b7280', // Gray
    ];

    const getColorName = (hex: string) => {
      const colorMap: { [key: string]: string } = {
        '#3b82f6': 'Blue',
        '#ef4444': 'Red',
        '#10b981': 'Green',
        '#f59e0b': 'Yellow',
        '#8b5cf6': 'Purple',
        '#f97316': 'Orange',
        '#06b6d4': 'Cyan',
        '#ec4899': 'Pink',
        '#84cc16': 'Lime',
        '#6b7280': 'Gray',
      };
      return colorMap[hex] || 'Custom';
    };

    const handleColorSelect = (color: string) => {
      if (setSelectedColor) {
        setSelectedColor(color);
      }
    };

    const handleRandomColor = () => {
      if (setSelectedColor) {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setSelectedColor(randomColor);
      }
    };

    return (
      <div className="space-y-4 pb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Color Picker</h3>
          
          {/* Color Display */}
          <div className="mb-4">
            <div 
              className="w-20 h-20 mx-auto rounded-lg border-4 border-slate-200 dark:border-slate-700 mb-2 shadow-lg"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {getColorName(selectedColor)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-mono">
              {selectedColor}
            </div>
          </div>

          {/* Predefined Colors */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Predefined Colors
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                    selectedColor === color 
                      ? 'border-slate-900 dark:border-slate-100 shadow-lg' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  style={{ backgroundColor: color }}
                  title={getColorName(color)}
                />
              ))}
            </div>
          </div>

          {/* Custom Color Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Custom Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-10 h-8 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="flex-1 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-mono"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleRandomColor}
              variant="outline"
              size="sm"
              className="text-xs py-1"
            >
              Random Color
            </Button>
            <Button 
              onClick={() => handleColorSelect('#3b82f6')}
              variant="secondary"
              size="sm"
              className="text-xs py-1"
            >
              Reset to Blue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  getContext(): { [key: string]: string | number } {
    const selectedColor = this.getProp<string>('selectedColor', '#3b82f6');
    
    const getColorName = (hex: string) => {
      const colorMap: { [key: string]: string } = {
        '#3b82f6': 'Blue',
        '#ef4444': 'Red',
        '#10b981': 'Green',
        '#f59e0b': 'Yellow',
        '#8b5cf6': 'Purple',
        '#f97316': 'Orange',
        '#06b6d4': 'Cyan',
        '#ec4899': 'Pink',
        '#84cc16': 'Lime',
        '#6b7280': 'Gray',
      };
      return colorMap[hex] || 'Custom';
    };

    return {
      "Color": getColorName(selectedColor),
      "Hex": selectedColor
    };
  }
} 