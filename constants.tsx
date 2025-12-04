import React from 'react';
import InsightIcon from './components/icons/InsightIcon';
import ReasonIcon from './components/icons/ReasonIcon';
import ActionIcon from './components/icons/ActionIcon';
import CostIcon from './components/icons/CostIcon';
import WarningIcon from './components/icons/WarningIcon';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
export const INSIGHT_CONFIG: { [key: string]: { icon: React.ReactElement; color: string; title: string } } = {
  INSIGHT: {
    icon: <InsightIcon />,
    color: 'border-blue-500',
    title: 'Data Insight',
  },
  REASON: {
    icon: <ReasonIcon />,
    color: 'border-purple-500',
    title: 'Why It Matters',
  },
  ACTION: {
    icon: <ActionIcon />,
    color: 'border-green-500',
    title: 'Step-by-step Action',
  },
  COST: {
    icon: <CostIcon />,
    color: 'border-yellow-500',
    title: 'Cost Estimate (KES)',
  },
  WARNING: {
    icon: <WarningIcon />,
    color: 'border-red-500',
    title: 'Warning',
  },
};
