import Tools from '../components/Tools';
import React from 'react';
import Frame from '../components/Frame';
import BarChart from '../charts/BarChart';

export default function Citations() {
  return (
    <Frame>
      <Tools />
      <div className="graphs">
        <BarChart
          route="citationsIn"
          yDimension="incoming citations"
          title={'Incoming citations per year'}
        />
        <BarChart
          route="citationsOut"
          yDimension="outgoing citations"
          title={'Outgoing citations per year'}
        />
      </div>
    </Frame>
  );
}
