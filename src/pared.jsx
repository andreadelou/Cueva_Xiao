import React from 'react'
import { b } from './laberinto.jsx'
import img from './arbusto1.jpg'
const Pared = ({ x, y }) => {
  const style = {
    width: `${b}px`,
    height: `${b}px`,
    background: 'black',
    gridColumnStart: x + 1,
    gridRowStart: y + 1
  }
  return (
        <img src={img} style={style}/>
  )
}

export default Pared
