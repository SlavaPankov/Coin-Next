'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './detailPageContent.module.scss';
import { AccountHead } from '../AccountPageContent/AccountHead';
import { useAccountData } from '../../hooks/useAccountData';
import { ChartData, ChartOptions } from 'chart.js';
import { getLabels } from '../../utils/getBarChartLabels';
import { getSumPerMonth } from '../../utils/getSumPerMonth';
import { BarChart } from '../BarChart';
import { getDiffPerMonth } from '../../utils/getDiffPerMonth';
import { StackedBarChart } from '../StackedBarChart';
import { TransactionsHistory } from '../TransactionsHistory';
import { ITransaction } from '../../types/interfaces/ITransaction';
import { Button } from '../Button';

interface IDetailPageContentProps {
  id: string;
}

export function DetailPageContent({ id }: IDetailPageContentProps) {
  const { account } = useAccountData(id);
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });
  const [offset] = useState<number>(25);
  const [page, setPage] = useState<number>(1);
  const [paginateTransactions, setPaginateTransactions] = useState<Array<ITransaction>>([]);
  const [isPaginationLoading, setIsPaginationLoading] = useState<boolean>(false);

  useEffect(() => {
    setPaginateTransactions(account.transactions.splice((page - 1) * offset, offset));
  }, [page]);

  useEffect(() => {
    setIsPaginationLoading(false);
  }, [paginateTransactions]);

  useEffect(() => {
    if (!account.transactions.length) {
      return;
    }

    account.transactions.reverse();

    setPaginateTransactions(account.transactions.splice((page - 1) * offset, offset));
  }, [account]);

  const handleClick = () => {
    setIsPaginationLoading(true);
    setPage(page + 1);
  };

  const barChartData = (): ChartData<'bar'> => {
    return {
      labels: getLabels({ count: 12 }),
      datasets: [
        {
          label: '',
          data: getSumPerMonth(12, account.transactions, account.account),
          backgroundColor: ['rgba(17, 106, 204, 1)']
        }
      ]
    };
  };

  const stackedBarChartData = (): ChartData<'bar'> => {
    return {
      labels: getLabels({ count: 12 }),
      datasets: [
        {
          data: getDiffPerMonth(12, account.transactions, account.account),
          label: '',
          backgroundColor: ['rgba(253, 78, 93, 1)'],
          stack: 'stack 0',
          order: 1
        },
        {
          data: getSumPerMonth(12, account.transactions, account.account),
          label: '',
          backgroundColor: ['rgba(118, 202, 102, 1)'],
          stack: 'stack 0',
          order: 2
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
        max: Math.max(...getSumPerMonth(12, account.transactions, account.account)),
        ticks: {
          stepSize: Math.max(...getSumPerMonth(12, account.transactions, account.account))
        },
        grid: {
          lineWidth: 0
        }
      }
    }
  });

  const stackedBarChartOptions = (): ChartOptions<'bar'> => ({
    scales: {
      x: {
        grid: {
          lineWidth: 0
        }
      },
      y: {
        position: 'right',
        stacked: true,
        beginAtZero: true,
        min: 0,
        max: Math.max(
          Math.max(...getSumPerMonth(12, account.transactions, account.account)),
          Math.max(...getDiffPerMonth(12, account.transactions, account.account))
        ),
        ticks: {
          stepSize: Math.max(
            Math.max(...getSumPerMonth(12, account.transactions, account.account)),
            Math.max(...getDiffPerMonth(12, account.transactions, account.account))
          )
        },
        grid: {
          lineWidth: 0
        }
      }
    }
  });

  return (
    <div className={containerClassName}>
      <AccountHead balance={account.balance} account={account.account} title={'Balance history'} />
      <div className={styles.wrapper}>
        <BarChart
          width={'1150px'}
          height={'165px'}
          data={barChartData()}
          options={barChartOptions()}
        />
        <StackedBarChart
          width={'1150px'}
          height={'165px'}
          data={stackedBarChartData()}
          options={stackedBarChartOptions()}
        />
        <TransactionsHistory transactions={paginateTransactions} currentAccount={account.account} />
        <Button isDisabled={isPaginationLoading} text={'More'} onClick={handleClick} />
      </div>
    </div>
  );
}
