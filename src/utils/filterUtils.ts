// src/utils/filterUtils.ts
import { Incident, SeverityFilter, SortDirection } from '../types/types';

export const filterIncidents = (
  incidents: Incident[],
  severityFilter: SeverityFilter,
  sortDirection: SortDirection,
  searchTerm: string
): Incident[] => {
  // Filter by severity
  let filtered = incidents;
  if (severityFilter !== 'All') {
    filtered = filtered.filter(incident => incident.severity === severityFilter);
  }
  
  // Filter by search term
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      incident => 
        incident.title.toLowerCase().includes(term) || 
        incident.description.toLowerCase().includes(term)
    );
  }
  
  // Sort by date
  return [...filtered].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortDirection === 'newest' ? dateB - dateA : dateA - dateB;
  });
};