import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PriceBox from '../components/PriceBox';
import SalesChart from '../components/SalesChart';
import openUp from '../assets/images/openUpIcon.svg';
import openDown from '../assets/images/openDownIcon.svg';

const chartData =
{
  labels: ['Aug 17', 'Sep 17', 'Oct 17', 'Nov 17'],
  datasets: [{
    type: 'line',
    label: 'Sales',
    data: ['57000', '55000', '56881', '58000'],
    borderColor: 'rgba(55, 141, 238, 0.1)',
    backgroundColor: 'rgba(55, 141, 238, 0.5)',
    fill: '1',
    tension: 0,
  },
  {
    type: 'line',
    label: 'Gross Profit',
    data: ['56000', '53500', '55888', '56010'],
    borderColor: 'rgba(234, 71, 62, 0.6)',
    backgroundColor: 'rgba(234, 71, 62, 0.5)',
    fill: true,
    tension: 0,
  }]
};

class PriceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.onCloseCard = this.onCloseCard.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded});
  }

  onCloseCard() {
    this.setState({expanded: false});
  }

  render() {
    const {value} = this.props;
    return (
      <div>
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          className={value.trend === '+' ? 'price-card-style' : 'price-card-style-border'}
        >
          <CardHeader
            actAsExpander
            showExpandableButton
            openIcon={<img src={openUp} alt="up" className="open-icon" />}
            closeIcon={<img src={openDown} alt="down" className="close-icon" />}
            className="card-header-style"
          >
            <PriceBox value={value} />
          </CardHeader>
          <CardText
            expandable
            className="expand-content"
          >
            <div>
              <div>
                <SalesChart data={chartData} type="line" width="40%" />
                <button className="analyze-button">
                  ANALYZE
                </button>
              </div>
              <div className="flex-right">
                <IconButton className="expand-close-icon" onClick={this.onCloseCard}>
                  <img src={openUp} alt="down" className="close-icon" />
                </IconButton>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default PriceCard;
