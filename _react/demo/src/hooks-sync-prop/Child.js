import React, { useState, useEffect } from 'react';

export default ({ info }) => {
  const [info1, setInfo1] = useState(null)

  useEffect(() => {
    setInfo1(info)
  }, [info])

  const onClick = () => {
    setInfo1({
      name: Math.random() + 'child',
      age: Math.random(),
    })
  }

  return (
    <div>
      <button onClick={onClick}>Child 点击</button>
      {JSON.stringify(info1)}
    </div>
  )
}
