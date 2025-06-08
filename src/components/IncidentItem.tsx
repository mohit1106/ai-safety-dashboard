
// src/components/IncidentItem.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import { Incident } from '../types/types';
import { FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getSeverityClassName = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'severity-low';
      case 'Medium':
        return 'severity-medium';
      case 'High':
        return 'severity-high';
      default:
        return '';
    }
  };

  return (
    <motion.div 
      className="incident-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="incident-header">
        <div>
          <h3 className="incident-title">{incident.title}</h3>
          <div className="incident-meta">
            <span className={`severity-badge ${getSeverityClassName(incident.severity)}`}>
              {incident.severity}
            </span>
            <span className="incident-date" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {FiClock({ size: 16 })}
              {formatDate(incident.reported_at)}
            </span>
          </div>
        </div>
        <div className="incident-actions">
          <button className="toggle-button" onClick={toggleExpanded}>
            {expanded ? (
              <>
                Hide Details {FiChevronUp({ size: 16 })}
              </>
            ) : (
              <>
                View Details {FiChevronDown({ size: 16 })}
              </>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="incident-body expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="incident-description">{incident.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IncidentItem;

