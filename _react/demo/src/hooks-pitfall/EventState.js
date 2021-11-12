import React, { useState, useEffect } from 'react';

export default (props) => {
  const [pageData, setPageData] = useState();

  const onSubmit = () => {
    console.log('pageData', pageData);
  };

  useEffect(() => {
    setTimeout(() => {
      setPageData(1);
    }, 100);

    // did mount 注册的事件处理函数里 得不到最新的 state 值
    const pageVisible = () => {
      onSubmit();
    };
    document.addEventListener('visibilitychange', pageVisible);
    return () => {
      document.removeEventListener('visibilitychange', pageVisible);
    };
  }, []);

  return (
    <div>
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}
