import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Label, Image } from 'react-bootstrap';
import businessType1 from '../assets/images/businessType1.svg';
import businessType2 from '../assets/images/businessType2.svg';
import businessType3 from '../assets/images/businessType3.svg';
import businessType4 from '../assets/images/businessType4.svg';

class BusinessType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: ''
    };
    this.goLanding = this.goLanding.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onTypeOneSelected = this.onTypeOneSelected.bind(this);
    this.onTypeTwoSelected = this.onTypeTwoSelected.bind(this);
    this.onTypeThreeSelected = this.onTypeThreeSelected.bind(this);
    this.onTypeFourSelected = this.onTypeFourSelected.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  goLanding() {
    this.props.history.push('/');
  }

  onTypeOneSelected() {
    this.setState({
      option: 'one'
    });
  }

  onTypeTwoSelected() {
    this.setState({
      option: 'two'
    });
  }

  onTypeThreeSelected() {
    this.setState({
      option: 'three'
    });
  }

  onTypeFourSelected() {
    this.setState({
      option: 'four'
    });
  }

  onConnect() {
    const { option } = this.state;
    if (option.length > 0) {
      this.props.history.push('/set-cogs');
    }
  }

  render() {
    const { option } = this.state;
    return (
      <div>
        <Grid className="login-layout">
          <Row>
            <Col md={12}>
              <Col md={6} className="text-left padding-t-20">
                <Label className="login-title">
                  akko
                </Label>
              </Col>
              <Col md={6} className="text-right padding-t-20">
                <Button className="logout-button" onClick={this.goLanding} />
              </Col>
            </Col>
          </Row>
          <Row className="account-setup-header">
            <span className="account-comment">
              Account Setup
            </span>
          </Row>
          <div className="text-center margin-t-40">
            <span className="select-style-text">
              Select the style of your business
            </span>
          </div>
          <div className="text-center margin-t-5">
            <span className="select-style-comment">
              This enables us to customize akko to best suit your business style
            </span>
          </div>
          <div className="flex-center margin-t-40">
            <div className={option === 'one' ? 'flex-center active-border' : 'style-container flex-center'} onClick={this.onTypeOneSelected}>
              <div className="style-icon-view">
                <Image src={businessType1} className="business-icon" />
              </div>
              <div className="style-text-view">
                <span className="select-text-large">
                  DROPSHIPPER
                </span>
                <span className="select-text-small">
                  You forward orders to your vendors for fulfillment.
                </span>
                <span className="select-text-small">
                  You do not stock inventory nor do your own fulfillment.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-center margin-t-10">
            <div className={option === 'two' ? 'flex-center active-border' : 'style-container flex-center'} onClick={this.onTypeTwoSelected}>
              <div className="style-icon-view">
                <Image src={businessType2} className="business-icon" />
              </div>
              <div className="style-text-view">
                <span className="select-text-large">
                  RESELLER / RETAILER
                </span>
                <span className="select-text-small">
                    You buy and resell products with a markup.
                </span>
                <span className="select-text-small">
                    You stock your inventory and do your own fulfillment.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-center margin-t-10">
            <div className={option === 'three' ? 'flex-center active-border' : 'style-container flex-center'} onClick={this.onTypeThreeSelected}>
              <div className="style-icon-view">
                <Image src={businessType3} className="business-icon" />
              </div>
              <div className="style-text-view">
                <span className="select-text-large">
                  MANUFACTURER
                </span>
                <span className="select-text-small">
                  You buy raw materials from vendors and manufacture
                </span>
                <span className="select-text-small">
                  your products. You stock inventory and do your own fulfillment.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-center margin-t-10">
            <div className={option === 'four' ? 'flex-center active-border' : 'style-container flex-center'} onClick={this.onTypeFourSelected}>
              <div className="style-icon-view">
                <Image src={businessType4} className="business-icon" />
              </div>
              <div className="style-text-view">
                <span className="select-text-large">
                  OTHER
                </span>
                <span className="select-text-small">
                  For all other merchants.
                </span>
              </div>
            </div>
          </div>
          <div className="text-center margin-t-50">
            <Button className="login-button" onClick={this.onConnect}>
                PROCEED
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(BusinessType);
