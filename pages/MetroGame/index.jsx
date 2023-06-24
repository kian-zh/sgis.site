import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import Head from 'next/head'
import style from './index.module.less'
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import MyHead from '../../components/MyHead'
import MapboxHead from '../../components/MapboxHead'


function CoordinateDialog(props) {
	const { handleClose, clearText, text, open} = props;

	return (
		<Dialog onClose={clearText} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle className={style.dialogTitle}>Coordinate</DialogTitle>
			<DialogContent className={style.dialogText}>
				{text}
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default function MetroGame () {
	const refMapContainer = useRef(null);
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	useEffect(()=>{initMap()},[]);

	const handleDialogClose = ()=>{
		setOpen(false)
	}
	const clearText = ()=>{
		setText('')
	}

	const initMap = () => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';
		const map = new mapboxgl.Map({
			container: refMapContainer.current,
			style: 'mapbox://styles/zhangjingyuan1234/ckxgam6bqhc2r14pc80o95kno',
			center: [118.35564770648534, 34.3628044306963],
			zoom: 3,
		  });
		map.on('click', (e) => {
			//	alert(JSON.stringify(e.lngLat.wrap()));
			setOpen(true)
			setText(JSON.stringify(e.lngLat.wrap()))
		});
	}
	
	return (
		<div className={style.container}>
			<MyHead />
			<Head>
				<meta
					name="description"
					content="从地图中拾取经纬度坐标"
				/>
				<meta
					name="keywords"
					content="坐标拾取, 地图"
				/>
				<title>坐标拾取</title>
			</Head>
			<MapboxHead />
			<div className={style.title}>
				Click the Map to Pick Coordinate! 点击地图来拾取坐标!
			</div>
			<div className={style.map} ref={refMapContainer}>
			</div>
			<CoordinateDialog
				open={open}
				text={text}
				handleClose={handleDialogClose}
				clearText={clearText}
			/>
		</div>
    )
}