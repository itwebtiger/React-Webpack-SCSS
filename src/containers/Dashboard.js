import React, { Component } from 'react';
import { Grid, Row, Tabs, Tab, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import SearchInput, { createFilter } from 'react-search-input';
import { KEYS_TO_METRICES } from '../constants';
import Navigationbar from '../components/Navigationbar';
import PriceCard from '../components/PriceCard';
import Footer from '../components/Footer';

const dashboardJSON = {
  dummyData: [
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '3%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 78,
      trend: '+',
      trendValue: '3%',
      trendPeriod: 'last month'
    },
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '23%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 424,
      trend: '-',
      trendValue: '45%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 74,
      trend: '+',
      trendValue: '63%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 562,
      trend: '-',
      trendValue: '21%',
      trendPeriod: 'last month'
    },
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '43%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 54,
      trend: '+',
      trendValue: '13%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 896,
      trend: '-',
      trendValue: '32%',
      trendPeriod: 'last month'
    },
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '63%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 893,
      trend: '+',
      trendValue: '63%',
      trendPeriod: 'last month'
    },
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '73%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 424,
      trend: '-',
      trendValue: '10%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 58,
      trend: '+',
      trendValue: '41%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 569,
      trend: '-',
      trendValue: '41%',
      trendPeriod: 'last month'
    },
    {
      title: 'Sales',
      description: 'What is the total sales volume this month?',
      prefix: '$',
      value: 57923,
      trend: '+',
      trendValue: '63%',
      trendPeriod: 'last month'
    },
    {
      title: 'Churning Customers',
      description: 'Which customers are at risk of leaving?',
      prefix: '',
      value: 98,
      trend: '+',
      trendValue: '43%',
      trendPeriod: 'last month'
    },
    {
      title: 'Avg. Order Value',
      description: 'On average, how much do customers spend in your store?',
      prefix: '$',
      value: 424,
      trend: '-',
      trendValue: '10%',
      trendPeriod: 'last month'
    },
  ]
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dashboardJSON.dummyData,
      searchTerm: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentDidMount() {
  }

  handleSelect(key) {
    if (key === 1) {
      this.props.history.push('/dashboard');
    } else if (key === 2) {
      this.props.history.push('/inventory');
    }
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term
    });
  }

  renderCards() {
    const { data, searchTerm } = this.state;
    const filteredData = data.filter(createFilter(searchTerm, KEYS_TO_METRICES));
    // const p = this.props;
    return (
      filteredData.map((value, index) => {
        return (
          <div key={index} className="item">
            <PriceCard value={value} />
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div>
        <Navigationbar history={this.props.history} />
        <Grid className="dashboard-container">
          <Row>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="inventory-tab" onSelect={this.handleSelect}>
              <Tab eventKey={1} title="Dashboard">
                <div>
                  <Row>
                    <Col md={4} mdOffset={4} className="margin-t-20">
                      <SearchInput
                        className="search-input"
                        placeholder="Search through all your metrics"
                        onChange={this.searchUpdated}
                        onFocus={this.onFocus}
                        />
                    </Col>
                  </Row>
                  <Row>
                    <div className="padding-left-right-100 margin-t-30 masonry">
                      {this.renderCards()}
                    </div>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey={2} title="Inventory" />
            </Tabs>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

Dashboard.defaultProps = {
  cols: 12,
  onLayoutChange() {},
  verticalCompact: true,
  preventCollision: true,
  isResizable: false,
  isDraggable: false,
};
export default connect(mapStateToProps)(Dashboard);
