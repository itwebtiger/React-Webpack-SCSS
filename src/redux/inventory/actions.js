import {
  INVENTORY_GET_STARTED,
  INVENTORY_GET_SUCCESS,
  INVENTORY_GET_FAILURE
} from './types';
import { invokeApig } from '../../libs/awsLib';
// import {convertInventoryJSONToObject} from '../constants';

export const inventoryGetStarted = (dataset) => ({
  type: INVENTORY_GET_STARTED,
  dataset
});

export const inventoryGetSuccess = (res) => ({
  type: INVENTORY_GET_SUCCESS,
  data: res
});

export const inventoryGetFailure = (error) => ({
  type: INVENTORY_GET_FAILURE,
  error
});

export const inventoryGetRequest = (dataset, history) => (dispatch) => {
  invokeApig({ path: '/inventory' }).then((results) => {
    // todo: inventory should defined to redux store
    // dispatch(inventoryGetSuccess(results));

  })
    .catch(error => {
      console.log('get inventory error', error);
    });
};
