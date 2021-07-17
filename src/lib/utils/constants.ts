export interface Priority {
  name: 'Обычная' | 'Важная' | 'Очень важная',
  value: 'usual' | 'important' | 'blocking'
}

export const priorities: Priority[] = [
  {
    name: 'Обычная',
    value: 'usual',
  },
  {
    name: 'Важная',
    value: 'important',
  },
  {
    name: 'Очень важная',
    value: 'blocking',
  },
];

export const statuses = [
  {
    name: 'В работе',
    value: 'inProgress',
  },
  {
    name: 'Выполнена',
    value: 'done',
  },
];

export function getPriority(priorityValue: string) {
  return priorities.find((priority) => priority.value === priorityValue)?.name;
}