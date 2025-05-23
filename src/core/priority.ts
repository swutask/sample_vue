export interface IExistingPriority { id: number | null; text: string }

export const existingPriorities = [
  { id: 1, text: 'Low priority' },
  { id: 2, text: 'Medium priority' },
  { id: 3, text: 'High priority' },
  { id: 4, text: 'Urgent' },
  { id: null, text: 'Unsorted' }
] as IExistingPriority[]
