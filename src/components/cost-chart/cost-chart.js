import React, { Component } from 'react';
import Chart from 'react-google-charts';

export default class CostChart extends Component {

    render() {
        
        const { height, chartType, chartData, chartOptions} = this.props;
      return (
        <div>
          <Chart chartType="BarChart" width="100%" height={height} chartType={chartType} data={chartData} options={chartOptions} />
        </div>
      );
    }
}