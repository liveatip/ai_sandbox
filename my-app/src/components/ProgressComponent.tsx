import React from 'react';
import { Button } from '@/components/ui/button';
import { BaseComponent } from './BaseComponent';

export class ProgressComponent extends BaseComponent {
  render(): React.JSX.Element {
    const progress = this.getProp<number>('progress', 0);
    const setProgress = this.getSetter<number>('setProgress');

    const handleIncrement = () => {
      if (setProgress) {
        setProgress(Math.min(100, progress + 10));
      }
    };

    const handleDecrement = () => {
      if (setProgress) {
        setProgress(Math.max(0, progress - 10));
      }
    };

    const handleReset = () => {
      if (setProgress) {
        setProgress(0);
      }
    };

    const handleRandom = () => {
      if (setProgress) {
        setProgress(Math.floor(Math.random() * 101));
      }
    };

    const getProgressColor = () => {
      if (progress < 30) return 'bg-red-500';
      if (progress < 70) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    const getProgressText = () => {
      if (progress < 30) return 'Low Progress';
      if (progress < 70) return 'Medium Progress';
      return 'High Progress';
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Progress Tracker</h3>
          
          {/* Progress Display */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {progress}%
            </div>
            <p className={`text-sm font-medium ${progress < 30 ? 'text-red-600' : progress < 70 ? 'text-yellow-600' : 'text-green-600'}`}>
              {getProgressText()}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button 
              onClick={handleDecrement}
              variant="outline"
              size="sm"
              disabled={progress <= 0}
            >
              -10%
            </Button>
            <Button 
              onClick={handleIncrement}
              variant="outline"
              size="sm"
              disabled={progress >= 100}
            >
              +10%
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleReset}
              variant="secondary"
              size="sm"
            >
              Reset
            </Button>
            <Button 
              onClick={handleRandom}
              variant="outline"
              size="sm"
            >
              Random
            </Button>
          </div>
        </div>
      </div>
    );
  }

  getContext(): { [key: string]: string | number } {
    const progress = this.getProp<number>('progress', 0);
    return {
      "Progress": `${progress}%`,
      "Status": progress < 30 ? "Low" : progress < 70 ? "Medium" : "High"
    };
  }
} 