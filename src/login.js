/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2017/05/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import service from './api-service';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_LOADED = 'LOGIN_LOADED';
const LOGIN_ERROR = 'LOGIN_ERROR';

const initialState = {
  isLoggedIn: false,
  token: null,
  showSpinner: false,
  showErrorMessage: null
};

export function LoginLoading () {
  return {
    type: LOGIN_LOADING
  }
}

export function LoginLoaded (payload) {
  return {
    type: LOGIN_LOADED,
    payload: payload
  }
}

export function LoginError (payload) {
  return {
    type: LOGIN_ERROR,
    payload: payload
  }
}

export function onLogging (payload) {
  return function (dispatch) {
    dispatch(LoginLoading());
    service.onLogging(payload).then((results) => {
      dispatch(LoginLoaded(results));
    }).catch((error) => {
      dispatch(LoginError());
      console.log('Promise RECT!!!!!', error);
    });
  }
}

const login = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        showSpinner: true
      };
    case LOGIN_LOADED:
      return {
        ...state,
        isLoggedIn: true,
        showSpinner: false,
        token: action.payload.token
      };
    case LOGIN_ERROR:
      return {
        isLoggedIn: false,
        token: null,
        showSpinner: false,
        showErrorMessage: action.payload.message
      };
    default:
      return state;
  }
};

export default login;