import React from 'react';
import { Button } from '@/components/ui/button';
import { BaseComponent } from './BaseComponent';

export class ThemeToggleComponent extends BaseComponent {
  render(): React.JSX.Element {
    const isDark = this.getProp<boolean>('isDark', false);
    const setIsDark = this.getSetter<boolean>('setIsDark');
    const isAnimating = this.getProp<boolean>('isAnimating', false);
    const setIsAnimating = this.getSetter<boolean>('setIsAnimating');

    const handleToggle = () => {
      if (setIsDark && setIsAnimating) {
        setIsAnimating(true);
        setIsDark(!isDark);
        
        // Reset animation after 1 second
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Theme Toggle</h3>
          
          {/* Theme Display */}
          <div className="mb-6">
            <div className={`text-4xl mb-2 transition-all duration-500 ${
              isAnimating ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
            }`}>
              {isDark ? '🌙' : '☀️'}
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Current theme: {isDark ? 'Dark' : 'Light'}
            </p>
          </div>

          {/* Toggle Button */}
          <Button 
            onClick={handleToggle}
            variant={isDark ? "secondary" : "default"}
            size="lg"
            className={`w-full max-w-xs transition-all duration-300 ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            disabled={isAnimating}
          >
            {isAnimating ? 'Switching...' : `Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          </Button>

          {/* Status Indicator */}
          <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Status: {isAnimating ? 'Animating' : 'Ready'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  getContext(): { [key: string]: string | number } {
    const isDark = this.getProp<boolean>('isDark', false);
    const isAnimating = this.getProp<boolean>('isAnimating', false);
    return {
      "Theme": isDark ? "Dark" : "Light",
      "Status": isAnimating ? "Animating" : "Ready"
    };
  }
} 