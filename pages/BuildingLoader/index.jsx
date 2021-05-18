import React from 'react'
import style from './index.module.less'
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import defaultJSON from './Futian.json'
import layer from '../../components/BuildingLoader/class/layer.js'

import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';

import ListView from '../../components/BuildingLoader/ListView'
import DialogView from '../../components/BuildingLoader/DialogView'
import { clearPrewarmedResources } from 'mapbox-gl';
import MapboxHead from '../../components/MapboxHead'

mapboxgl.workerClass = MapboxWorker;

class BuildingLoader extends React.Component {
  constructor() {
    super();
    this.state = {
        map: ()=>({}),
        layers: [],
        currentLayer: null,
        isDialog: false,
        nextIndex: 0
    };
  }

  componentDidMount() {
    //添加默认图层
    const layers = this.state.layers
    const nextIndex = this.state.nextIndex
    const defaultLayer = new layer(nextIndex, 'Futian Center Area','geojson', defaultJSON,'#ffffff','0.8','height')
    layers.push(defaultLayer)
    this.setState({layers:layers, nextIndex: nextIndex+1})
    //初始化底图
    mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbiIsImEiOiJja2R5cHhoNXYycGVtMnlteXkwZGViZDc2In0.UhckH-74AgPwMsDhPjparQ';
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
    //style: 'mapbox://styles/mapbox/streets-v11',
    center: [114.0547, 22.5425],
    zoom: 14,
    pitch: 60,
    bearing: 30,
    scrollZoom: true,
    });

    const that = this
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    map.on('load', function () {
        map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 20
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 0 /* 拉伸参数，0代表平面，1代表正常高度 */ });
        map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
        });
        that.renderLayer(0)
    });

    this.setState({map: map})
  }

  componentDidUpdate() {
    
  }

  removeLayer(layer) {
    const targetIndex = layer.index
    const layers = this.state.layers
    const newLayers = []
    layers.forEach((listLayer)=>{
      if(listLayer.index != targetIndex){
        newLayers.push(listLayer)
      }
    })
    this.setState({layers: newLayers},()=>{this.unrenderLayer(layer.index)})
  }

  addLayer(name, source, color, opacity, heightField){
    const layers = this.state.layers
    const nextIndex = this.state.nextIndex
    const newLayer = new layer(nextIndex, name, 'geojson', source, color, opacity, heightField)
    layers.push(newLayer)
    this.setState({layers:layers, nextIndex: nextIndex+1},()=>{this.renderLayer(nextIndex)})
  }

  changeLayer(index, name, color, opacity, heightField){
    const newLayers = []
    const layers = this.state.layers
    layers.forEach((layer)=>{
      if(layer.index == index){
        const newLayer = layer
        newLayer.name = name
        newLayer.color = color
        newLayer.opacity = Number(opacity)
        newLayer.heightField = heightField
        newLayers.push(newLayer)
      }else{
        newLayers.push(layer)
      }
    })
    this.setState({layers: newLayers},()=>{this.unrenderLayer(index);this.renderLayer(index)})
  }

  switchLayer(layer){
    const index = layer.index
    const newLayers = []
    const layers = this.state.layers
    layers.forEach((layer)=>{
      if(layer.index == index){
        const newLayer = layer
        newLayer.switchState()
        newLayers.push(newLayer)
      }else{
        newLayers.push(layer)
      }
    })
    this.setState({layers: newLayers},()=>{this.unrenderLayer(index);this.renderLayer(index)})
  }

  renderLayer(index){
    const map = this.state.map
    const layers = this.state.layers
    let layer = null
    layers.forEach((item)=>{
      if(item.index == index){layer = item}
    })
    if(!layer || !layer.state){
      return 0
    }

    const heightField = layer.heightField
    console.log(layer)
    layer.data.features.forEach((item) => {
      let he = 5;  //默认建筑物高度
      if (!item.properties[heightField]) {
        he = 5;
      }else {
        he = Number(item.properties[heightField]);
      }
      item.properties['local_height'] = he;
      item.properties['base_height'] = 1;
    });

    //添加数据
    if(!map.getSource(index.toString())){
      map.addSource(index.toString(), {
        "type": "geojson",
        "data": layer.data
      });
    }

    console.log(layer.data)

    map.addLayer({
      'id': 'layer_'+index.toString(),
      'type': 'fill',
      'source': index.toString(),
      'type': 'fill-extrusion',
      'layout': {},
      'paint': {
        'fill-extrusion-color': layer.color,
        'fill-extrusion-height': [
          "interpolate", ["linear"], ["zoom"],
          
          14.05, ["get", "local_height"]
        ],
        'fill-extrusion-base': [
          "interpolate", ["linear"], ["zoom"],
          14, 0,
          14.05, ["get", "base_height"]
        ],
        'fill-extrusion-opacity': layer.opacity
      }
    });
  
    this.setState({map: map});
  }

  unrenderLayer(index){
    const map = this.state.map
    if(map.getLayer('layer_'+index.toString())){
      map.removeLayer('layer_'+index.toString());
    };
    if(map.getLayer('border_'+index.toString())){
      map.removeLayer('border_'+index.toString());
    };
    this.setState({map: map});
  }

  render() {
    return (
        <div style={{position:'absolute',width:'100vw',height:'100vh'}}>
          <MapboxHead />
            <div className={style.banner}>
                <h1 className={style.title}>A Web-based 3D Building Loader</h1>
                <Button disableElevation variant="contained" color="primary"
                style={{position:'absolute',right:'50px',top:'2vh',height:'5vh'}}
                >Export</Button>
            </div>
            <div
              style={{width:'100%',height:'90%',backgroundColor:'aqua',position:'absolute', top:'10%'}} 
              ref={el => this.mapContainer = el}>
            </div>
            <div className={style.toolWindow}>
              <h3 style={{fontWeight:'400'}} >DATA</h3>
              <div className={style.listContainer}>
                <ListView 
                  layers={this.state.layers} 
                  //reloadLayers={()=>{this.setState({layers: this.state.layers})}}
                  switchLayer={(layer)=>{this.switchLayer(layer)}}
                  removeLayer={(layer)=>{this.removeLayer(layer)}}
                  updateLayer={(layer)=>{this.setState({currentLayer:layer},()=>{this.setState({isDialog:true})})}}/>
                <Button disableElevation variant="contained"
                  startIcon={<AddBoxIcon />}
                  onClick={()=>{this.setState({currentLayer:null},()=>{this.setState({isDialog:true})})}}
                  >Add Layer</Button>
              </div>
            </div>
            <DialogView
            isDialog={this.state.isDialog}
            currentLayer={this.state.currentLayer}
            changeLayer={(...args)=>{this.changeLayer(...args)}}
            addLayer={(...args)=>{this.addLayer(...args)}}
            handleClose={()=>{this.setState({currentLayer: null, isDialog: false})}} 
            />
        </div>
    );
  }
}

export default BuildingLoader;
