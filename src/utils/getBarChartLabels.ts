import { MONTHS } from '../cfg/vars';

export function getLabels({
  count,
  months = MONTHS
}: {
  count: number;
  months?: Array<string>;
}): Array<string> {
  const labels: Array<string> = [];
  const currentMonth = new Date().getMonth();

  for (let i = currentMonth; i >= currentMonth - count - 1; i--) {
    if (i < 0) {
      i = months.length - 1;
    }

    labels.push(months[i]);

    if (labels.length > count - 1) {
      break;
    }
  }

  return labels.reverse();
}
