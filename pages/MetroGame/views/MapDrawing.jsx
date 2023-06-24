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
			style: 'mapbox://styles/zhangjingyuan1234/ckxgam6bqhc2r14pc80o95kno',
			center: [118.35564770648534, 34.3628044306963],
			zoom: 3,
		  });
		map.on('click', (e) => {
			setOpen(true)
			setText(JSON.stringify(e.lngLat.wrap()))
		});
	}
	
	return (
			<div className={style.map} ref={refMapContainer}></div>
    )
}