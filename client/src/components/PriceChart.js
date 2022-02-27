import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { chartOptions } from "../utils/chartConfig";
import { formatCandleChartData } from "../utils/helper";
import Spinner from "./Spinner";

const CandleChart = () => {

    const filledOrders = useSelector((state) => state.exchangeReducer.filledOrders);


  return (
    <div className="price-chart">
      <div className="price">
        <div id="chart">
            {
                filledOrders?
                <Chart
                options={chartOptions}
                series={formatCandleChartData(filledOrders).series}
                type="candlestick"
              />
              :<Spinner/>
            }

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
