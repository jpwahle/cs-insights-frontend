import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { YearsData } from '../types';

function LineChart() {
  const [chartData, setChartData] = useState<YearsData>({
    years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    counts: [60, 10, 30, 70, 55, 60, 73, 95],
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('overflow', 'visible');

    // For making the chart work, we need to change the data to an array of objects, instead of an array with objects
    const formattedData = chartData.years.map((year, index) => ({
      year: year,
      count: chartData.counts[index],
    }));

    const xScale = d3.scaleBand().domain(chartData.years).range([0, 300]).padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(chartData.counts) as number) + 10])
      .nice()
      .range([150, 0]);

    const lineGenerator = d3
      .line<{ year: string; count: number }>()
      .x((d) => {
        const x = xScale(d.year);
        return x !== undefined ? x + xScale.bandwidth() / 2 : 0; // Handle the undefined case
      })
      .y((d) => yScale(d.count));

    const yAxis = d3.axisRight(yScale);
    const xAxis = d3.axisBottom(xScale).ticks(formattedData.length);

    svg.append('g').attr('transform', 'translate(0,150)').call(xAxis);
    svg.append('g').attr('transform', 'translate(300,0)').call(yAxis);

    svg
      .selectAll('.line')
      .data([formattedData])
      .join('path')
      .attr('class', 'line')
      .attr('d', (d) => lineGenerator(d))
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .on('touchmouse mousemove', function (event) {
        const mousePos = d3.pointer(event, this);
        console.log(mousePos);
      });
  }, [chartData]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br /> <br /> <br />
      <button
        onClick={() =>
          setChartData({
            years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            counts: [10, 20, 30, 40, 55, 60, 70],
          })
        }
      >
        Update data
      </button>
    </React.Fragment>
  );
}

export default LineChart;
