export type Statuses = 'done' | 'inProgress';
export type Priorities = 'usual' | 'important' | 'blockng';

export interface TaskData {
  [key: string]: string,
  name: string,
  description: string,
  priority: Priorities,
  deadline: string,
  status: Statuses,
  dateCompletion: string,
}