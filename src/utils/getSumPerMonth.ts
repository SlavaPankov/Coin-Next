import { ITransaction } from '../types/interfaces/ITransaction';

export function getSumPerMonth(
  monthCount: number,
  transactions: Array<ITransaction>,
  currentAccount: string
): Array<number> {
  const result: Array<number> = [];

  for (let i = 0; i <= monthCount - 1; i++) {
    const sixMonthAgo = new Date();

    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - i);

    const filteredTransaction = transactions.filter((transaction) => {
      const month = new Date(transaction.date);
      return (
        month.getMonth() === sixMonthAgo.getMonth() &&
        month.getFullYear() === sixMonthAgo.getFullYear()
      );
    });

    const sumForMonth = filteredTransaction.reduce(
      (acc, transaction) => (transaction.from !== currentAccount ? acc + transaction.amount : acc),
      0
    );
    result.push(sumForMonth);
  }

  return result.reverse();
}
