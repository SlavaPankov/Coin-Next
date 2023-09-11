import React, { CSSProperties } from 'react';

interface ITextContentProps {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  marginBottom?: string;
  letterSpacing?: string;
}

export function TextContent({
  text,
  fontSize = '16px',
  fontWeight = '400',
  lineHeight = '130%',
  color = '#000',
  marginBottom = '0',
  letterSpacing = '0'
}: ITextContentProps) {
  const style: CSSProperties = {
    color,
    fontSize,
    fontWeight,
    lineHeight,
    marginBottom,
    letterSpacing
  };

  return <div style={style}>{text}</div>;
}
