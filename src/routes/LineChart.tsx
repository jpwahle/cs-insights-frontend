import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { YearsData } from '../types';

const useResizeObserver = (ref: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }
    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, [ref]);
  return dimensions;
};

function LineChart() {
  const [chartData, setChartData] = useState<YearsData>({
    years: [
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
    ],
    counts: [100, 10, 30, 70, 55, 60, 73, 95, 45, 80, 20, 65, 40, 75, 50, 90, 25],
  });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef(null);
  const dimensionss = useResizeObserver(wrapperRef);

  let chartDimensions = {
    width: 1000,
    height: 500,
    margins: 50,
    ctrWidth: 0,
    ctrHeight: 0,
  };

  // will be called initially and on every data change
  useEffect(() => {
    console.log(dimensionss);

    chartDimensions.width = dimensionss?.width ?? 1000;
    // chartDimensions.height = dimensionss?.height ?? 500;
    chartDimensions.ctrWidth = chartDimensions.width - chartDimensions.margins * 2;
    chartDimensions.ctrHeight = chartDimensions.height - chartDimensions.margins * 2;

    // ----- CONTAINER AND SVG SETUP
    const svg = d3
      .select(svgRef.current)
      .attr('overflow', 'visible')
      .attr('width', chartDimensions.width)
      .attr('height', chartDimensions.height);

    svg.selectAll('.container').remove(); //used to remove the previous chart, if any

    const container = svg
      .append('g') // <g>
      .classed('container', true)
      .attr('transform', `translate(${chartDimensions.margins}, ${chartDimensions.margins})`);

    // For making the chart work, we need to change the data to an array of objects, instead of an array with objects
    const formattedData = chartData.years.map((year, index) => ({
      year: year,
      count: chartData.counts[index],
    }));

    // ----- X AND Y SCALES
    const xScale = d3.scaleBand().domain(chartData.years).range([0, chartDimensions.ctrWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(chartData.counts) as number) + 10])
      .nice()
      .rangeRound([chartDimensions.ctrHeight, 0]);

    // ----- LINE GENERATOR
    const lineGenerator = d3
      .line<{ year: string; count: number }>()
      .x((d) => {
        const x = xScale(d.year);
        return x !== undefined ? x + xScale.bandwidth() / 2 : 0; // Handle the undefined case
      })
      .y((d) => yScale(d.count));

    // ----- LINE DRAWN ON THE CONTAINER
    container
      .append('path')
      .datum(formattedData)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);

    // ----- AXES

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    container
      .append('g')
      .classed('xAxis', true)
      .attr('transform', `translate(0, ${chartDimensions.ctrHeight})`)
      .call(xAxis);
    container.append('g').classed('yAxis', true).call(yAxis);

    // ----- TOOLTIP AND DOT
    const tooltipDot = container
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#fc8781')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    const tooltip = d3.select('#tooltip');

    // ----- TRIGGER FOR THE TOOLTIP
    container
      .append('rect')
      .attr('width', chartDimensions.ctrWidth)
      .attr('height', chartDimensions.ctrHeight)
      .style('opacity', 0)
      .on('touchmouse mousemove', function (event) {
        const mousePos = d3.pointer(event, this);
        const x = mousePos[0];
        const bandWidth = xScale.bandwidth();
        const index = Math.floor(x / bandWidth);
        const year = chartData.years[index];

        tooltipDot
          .transition()
          .duration(40)
          .ease(d3.easeLinear)
          .style('opacity', 1)
          .attr('cx', (xScale(year) ?? 0) + bandWidth / 2)
          .attr('cy', yScale(chartData.counts[index]));

        tooltip
          .transition()
          .duration(40)
          .ease(d3.easeLinear)
          .style('display', 'block')
          .style('left', `${(xScale(year) ?? 0) + bandWidth / 2}px`)
          .style('top', `${yScale(chartData.counts[index]) - 30}px`);
        tooltip.select('.count').text('Count: ' + chartData.counts[index]);
        tooltip.select('.year').text('Year: ' + year);
      })
      .on('mouseleave', function () {
        tooltipDot.style('opacity', 0);
        tooltip.style('display', 'none');
      });
  }, [chartData, dimensionss]);

  // FOR TESTING ONLY
  const addRandomDataPoint = () => {
    const currentYear = new Date().getFullYear().toString(); // Get the current year as a string
    const randomValue = Math.floor(Math.random() * (100 - 10 + 1)) + 10; // Generate a random value between 10 and 100

    // Create a new data point with the current year and random value
    const newDataPoint = {
      year: currentYear,
      count: randomValue,
    };

    // Update chartData by adding the new data point
    setChartData((prevChartData) => ({
      years: [...prevChartData.years, newDataPoint.year],
      counts: [...prevChartData.counts, newDataPoint.count],
    }));
  };

  return (
    <React.Fragment>
      <div ref={wrapperRef} id="wrapper">
        <svg ref={svgRef}></svg>
        <div id="tooltip">
          <div className="count"></div>
          <div className="year"></div>
        </div>
      </div>
      <br /> <br /> <br />
      <button
        onClick={() => {
          addRandomDataPoint();
        }}
      >
        Update data
      </button>
    </React.Fragment>
  );
}

export default LineChart;
