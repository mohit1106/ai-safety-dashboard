// src/components/IncidentForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface IncidentFormProps {
  onSubmit: (formData: {
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }) => void;
  onCancel: () => void;
  isVisible: boolean;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, onCancel, isVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        title,
        description,
        severity,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setSeverity('Medium');
      setErrors({});
    }
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        height: isVisible ? 'auto' : 0
      }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden', marginTop: isVisible ? '2rem' : 0 }}
    >
      {isVisible && (
        <>
          <div className="form-header">
            <h2 className="form-title">Report New Incident</h2>
            <button 
              className="button button-ghost" 
              onClick={onCancel}
              aria-label="Close form"
            >
              {FiX({ size: 20 })}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-body">
              <div className="form-row">
                <label className="form-label" htmlFor="incident-title">
                  Title
                </label>
                <input
                  id="incident-title"
                  className="form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter incident title"
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="incident-description">
                  Description
                </label>
                <textarea
                  id="incident-description"
                  className="form-control textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed description of the incident"
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
              </div>
              <div className="form-row">
                <label className="form-label">Severity</label>
                <div className="severity-options">
                  <label className="severity-option">
                    <input
                      type="radio"
                      className="radio-input"
                      name="severity"
                      checked={severity === 'Low'}
                      onChange={() => setSeverity('Low')}
                    />
                    <span>Low</span>
                  </label>
                  <label className="severity-option">
                    <input
                      type="radio"
                      className="radio-input"
                      name="severity"
                      checked={severity === 'Medium'}
                      onChange={() => setSeverity('Medium')}
                    />
                    <span>Medium</span>
                  </label>
                  <label className="severity-option">
                    <input
                      type="radio"
                      className="radio-input"
                      name="severity"
                      checked={severity === 'High'}
                      onChange={() => setSeverity('High')}
                    />
                    <span>High</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button
                type="button"
                className="button button-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Submit Incident
              </button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default IncidentForm;