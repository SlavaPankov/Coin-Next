'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './accountPageContainer.module.scss';
import { useAccountData } from '../../hooks/useAccountData';
import { AccountHead } from './AccountHead';
import { TransferForm } from './TransferForm';
import { BarChart } from '../BarChart';
import { getLabels } from '../../utils/getBarChartLabels';
import { getSumPerMonth } from '../../utils/getSumPerMonth';
import { ChartData, ChartOptions } from 'chart.js';

interface IAccountPageContentProps {
  id: string;
}

export function AccountPageContent({ id }: IAccountPageContentProps) {
  const { account } = useAccountData(id);

  const containerClassname = classNames('container', {
    [`${styles.container}`]: true
  });

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

  useEffect(() => {
    if (account.transactions.length) {
      barChartData();
    }
  }, [account]);

  return (
    <div className={containerClassname}>
      <AccountHead balance={account.balance} account={account.account} />
      <div className={styles.content}>
        <TransferForm account={account.account} />
        {account.transactions && <BarChart data={barChartData()} options={barChartOptions()} />}
      </div>
    </div>
  );
}
