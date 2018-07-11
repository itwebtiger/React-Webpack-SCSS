import React, { Component } from 'react';
import { Button, Row, Col, Label } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.goFeature = this.goFeature.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goLogin = this.goLogin.bind(this);
    this.goSignUp = this.goSignUp.bind(this);
  }

  goFeature() {
    this.props.history.push('/signin');
  }

  goHome() {
    this.props.history.push('/inventory');
  }

  goLogin() {
    this.props.history.push('/signin');
  }

  goSignUp() {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <Row>
        <Col md={6}>
          <Label className="logo-title">
            akko
          </Label>
        </Col>
        <Col md={6} className="padding-t-20">
          {/* <Col md={3}>
            <Button className="feature-text" onClick={this.goFeature}>
              FEATURES
            </Button>
          </Col>
          <Col md={3}>
            <Button className="feature-text" onClick={this.goHome}>
              PRICING
            </Button>
          </Col> */}
          <Col md={3} mdOffset={6}>
            <Button className="feature-text" onClick={this.goLogin}>
              LOGIN
            </Button>
          </Col>
          <Col md={3}>
            <Button className="signup-button-text" onClick={this.goSignUp}>
              SIGN UP
            </Button>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Header;
