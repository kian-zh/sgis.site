import React from 'react'
import OSSClient from '../../components/OSSClient'
import style from './visitorCountrys.module.less'

class VisitorCountrys extends React.Component {
  constructor() {
    super();
    this.state = {
      count: {}
    };
  }

  async componentDidMount() {
    const count = await OSSClient.get('Statistics/','count.json')
    this.setState({count: count})
  }

  renderList() {
    const list = []
    if(this.state.count.count_country) {
      const countrys = Object.keys(this.state.count.count_country)
      countrys.forEach((country)=>{
        list.push(<li key={country}>{country}: {this.state.count.count_country[country]}</li>)
      })
    }
    return list
  }

  render() { 
    return (
        <div className={style.container}>
          访问者国家或地区:
          <ul>
            {this.renderList()}
          </ul>
        </div>
    );
  }
}

export default VisitorCountrys;