

import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface EmptyStateProps {
  message?: string;
  onAddNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No incidents found", 
  onAddNew 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {FiAlertCircle({})}
      </div>
      <p className="empty-state-text">{message}</p>
      <button className="button button-primary" onClick={onAddNew}>
        Report New Incident
      </button>
    </div>
  );
};

export default EmptyState;
