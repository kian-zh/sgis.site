import React from 'react'
import style from './index.module.css'

class Research extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div className={style.researchPageContainer}>
        <h3>Publications</h3>
        <p>· 蒋金亮, <b>张景源</b>. 多源数据支撑的街道空间活力测度及影响要素研究[A]. 2019（第十四届）城市发展与规划大会, 2019</p>
        <p>· <b>张景源</b>, 杨绪红, 涂心萌, 宁可心, 栾心晨. 2014-2018年中国田间秸秆焚烧火点的时空变化[J]. 农业工程学报, 2019. </p>
        <p>· 彭韵筑, 张一凡, 叶瑞恒, <b>张景源</b>. “慰安妇”公共创伤记忆的数字化构建——以“南京地区侵华日军慰安所的AR故事地图”为例[J]. 图书馆论坛, 2020.</p>
        <p>· <b>张景源</b>. 标准晴空条件下甚高时空分辨率遥感地表温度生成研究[D]. 南京大学, 2020.</p>
        <p>· 涂心萌, 杨绪红, <b>张景源</b>, 栾心晨, 宁可心. 2014—2019年中国秸秆焚烧火点的地理特征分析[J]. 地理研究, 2020.</p>
        <h3>Experiences</h3>
        <p>· 2017.10 - 2020.7 地球系统科学研究所, 南京大学</p>
        <p>· 2019.7 - 2019.10 遥感与空间分析实验室, 香港理工大学</p>
        <p>· 2018.10 - 2019.5 数字人文与超媒体实验室, 南京大学</p>
        <p>· 2018.7 - 2018.10 大数据与智慧城市实验室, 江苏省城市规划设计研究院</p>
        <h3>Advisers</h3>
        <p>· <a className={style.colorBlack} href="https://essi.nju.edu.cn/0c/cd/c13582a265421/page.htm">占文凤</a></p>
        <p>· <a className={style.colorBlack} href="https://sgos.nju.edu.cn/cg/list.htm">陈刚</a></p>
        <p>· <a className={style.colorBlack} href="http://www.lsgi.polyu.edu.hk/people/academic/zhu-xiao-lin/index.asp">朱孝林</a></p>
      </div>
    );
  }
}

export default Research;