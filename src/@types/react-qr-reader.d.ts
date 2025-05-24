declare module 'react-qr-reader' {
  import * as React from 'react';

  export interface QrReaderProps {
    delay?: number | false;
    onError?: (error: any) => void;
    onScan?: (data: string | null) => void;
    style?: React.CSSProperties;
    constraints?: MediaStreamConstraints;
    onResult?: (result: any, error: any) => void;
  }

  export class QrReader extends React.Component<QrReaderProps> {}
}
