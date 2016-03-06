import React from 'react';
import _ from 'lodash';

const style = {
  cell: {
    cursor: 'pointer',
    padding: 0,
  },
  borrowed: {
    background: '#ddd',
  },
};

function isBorrowed(schedules, slot) {
  for (let i = 0; i < schedules.length; i++) {
    if (schedules[i].slot === slot) {
      return schedules[i];
    }
  }
  return false;
}

const TableRow = ({ machine, schedules, pictures, borrow, cancel, getPicture }) => (
  <tr>
    <th>{machine}</th>
    {_.range(24).map((i) => {
      const borrowed = isBorrowed(schedules, i);
      function _onClick() {
        if (borrowed) {
          cancel({
            slot: i,
            machine,
          });
        } else {
          borrow({
            slot: i,
            machine,
          });
        }
      }
      if (borrowed && !pictures[borrowed.fbID]) {
        getPicture(borrowed.fbID);
      }
      return (
        <td
          key={i}
          style={style.cell}
          onClick={_onClick}
        >{(borrowed) ? <img src={pictures[borrowed.fbID]} /> : ''}</td>
      );
    })}
  </tr>
);

TableRow.propTypes = {
  machine: React.PropTypes.string,
  schedules: React.PropTypes.array,
  pictures: React.PropTypes.object,
  borrow: React.PropTypes.func,
  cancel: React.PropTypes.func,
  getPicture: React.PropTypes.func,
};

export default TableRow;

