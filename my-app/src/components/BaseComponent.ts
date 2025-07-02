import React from 'react';

// Abstract base class for all accordion components
export abstract class BaseComponent {
  protected props: Record<string, any>;

  constructor(props: Record<string, any>) {
    this.props = props;
  }

  // Abstract method that must be implemented by subclasses
  abstract render(): React.JSX.Element;

  // Method to get context information for collapsed state
  getContext(): { [key: string]: string | number } {
    return {};
  }

  // Helper method to get a prop value
  protected getProp<T>(key: string, defaultValue?: T): T {
    return this.props[key] ?? defaultValue;
  }

  // Helper method to get a setter function
  protected getSetter<T>(key: string): ((value: T) => void) | undefined {
    return this.props[key];
  }
}

// Type for component constructors
export type ComponentConstructor = new (props: Record<string, any>) => BaseComponent; 