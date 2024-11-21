import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import style from './index.module.less'
import axios from 'axios'
import xmljs from 'xml-js'
import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export default function MetroGame() {

  const [list, setList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)

  const handlePageChange = (event, value) => {
    setPageIndex(value);
  };

  const getData = () => {
    axios({
      url: 'https://sgis-1254220474.cos.ap-hongkong.myqcloud.com/?Prefix=album'
    }).then((res) => {
      const xmlStr = res.data
      const json = xmljs.xml2js(xmlStr, { compact: true })
      console.log('json', json)
      const contents = json.ListBucketResult.Contents.filter((i => i.Size._text !== '0')) || []
      console.log(contents);
      const list = contents.map((c) => {
        const name = c.Key._text.split('/').pop().split('.')[0]
        return {
          name: name,
          url: 'https://sgis-1254220474.cos.ap-hongkong.myqcloud.com/' + c.Key._text,
          previewUrl: 'https://sgis-1254220474.cos.ap-hongkong.myqcloud.com/' + c.Key._text + '?imageMogr2/thumbnail/x200'
        }
      })
      const orderList = list.sort((a, b) => (Number(b.name.split('-')[0]) - Number(a.name.split('-')[0])))
      setList(() => (orderList));
    })
  }

  const HtmlTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgb(224, 224, 224)',
      border: '4px solid #787878',
      padding: '10px',
      maxWidth: 400,
    },
  }))(Tooltip);

  const List = () => {
    return list.slice(10 * (pageIndex - 1), 10 * pageIndex).map((l) => {
      const tooltip = (<React.Fragment>
        <img src={l.previewUrl} className={style.img}></img>
      </React.Fragment>
      )
      return (<div key={l.url}>
        <HtmlTooltip title={tooltip} placement="right">
          <a href={l.url} className={style.nameLink} >
            {l.name}
          </a>
        </HtmlTooltip>
        <br />
      </div>)
    })
  }

  // 更新数据
  useEffect(() => { getData() }, []);

  return (
    <div className={style.container}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="./logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="相册"
        />
        <meta
          name="keywords"
          content="张景源, 相册, photo, album"
        />
        <title>相册</title>
      </Head>
      <div className={style.bg}>
        <div className={style.main}>
          <h1>Album</h1>
          <h4>相册</h4>
          <List />
          <br />
          <Pagination count={Math.ceil(list.length / 10)} shape="rounded" onChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}