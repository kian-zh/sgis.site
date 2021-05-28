import React from 'react'
import style from './addArticle.module.less'
import OSSClient from '../../components/OSSClient'
import { TextField, Button, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import marked from 'marked'

const Pre_HTML = ""
const Post_HTML = ""

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
        title: '',
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

  submit(){
    if(this.state.key != 'Abc123456abcd'){
        this.setState({isAlert: true, message: '密码错误', submitState: 'error'})
    }else{
      const title = this.state.title
      this.setState({isAlert: true, message: '发布成功', submitState: 'success'})
    }
  }

  mark(){
    const markedContent = marked(this.state.content)
    const html = Pre_HTML + markedContent + Post_HTML
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