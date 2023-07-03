import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import style from './MapDrawing.module.less'
import mapboxglDraw from '@mapbox/mapbox-gl-draw';

export default function MapDrawing () {
	const refMapContainer = useRef(null);
	const [g_map, setGMap] = useState(null);
	const [g_draw, setGDraw] = useState(null);
	useEffect(()=>{initMap()},[]);

	const updateData = () => {
		console.log(g_draw);
		const data = g_draw.getAll();
		console.log('data', data);
	};

	const initMap = () => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';
		const map = new mapboxgl.Map({
			container: refMapContainer.current,
			style: 'mapbox://styles/zhangjingyuan1234/cljfqruzd009e01qs457letnt',
			center: [121.39472746305773, 31.160745569622932],
			zoom: 8,
		  });
		const draw = new mapboxglDraw({
			displayControlsDefault: false,
			controls: {
				line_string: true,
				trash: true
			},
			defaultMode: 'draw_line_string'
			});
		map.addControl(draw);
		map.on('click', (e) => {});
		map.on('draw.create', updateData);
		map.on('draw.delete', updateData);
		map.on('draw.update', updateData);
		setGMap(() => map);
		setGDraw(()=>draw);
	}
	
	return (
			<div className={style.map} ref={refMapContainer}></div>
    )
}