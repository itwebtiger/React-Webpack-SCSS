import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Chart as ChartJS} from 'chart.js/src/chart';

class SalesChart extends Component {
  chart = null;
  updates = false;

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  componentDidUpdate() {
    if (this.chart) {
      this.chart.data.datasets = this.props.data.datasets;
      this.chart.update();
    }
  }

  initChart() {
    this.chart = new ChartJS(this.canvas, {
      type: this.props.type,
      data: this.props.data
    });
  }

  destroyChart() {
    this.chart.destroy();
  }

  render() {
    return (
      <div>
        <canvas ref={(canvas) => this.canvas = canvas} />
      </div>
    );
  }
}

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.any)
    })),
    width: PropTypes.number
  })
};

export default SalesChart;
