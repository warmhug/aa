import React from 'react';
import ReactDOM from 'react-dom';
import Debounce from './Debounce';
import Throttle from './Throttle';
import Es from './EventState';

const Index = () => {
  return (
    <div>
      <Debounce />
      <Throttle />
      <Es />
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));