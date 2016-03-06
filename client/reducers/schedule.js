import * as actions from '../actions/schedule';
import moment from 'moment';

const initialState = {
  prev: '',
  curr: moment().utcOffset('+0800').format('YYYY/MM/DD'),
  next: '',
  schedules: {},
};

const scheduleReducer = (state = initialState, action) => {
  if (action.type === actions.REQUEST_SCHEDULE_DONE) {
    return action.data;
  }
  return state;
};

export default scheduleReducer;

