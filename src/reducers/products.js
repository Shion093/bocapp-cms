import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { getAllMenus } from './menus';

export const PRODUCT_CREATED = createAction('PRODUCT_CREATED');
export const PRODUCT_GET_ALL = createAction('PRODUCT_GET_ALL');
export const PRODUCT_ASSIGNED = createAction('PRODUCT_ASSIGNED');
export const MENU_SELECTED = createAction('MENU_SELECTED');
export const HANDLE_PRODUCT_INPUT = createAction('HANDLE_PRODUCT_INPUT');
export const HANDLE_PRODUCT_LOADER = createAction('HANDLE_PRODUCT_LOADER');
export const SELECT_PRODUCT = createAction('SELECT_PRODUCT');
export const CLEAR_PRODUCT_INPUT = createAction('CLEAR_PRODUCT_INPUT');
export const CLEAR_SELECTED_MENU = createAction('CLEAR_SELECTED_MENU');
export const CLEAR_PRODUCT_STATE = createAction('CLEAR_PRODUCT_STATE');

export const initialState = I.from({
  create       : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
    quantity    : '',
  },
  edit         : {
    name        : '',
    description : '',
    picture     : '',
    quantity    : '',
    price       : '',
    _id         : '',
    menu        : '',
  },
  products        : [],
  loader       : false,
  selectedMenu : {},
});

export function createProduct (blob) {
  return async (dispatch, getState) => {
    try {
      const {
        reducers : {
          products : { create, products },
        }
      } = getState();
      const form = new FormData();
      const { description, name, price, quantity } = create;
      form.append('description', description);
      form.append('name', name);
      form.append('price', price);
      form.append('picture', blob);
      form.append('quantity', quantity);
      const { data } = await axios.post('products/create', form);
      const addNewProduct= I.asMutable(products);
      addNewProduct.unshift(data);
      dispatch(HANDLE_MODAL('createProductModal'));
      dispatch(HANDLE_PRODUCT_LOADER());
      dispatch(PRODUCT_CREATED(addNewProduct));
      dispatch(CLEAR_PRODUCT_INPUT());
    } catch (e) {
      console.log(e);
    }

  }
}

export function updateProduct (blob) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { products : { edit, selectedMenu } } } = getState();
      const form = new FormData();
      const { description, name, _id, picture, price, quantity } = edit;
      form.append('description', description);
      form.append('name', name);
      form.append('_id', _id);
      form.append('price', price);
      form.append('picture', quantity);
      form.append('menuId', selectedMenu._id);
      if (blob) {
        form.append('picture', blob);
      } else {
        form.append('picture', picture);
      }
      const { data } = await axios.post('products/update', form);
      dispatch(HANDLE_MODAL('editProductModal'));
      dispatch(HANDLE_PRODUCT_LOADER());
      dispatch(PRODUCT_GET_ALL(data.products));
      dispatch(MENU_SELECTED(data.menu));
      dispatch(CLEAR_PRODUCT_INPUT());
    } catch (e) {
      console.log(e);
    }

  }
}

export function deleteProducts (productId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { products : { selectedMenu } } } = getState();
      const { data } = await axios.post('products/delete', { productId, menuId : selectedMenu._id });
      dispatch(PRODUCT_GET_ALL(data.products));
      dispatch(MENU_SELECTED(data.menu));
    } catch (e) {
      console.log(e);
    }
  }
}

export function getAllProducts () {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('products/admin/all');
      dispatch(PRODUCT_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuChange (_id) {
  return (dispatch, getState) => {
    const { reducers : { menus : { menus }, products : { selectedMenu } } } = getState();
    if (_id !== selectedMenu._id) {
      const menu = _.find(menus, { _id });
      dispatch(MENU_SELECTED(menu));
    }
  }
}

export function assignProduct (productId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { products : { products, selectedMenu } } } = getState();
      const { data } = await axios.post('products/assign', { productId, menuId : selectedMenu._id });
      const newProducts = I.flatMap(products, (value) => {
        if (value._id === productId) {
          return [];
        } else {
          return value;
        }
      });
      const menuWithNewProducts = I.asMutable(selectedMenu.products);
      menuWithNewProducts.unshift(data);
      const menu = I.set(selectedMenu, 'products', menuWithNewProducts);
      dispatch(PRODUCT_ASSIGNED({ products : newProducts, selectedMenu : menu }));
    } catch (e) {
      console.log(e);
    }
  }
}

export function removeProduct (productId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { products : { products, selectedMenu } } } = getState();
      const { data } = await axios.post('products/remove', { productId, menuId : selectedMenu._id });

      const newProducts = I.asMutable(products);
      newProducts.unshift(data.product);

      dispatch(PRODUCT_ASSIGNED({ products : newProducts, selectedMenu : data.menu }));
      dispatch(getAllMenus(false));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleProductInputs (type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_PRODUCT_INPUT({ type, name, value }))
  }
}

export function handleProductLoader () {
  return (dispatch) => {
    dispatch(HANDLE_PRODUCT_LOADER())
  }
}

export default handleActions({
  PRODUCT_CREATED       : (state, action) => {
    return I.merge(state, { products : action.payload });
  },
  PRODUCT_GET_ALL       : (state, action) => {
    return I.merge(state, { products : action.payload });
  },
  PRODUCT_ASSIGNED      : (state, action) => {
    const { products, selectedMenu } = action.payload;
    return I.merge(state, { products, selectedMenu });
  },
  HANDLE_PRODUCT_INPUT  : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  HANDLE_PRODUCT_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  MENU_SELECTED      : (state, action) => {
    return I.set(state, 'selectedMenu', action.payload);
  },
  SELECT_PRODUCT        : (state, action) => {
    const { name, description, picture, _id, price, quantity, menu } = action.payload;
    return I.merge(state, { edit : { name, description, picture, _id, price, menu, quantity } });
  },
  CLEAR_PRODUCT_INPUT   : (state) => {
    return I.merge(state, { edit : initialState.edit, create : initialState.create });
  },
  CLEAR_SELECTED_MENU   : (state) => {
    return I.merge(state, { selectedMenu : initialState.selectedMenu });
  },
  CLEAR_PRODUCT_STATE : (state) => {
    return I.merge(state, initialState);
  },
}, initialState)