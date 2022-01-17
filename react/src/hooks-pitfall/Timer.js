import React, { useState, useEffect } from 'react';

export default (props) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setCount(count + 1);
      // https://reactjs.org/docs/hooks-reference.html#functional-updates
      setCount(count => count + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // }, [count]);

  return (
    <div>The count is: {count}</div>
  );
}
