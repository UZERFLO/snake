import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[snake,setsnake]=useState([{x:5,y:5},{x:5,y:6}]);
  const [apple,setapple]=useState({x:10,y:10});
  const [dir,setdir]=useState('r');
  const [score,setscore]=useState(0);
  useEffect(()=>{
  const key= (e)=>{
    if(e.key=="ArrowUp")setdir('u');
    if(e.key=="ArrowDown")setdir('d');
    if(e.key=="ArrowLeft")setdir('l');
    if(e.key=="ArrowRight")setdir('r');
  };
  window.addEventListener("keydown",key);
  return ()=> window.removeEventListener("keydown",key);
  },[dir]);
  useEffect(()=>{
    const int=setInterval(()=>{
    setsnake((psnake)=>{
    const nake=[...psnake];
    for(let i=nake.length-1;i>0;i--)nake[i]={...nake[i-1]};
    if(dir=='r'){
      nake[0].y+=1;
    }
    if(dir=='l'){
      nake[0].y-=1;
    }
    if(dir=='d'){
      nake[0].x+=1;
    }
    if(dir=='u'){
      nake[0].x-=1;
    }return nake;
    });
    if(snake[0].x>49||snake[0].y>49||snake[0].x<0||snake[0].y<0){alert(`game over. Score: ${score}`);setsnake([{x:0,y:0}]);return;}
    if((snake[0].x==apple.x && snake[0].y==apple.y)||(snake[0].x==apple.x+1 && snake[0].y==apple.y)||(snake[0].x==apple.x && snake[0].y==apple.y+1)||(snake[0].x==apple.x+1 && snake[0].y==apple.y+1)){setsnake((pake)=>{const nake=[...pake];nake.push({x:2*nake[nake.length-1].x-nake[nake.length-2].x,y:2*nake[nake.length-1].y-nake[nake.length-2].y});return nake;});setapple({x:Math.floor(Math.random()*48),y:Math.floor(Math.random()*48)});setscore(score+1);}
  },150
  );
  return ()=>clearInterval(int);
  },[snake]);
  function Board(){
    const a=[];
    for(let i=0;i<50;i++){
      for(let j=0;j<50;j++){
        if(snake.some((t)=>{return t.x==i && t.y==j;})){
          var cell=<div className='scell' id={i+'-'+j}></div>;
        }
        else{
          if((i==apple.x && j==apple.y)||(i==apple.x+1 && j==apple.y)||(i==apple.x && j==apple.y+1)||(i==apple.x+1 && j==apple.y+1)){
            var cell=<div className='acell' id={i+'-'+j}></div>
          }
          else{
            var cell=<div className='cell' id={i+'-'+j}></div>
          }
        }
        a.push(cell);
      }
    }
    return a;
  }
  return (
    <div className="App">
      <div className='board'>
        {Board()}
      </div>
      <div className="score">Score:{score}</div>
    </div>
  );
}

export default App;
