import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import style from './MapDrawing.module.less'

export default function MapDrawing () {
	const refMapContainer = useRef(null);
	useEffect(()=>{initMap()},[]);

	const initMap = () => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';
		const map = new mapboxgl.Map({
			container: refMapContainer.current,
			style: 'mapbox://styles/zhangjingyuan1234/cljfqruzd009e01qs457letnt',
			center: [121.39472746305773, 31.160745569622932],
			zoom: 8,
		  });
		map.on('click', (e) => {
		});
	}
	
	return (
			<div className={style.map} ref={refMapContainer}></div>
    )
}