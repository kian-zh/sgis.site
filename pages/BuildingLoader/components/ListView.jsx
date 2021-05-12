import React from 'react'
import style from './ListView.module.less'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  renderListItems(){

  }

  renderItems(){
      const items = []
      this.props.layers.forEach((layer)=>{
        items.push(        
          <ListItem key={layer.name} dense button onClick={()=>{this.props.switchLayer(layer)}}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={layer.state}
                tabIndex={-1}
                //disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={layer.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <SettingsIcon onClick={()=>{this.props.updateLayer(layer)}} />
              </IconButton>
              <IconButton edge="end">
                <HighlightOffIcon onClick={()=>{this.props.removeLayer(layer)}} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
      return items
  }

  render() {
    return (               
      <List component="nav" aria-label="main mailbox folders">
        {this.renderItems()}
      </List>
    )
  }
}

export default ListView;