import React from 'react'
import axios from 'axios'
import style from './index.module.css'
import { TextField, Button, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

class HttpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      URL: '',
      Method: '',
      Headers: '',
      Params: '',
      Data: '',
      open: false,
      message: '',
      httpState: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit() {
    axios({
      method:this.state.Method,
      url:this.state.URL,
      headers:this.state.Headers,
      params:this.state.Params,
      data:this.state.Data,
    })
    .then((response) => {
      let string = ''
      try{
        string = JSON.stringify(response.data)
      }catch{
        string = response.data.toString()
      }
      this.setState({open: true, message: string, httpState: 'success'})
    })
    .catch((e)=>{
      this.setState({open: true, message: e.toString(), httpState: 'error'})
    });
  }

  handleChange(event){
    const id = event.target.id
    this.setState({[id]: event.target.value});
  }

  handleClose(){
    this.setState({open: false})
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div className={style.background}>
        <div className={style.container}>
          <h3>Axios-based HTTP request constructor</h3>
          <h5>to do simple tests on APIs</h5>
          <form noValidate autoComplete="off">
            <TextField
              id="URL"
              label="URL"
              placeholder="http://bit.ly/2mTM3nY"
              style={{ margin: 8 }}
              fullWidth
              required
              value={this.state.URL}
              onChange={this.handleChange}
              variant="filled"
              margin="normal"
            />
            <TextField
              id="Method"
              label="Method"
              placeholder="get"
              style={{ margin: 8 }}
              fullWidth
              required
              value={this.state.Method}
              onChange={this.handleChange}
              variant="filled"
              margin="normal"
            />
            <TextField
              id="Headers"
              label="Headers"
              multiline
              fullWidth
              rows={4}
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.Headers}
              onChange={this.handleChange}
              placeholder="{'X-Requested-With': 'XMLHttpRequest'}"
            />
            <TextField
              id="Params"
              label="URL Params"
              multiline
              fullWidth
              rows={4}
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.Params}
              onChange={this.handleChange}
              placeholder="{ID: 12345}"
            />
            <TextField
              id="Data"
              label="Data (for 'put', 'post', and 'patch')"
              multiline
              fullWidth
              rows={4}
              variant="filled"
              style={{ margin: 8 }}
              value={this.state.Data}
              placeholder="{firstName: 'Fred'}"
              onChange={this.handleChange}
            />
          </form>
          <br/>
          <Button size="large" variant="contained" color="primary" onClick={()=>{this.submit()}}>
              Submit
            </Button>
        </div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={()=>{this.handleClose()}}
        message={this.state.message}
      >
        <Alert severity={this.state.httpState}>
          { this.state.message }
        </Alert>
      </Snackbar>
    </div>
    );
  }
}

export default HttpPage;