import React from 'react'
import mapboxgl from 'mapbox-gl';
import style from './index.module.less'

class MapPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: [
        {
          title: '1998-2013: Xinyi 新沂',
          center: {lng: 118.35564770648534, lat: 34.3628044306963},
          zoom: 6,
          text: 'Born in 1998, he spent his childhood in Xinyi, a small town in northern China.'
        },
        {
          title: '2013-2016: Shuyang 沭阳',
          center: {lng: 118.78499064620274, lat: 34.129301470101524},
          zoom: 6,
          text: 'From 2013 to 2016, he studied at Shuyang High School.'
        },
        {
          title: '2016-2020: Nanjing 南京',
          center: {lng: 118.9545245567819, lat: 32.11425436214563},
          zoom: 6,
          text: 'He came to Nanjing University in 2016 and received a bachelor`s degree in Geographic Information Science in 2020.'
        },
        {
          title: '2020: Beijing 北京',
          center: {lng: 0, lat: 0},
          zoom: 6,
          text: ''
        },
        {
          title: '2020-2021: Hongkong/Shenzhen 香港及深圳',
          center: {lng: 114.21065841012057, lat: 22.41858902417195},
          zoom: 6,
          text: ''
        },
        {
          title: '2022: Shanghai 上海',
          center: {lng: 0, lat: 0},
          zoom: 6,
          text: ''
        }
      ],
      chosenCityIndex: -1,
      //  地图坐标
      point: [
        { center: {lng: 118.35564770648534, lat: 34.3628044306963}, zoom: 6 },
        { center: {lng: 118.78499064620274, lat: 34.129301470101524}, zoom: 6 },
        { center: {lng: 118.9545245567819, lat: 32.11425436214563}, zoom: 6 },
        { center: {lng: 114.21065841012057, lat: 22.41858902417195}, zoom: 6 },
      ],
      //  地图文字
      text: [
        'Born in 1998, he spent his childhood in Xinyi, a small town in northern China.',
        'From 2013 to 2016, he studied at Shuyang High School.',
        'He came to Nanjing University in 2016 and received a bachelor`s degree in Geographic Information Science in 2020.',
        'He will continue his studies at The Chinese University of Hongkong in 2020-2021.'
      ],
      //  地图对象
      map: ()=>({}),
      popup: ()=>({}),
    };
  }

  //  初始化
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';
    
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    //  style: 'mapbox://styles/mapbox/streets-v11',
    //  style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
    //  style: 'mapbox://styles/mapbox/satellite-v9',
    style: 'mapbox://styles/zhangjingyuan1234/ckxgam6bqhc2r14pc80o95kno',
    center: [118.35564770648534, 34.3628044306963],
    zoom: 6,
    scrollZoom: false,
    });

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    const marker = [];
    for(let j = 0; j < this.state.point.length; j++) {
      const item = this.state.point[j].center;
      marker[j] = new mapboxgl.Marker()
      .setLngLat([item.lng, item.lat])
      .addTo(map);
    }

    this.setState({map: map});
  }

  //  点击事件
  clickTime(index){
      if(!(this.state.popup.length===0))
      { this.state.popup.remove(); }
      this.state.map.flyTo(this.state.point[index]);

      const popup = new mapboxgl.Popup({offset: 50, closeButton: false, className: style.popup})
        .setLngLat(this.state.point[index].center)
        .setHTML(this.state.text[index])
        .setMaxWidth("400px")
        .addTo(this.state.map);

      this.setState({popup:popup});
  }

  renderList(){
    const list = []

  }

  render() {
    return (
      <div>
          <div className={style.mapCover}>
            <div className={style.content}>
              <span className={style.title}>Time Line</span><br/>
              {this.renderList()}
              <div className={style.item}  onClick={()=>this.clickTime(0)}>
                <i>1998-2013: Xinyi 新沂</i>
              </div>
              <div className={style.item}  onClick={()=>this.clickTime(1)}><i>2013-2016: Shuyang 沭阳</i></div>
              <div className={style.item}  onClick={()=>this.clickTime(2)}><i>2016-2020: Nanjing 南京</i></div>
              <div className={style.item}  onClick={()=>this.clickTime(2)}><i>2020: Beijing 北京</i></div>
              <div className={style.item}  onClick={()=>this.clickTime(3)}><i>2020-2021: Hongkong/Shenzhen 香港及深圳</i></div>
              <div className={style.item}  onClick={()=>this.clickTime(0)}><i>2022: Shanghai 上海</i></div>
            </div>
          </div>
          <div ref={el => this.mapContainer = el} className={style.mapContainer} />
      </div>
    );
  }
}

export default MapPage;
