export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  label: 'work' | 'personal' | 'shopping' | 'health' | 'other';
  dueDate?: Date;
  createdAt: Date;
}

export type TaskLabel = Task['label'];

export interface TaskFilter {
  searchTerm: string;
  labels: TaskLabel[];
  showCompleted: boolean;
}