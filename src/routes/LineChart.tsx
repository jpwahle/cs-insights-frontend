import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('overflow', 'visible');

    const yScale = d3.scaleLinear().domain([0, 100]).range([150, 0]);
    const yAxis = d3.axisRight(yScale);
    svg.append('g').attr('transform', 'translate(300,0)').call(yAxis);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    svg.append('g').attr('transform', 'translate(0,150)').call(xAxis);

    const myLine = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y(yScale);

    // svg
    //   .selectAll('circle')
    //   .data(data)
    //   .join('circle')
    //   .attr('r', (value) => value)
    //   .attr('cx', (value) => value * 2)
    //   .attr('cy', (value) => value * 2)
    //   .attr('stroke', 'red');

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br /> <br /> <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>Update data</button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>Filter data</button>
    </React.Fragment>
  );
}

export default App;
