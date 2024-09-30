declare module 'qrcode.react' {
  import { Component } from 'react';

  export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    renderAs?: 'canvas' | 'svg';
  }

  export default class QRCodeCanvas extends Component<QRCodeProps> {}
}
