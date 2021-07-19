export interface Priority {
  name: 'Обычная' | 'Важная' | 'Очень важная',
  value: 'usual' | 'important' | 'blocking'
}

export const filters = [
  {
    value: 'all',
    label: 'Все',
  },
  {
    value: 'usual',
    label: 'Обычные',
  },
  {
    value: 'important',
    label: 'Важные',
  },
  {
    value: 'blocking',
    label: 'Очень важные',
  },
];

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