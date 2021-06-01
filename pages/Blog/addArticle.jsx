import React from 'react'
import style from './addArticle.module.less'
import OSSClient from '../../components/OSSClient'
import { TextField, Button, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import marked from 'marked';
import axios from 'axios';

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
        title: '',
        tag: '',
        content: '',
        html: '',
        key: '',
        submitState: '',
        message: '',
        isAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const id = event.target.id
    this.setState({[id]: event.target.value});
  }

  handleClose(){
    this.setState({isAlert: false})
  }

  async submit(){
    if(this.state.key != 'Abc123456abcd'){
        this.setState({isAlert: true, message: '密码错误', submitState: 'error'})
    }else{
      try{
        const Y = new Date().getFullYear()
        const M = new Date().getMonth() + 1
        const D = new Date().getDate()
        let index = 0
        const dateString = `${Y}年${M}月${D}日`
        const list = await OSSClient.get('BlogSources/','list.json')
        const years = Object.keys(list)
        index = list[years[0]][0].index + 1
        const item = {
          "index":index.toString(),
          "title":this.state.title,
          "tag": this.state.tag.split(','),
          "date": dateString,
          "link": "http://sgis.site/BlogSources/"+this.state.title+".html"
        }
        if(Y.toString() == years[0].toString()){
          list[years[0]].unshift(item)
        }else{
          list[Y.toString()] = [item]
        }
        await OSSClient.put('BlogSources/','list.json', list)
        const myFile = new Blob(this.state.html, {type: 'text/html'})
        await axios.put('http://sgis.site/BlogSources/articles/' + this.state.title +'.html', myFile)
        this.setState({isAlert: true, message: '发布成功', submitState: 'success'})
      }catch(e){
        alert(e)
      }
    }
  }

  async mark(){
    const markedContent = marked(this.state.content)
    const Y = new Date().getFullYear()
    const M = new Date().getMonth() + 1
    const D = new Date().getDate()
    let index = 0
    const dateString = `${Y}年${M}月${D}日`
    //  const list = await OSSClient.get('BlogSources/','list.json')
    //  const years = Object.keys(list)
    //  index = list[years[0]][0].index + 1
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <link href='http://sgis.site/BlogSources/template.css' rel='stylesheet' />
        </head>
        <body>
          <article>
            <a href="http://sgis.site/Blog.html">返回列表</a>
            <br/><br/>
            <h1>${this.state.title}</h1>
            <a href="http://sgis.site">张景源</a><br/> 
            <span id="date">${dateString}</span> 访问量 <span id="count" class="count"></span>
            <hr/>
            <!-- begin -->
            ${markedContent}
            <!-- end -->
            <br/><hr/>
            <h3>评论区</h3>
            <div id="comment">
              <!-- ... -->
            </div>
            <div>
              <h4>新评论</h4>
              你的名字*<input id="name" type="text"></input>
              你的URL（可选）<input id="url" type="text"></input>
              <br/>
              你的评论*<textarea id="content"></textarea>
              <button onclick="addComments()">提交</button>
            </div>
          </article>
          <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
          <script src="http://sgis.site/BlogSources/template.js"></script>
          <script type="text/javascript">
            index = ${index}
            getCount()
            getComments()
          </script>
        </body>
      </html>
      `
    this.setState({html})
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.container}>
          <h1>新增博文</h1>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              label="标题"
              style={{ margin: 8 }}
              fullWidth
              required
              value={this.state.title}
              onChange={this.handleChange}
              variant="filled"
              margin="normal"
            />
            <TextField
              id="content"
              label="正文"
              multiline
              fullWidth
              rows={20}
              required
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.content}
              onChange={this.handleChange}
            />
            <br/>
            <Button size="large" variant="contained" color="primary" onClick={()=>{this.mark()}}>
                格式化
            </Button>
            <TextField
              id="markedContent"
              label=""
              multiline
              fullWidth
              rows={20}
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.html}
              onChange={this.handleChange}
            />
            <TextField
              id="tag"
              label="标签"
              style={{ margin: 8 }}
              fullWidth
              value={this.state.tag}
              onChange={this.handleChange}
              variant="filled"
              margin="normal"
            />
            <TextField
              id="key"
              label="密码"
              fullWidth
              required
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.key}
              onChange={this.handleChange}
            />
            <br/>
            <Button size="large" variant="contained" color="primary" onClick={()=>{this.submit()}}>
                提交
            </Button>
          </form>
        </div>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={this.state.isAlert}
            autoHideDuration={6000}
            onClose={()=>{this.handleClose()}}
            message={this.state.message}
        >
        <Alert severity={this.state.submitState}>
          { this.state.message }
        </Alert>
      </Snackbar>
      </div>
    );
  }
}

export default Blog;