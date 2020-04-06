import React, { Component, useState, useEffect, useRef } from 'react';

function Input() {
  const inputEle = useRef(null)
  const onClickBtn = () => {
    inputEle.current.focus()
    console.log(inputEle)
  }
  return (
    <div>
      <span>我的 input</span>
      <input type="text" placeholder='开市啊' ref={inputEle} />
      <button onClick={onClickBtn}>点击啊啊input</button>
    </div>
  )
}

function HOOKTest(props) {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')

  useEffect(() => {
    console.log(count)
    if (count >= 5) {
      setName('李白')
    }
  }, [count])
  function setCountHandle() {
    setCount(count + 1)
  }
  return (
    <div>
      <div onClick={setCountHandle}>
        {name}
        点击计时器{count}
      </div >
      <Input/>
    </div>
  )
}


export default HOOKTest
