import {
  startOfWeek as startOfWeekDefault,
  endOfWeek as endOfWeekDefault,
} from 'date-fns';

const defaults = { weekStartsOn: 1 };

export function startOfWeek(date) {
  return startOfWeekDefault(date, defaults);
}

export function endOfWeek(date) {
  return endOfWeekDefault(date, defaults);
}
