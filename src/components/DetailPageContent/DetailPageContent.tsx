'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const bottomOfList = useRef<HTMLDivElement>(null);
  const [offset] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [loadsCount, setLoadsCount] = useState<number>(0);
  const [paginateTransactions, setPaginateTransactions] = useState<Array<ITransaction>>([]);
  const [barChartValues, setBarChartValues] = useState<Array<number>>([]);
  const [stackedBarChartValues, setStackedBarChartValues] = useState<Array<number>>([]);

  useEffect(() => {
    setPaginateTransactions([
      ...paginateTransactions,
      ...account.transactions.splice((page - 1) * offset, offset)
    ]);
  }, [page]);

  useEffect(() => {
    if (!account.transactions.length) {
      return;
    }

    setBarChartValues(getSumPerMonth(12, account.transactions, account.account));
    setStackedBarChartValues(getDiffPerMonth(12, account.transactions, account.account));

    account.transactions.reverse();

    setPaginateTransactions(account.transactions.splice((page - 1) * offset, offset));
  }, [account]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadsCount < 3) {
          setPage(page + 1);
          setLoadsCount(loadsCount + 1);
        }
      },
      {
        rootMargin: '100px'
      }
    );

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    };
  }, [bottomOfList.current, page]);

  const handleClick = () => {
    setLoadsCount(0);
    setPage(page + 1);
  };

  const barChartData = (): ChartData<'bar'> => {
    return {
      labels: getLabels({ count: 12 }),
      datasets: [
        {
          label: '',
          data: barChartValues,
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
          data: stackedBarChartValues,
          label: '',
          backgroundColor: ['rgba(253, 78, 93, 1)'],
          stack: 'stack 0',
          order: 1
        },
        {
          data: barChartValues,
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
        max: Math.max(...barChartValues),
        ticks: {
          stepSize: Math.max(...barChartValues)
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
        max: Math.max(Math.max(...barChartValues), Math.max(...stackedBarChartValues)),
        ticks: {
          stepSize: Math.max(Math.max(...barChartValues), Math.max(...stackedBarChartValues))
        },
        grid: {
          lineWidth: 0
        }
      }
    }
  });

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
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
        {account.transactions.length > offset && loadsCount === 3 && (
          <Button text={'More'} onClick={handleClick} />
        )}
        <div ref={bottomOfList} />
      </div>
    </div>
  );
}
