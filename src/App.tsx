

import React, { useState, useEffect } from 'react';
import './App.css';
import { Incident, SeverityFilter, SortDirection } from './types/types';
import { getIncidents, addIncident } from './services/storageService';
import { filterIncidents } from './utils/filterUtils';
import Background3D from './components/Background3D';
import IncidentItem from './components/IncidentItem';
import FilterControls from './components/FilterControls';
import IncidentForm from './components/IncidentForm';
import ToastNotification from './components/ToastNotification';
import EmptyState from './components/EmptyState';
import { FiPlus, FiMoon, FiSun, FiShield } from 'react-icons/fi'; // <-- Correct import

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('All');
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark_mode');
    return savedMode ? savedMode === 'true' : false;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load incidents on initial render
  useEffect(() => {
    const loadIncidents = () => {
      try {
        const loadedIncidents = getIncidents();
        setIncidents(loadedIncidents);
      } catch (error) {
        console.error('Failed to load incidents:', error);
        showToast('Failed to load incidents', 'error');
      } finally {
        // Simulate loading to show animation
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    loadIncidents();
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dark_mode', isDarkMode.toString());
  }, [isDarkMode]);

  const filteredIncidents = filterIncidents(
    incidents,
    severityFilter,
    sortDirection,
    searchTerm
  );

  const handleAddIncident = (formData: {
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }) => {
    try {
      // Create new incident with current date
      const newIncident = addIncident({
        ...formData,
        reported_at: new Date().toISOString(),
      });

      // Update state with the new incident
      setIncidents((prevIncidents) => [...prevIncidents, newIncident]);
      
      // Show success message and hide form
      showToast('Incident reported successfully');
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add incident:', error);
      showToast('Failed to report incident', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="App">
      <Background3D />
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <FiShield /> AI Safety Incident Dashboard
          </h1>
          <button
            className="theme-toggle-button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>

        <FilterControls
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <IncidentForm
          onSubmit={handleAddIncident}
          onCancel={() => setShowForm(false)}
          isVisible={showForm}
        />

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <span className="loader"></span>
          </div>
        ) : filteredIncidents.length > 0 ? (
          <div className="incident-list">
            {filteredIncidents.map((incident) => (
              <IncidentItem key={incident.id} incident={incident} />
            ))}
          </div>
        ) : (
          <EmptyState 
            message={
              searchTerm || severityFilter !== 'All'
                ? "No incidents match your filters"
                : "No incidents reported yet"
            }
            onAddNew={() => setShowForm(true)}
          />
        )}

        <button
          className={`toggle-form-button ${showForm ? 'active' : ''}`}
          onClick={() => setShowForm(!showForm)}
          aria-label="Report new incident"
        >
          <FiPlus size={24} />
        </button>

        <ToastNotification
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </div>
  );
};

export default App;
