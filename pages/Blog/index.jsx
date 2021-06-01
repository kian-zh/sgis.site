import React from 'react'
import style from './index.module.css'
import OSSClient from '../../components/OSSClient'
class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {},
      count: {}
    };
  }

  async componentDidMount() {
    const list = await OSSClient.get('BlogSources/','list.json')
    const count = await OSSClient.get('Statistics/','count.json')
    console.log(list)
    console.log(count)
    this.setState({list, count})
  }

  countAll() {
    return (<span className={style.count}>{this.state.count.count_all}</span>)
  }

  renderYear(year) {
    const articles = []
    this.state.list[year].forEach((ar)=>{
      const title = ar.title
      const date = ar.date
      const link = ar.link
      const index = ar.index
      const count = this.state.count['count_articles'][index.toString()]
      articles.push(
        <li>
          <a href={link} className={style.articleLink}>{title}</a>
          <span className={style.subTitle}>{date}，{count}次访问</span>
        </li>
      )
    })
    return (
      <div>
        <h5>{year}年</h5>
        <ul>
          {articles}
        </ul>
      </div>)
  }

  renderList() {
    const result = []
    const years = Object.keys(this.state.list)

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
          <br/>
          <hr/>
          <h5 class={style.footer}>网站总访问量: {this.countAll()} {'\u00A0\u00A0'}
            <a href="./Blog/addArticle.html" className={style.addButton}>新增博文</a>
          </h5>
        </div>
      </div>
    );
  }
}

export default Blog;