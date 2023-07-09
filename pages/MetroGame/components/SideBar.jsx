import { Button } from '@material-ui/core'
import style from './SideBar.module.less'

export default function SideBar (props) {

  const listItemDiv = (item, index) => (
    <div key={index}>
      initial 时间
      <Button size="small" variant="contained" disableElevation onClick={()=>{mutate(item.id)}}>编辑</Button>
    </div>
  );

  const mutate = (index) => {
    console.log('index', index);
  }

  return (
    <div className={style.bar}>
      侧边栏
      { props?.dataBus?.lineData?.map(listItemDiv) }
      <div>正在编辑</div>
      <Button size="small" variant="contained" color="primary" disableElevation onClick={()=>{mutate()}}>新建线路</Button>
      <div>
        test
      </div>
    </div>
  );
}