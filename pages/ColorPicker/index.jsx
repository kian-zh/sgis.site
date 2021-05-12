import { hsl2rgb, rgb2hex, hsla2rgba } from './utils';
import React from 'react'
import style from './index.module.less'
import ImgBackground from './background.png'

class ColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      color: {
        H: '0',
        S: '50%',
        L: '50%',
        A: '100%',
      },
      canvas1Click: {
        x:0,
        y:0,
      },
      canvas2Click: {
        x:360,
      },
      canvas3Click: {
        x:0,
      }
    };
  }

  componentDidMount() {
    this.drawCanvas1()
    this.drawCanvas2()
    this.drawCanvas3()
  }

  componentDidUpdate() {
    this.drawCanvas1()
    this.drawCanvas2()
    this.drawCanvas3()
  }

  drawCanvas1(){
    const ctx=this.canvas1.getContext("2d");
    ctx.clearRect(0,0,720,200);
    for(let i =0; i<720; i=i+10 ){
      for(let j =0; j<200; j=j+4){
        ctx.fillStyle =`hsl(${i/2},${100-j/2}%,50%)`
        ctx.fillRect(i, j, 10, 4);
      }
    }
    const pointer = this.state.canvas1Click
    ctx.fillStyle =`#000000`
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 10, 0, 360)
    ctx.stroke()
    ctx.closePath()
  }

  drawCanvas2(){
    const ctx=this.canvas2.getContext("2d");
    ctx.clearRect(0,0,720,50);
    for(let i =0; i<720; i=i+10 ){
        ctx.fillStyle =`hsl(${this.state.color.H},${this.state.color.S},${i/7.2}%)`
        ctx.fillRect(i, 0, 10, 50);
    }
    const pointer = this.state.canvas2Click
    ctx.fillStyle =`#000000`
    ctx.beginPath();
    ctx.arc(pointer.x, 25, 10, 0, 360)
    ctx.stroke()
    ctx.closePath()
  }

  drawCanvas3(){
    const ctx=this.canvas3.getContext("2d");
    ctx.clearRect(0,0,720,50);
    var img = new Image();
    img.src = ImgBackground;
    img.onload = () => {
      var ptrn = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(0, 0, 720, 50);
      for(let i =0; i<720; i=i+10 ){
          ctx.fillStyle =`hsla(${this.state.color.H},${this.state.color.S},${this.state.color.L},${100-i/7.2}%)`
          ctx.fillRect(i, 0, 10, 50);
      }
      const pointer = this.state.canvas3Click
      ctx.fillStyle =`#000000`
      ctx.beginPath();
      ctx.arc(pointer.x, 25, 10, 0, 360)
      ctx.stroke()
      ctx.closePath()
    }
  }

  handleClickCanvas1(e){
    const x = e.clientX - this.canvas1.getBoundingClientRect().left
    const y = e.clientY - this.canvas1.getBoundingClientRect().top
    this.setState({
      color: {...this.state.color, H: Math.round(x/2).toString(), S:`${Math.round(100-y/2)}%`},
      canvas1Click: {x: x, y: y},
    })
    this.drawCanvas2()
  }

  handleClickCanvas2(e){
    const x = e.clientX - this.canvas2.getBoundingClientRect().left
    this.setState({
      color: {...this.state.color, L:`${Math.round(x/7.2)}%`},
      canvas2Click: {x: x},
    })
    this.drawCanvas2()
  }

  handleClickCanvas3(e){
    const x = e.clientX - this.canvas3.getBoundingClientRect().left
    this.setState({
      color: {...this.state.color, A:`${Math.round(100-x/7.2)}%`},
      canvas3Click: {x: x},
    })
    this.drawCanvas3()
  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.container}>
          <h3>ColorPicker</h3>
            <h5>Hue & Saturation</h5>
            <canvas ref={el => this.canvas1 = el} width="720" height="200" style={{'border':'2px solid #33334d'}} onClick={(e)=>{this.handleClickCanvas1(e)}}>
              Your browser does not support the canvas element.
            </canvas>
            <h5>Lightness</h5>
            <canvas ref={el => this.canvas2 = el} width="720" height="50" style={{'border':'2px solid #33334d'}} onClick={(e)=>{this.handleClickCanvas2(e)}}>
              Your browser does not support the canvas element.
            </canvas>
            <h5>Preview</h5>
            <div 
              style={{
                'backgroundColor': `hsl(${this.state.color.H},${this.state.color.S},${this.state.color.L})`,
                'color': this.state.canvas2Click.x > 360? '#000000': '#ffffff',
              }} 
              className={style.showColor}>
              {`hsl(${this.state.color.H},${this.state.color.S},${this.state.color.L})`}<br/>
              {hsl2rgb(`hsl(${this.state.color.H},${this.state.color.S},${this.state.color.L})`)}<br/>
              {rgb2hex(hsl2rgb(`hsl(${this.state.color.H},${this.state.color.S},${this.state.color.L})`))}
            </div>
            <h5>alpha(opacity)</h5>
            <canvas ref={el => this.canvas3 = el} width="720" height="50" style={{'border':'2px solid #33334d'}} onClick={(e)=>{this.handleClickCanvas3(e)}}>
              Your browser does not support the canvas element.
            </canvas>
            <h5>Preview</h5>
            <div 
              style={{
                'backgroundColor': `hsla(${this.state.color.H},${this.state.color.S},${this.state.color.L},${this.state.color.A})`,
                'color': (this.state.canvas2Click.x > 360 || this.state.canvas3Click.x > 360)? '#000000': '#ffffff',
              }} 
              className={style.showColor}>
              {`hsla(${this.state.color.H},${this.state.color.S},${this.state.color.L},${this.state.color.A})`}<br/>
              {hsla2rgba(`hsl(${this.state.color.H},${this.state.color.S},${this.state.color.L},${this.state.color.A})`)}
            </div>
        </div>
    </div>
    );
  }
}

export default ColorPicker;