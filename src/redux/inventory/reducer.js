import {
  INVENTORY_GET_STARTED,
  INVENTORY_GET_SUCCESS,
  INVENTORY_GET_FAILURE
} from './types';

const INITIAL_STATE = {
  inventoryData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVENTORY_GET_STARTED:
      return {
        ...state,
      };
    case INVENTORY_GET_SUCCESS:
      return {
        ...state,
        inventoryData: action.data
      };
    case INVENTORY_GET_FAILURE:
      return {
        loading: false,
        loaded: false,
        error: action.error,
        inventoryData: []
      };
    default:
      return state;
  }
};
