import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Label, Tabs, Tab, FormControl } from 'react-bootstrap';
import { StyleRoot } from 'radium';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { validateEmail, animationStyle } from '../constants';
import config from '../config';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailValid: false,
      isPasswordValid: false
    };
    this.goLanding = this.goLanding.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.onForgot = this.onForgot.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onEmailFocus = this.onEmailFocus.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.onPasswordFocus = this.onPasswordFocus.bind(this);
    this.onPasswordBlur = this.onPasswordBlur.bind(this);
  }

  componentWillMount() {

  }

  goLanding() {
    this.props.history.push('/');
  }

  handleSelect(key) {
    if (key === 1) {
      this.props.history.push('/signin');
    } else if (key === 2) {
      this.props.history.push('/signup');
    }
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onEmailFocus() {
    const { email, isEmailValid } = this.state;
    if (email.length > 0 && isEmailValid) {
      this.setState({
        isEmailValid: false
      });
    }
  }

  onEmailBlur() {
    const { email } = this.state;
    if (validateEmail(email)) {
      this.setState({
        isEmailValid: false
      });
    } else {
      this.setState({
        isEmailValid: true
      });
    }
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onPasswordFocus() {
    const { password, isPasswordValid } = this.state;
    if (password.length > 0 && isPasswordValid) {
      this.setState({
        isPasswordValid: false
      });
    }
  }

  onPasswordBlur() {
    const { password } = this.state;
    if (password.length > 7) {
      this.setState({
        isPasswordValid: false
      });
    } else {
      this.setState({
        isPasswordValid: true
      });
    }
  }


  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onLogin();
    }
  }

  onForgot() {

  }

  onLogin() {
    const { email, password } = this.state;
    if (password.length > 7 && validateEmail(email)) {
      this.setState({
        isEmailValid: false,
        isPasswordValid: false
      });
      this.login(email, password).then((result) => {
        localStorage.setItem('isAuthenticated', 'isAuthenticated');
        this.props.history.push('/inventory');
        // this.props.history.push('/connect-shopify');
      })
        .catch(error => {
          console.log('login error', error);
        });
    } else {
      if (password.length < 7) {
        this.setState({
          isPasswordValid: true
        });
      } else {
        this.setState({
          isPasswordValid: false
        });
      }
      if (!validateEmail(email)) {
        this.setState({
          isEmailValid: true
        });
      } else {
        this.setState({
          isEmailValid: false
        });
      }
    }
  }

  // login using amazon cognito user pool
  login(email, password) {
    // create a new userPool instance
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    // create a new CognitoUser instance
    const user = new CognitoUser({ Username: email, Pool: userPool });

    // get authentication data
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    // authenticate user
    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
  }

  render() {
    const { email, password, isEmailValid, isPasswordValid } = this.state;
    return (
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
        <Row>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="login-tab" onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Login">
              <div>
                <div className="flex-center padding-t-80">
                  <FormControl
                    type="text"
                    placeholder="email"
                    className="email-input"
                    value={email}
                    onChange={this.onEmailChange}
                    onKeyPress={this._handleKeyPress}
                    onFocus={this.onEmailFocus}
                    onBlur={this.onEmailBlur}
                  />
                </div>
                <div className="text-center">
                  {isEmailValid ?
                    <StyleRoot>
                      <div className="bubble-alert-view" style={animationStyle.headShake}>
                        <span className="alert-text">
                          Invalid email address
                        </span>
                        <i className="fa fa-info-circle fa-lg red-mark" aria-hidden="true" />
                      </div>
                    </StyleRoot>
                    :
                    <StyleRoot>
                      <div className="bubble-alert-view" />
                    </StyleRoot>
                    }
                </div>
                <div className="flex-center margin-t-5">
                  <FormControl
                    type="password"
                    placeholder="password"
                    className="email-input"
                    value={password}
                    onChange={this.onPasswordChange}
                    onKeyPress={this._handleKeyPress}
                    onFocus={this.onPasswordFocus}
                    onBlur={this.onPasswordBlur}
                    />
                </div>
                <div className="text-center">
                  {isPasswordValid ?
                    <StyleRoot>
                      <div className="bubble-alert-view" style={animationStyle.headShake}>
                        <span className="alert-text">
                          Password should be more than 8 character
                        </span>
                        <i className="fa fa-info-circle fa-lg red-mark" aria-hidden="true" />
                      </div>
                    </StyleRoot>
                    :
                    <StyleRoot>
                      <div className="bubble-alert-view" />
                    </StyleRoot>
                  }
                </div>
                <div className="flex-center padding-t-10">
                  <Button className="forgot-text" onClick={this.onForgot}>
                    Forgot Password ?
                  </Button>
                </div>
                <div className="flex-center padding-t-20">
                  <Button className="login-button" onClick={this.onLogin}>
                    LOGIN
                  </Button>
                </div>
              </div>
            </Tab>
            <Tab eventKey={2} title="Sign Up" />
          </Tabs>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SignIn);
