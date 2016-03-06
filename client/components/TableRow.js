import React from 'react';
import _ from 'lodash';

const TableRow = ({ name }) => (
  <tr>
    <th>{name}</th>
    {_.range(24).map((i) => <td key={i}></td>)}
  </tr>
);

TableRow.propTypes = {
  name: React.PropTypes.string,
};

export default TableRow;

