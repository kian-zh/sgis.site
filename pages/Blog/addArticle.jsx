import React from 'react'
import style from './addArticle.module.less'
import OSSClient from '../../components/OSSClient'
import { TextField, Button, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import marked from 'marked'

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
        title: '',
        content: '',
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
        const markedContent = marked(this.state.content)
        console.log(markedContent)
        this.setState({isAlert: true, message: '密码错误', submitState: 'error'})
    }else{
        console.log(this.state.content)
        this.setState({isAlert: true, message: '', submitState: 'success'})
    }
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
              rows={10}
              required
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.content}
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
          </form>
          <br/>
          <Button size="large" variant="contained" color="primary" onClick={()=>{this.submit()}}>
              提交
            </Button>
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