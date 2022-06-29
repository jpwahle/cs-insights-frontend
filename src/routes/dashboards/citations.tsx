import Tools from '../../components/Tools';
import React from 'react';
import Frame from '../../components/Frame';
import BarChart from '../../components/charts/BarChart';

export default function Citations() {
  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <BarChart route="citationsIn" yDimension="incoming citations" />
        <BarChart route="citationsOut" yDimension="outgoing citations" />
      </div>
    </Frame>
  );
}
