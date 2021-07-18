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

export function getPriority(priorityValue: string) {
  return priorities.find((priority) => priority.value === priorityValue)?.name;
}

export function formatTasks(todos: any) {
  const formattedTasks: {[key: string]: string}[] = [];

  for (let id in todos) {
    formattedTasks.push({ id, ...todos[id] });
  }

  return formattedTasks;
}

export function getDateTime(): string {
  return new Date().toJSON().substring(0,16);
}

export function getFormattedDateTime(dateString: string): string {
  const [date, time] = dateString.split('T');
  return `${date} ${time}`;
};

function convertDateToTimestamp(date: string) {
  return Date.parse(date);
}

export function isDeadlineBroken(deadline: string, now: number) {
  const deadlineTimestamp = convertDateToTimestamp(deadline);
  console.log(deadlineTimestamp, 'deadlineTimestamp');
  console.log(now, 'NOW');
  console.log(now > deadlineTimestamp, 'RESULT');
  return now > deadlineTimestamp;
}