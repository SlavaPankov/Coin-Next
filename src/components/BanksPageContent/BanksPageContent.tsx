'use client';
import React from 'react';
import styles from './banksPageContent.module.scss';
import classNames from 'classnames';
import { H1 } from '../Headings';
import { Placemark, YMaps, Map } from '@pbe/react-yandex-maps';
import { useBanksData } from '../../hooks/useBanksData';

export function BanksPageContent() {
  const { banks, error } = useBanksData();

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10
  };

  return (
    <div className={containerClassName}>
      <H1 text={'Banks'} marginBottom={'56px'} />
      <YMaps>
        <Map className={styles.map} defaultState={defaultState}>
          {banks.length &&
            !error &&
            banks.map((item, index) => <Placemark key={index} geometry={[item.lat, item.lon]} />)}
        </Map>
      </YMaps>
    </div>
  );
}
