import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Label, Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import SweetAlert from 'sweetalert-react';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';
import Papa from 'papaparse';
import { getProductValue, convertInventoryJSONToObject, exportCSVFile, headers } from '../constants';
import { invokeApig } from '../libs/awsLib';
import cogs2 from '../assets/images/cogs2.svg';

const ToastMessageFactory = React.createFactory(ToastMessageAnimated);

class SetCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      importedCSV: null,
      alertShow: false,
      cogsValueShow: false,
      fetchError: false,
      errorText: '',
      totalProductCount: 0,
      selectedCogsValue: 0
    };
    this.goLanding = this.goLanding.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.csvButtonClicked = this.csvButtonClicked.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCogsConfirm = this.onCogsConfirm.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getProduct();
  }

  onDrop(files) {
    this.setState({
      importedCSV: files[0]
    });
    this.container.success(
      '',
      'Upload CSV file is success. Click Submit button for next step', {
        timeOut: 2000,
        extendedTimeOut: 2000
      });
  }

  onSkip() {
    this.setState({ alertShow: true });
  }

  onConfirm() {
    this.setState({ alertShow: false });
    this.props.history.push('/inventory');
  }

  onCogsConfirm() {
    const {totalProductCount, selectedCogsValue} = this.state;
    this.setState({ cogsValueShow: false });
    if (totalProductCount !== selectedCogsValue) {
      this.props.history.push('/set-table');
    } else {
      this.props.history.push('/inventory');
    }
  }

  onConnect() {
    const $this = this;
    const { data } = this.state;
    const { importedCSV } = this.state;
    if (importedCSV !== null) {
      // this.props.history.push('/set-table');
      Papa.parse(importedCSV, {
        complete(results) {
          const parsedData = results.data;
          const updatedProducts = [];
          let nullCogsCount = 0;
          for (let i = 1; i < parsedData.length; i++) {
            if (parsedData[i][0] === data[i - 1].id) {
              if (parsedData[i][5].toString().length === 0 || parsedData[i][5].toString() === 'null') {
                nullCogsCount++;
              }
              const updatedProductDetail = {
                category: data[i - 1].productDetail.category,
                currency: data[i - 1].productDetail.currency,
                image: data[i - 1].productDetail.image,
                price: data[i - 1].productDetail.price,
                sku: data[i - 1].productDetail.sku,
                tags: data[i - 1].productDetail.tags,
                title: data[i - 1].productDetail.title,
                variant: data[i - 1].productDetail.variant,
                cogs: parsedData[i][5],
              };
              const oneProduct = {
                id: data[i - 1].id,
                productDetail: updatedProductDetail,
                stockOnHandUnits: data[i - 1].stockOnHandUnits,
                stockOnHandValue: data[i - 1].stockOnHandValue,
                committedUnits: data[i - 1].committedUnits,
                committedValue: data[i - 1].committedValue,
                availableForSaleUnits: data[i - 1].availableForSaleUnits,
                availableForSaleValue: data[i - 1].availableForSaleValue,
                title: data[i - 1].title,
                variant: data[i - 1].variant,
                sku: data[i - 1].sku,
                price: data[i - 1].price,
                cogs: parsedData[i][5]
              };
              updatedProducts.push(oneProduct);
            }
          }
          localStorage.setItem('inventoryInfo', JSON.stringify(updatedProducts));
          $this.setState({
            totalProductCount: updatedProducts.length,
            selectedCogsValue: updatedProducts.length - nullCogsCount,
            cogsValueShow: true
          });
        }
      });
    }
  }

  getProduct() {
    this.products().then((results) => {
      console.log(results);
      const products = convertInventoryJSONToObject(results);
      this.setState({ data: products });
      localStorage.setItem('inventoryInfo', JSON.stringify(products));
    })
      .catch(error => {
        this.setState({
          errorText: error,
          fetchError: true
        });
      });
  }

  products() {
    return invokeApig({ path: '/inventory' });
  }

  goLanding() {
    this.props.history.push('/');
  }

  csvButtonClicked() {
    const { data } = this.state;
    exportCSVFile(headers, getProductValue(data), 'inventory');
  }

  render() {
    const { totalProductCount, selectedCogsValue } = this.state;
    const restProduct = totalProductCount - selectedCogsValue;
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
          <Row>
            <Col md={6} mdOffset={3} className="center-view">
              <div className="text-center margin-t-40">
                <span className="select-style-text">
                  Set COGS for your products
                </span>
              </div>
              <div className="text-center margin-t-5">
                <span className="select-style-comment">
                  We will use these Cost of Goods Sold (COGS) estimates to calculate your gross profit
                </span>
              </div>
              <div className="text-center margin-t-5">
                <span className="select-style-comment-small">
                  {'( you can update these anytime from the Settings menu )'}
                </span>
              </div>
              <div className="content-center margin-t-40">
                <Col md={7} className="no-padding">
                  <div>
                    <div className="step-one-view">
                      <span className="step-title">
                        STEP 1:
                      </span>
                      <span className="step-content">
                        &nbsp;Download CSV
                      </span>
                    </div>
                    <div className="margin-t-20 text-center">
                      <span className="step-content">
                        We have pre-filled this CSV file with your SKUs. Just download the file, enter the COGS values and upload it.
                      </span>
                    </div>
                    <div className="step-one-view margin-t-30">
                      <span className="step-title">
                        STEP 2:
                      </span>
                      <span className="step-content">
                        &nbsp;Fill COGS values
                      </span>
                    </div>
                    <div className="step-one-view margin-t-30">
                      <span className="step-title">
                        STEP 3:
                      </span>
                      <span className="step-content">
                        &nbsp;Upload the finished CSV file
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={5} className="flex-right no-padding">
                  <div className="style-icon-view">
                    <Image src={cogs2} className="business-icon cursor-pointer" onClick={this.csvButtonClicked} />
                  </div>
                </Col>
              </div>
              <div className="margin-t-20">
                <Dropzone
                  accept="text/csv"
                  onDrop={this.onDrop.bind(this)}
                  className="drag-view"
                >
                  <span className="drag-text">
                    drag and drop your finished CSV file here
                  </span>
                </Dropzone>
              </div>
              <div className="flex-center margin-t-20">
                <span className="step-content">
                  (or)
                </span>
              </div>
              <div className="flex-center margin-t-20">
                <Dropzone
                  accept="text/csv"
                  onDrop={this.onDrop.bind(this)}
                  className="upload-csv-button"
                >
                    UPLOAD CSV
                </Dropzone>
              </div>
              <div className="content-center margin-t-40">
                <Col md={6} className="text-left no-padding">
                  <Button className="skip-button" onClick={this.onSkip}>
                      SKIP FOR NOW
                  </Button>
                </Col>
                <Col md={6} className="text-right no-padding">
                  <Button className="login-button" onClick={this.onConnect}>
                      SUBMIT
                  </Button>
                </Col>
              </div>
            </Col>
            <Col md={3} className="center-view">
              <div className="description-view margin-t-40 text-center">
                <span className="select-style-comment">
                    COGS is the cost of buying one unit of the product from your vendor.
                </span>
              </div>
              <div className="description-view margin-t-10 text-center">
                <span className="select-style-comment">
                  Do not include costs incurred when selling the product, like Shipping, Tax or Discounts.
                </span>
              </div>
            </Col>
          </Row>
          <SweetAlert
            show={this.state.alertShow}
            showConfirmButton
            showCancelButton
            type="warning"
            title="Confirm"
            text="We cannot calculate Gross Profit figures without COGS information. You can also set/update these figures later from the Settings menu"
            onConfirm={this.onConfirm}
            onCancel={() => {
                  this.setState({ alertShow: false });
              }}
          />
          <SweetAlert
            show={this.state.cogsValueShow}
            showConfirmButton
            showCancelButton
            type="success"
            title="Confirm"
              // text={"COGS set for ``99/110 products. 11 products are still missing COGS"}
            text={`COGS set for ${selectedCogsValue}/${totalProductCount} products.${restProduct} products are still missing COGS`}
            onConfirm={this.onCogsConfirm}
            onCancel={() => {
                  this.setState({ cogsValueShow: false });
              }}
          />
          <ToastContainer
            ref={(toast) => { this.container = toast; }}
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right"
          />
          <SweetAlert
            show={this.state.fetchError}
            showConfirmButton
            type="error"
            title="Error"
            text={this.state.errorText.toString()}
            onConfirm={() => {
                  this.setState({ fetchError: false });
              }}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SetCsv);
