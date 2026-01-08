import React from 'react';

interface MetadataItemProps {
  title: string;
  value: string;
  showTopBorder?: boolean;
}

export function MetadataItem({ title, value, showTopBorder = false }: MetadataItemProps) {
  return (
    <div className={`${showTopBorder ? 'border-t' : ''} border-gray-200 pt-4`}>
      <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
      <p className="text-base text-gray-900">{value}</p>
    </div>
  );
}