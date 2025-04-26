// src/services/storageService.ts
import { Incident } from '../types/types';
import { mockIncidents } from '../data/mockData';

const STORAGE_KEY = 'ai_safety_incidents';

export const getIncidents = (): Incident[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Initialize with mock data if no stored data exists
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockIncidents));
  return mockIncidents;
};

export const saveIncidents = (incidents: Incident[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
};

export const addIncident = (incident: Omit<Incident, 'id'>): Incident => {
  const incidents = getIncidents();
  const maxId = incidents.reduce((max, inc) => Math.max(max, inc.id), 0);
  
  const newIncident: Incident = {
    ...incident,
    id: maxId + 1
  };
  
  const updatedIncidents = [...incidents, newIncident];
  saveIncidents(updatedIncidents);
  
  return newIncident;
};