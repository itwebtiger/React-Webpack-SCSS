import React from 'react';
import { numberFormatter } from '../constants';
import upArrow from '../assets/images/upArrow.svg';
import downArrow from '../assets/images/downArrow.svg';

class PriceBox extends React.Component {
  render() {
    const {title, description, prefix, value, trendValue, trendPeriod, trend} = this.props.value;
    return (
      <div className="price-view">
        <div className="first-price">
          <div className="half-height">
            <span className="price-title">{title}</span>
          </div>
          <div className="half-height margin-t-10">
            <span className="price-description">{description}</span>
          </div>
        </div>
        <div className="second-price">
          <span className="price-value">{prefix}{numberFormatter(Math.round(value * 100) / 100)}</span>
        </div>
        <div className="third-price">
          <div>
            {trend === '+' ?
              <div className="align-center">
                <img src={upArrow} className="arrow-icon" alt="icon" />
                <span className="price-percent">{trendValue}</span>
              </div>
              :
              <div className="align-center">
                <img src={downArrow} className="arrow-icon" alt="icon" />
                <span className="price-percent-down">{trendValue}</span>
              </div>
            }
          </div>
          <div>
            <span className="price-period">{trendPeriod}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceBox;
