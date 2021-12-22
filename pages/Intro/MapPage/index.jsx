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
          xy: {
            center: {lng: 118.35564770648534, lat: 34.3628044306963},
            zoom: 8,
          },
          text: 'Born in 1998, he spent his childhood in Xinyi.'
        },
        {
          title: '2013-2016: Shuyang 沭阳',
          xy: {
            center: {lng: 118.78499064620274, lat: 34.129301470101524},
            zoom: 8,
          },
          text: 'From 2013 to 2016, he studied at Shuyang High School.'
        },
        {
          title: '2016-2020: Nanjing 南京',
          xy: {
            center: {lng: 118.9545245567819, lat: 32.11425436214563},
            zoom: 8,
          },
          text: 'He came to Nanjing University in 2016 and received a bachelor`s degree in Geographic Information Science in 2020.'
        },
        {
          title: '2020(Summer): Beijing 北京',
          xy: {
            center: {lng:116.44879918669369, lat:39.95897337697215},
            zoom: 8,
          },
          text: 'He did an internship in Beijing during the summer. '
        },
        {
          title: '2020-2021: Hongkong/Shenzhen 香港及深圳',
          xy: {
            center: {lng: 114.21065841012057, lat: 22.41858902417195},
            zoom: 8,
          },
          text: 'While studying at the Chinese University of Hong Kong, he worked as an intern in many different types of companies, which made him grow quickly. '
        },
        {
          title: '2022: Shanghai 上海',
          xy: {
            center: {lng:121.39472746305773, lat:31.160745569622932},
            zoom: 8,
          },
          text: 'From January 2022, he will join Tencent, Shanghai as a software engineer.'
        }
      ],
      chosenCityIndex: 0,
      //  地图对象
      map: ()=>({}),
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
      zoom: 5,
      scrollZoom: false,
    });

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    const marker = [];
    for(let j = 0; j < this.state.cities.length; j++) {
      const cen = this.state.cities[j].xy.center;
      marker[j] = new mapboxgl.Marker()
      .setLngLat([cen.lng, cen.lat])
      .addTo(map);
    }
    this.setState({map: map});
  }

  //  点击事件
  clickListItem(index){
    if(index === this.state.chosenCityIndex){
      this.setState({chosenCityIndex:-1});
    }else{
      this.setState({chosenCityIndex:index});
      this.state.map.flyTo(this.state.cities[index].xy);
    }
  }

  //  鼠标覆盖事件
  hoverListItem(index){
    this.state.map.flyTo(this.state.cities[index].xy);
  }

  renderList(){
    const list = []
    this.state.cities.forEach((city, index)=>{
      const active = (index === this.state.chosenCityIndex)
      list.push(
        <div 
          key={index}
          className={[style.item, active?style.activedItem:null].join(' ')}
          onClick={()=>this.clickListItem(index)}
          onMouseOver={()=>{this.hoverListItem(index)}}>
          <i className={style.cardName}>{city.title}</i>
          {
            active?
            (<p className={style.cardContent}>{city.text}</p>):(<></>)
          }
        </div>
      )
    })
    return list
  }

  render() {
    return (
      <div>
          <div className={style.mapCover}>
            <div className={style.content}>
              <span className={style.title}>Time Line</span><br/>
              {this.renderList()}
            </div>
          </div>
          <div ref={el => this.mapContainer = el} className={style.mapContainer} />
      </div>
    );
  }
}

export default MapPage;
