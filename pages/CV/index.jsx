import React from 'react'
import style from './index.module.less'

class HttpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      URL: 'https://docs.google.com/document/d/1znPjb1k0k3sslelJz4KoWLUJCVNjOa1d9Uw1uHIcIRY/edit?usp=sharing'
    };
  }

  componentDidMount() {
    setTimeout(()=>{location.href=this.state.URL},1000)
  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.profileMainLoader}>
          <div className={style.loader}>
            <svg className={style.circularLoader} viewBox="25 25 50 50" >
              <circle className={style.loaderPath} cx="50" cy="50" r="20" fill="none" stroke="#2f3ac8" strokeWidth="6" />
            </svg>
          </div>
        </div>
        <h3>正在跳转到谷歌文档，请确保良好的网络连接</h3>
        <h3>Jumping to Google Docs, please ensure a good internet connection </h3>
      </div>
    );
  }
}

export default HttpPage;