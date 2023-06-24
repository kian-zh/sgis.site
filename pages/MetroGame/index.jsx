import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import style from './index.module.less'
import MapboxHead from '../../components/MapboxHead'
import MapDrawingView from './views/MapDrawing'
import ModifyingView from './views/Modifying'
import ExportingView from './views/Exporting'

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

export default function MetroGame () {
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
				Click the Map to Pick Coordinate! 点击地图来拾取坐标!
			</div>
			<MainView />
		</div>
    )
}