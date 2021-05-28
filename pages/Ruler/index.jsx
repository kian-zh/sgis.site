import React from 'react'
import style from './index.module.less'
import Head from 'next/head'

class Ruler extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  renderScaleMM() {
    const result = []
    for(let m=1; m<10; m++){
      result.push(<div className={style.blockMM} key={'mm'+m.toString()}></div>)
    }
    return result
  }

  renderScaleCM() {
    const result = []
    for(let i=0; i<20; i++){
      result.push(
        <div className={style.blockCM} key={'cm'+i.toString()}>
          <div className={style.markerCM}>{i.toString()}</div>
          {this.renderScaleMM()}
        </div>
      )
    }
    result.push(<div className={style.blockCM} key={'cm20'}><div className={style.markerCM}>20</div></div>)
    return result
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={style.background}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <div className={style.title}>
          尺子<span className={style.subtitle}>真实的尺寸</span>
        </div>
        <div className={style.ruler}>
          <div className={style.markerContainer}>
            {this.renderScaleCM()}
          </div>
        </div>
      </div>
    );
  }
}

export default Ruler;