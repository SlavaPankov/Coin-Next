'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './accountPageContainer.module.scss';
import { useAccountData } from '../../hooks/useAccountData';
import { AccountHead } from './AccountHead';
import { TransferForm } from './TransferForm';
import { BarChart } from '../BarChart';
import { getLabels } from '../../utils/getBarChartLabels';
import { getSumPerMonth } from '../../utils/getSumPerMonth';
import { ChartData, ChartOptions } from 'chart.js';
import { TransactionsHistory } from '../TransactionsHistory';
import { ITransaction } from '../../types/interfaces/ITransaction';
import { useRouter } from 'next/navigation';
import { ERoutes } from '../../types/enums/ERoutes';

interface IAccountPageContentProps {
  id: string;
}

export function AccountPageContent({ id }: IAccountPageContentProps) {
  const { account } = useAccountData(id);
  const router = useRouter();
  const [lastTransactions, setLastTransactions] = useState<Array<ITransaction>>([]);

  const barChartData = (): ChartData<'bar'> => {
    return {
      labels: getLabels({ count: 6 }),
      datasets: [
        {
          label: '',
          data: getSumPerMonth(6, account.transactions, account.account),
          backgroundColor: ['rgba(17, 106, 204, 1)']
        }
      ]
    };
  };

  const barChartOptions = (): ChartOptions<'bar'> => ({
    scales: {
      x: {
        grid: {
          lineWidth: 0
        }
      },
      y: {
        position: 'right',
        min: 0,
        max: Math.max(...getSumPerMonth(6, account.transactions, account.account)),
        ticks: {
          stepSize: Math.max(...getSumPerMonth(6, account.transactions, account.account))
        },
        grid: {
          lineWidth: 0
        }
      }
    }
  });

  const handleClick = () => {
    router.push(`${ERoutes.account}/${id}/detail`);
  };

  useEffect(() => {
    if (account.transactions.length) {
      barChartData();
      setLastTransactions(account.transactions.reverse().slice(0, 10));
    }
  }, [account]);

  const containerClassname = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassname}>
      <AccountHead
        balance={account.balance}
        account={account.account}
        title={'View your account'}
      />
      <div className={styles.content}>
        <TransferForm account={account.account} />
        <div className={styles.wrapper} onClick={handleClick}>
          {account.transactions && (
            <BarChart
              width={'515px'}
              height={'165px'}
              data={barChartData()}
              options={barChartOptions()}
            />
          )}
        </div>
        <div className={styles.pointer} onClick={handleClick}>
          <TransactionsHistory transactions={lastTransactions} currentAccount={account.account} />
        </div>
      </div>
    </div>
  );
}
