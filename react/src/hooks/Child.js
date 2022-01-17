import React, { useState, useEffect } from 'react';

export default ({ onClick }) => {
  console.log('onClick change will run?');

  return (
    <div>
      <button onClick={onClick}>提交1</button>
      父组件 避免 向子组件 传递回调函数，改为 传递 dispatch 方法，参考 DeepChild 做法
    </div>
  )
}
