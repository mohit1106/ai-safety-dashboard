// src/data/mockData.ts
import { Incident } from '../types/types';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in product recommendations, showing significant preference based on user location and demographic data. This led to reduced visibility of products for specific user groups.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information during an emergency response simulation. The model confidently stated incorrect evacuation routes that would have led to dangerous situations in a real emergency.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata during conversation. The leaked information included session timestamps and generic user preferences but no personal identifiable information.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Unfiltered Content Generation",
    description: "AI content generation system produced inappropriate images when given ambiguous prompts. The system failed to apply content filters effectively when prompts contained certain combinations of otherwise benign words.",
    severity: "Medium",
    reported_at: "2025-03-25T11:45:00Z"
  },
  {
    id: 5,
    title: "AI Decision System Downtime",
    description: "Critical AI decision system experienced unexpected downtime for 45 minutes. The system was responsible for resource allocation in a medium-priority application, requiring manual intervention during the outage.",
    severity: "Medium",
    reported_at: "2025-03-10T16:20:00Z"
  }
];