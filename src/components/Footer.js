import React, { Component } from 'react';
import { Row, Col, Label, Image } from 'react-bootstrap';
import headerIcon from '../assets/images/headerIcon.svg';

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Row className="no-margin white-bg padding-header">
          <div className="top-border">
            <Col md={4} sm={4} className="text-left padding-t-5 no-padding">
              <div className="date-view">
                <Image src={headerIcon} className="headerIcon" />
                <Label className="company-title">
                  2017 Akko, Inc
                </Label>
              </div>
            </Col>
            <Col md={4} sm={4} className="text-center">
              <Label className="header-title">
                akko
              </Label>
            </Col>
            <Col md={4} sm={4} className="text-right padding-t-5 no-padding">
              <Label className="contact-title">
                help@akko.io
              </Label>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default Footer;
