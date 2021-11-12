import React from 'react';
import ReactDOM from 'react-dom';
import Es from './EventState';
import Timer from './Timer';

const Index = () => {
  return (
    <div>
      <Es />
      <Timer />
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));