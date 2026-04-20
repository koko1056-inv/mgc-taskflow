export type TaskStatus = 'todo' | 'in_progress' | 'paused' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  category: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string | null;
  notes: string;
  repeat?: 'none' | 'daily' | 'weekly';
}
