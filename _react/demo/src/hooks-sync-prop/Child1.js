import React, { useState, useEffect, useRef } from 'react';

export default () => {
  const [bool, setBool] = useState(false)
  // ref 在每次 did mount 时 新建。
  const obj = useRef({})

  useEffect(() => {
    console.log('did mount', obj.current);
    return () => {
      console.log('un mount', obj.current);
    }
  }, [])

  const onClick = () => {
    setBool(!bool)
    obj.current = parseInt(Math.random() * 1000)
  }

  return (
    <div>
      <button onClick={onClick}>Child1 点击</button>
      {JSON.stringify(obj.current)}
    </div>
  )
}
