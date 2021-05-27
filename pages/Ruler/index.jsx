import React from 'react'
import style from './index.module.less'

class Ruler extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.title}>
          尺子<span className={style.subtitle}>真实的尺寸</span>
        </div>
        <div className={style.ruler}>
          
        </div>
      </div>
    );
  }
}

export default Ruler;