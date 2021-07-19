import { priorities } from './constants';

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

export function checkDeadlineBroken(deadline: string, now: number) {
  const deadlineTimestamp = convertDateToTimestamp(deadline);
  return now > deadlineTimestamp;
}