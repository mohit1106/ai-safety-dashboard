

import React from 'react';
import { SeverityFilter, SortDirection } from '../types/types';
import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface FilterControlsProps {
  severityFilter: SeverityFilter;
  setSeverityFilter: (filter: SeverityFilter) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  severityFilter,
  setSeverityFilter,
  sortDirection,
  setSortDirection,
  searchTerm,
  setSearchTerm,
}) => {
  const handleFilterChange = (filter: SeverityFilter) => {
    setSeverityFilter(filter);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <div className="controls-container">
      <div className="filter-controls">
        <div className="filter-group">
          <span className="filter-label">Severity:</span>
          <button
            className={`filter-button ${severityFilter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterChange('All')}
          >
            All
          </button>
          <button
            className={`filter-button ${severityFilter === 'Low' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Low')}
          >
            Low
          </button>
          <button
            className={`filter-button ${severityFilter === 'Medium' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Medium')}
          >
            Medium
          </button>
          <button
            className={`filter-button ${severityFilter === 'High' ? 'active' : ''}`}
            onClick={() => handleFilterChange('High')}
          >
            High
          </button>
        </div>

        <button
          className="button button-secondary"
          onClick={toggleSortDirection}
        >
          {sortDirection === 'newest' ? (
            <>
              {FiArrowDown({})} Newest First
            </>
          ) : (
            <>
              {FiArrowUp({})} Oldest First
            </>
          )}
        </button>
      </div>

      <div className="search-box">
        {FiSearch({ className: "search-icon" })}
        <input
          type="text"
          className="search-input"
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;
