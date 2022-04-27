import React, { useEffect } from 'react'
import Pared from './pared.jsx'
import Player from './player.jsx'
import Goal from './goal.jsx'
import Floor from './floor.jsx'
import img from './background.png'
import colors from 'webpack-dev-server/lib/utils/colors'

const w=10
const h=10
const b=50

const Laberinto = () =>{
    const loadMaze = () =>{
        
        fetch(`https://maze.juanelcaballo.club/?type=json&w=${width}&h=${height}`).then(
            (response)=>{
                return response.json()
            }   
        ).then(
            (response)=>{
                setLaberinto(response)
            }
        )
    }

    //Creacion de las variables
    const [laberinto, setLaberinto] = React.useState([])
    const [direction, setDirection] = React.useState(0)
    const [x, setX] = React.useState(1)
    const [y, setY] = React.useState(1)
    const [width, setWidth] = React.useState(w)
    const [height, setHeight] = React.useState(h)

    const dimensionWidth = () =>{
        const widthValue = document.getElementById('ancho').value
        const newWidth = parseInt(widthValue)
        setWidth(newWidth)
        setX(1)
        setY(1)
    }

    const dimensionHeight = () =>{
        const heightValue = document.getElementById('alto').value
        const newHeight = parseInt(heightValue)
        setHeight(newHeight)
        setX(1)
        setY(1)
    }
    

    useEffect(loadMaze,[])
    
    //Movimiento del sprite
    //Dependiento de que tecla presione es como va a rotar el sprite
    const handleKeyDown = (e)=> {
        if (e.key === "ArrowRight") {
            setDirection(1)
            if(laberinto[y][x+1]===' '||laberinto[y][x+1]==='p'||laberinto[y][x+1]==='g'){
                setX(x+1)
            }
        }
        if (e.key === "ArrowLeft") {
            setDirection(3)
            if(laberinto[y][x-1]===' '||laberinto[y][x-1]==='p'||laberinto[y][x-1]==='g'){
                setX(x-1)
            }
        }
        if (e.key === "ArrowUp") {
            setDirection(0)
            if(laberinto[y-1][x]===' '||laberinto[y-1][x]==='p'||laberinto[y-1][x]==='g'){
                setY(y-1)
            }
        }
        if (e.key === "ArrowDown") {
            setDirection(2)
            if(laberinto[y+1][x]===' '||laberinto[y+1][x]==='p'||laberinto[y+1][x]==='g'){
                setY(y+1)
            }
        }
    }

    const style = {
        width: `${((width+1)+(width*2))*b}px`,
        height: `${b*((height+1)+(height))}px`,
        background: '#814c08',
        display: 'grid',
        gridTemplate: `repeat(${(width+1)+(width*2)},${b}px)/repeat(${(height+1)+(height)},${b}px)`
    }
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginBottom:'20px',
        justifyContent: 'center',
    }
    const titleStyle = {
        fontSize: '60px',
        fontFamily:'arial',
    }
    const settingsStyle = {
        marginLeft: '800px',
        fontFamily: 'arial',
        background:'grey',
        borderRadius:'10%',
        border:'solid',
        padding:'20px'
    }
    const pageStyle = {
        width:'100%',
        height:'100%',
        backgroundImage: `url(${img})`
    }
    
    return (
    <div  onKeyDown={handleKeyDown} tabIndex = "0">
        <div style={containerStyle}>
            <h1 style={titleStyle}>Xiaos's Cave</h1>
            <div style={settingsStyle} >
                <center><h3>Settings</h3></center>
                <h4>Ancho:</h4>
                <input type="number" id="ancho" name="quantity" min="3" max="10" placeholder={width}></input>
                <input value='Guardar' type="submit" onClick={dimensionWidth} ></input>
                <h4>Alto:</h4>
                <input type="number" id="alto" name="quantity" min="3" max="10" placeholder={height}></input>
                <input value='Guardar' type="submit" onClick={dimensionHeight}></input>  
                <br/>
                <br/>
                <button onClick={loadMaze}>Actualizar</button>
            </div>          
        </div>
        <div style={style}>
          {laberinto.map((row,rowIndex)=>{
            return row.map((column,columnIndex)=>{
                if(column==='-' || column==='+'||column==='|'){
                    return <Pared key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex}/>
                }
                if(column ==='p'){
                    return <Player direction={direction} x={x} y={y}/>
                }
                if(column ===' '){
                    return <Floor key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex}/>
                }
                if(column ==='g'){
                    // alert("Ganaste, `SIIUUUU`!")
                    return <Goal key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex}/>
                }
                else{
                    return null
                }
                
            })
        })}  
        </div>
    </div>
    )
    
}

export {b}
export default Laberinto
