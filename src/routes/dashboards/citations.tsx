import React from 'react';
import Frame from '../../components/Frame';
import BarChart from '../../components/charts/BarChart';
import { ROUTE_CITATIONS } from '../../consts';

export default function Citations() {
  return (
    <Frame route={ROUTE_CITATIONS.slice(1)}>
      <div>
        <BarChart route="citationsIn" yDimension="incoming citations" />
        <BarChart route="citationsOut" yDimension="outgoing citations" />
      </div>
    </Frame>
  );
}
