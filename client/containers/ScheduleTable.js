import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/schedule';
import TableRow from '../components/TableRow';

class ScheduleTable extends React.Component {
  componentDidMount() {
    this.props.fetchSchedule(this.props.curr);
  }
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            {_.range(24).map((i) => <th key={i}>{i}</th>)}
          </tr>
        </thead>
        <tbody>
          {_.keys(this.props.schedules).map((machine) => (
            <TableRow key={machine} name={machine} />
          ))}
        </tbody>
      </table>
    );
  }
}

ScheduleTable.propTypes = {
  curr: React.PropTypes.string,
  schedules: React.PropTypes.object,
  fetchSchedule: React.PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchSchedule(date) {
    dispatch(actions.fetchSchedule(date));
  },
});

export default ScheduleTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTable);

