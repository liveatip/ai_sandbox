import { BaseComponent, ComponentConstructor } from './BaseComponent';
import { CounterComponent } from './CounterComponent';
import { ThemeToggleComponent } from './ThemeToggleComponent';
import { ProgressComponent } from './ProgressComponent';
import { ColorPickerComponent } from './ColorPickerComponent';
import { GraphComponent } from './GraphComponent';

// Component registry mapping component names to their constructors
export const componentRegistry: Record<string, ComponentConstructor> = {
  CounterComponent,
  ThemeToggleComponent,
  ProgressComponent,
  ColorPickerComponent,
  GraphComponent
};

// Factory function to create component instances
export function createComponent(componentName: string, props: Record<string, any>): BaseComponent | null {
  const ComponentClass = componentRegistry[componentName];
  if (!ComponentClass) {
    console.error(`Component ${componentName} not found in registry`);
    return null;
  }
  
  return new ComponentClass(props);
}

// Type for the component registry
export type ComponentRegistry = typeof componentRegistry; 