import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import style from './MapDrawing.module.less'
import mapboxglDraw from '@mapbox/mapbox-gl-draw';

export default function MapDrawing (props) {
	const refMapContainer = useRef(null);
	let g_map = null;
	let g_draw = null;
	useEffect(()=>{initMap()},[]);

	const updateData = () => {
		const data = g_draw.getAll();
		console.log('data', data);
		props.dataBus.setLineData(data.features)
	};

	const initMap = () => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';
		g_map = new mapboxgl.Map({
			container: refMapContainer.current,
			style: 'mapbox://styles/zhangjingyuan1234/cljfqruzd009e01qs457letnt',
			center: [121.39472746305773, 31.160745569622932],
			zoom: 8,
		  });
		g_draw = new mapboxglDraw({
			displayControlsDefault: false,
			controls: {
				line_string: true,
				trash: true
			},
			defaultMode: 'draw_line_string'
			});
		g_map.addControl(g_draw);
		g_map.on('click', (e) => {});
		g_map.on('draw.create', updateData);
		g_map.on('draw.delete', updateData);
		g_map.on('draw.update', updateData);
	}
	
	return (
			<div className={style.map} ref={refMapContainer}></div>
    )
}