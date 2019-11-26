import React from 'react';
import { FaEye } from 'react-icons/fa';

import ToolbarButton from '../../../../common/components/ToolbarButton';

export default function PreviewButton ({ active, onPreviewClick }) {
  return (
    <ToolbarButton active={active} icon={FaEye} onClick={onPreviewClick} />
  );
}
