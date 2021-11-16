import React from 'react';
import ReactDOM from 'react-dom';
import Debounce from './Debounce';
import Throttle from './Throttle';
import Es from './EventState';
import Timer from './Timer';

const Index = () => {
  return (
    <div>
      <Debounce />
      <Throttle />
      <Es />
      <Timer />
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));