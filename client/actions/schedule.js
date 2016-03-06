import { ajax } from 'jquery';

export const REQUEST_SCHEDULE = 'REQUEST_SCHEDULE';
export const REQUEST_SCHEDULE_DONE = 'REQUEST_SCHEDULE_DONE';
export const FETCH_SCHEDULE = 'FETCH_SCHEDULE';

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

