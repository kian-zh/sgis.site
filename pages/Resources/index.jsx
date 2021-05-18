import React from 'react'
import style from './index.module.less'
import wasmSVG from './wasm.svg'
import modisSVG from './satellite.svg'
import bookSVG from './book.svg'
import toolSVG from './tool.svg'
import MyHead from '../../components/MyHead'

class Resource extends React.Component {
  constructor() {
    super();
    this.state = {
      contentList: [
        {name: 'WASM (Emscripten) Installation', url: 'http://sgis.site/data/wasmInstall.rar', logo: wasmSVG, width: '20vh'},
        {name: 'MODIS Grid Data', url: 'http://sgis.site/data/MODIS_Grid.zip', logo: modisSVG, width: '10vh'},
        {name: 'The ArcGIS Book (Zh_CN)', url: 'http://sgis.site/data/The-ArcGIS-Book_zh-CN.pdf', logo: bookSVG, width: '7vh'},
        {name: 'ArcGIS OSM Editor', url: 'https://blog.csdn.net/nju_zjy/article/details/90208945', logo: toolSVG, width: '9vh'},
        {name: 'MODIS Grid Data', url: 'http://sgis.site/data/MODIS_Grid.zip', logo: modisSVG, width: '10vh'},
        {name: 'The ArcGIS Book (Zh_CN)', url: 'http://sgis.site/data/The-ArcGIS-Book_zh-CN.pdf', logo: bookSVG, width: '7vh'},
        {name: 'WASM (Emscripten) Installation', url: 'http://sgis.site/data/wasmInstall.rar', logo: wasmSVG, width: '20vh'},
        {name: 'MODIS Grid Data', url: 'http://sgis.site/data/MODIS_Grid.zip', logo: modisSVG, width: '10vh'},
        {name: 'The ArcGIS Book (Zh_CN)', url: 'http://sgis.site/data/The-ArcGIS-Book_zh-CN.pdf', logo: bookSVG, width: '7vh'},
        {name: 'WASM (Emscripten) Installation', url: 'http://sgis.site/data/wasmInstall.rar', logo: wasmSVG, width: '20vh'},
        {name: 'MODIS Grid Data', url: 'http://sgis.site/data/MODIS_Grid.zip', logo: modisSVG, width: '10vh'},
        {name: 'The ArcGIS Book (Zh_CN)', url: 'http://sgis.site/data/The-ArcGIS-Book_zh-CN.pdf', logo: bookSVG, width: '7vh'},
      ],
      listDom: []
    };
      this.container = React.createRef();
  }

  componentDidMount() {
  }

  listDom() {
    const list = this.state.contentList.map((item)=>
      <div 
        onClick={()=>{window.location=item.url}} 
        onMouseEnter={(e)=>{this.cardMouseEnter(e)}}
        onMouseLeave={(e)=>{this.cardMouseLeave(e)}}
        key={item.name} 
        style={{'transition':'all ease-out 0.2s'}}
        className={style.card}>
          <img style={{'width':item.width}} src={item.logo}></img>
          {item.name}
      </div>
    )
    return list
  }

  cardMouseEnter(e){
    const nodes = e.currentTarget.parentNode.childNodes
    nodes.forEach((item)=>{
      item.className = style.nocolorCard
    })
    e.currentTarget.className = style.card
  }

  cardMouseLeave(e){
    console.log(e.currentTarget)
    const nodes = e.currentTarget.parentNode.childNodes
    nodes.forEach((item)=>{
      item.className = style.card
    })
  }
  
  yWheel(e) {
    if(e.deltaY < 0){e.currentTarget.scrollLeft -= 100;}
    if(e.deltaY > 0){e.currentTarget.scrollLeft += 100;}
  }

  render() {
    return (
      <div className={style.background}>
        <MyHead />
        <span className={style.title} >Downloads</span>
        <div ref={this.container} className={style.container} onWheel={this.yWheel}>
            {this.listDom()}
        </div>
      </div>
    );
  }
}

export default Resource;