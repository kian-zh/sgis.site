import React from 'react'
import style from './DialogView.module.less'

import { Input, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';



class DialogView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dialogMode: this.props.currentLayer?'Change':'Add'
      };
      this.formRefs = {
        name: React.createRef(),
        source: React.createRef(),
        color: React.createRef(),
        opacity: React.createRef(),
        heightField: React.createRef(),
      }
    }
  
    componentDidMount() {
    }
  
    componentDidUpdate() {
      
    }
    componentWillReceiveProps (nextProps) {
      this.setState({dialogMode: this.props.currentLayer?'Change':'Add' })
    }
    async handleChangeOrAdd() {
      if(this.state.dialogMode == 'Change'){
        const index = this.props.currentLayer.index
        const name = this.formRefs.name.current.value
        const color = this.formRefs.color.current.value
        const opacity = this.formRefs.opacity.current.value
        const heightField = this.formRefs.heightField.current.value
        await this.props.changeLayer(index, name, color, opacity, heightField)
      }else if(this.state.dialogMode == 'Add'){
        const source = this.formRefs.source.current.files[0]
        let data = null
        await this.readJSONAsync(source).then((postData)=>{data = postData})
        const reader = new FileReader();
        const name = this.formRefs.name.current.value
        const color = this.formRefs.color.current.value
        const opacity = this.formRefs.opacity.current.value
        const heightField = this.formRefs.heightField.current.value
        await this.props.addLayer(name, data, color, opacity, heightField)
      }
    }


    readJSONAsync(source) {
      return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.readAsText(source);
          reader.onload = function () {
              const data = JSON.parse(this.result);
              resolve(data)
          };
      })
    }
  
    render() {
      const renderRourseInput = ()=>{
        if(this.state.dialogMode == 'Add'){
          return <input 
          ref={this.formRefs.source}
          margin="dense"
          type='file'
          accept='application/json'
          />
        }else{
          return <template></template>
        }
      }

      return (
        <Dialog open={this.props.isDialog}>
          <DialogTitle>{this.state.dialogMode} Layer</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {/*Hello*/}
            </DialogContentText>
            {renderRourseInput()}
            <TextField
              inputRef={this.formRefs.name}
              autoFocus
              margin="dense"
              label="Name"
              defaultValue={this.props.currentLayer? this.props.currentLayer.name : ''}
              fullWidth
            />
            <TextField
              inputRef={this.formRefs.color}
              autoFocus
              margin="dense"
              label="Color"
              defaultValue={this.props.currentLayer? this.props.currentLayer.color : '#ffffff'}
              fullWidth
            />
            <TextField
              inputRef={this.formRefs.opacity}
              autoFocus
              margin="dense"
              label="Opacity"
              defaultValue={this.props.currentLayer? this.props.currentLayer.opacity : '0.9'}
              fullWidth
            />
            <TextField
              inputRef={this.formRefs.heightField}
              autoFocus
              margin="dense"
              label="Height Field"
              defaultValue={this.props.currentLayer? this.props.currentLayer.heightField : ''}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.props.handleClose()}} color="primary">
            Cancel
            </Button>
            <Button onClick={()=>{this.handleChangeOrAdd().then(()=>{this.props.handleClose()})}} color="primary">
            {this.state.dialogMode}
            </Button>
          </DialogActions>
        </Dialog>         
      )
    }
  }
  
  export default DialogView;