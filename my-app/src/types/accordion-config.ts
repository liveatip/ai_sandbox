// Accordion Configuration Types

export interface DefaultLayerConfig {
  maxHeight: string;
  marginLeft: number;
  marginRight: number;
  bottomMargin: number;
}

export interface AccordionLayerConfig {
  id: string;
  name: string;
  componentName: string;
  componentProps: Record<string, any>;
  maxHeight?: string;
  marginLeft?: number;
  marginRight?: number;
  bottomMargin?: number;
  isPinned?: boolean;
}

export interface AccordionConfig {
  defaultLayer: DefaultLayerConfig;
  layers: AccordionLayerConfig[];
  defaultOpenItems?: string[];
  pinnedItems?: string[];
}

// Interface for components that can provide context
export interface ContextProvider {
  getContext: (props: Record<string, any>) => { [key: string]: string | number };
}

// Component registry type for dynamic component loading
export type ComponentRegistry = {
  [key: string]: React.ComponentType<any> & Partial<ContextProvider>;
}; 