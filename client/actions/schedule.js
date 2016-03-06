import { ajax } from 'jquery';

export const REQUEST_SCHEDULE = 'REQUEST_SCHEDULE';
export const REQUEST_SCHEDULE_DONE = 'REQUEST_SCHEDULE_DONE';
export const FETCH_SCHEDULE = 'FETCH_SCHEDULE';
export const BORROW = 'BORROW';
export const BORROW_SUCCESS = 'BORROW_SUCCESS';
export const BORROW_FAIL = 'BORROW_FAIL';
export const OTHER_BORROW = 'OTHER_BORROW';
export const CANCEL = 'CANCEL';
export const CANCEL_SUCCESS = 'CANCEL_SUCCESS';
export const CANCEL_FAIL = 'CANCEL_FAIL';
export const OTHER_CANCEL = 'OTHER_CANCEL';

export function requestSchedule(date) {
  return {
    type: REQUEST_SCHEDULE,
    date,
  };
}

export function requestScheduleDone(data) {
  return {
    type: REQUEST_SCHEDULE_DONE,
    data,
  };
}

export function fetchSchedule(date) {
  return (dispatch) => {
    dispatch(requestSchedule(date));
    ajax({
      url: `api/schedule/${date}`,
      method: 'GET',
      success(data) {
        dispatch(requestScheduleDone(data));
      },
    });
  };
}

export function borrow(data) {
  return {
    type: BORROW,
    data,
  };
}

export function borrowSuccess(data) {
  return {
    type: BORROW_SUCCESS,
    data,
  };
}

export function borrowFail() {
  return {
    type: BORROW_FAIL,
  };
}

export function otherBorrow(data) {
  return Object.assign({
    type: OTHER_BORROW,
  }, data);
}

export function cancel(data) {
  return {
    type: CANCEL,
    data,
  };
}

export function cancelSuccess(data) {
  return {
    type: CANCEL_SUCCESS,
    data,
  };
}

export function cancelFail() {
  return {
    type: CANCEL_FAIL,
  };
}

export function otherCancel(data) {
  return Object.assign({
    type: OTHER_CANCEL,
  }, data);
}

