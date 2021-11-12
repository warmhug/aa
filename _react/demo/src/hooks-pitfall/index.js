import React from 'react';
import ReactDOM from 'react-dom';
import Es from './EventState';

const Index = () => {
  return (
    <div>
      <Es />
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));