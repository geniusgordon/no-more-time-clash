import React from 'react';
import { render } from 'react-dom';

import Fb from './containers/Fb';

const Index = () => (
  <div>
    <div>Song la</div>
    <Fb />
  </div>
);

render(
  <Index />,
  document.getElementById('root')
);

