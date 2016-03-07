import Immutable from 'immutable';
import moment from 'moment';
import * as actions from '../actions/schedule';

const initialState = Immutable.fromJS({
  prev: '',
  curr: moment().utcOffset('+0800').format('YYYY/MM/DD'),
  next: '',
  schedules: {},
});

const scheduleReducer = (state = initialState, action) => {
  if (action.type === actions.REQUEST_SCHEDULE_DONE) {
    return Immutable.fromJS(action.data);
  } else if (action.type === actions.OTHER_BORROW) {
    if (state.get('curr') === action.schedule.date) {
      return state.updateIn(['schedules', action.machine],
        (schedules) => schedules.push(Immutable.fromJS(action.schedule)));
    }
  } else if (action.type === actions.OTHER_CANCEL) {
    if (state.get('curr') === action.schedule.date) {
      const schedules = state.getIn(['schedules', action.machine]);
      for (let i = 0; i < schedules.size; i++) {
        if (schedules.getIn([i, 'slot']) === action.schedule.slot) {
          return state.updateIn(['schedules', action.machine], (s) => s.delete(i));
        }
      }
    }
  }
  return state;
};

export default scheduleReducer;

