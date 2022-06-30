import Tools from '../../components/Tools';
import React from 'react';
import Frame from '../../components/Frame';
import BarChart from '../../components/charts/BarChart';
import { ROUTE_CITATIONS } from '../../consts';

export default function Citations() {
  return (
    <Frame>
      <Tools route={ROUTE_CITATIONS.slice(1)} />
      <div className="graphs">
        <BarChart route="citationsIn" yDimension="incoming citations" />
        <BarChart route="citationsOut" yDimension="outgoing citations" />
      </div>
    </Frame>
  );
}
