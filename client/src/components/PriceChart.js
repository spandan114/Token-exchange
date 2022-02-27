import React from "react";
import Chart from "react-apexcharts";
import { chartOptions, dummyData } from "../utils/chartConfig";

const CandleChart = () => {
  return (
    <div className="price-chart">
      <div className="price">
        <div id="chart">
          <Chart
            options={chartOptions}
            series={dummyData}
            type="candlestick"
          />
        </div>
      </div>
    </div>
  );
};

const PriceChart = () => {
  return (
    <div>
      <CandleChart />
    </div>
  );
};

export default PriceChart;
