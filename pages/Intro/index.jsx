import React from 'react'
//  import pic_me from './me.png'
import pic_me from './me2.jpg'
import pic_linkedin from './linkedin.png'
import pic_github from './github.png'
import pic_zhihu from './zhihu.png'
import pic_csdn from './csdn.png'
import style from './index.module.less'
import MyHead from '../../components/MyHead'
import MapboxHead from '../../components/MapboxHead'
import MapPage from './MapPage'

class Intro extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={style.all}>
        <MyHead />
        <MapboxHead />
        <div style={{backgroundColor:'teal', position:'fixed',top:'0px',left:'0px',right:'0px',bottom:'0px',zIndex:'-99'}}>
        </div>

        {/*第一页*/}
        <div className={style.page1}>
          <div className={style.page1Content}>
            <img className={style.myPic} alt='Me' src={pic_me} /><br/>
            <h1>Jingyuan Zhang <span style={{whiteSpace:'nowrap'}}>张景源</span></h1>
            <h2 style={{ color: 'rgba(109, 78, 70, 0.6)' }}>Front-End / GeoInfo / Cartography</h2>
            <h2>
              <a href="https://blog.csdn.net/nju_zjy">📃Blog</a>{' '}
              <a onClick={()=>{alert('正在建设中')}}>🌉Album</a>{' '}
              <a href="http://sgis.site/Resources.html">🚚Downloads</a> 
            </h2>
            <h2>
              <a href="https://www.linkedin.com/in/zhang1998/">🐤Linkedin</a>{' '}
              <a href="https://www.zhihu.com/people/sgis">🤺Zhihu</a>{' '}
              <a href="https://github.com/kian-zh">🦑Github</a> 
            </h2>
            {/*
              <img className={style.imgToClick} alt='Pictrue of Linkedin' src={pic_linkedin} onClick={()=>{window.open("https://www.linkedin.com/in/zhang1998/")}} />
              <img className={style.imgToClick} alt='Pictrue of Zhihu' src={pic_zhihu} onClick={()=>{window.open("https://www.zhihu.com/people/sgis")}} />
              <img className={style.imgToClick} alt='Pictrue of CSDN' src={pic_csdn} onClick={()=>{window.open("https://blog.csdn.net/nju_zjy")}} />
              <img className={style.imgToClick} alt='Pictrue of Github' src={pic_github} onClick={()=>{window.open("https://github.com/kian-zh")}} />
            */}
            </div>
        </div>

        {/*第二页*/}
        <div className={style.page2}>
          <div className={style.page2Content}>
            <h2>Biography</h2>
            <p>
              Jingyuan Zhang received the BSc degree in GIS from Nanjing Univeristy, and MSc degree from The Chinese Univeristy of Hong Kong.
            </p>
            <p>
              He has <a href='http://sgis.site/Research.html'>research experience</a> in remote sensing image processing, spatial analysis, etc. 
              But now his interests are mainly concentrated in Web graphics, human-computer interaction, and data visualization.
            </p>
            <p>
              Also, he has extensive experience in front-end development and GIS development.
              He used to work as an intern at <a href="https://www.jspdg.com/">JUP</a>,{' '}
              <a style={{whiteSpace:'nowrap'}} href="https://www.geoscene.cn/">Esri China</a>,{' '}
              <a href="https://www.sf-tech.com.cn/">SF-Tech</a>,{' '}
              <a href="https://www.aztech.com/business/">Aztech</a>,{' '}
              and{' '}<a href="https://www.tencent.com">Tencent</a>.
            </p>
            <p>
              From January 2022, he will join Tencent as a software engineer.
            </p>
            <br/>
            <a href='http://sgis.site/CV.html'>Full-text Curriculum Vitae</a>
            <br/>
            <a href='mailto:kianzh@outlook.com'>Mail him:</a> kianzh@outlook.com
            <br/>
            <br/>
          </div> 
        </div>

        {/*第三页*/}
        <div className={style.page3}>
          <MapPage />
        </div>

        {/*第四页*/}
        <div className={style.page4}>
          <div className={style.page4Content}>
            <h2>Demos</h2>
            <a href='http://sgis.site/HttpPage.html'>Axios-based HTTP Request Constructor</a>
            <br/>
            <a href='http://sgis.site/ColorPicker.html'>Color Picker Using Canvas</a>
            <br/>
            <a href='http://sgis.site/DecodeJson.html'>JSON Data Decoder</a>
            <br/>
            <a href='http://sgis.site/MP/index.html'>Several Map Projection Demos</a>
            <br/>
            <a href='http://sgis.site/Sprite/webglDemo.html'>WebGL Demo with SpriteJS</a>
            <br/>
            <a href='http://sgis.site/BuildingLoader.html'>3D-building Loader</a>
            <br/>
            <a href='http://sgis.site/Ruler.html'>A Ruler</a>
            <br/>
            <a href='http://sgis.site/Coordinate.html'>Pick Coordinate on Map</a>
          </div>
        </div>

        <div className={style.footer}>
          <div className={style.footerContent}>
            <div className={style.footerContentPart} style={{'fontSize':'1.8vh'}}>
              <span><a href='http://sgis.site/Resources.html' style={{'fontSize':'2.3vh','color':'rgb(200, 200, 200)'}}>Downloads</a></span>
              <span style={{'fontSize':'2.3vh','color':'rgb(200, 200, 200)','whiteSpace':'pre'}}>  |  </span>
              <span><a href='https://blog.csdn.net/nju_zjy/rss/list' style={{'fontSize':'2.3vh','color':'rgb(200, 200, 200)'}}>Blog RSS</a></span>
              <br/>
              <br/>
              <div>
                Friends' Links:
                <br/>
                <a style={{'color':'rgb(200, 200, 200)'}} href='https://github.com/HanwGeek'>Han Wang</a> in Spatial-Temporal Analysis
                <br/>
                <a style={{'color':'rgb(200, 200, 200)'}} href='https://web.hku.hk/~xuxue/'>Xu Xue</a> in Programming Language
                <br/>
                <a style={{'color':'rgb(200, 200, 200)'}} href='http://yutingwu816.gitee.io/personal-website/'>Yuting Wu</a> in Front-end development
              </div>
            </div>
            <div className={style.footerContentPart}>
              This page was built with React<br/>
              and updated at 24 Dec. 2021<br/>
              版权所有© 2021
              Jingyuan Zhang 
              All rights reserved.
              <br/>
              <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
              <span id="busuanzi_container_site_pv">本页面总访问量<span id="busuanzi_value_site_pv"></span>次</span>
              <br/>
              苏ICP备18026842号-2
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Intro;
