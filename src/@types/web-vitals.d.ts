declare module 'web-vitals' {
    export const getCLS: (onPerfEntry?: (metric: any) => void) => void;
    export const getFID: (onPerfEntry?: (metric: any) => void) => void;
    export const getFCP: (onPerfEntry?: (metric: any) => void) => void;
    export const getLCP: (onPerfEntry?: (metric: any) => void) => void;
    export const getTTFB: (onPerfEntry?: (metric: any) => void) => void;
  }
  