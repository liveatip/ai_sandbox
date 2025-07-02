import React from 'react';
import { Button } from '@/components/ui/button';
import { BaseComponent } from './BaseComponent';

export class CounterComponent extends BaseComponent {
  render(): React.JSX.Element {
    const count = this.getProp<number>('count', 0);
    const setCount = this.getSetter<number>('setCount');

    const handleIncrement = () => {
      if (setCount) {
        setCount(count + 1);
      }
    };

    const handleDecrement = () => {
      if (setCount) {
        setCount(count - 1);
      }
    };

    const handleReset = () => {
      if (setCount) {
        setCount(0);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Interactive Counter</h3>
          
          {/* Counter Display */}
          <div className="mb-6">
            <div className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {count}
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Current count value
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mb-6">
            <Button 
              onClick={handleDecrement}
              variant="outline"
              size="lg"
              className="w-16 h-16 text-2xl"
            >
              -
            </Button>
            <Button 
              onClick={handleIncrement}
              variant="outline"
              size="lg"
              className="w-16 h-16 text-2xl"
            >
              +
            </Button>
          </div>

          {/* Reset Button */}
          <Button 
            onClick={handleReset}
            variant="secondary"
            className="w-full max-w-xs"
          >
            Reset Counter
          </Button>
        </div>
      </div>
    );
  }

  getContext(): { [key: string]: string | number } {
    const count = this.getProp<number>('count', 0);
    return {
      "Count": count,
      "Status": count > 0 ? "Active" : "Reset"
    };
  }
} 