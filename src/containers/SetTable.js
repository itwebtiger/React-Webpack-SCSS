import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Label, FormControl } from 'react-bootstrap';
import SearchInput, { createFilter } from 'react-search-input';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SweetAlert from 'sweetalert-react';
import {
  customMultiSelect,
  renderSizePerPageDropDown,
  renderSetTablePaginationPanel,
  productDetailFormatter,
  sortByTitle,
  getCaret,
  sortByCogsValue,
} from '../components/CustomTable';
import { KEYS_TO_FILTERS, convertInventoryJSONToObject, isNumeric, numberFormatter } from '../constants';
import { invokeApig } from '../libs/awsLib';

class SetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: '',
      data: [],
      searchTerm: '',
      selectedOption: 'option1',
      selectedRows: [],
      fetchError: false,
      errorText: '',
      valueError: false
    };
    this.goLanding = this.goLanding.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onMarkUpChange = this.onMarkUpChange.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.onSetMarkup = this.onSetMarkup.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getProduct();
  }

  onMarkUpChange(e) {
    this.setState({ markup: e.target.value });
  }

  onConnect() {
    this.props.history.push('/inventory');
    const { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      if (data[i].cogs !== undefined) {
        // Todo: should be implement put all call
      }
    }
  }

  onSetMarkup() {
    const {markup, data, selectedRows, selectedOption} = this.state;
    if (isNumeric(markup)) {
      for (let i = 0; i < selectedRows.length; i++) {
        const index = data.findIndex((element) => {
          return element.id === selectedRows[i];
        });
        if (index > -1) {
          if (selectedOption === 'option1') {
            data[index].cogs = data[index].price / (1 + (markup / 100));
          } else {
            if (parseInt(data[index].price, 10) > markup) {
              data[index].cogs = markup;
            } else {
              this.setState({valueError: true});
            }
          }
        }
      }
      this.setState({ data });
    }
  }

  getProduct() {
    this.products().then((results) => {
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

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  products() {
    return invokeApig({ path: '/inventory' });
  }

  goLanding() {
    this.props.history.push('/');
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term
    });
  }

  onRowSelect(row, isSelected) {
    const {selectedRows} = this.state;
    if (isSelected) {
      selectedRows.push(row.id);
      this.setState({selectedRows});
    } else {
      const i = selectedRows.indexOf(row.id);
      if (i !== -1) {
        selectedRows.splice(i, 1);
      }
      this.setState({selectedRows});
    }
  }

  onSelectAll(isSelected, rows) {
    const idArray = [];
    if (isSelected) {
      for (let i = 0; i < rows.length; i++) {
        idArray.push(rows[i].id);
      }
      this.setState({selectedRows: idArray});
    } else {
      this.setState({selectedRows: []});
    }
    return true;
  }

  onCogsChange(e, row) {
    const {data} = this.state;
    const index = data.findIndex((element) => {
      return element.id === row.id;
    });
    if (index > -1) {
      data[index].cogs = e.target.value;
    }
    this.setState({data});
  }

  cogsValueFormatter(cell, row) {
    return (
      <div className="flex-center padding-t-20">
        <div className="currency-view">
          <span className="product-currency">
            $
          </span>
          <span className="product-currency-text">
            COGS
          </span>
        </div>
        <FormControl
          type="number"
          className="product-input"
          value={numberFormatter(cell)}
          onChange={(e) => {
            this.onCogsChange(e, row);
          }}
        />
      </div>
    );
  }

  render() {
    const { data, searchTerm, markup } = this.state;
    const filteredData = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
    const selectRowProp = {
      mode: 'checkbox',
      customComponent: customMultiSelect,
      onSelect: this.onRowSelect.bind(this),
      onSelectAll: this.onSelectAll.bind(this)
    };
    const options = {
      sizePerPageDropDown: renderSizePerPageDropDown,
      paginationPanel: renderSetTablePaginationPanel,
      paginationSize: 7,
      prePage: '«   Previous',
      nextPage: 'Next   »',
      withFirstAndLast: false,
      sortIndicator: false
    };

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
              <div className="table-center margin-t-60">
                <span className="select-style-comment-small">
                  Enter the COGS values for all the products.
                </span>
                <span className="select-style-comment-small margin-t-10">
                  (or)
                </span>
                <span className="select-style-comment-small margin-t-10">
                  select products and set the markup you charge and we will back-calculate their original price.
                </span>
              </div>
              <div className="table-center margin-t-10">
                <SearchInput
                  className="search-input"
                  placeholder="Search through all your products"
                  onChange={this.searchUpdated}
                  onFocus={this.onFocus}
                />
              </div>
              <div className="markup-center margin-t-30">
                <Col md={4} className="flex-right height-center">
                  <span className="select-style-comment-small">
                    Markup:
                  </span>
                  <FormControl
                    type="text"
                    className="markup-input"
                    value={markup}
                    onChange={this.onMarkUpChange}
                  />
                </Col>
                <Col md={4} className="text-left left-padding">
                  <div className="radio">
                    <label className="select-style-comment-small">
                      <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
                            Percentage
                    </label>
                  </div>
                  <div className="radio">
                    <label className="select-style-comment-small">
                      <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
                        Fixed Markup
                    </label>
                  </div>
                </Col>
                <Col md={4} className="flex-center height-center">
                  <Button className="skip-button" onClick={this.onSetMarkup}>
                    SET MARKUP
                  </Button>
                </Col>
              </div>
              <div className="markup-center margin-t-30">
                <BootstrapTable
                  ref={(table) => { this.table = table; }}
                  data={filteredData}
                  options={options}
                  bordered={false}
                  selectRow={selectRowProp}
                  pagination
                  trClassName="custom-table"
                >
                  <TableHeaderColumn
                    isKey
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    className="custom-table-header"
                    hidden
                  >
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="productDetail"
                    dataAlign="center"
                    dataSort
                    className="set-table-header"
                    dataFormat={productDetailFormatter}
                    sortFunc={sortByTitle}
                    caretRender={getCaret}
                    width="40%"
                  >
                    Product
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="cogs"
                    dataAlign="center"
                    className="set-table-header"
                    dataFormat={this.cogsValueFormatter.bind(this)}
                    dataSort
                    caretRender={getCaret}
                    sortFunc={sortByCogsValue}
                    width="20%"
                  >
                    Cogs
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="content-center margin-40">
                <Col md={6} className="text-left no-padding">
                  <Button className="skip-button" onClick={this.onConnect}>
                    SKIP FOR NOW
                  </Button>
                </Col>
                <Col md={6} className="text-right no-padding">
                  <Button className="login-button" onClick={this.onConnect}>
                    FINISH
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
        </Grid>
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
        <SweetAlert
          show={this.state.valueError}
          showConfirmButton
          type="error"
          title="Error"
          text="Markup value can't be larger than original price."
          onConfirm={() => {
                this.setState({ valueError: false });
            }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // dataset: state.dataset,
  // profile: state.user
});

export default connect(mapStateToProps)(SetTable);
