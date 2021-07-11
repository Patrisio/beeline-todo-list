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