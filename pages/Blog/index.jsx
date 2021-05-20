import React from 'react'
import style from './index.module.css'
import OSSClient from '../../components/OSSClient'
class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      count: {}
    };
  }

  async componentDidMount() {
    const list = await OSSClient.get('BlogSources/','list.json')
    const count = await OSSClient.get('Statistics/','count.json')
    console.log(list)
    console.log(count)
  }

  countAll() {

  }

  renderYear(year) {
    const articles = []
    list[year].forEach((a)=>{
      const title = a.title
      const date = a.date
      return (<li><a className={style.articleLink}>Test</a></li>)
    })
    return (
      <div>
        <h6>{year}年</h6>
        <ul>
          {articles}
        </ul>
      </div>)
  }

  renderList() {
    const result = []
    const years = [2020, 2019]//Object.keys(list)

    years.forEach((y)=>{
      result.push(this.renderYear(y))
    })
    return result
  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.container}>
          <h1>Blog</h1>
          <h4>张景源的部落格</h4>
          {this.renderList()}
          <h6>网站总访问量: {this.countAll()}</h6>
        </div>
      </div>
    );
  }
}

export default Blog;