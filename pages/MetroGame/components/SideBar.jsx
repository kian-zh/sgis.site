import { Button } from '@material-ui/core'
import style from './SideBar.module.less'

export default function SideBar (props) {

  const listItemDiv = (item, index) => (
    <div key={index}>
      initial 时间
    </div>
  );

  const mutate = (index) => {
    console.log('index', index);
  }

  return (
    <div className={style.bar}>
      侧边栏
      <Button size="small" variant="contained" color="primary" disableElevation onClick={()=>{mutate()}}>新建线路</Button>
      { props.dataBus.lineData.map(listItemDiv) }
    </div>
  );
}