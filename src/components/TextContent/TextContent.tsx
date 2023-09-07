import React, { CSSProperties } from 'react';

interface ITextContentProps {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  marginBottom?: string;
}

export function TextContent({
  text,
  fontSize = '16px',
  fontWeight = '400',
  lineHeight = '130%',
  color = '#000',
  marginBottom = '0'
}: ITextContentProps) {
  const style: CSSProperties = {
    color,
    fontSize,
    fontWeight,
    lineHeight,
    marginBottom
  };

  return <div style={style}>{text}</div>;
}
