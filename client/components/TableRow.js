import React from 'react';
import _ from 'lodash';

const style = {
  cell: {
    cursor: 'pointer',
  },
  borrowed: {
    background: '#ddd',
  },
};

function isBorrowed(schedules, slot) {
  for (let i = 0; i < schedules.length; i++) {
    if (schedules[i].slot === slot) {
      return true;
    }
  }
  return false;
}

const TableRow = ({ machine, schedules, borrow, cancel }) => (
  <tr>
    <th>{machine}</th>
    {_.range(24).map((i) => {
      const borrowed = isBorrowed(schedules, i);
      function _onClick() {
        console.log(borrowed);
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
      return (
        <td
          key={i}
          style={Object.assign({}, style.cell, borrowed ? style.borrowed : {})}
          onClick={_onClick}
        ></td>
      );
    })}
  </tr>
);

TableRow.propTypes = {
  machine: React.PropTypes.string,
  schedules: React.PropTypes.array,
  borrow: React.PropTypes.func,
  cancel: React.PropTypes.func,
};

export default TableRow;

