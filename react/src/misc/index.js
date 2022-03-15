import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReRender from './ReRender';

const Index = () => {
  return (
    <div>
      <ReRender />
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));