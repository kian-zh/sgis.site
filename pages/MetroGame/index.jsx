import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import style from './index.module.less'
import MapboxHead from '../../components/MapboxHead'
import MapDrawingView from './views/MapDrawing'
import ModifyingView from './views/Modifying'
import ExportingView from './views/Exporting'
import SideBar from './components/SideBar'

function MainView () {
	const [view, setView] = useState('MapDrawing');
	switch(view){
		case 'MapDrawing':
			return (<MapDrawingView />)
		case 'Modifying':
			return (<ModifyingView />)
		case 'Exporting':
			return (<ExportingView />)
	}
}

function dataBusFunc() {
	const [lineData, setLineData] = useState([1,2,3,4,5,6,7]);
	const [currentLineId, setCurrentLineId] = useState('');
	return {
		lineData, currentLineId, setLineData, setCurrentLineId
	}
}

export default function MetroGame () {
	const dataBus = new dataBusFunc();
	return (
		<div className={style.container}>
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" type="image/png" href="./logo.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="绘制铁路线"
				/>
				<meta
					name="keywords"
					content="游戏, 地图, 铁路, 地铁"
				/>
				<title>绘制铁路线</title>
			</Head>
			<MapboxHead />
			<div className={style.title}>
				绘制铁路/地铁线
			</div>
			<div className={style.main}>
				<div className={style.mainView}>
					<MainView />
				</div>
				<SideBar dataBus={dataBus} />
			</div>
		</div>
    )
}