import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/schedule';
import TableRow from '../components/TableRow';
import Fb from './Fb';

class ScheduleTable extends React.Component {
  componentDidMount() {
    this.props.fetchSchedule(this.props.curr);
    this.props.socket.on('other borrow', this.props.otherBorrow);
    this.props.socket.on('other cancel', this.props.otherCancel);
  }
  render() {
    const _borrow = (data) => {
      this.props.borrow(
        this.props.socket,
        Object.assign({},
          data, {
            fbID: this.props.fbID,
            date: this.props.curr,
          }
        )
      );
    };
    const _cancel = (data) => {
      this.props.cancel(
        this.props.socket,
        Object.assign({},
          data, {
            fbID: this.props.fbID,
            date: this.props.curr,
          }
        )
      );
    };
    const schedules = this.props.schedules;
    return (
      <div>
        <Fb />
        <h3 className="text-center">{this.props.curr}</h3>
        <nav>
          <ul className="pager">
            <li className="previous">
              <a href="#"><span aria-hidden="true">&larr;</span> Prev</a>
            </li>
            <li className="next">
              <a href="#">Next <span aria-hidden="true">&rarr;</span></a>
            </li>
          </ul>
        </nav>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              {_.range(24).map((i) => <th key={i}>{i}</th>)}
            </tr>
          </thead>
          <tbody>
            {_.keys(schedules).map((machine) => (
              <TableRow
                key={machine}
                machine={machine}
                schedules={schedules[machine]}
                borrow={_borrow}
                cancel={_cancel}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ScheduleTable.propTypes = {
  curr: React.PropTypes.string,
  fbID: React.PropTypes.string,
  schedules: React.PropTypes.object,
  socket: React.PropTypes.object,
  fetchSchedule: React.PropTypes.func,
  borrow: React.PropTypes.func,
  cancel: React.PropTypes.func,
  otherBorrow: React.PropTypes.func,
  otherCancel: React.PropTypes.func,
};

const mapStateToProps = (state) => (
  Object.assign({},
    state.schedule,
    { fbID: state.fb.fbID }
  )
);

const mapDispatchToProps = (dispatch) => ({
  fetchSchedule(date) {
    dispatch(actions.fetchSchedule(date));
  },
  borrow(socket, data) {
    socket.emit('borrow', data, (success) => {
      if (!success) {
        dispatch(actions.borrowFail(data));
      }
    });
    dispatch(actions.borrow(data));
  },
  cancel(socket, data) {
    socket.emit('cancel', data, (success) => {
      if (!success) {
        dispatch(actions.cancelFail(data));
      }
    });
    dispatch(actions.cancel(data));
  },
  otherBorrow(data) {
    dispatch(actions.otherBorrow(data));
  },
  otherCancel(data) {
    dispatch(actions.otherCancel(data));
  },
});

export default ScheduleTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTable);

