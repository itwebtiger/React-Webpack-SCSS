import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Label, FormControl, Image } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import { testMode } from '../constants';
import { invokeApig } from '../libs/awsLib';
import shopifyIcon from '../assets/images/shopify.svg';

const queryString = require('query-string');

class ConnectShopify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: '',
      alertShow: false
    };
    this.goLanding = this.goLanding.bind(this);
    this.onShopNameChange = this.onShopNameChange.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  goLanding() {
    this.props.history.push('/');
  }

  onShopNameChange(e) {
    this.setState({
      shopName: e.target.value
    });
  }

  onConnect() {
    if (testMode) {
      this.setState({
        alertShow: true
      });
      this.props.history.push('/business-type');
    } else {
      invokeApig({
        path: '/connect-shopify',
        method: 'POST',
        body: {
          shopId: this.state.shopName
        }
      }).then((result) => {
        window.location = result.uri;
      });
    }
  }

  onConfirm() {
    this.setState({
      alertShow: false
    });
    this.props.history.push('/business-type');
  }

  renderSuccessPage() {
    invokeApig({
      path: '/connect-shopify',
      method: 'PUT',
      body: {
        shopId: this.state.shop,
        queryParams: this.props.location.search
      }
    }).then((result) => {
      localStorage.setItem('isAuthenticated', 'isAuthenticated');
      this.setState({
        alertShow: true
      });
    });
  }

  render() {
    const { shopName } = this.state;
    const parsedParams = queryString.parse(this.props.location.search);
    return (
      <div>
        {!Object.keys(parsedParams).length ?
          <Grid className="login-layout">
            <Row>
              <Col md={12}>
                <Col md={6} className="text-left padding-t-20">
                  <Label className="login-title">
                    akko
                  </Label>
                </Col>
                <Col md={6} className="text-right padding-t-20">
                  <Button className="close-button" onClick={this.goLanding} />
                </Col>
              </Col>
            </Row>
            <Row className="border-view">
              <span className="shopify-comment">
                Let's get your Shopify store connected
              </span>
            </Row>
            <div className="shopify-input-view">
              <Image src={shopifyIcon} className="shopify-icon" />
              <FormControl
                type="text"
                autoFocus
                placeholder="shop name"
                className="signup-email-input"
                value={shopName}
                onChange={this.onShopNameChange}
              />
              <span className="shopify-url-text">
                .myshopify.com
              </span>
            </div>
            <div className="text-center margin-t-40">
              <span className="shopify-instruction-text">
                You will be redirected to Shopify where you have to grant us
              </span>
            </div>
            <div className="text-center">
              <span className="shopify-instruction-text">
                permission to access your shop data.
              </span>
            </div>
            <div className="text-center margin-t-50">
              <Button className="login-button" onClick={this.onConnect}>
                CONNECT
              </Button>
            </div>
          </Grid>
              :
              this.renderSuccessPage()
          }
        <SweetAlert
          show={this.state.alertShow}
          showConfirmButton
          type="success"
          title="Success!"
          text="Connection is successful."
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ConnectShopify);
