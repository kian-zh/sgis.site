import React, { useState, useEffect, useRef } from 'react'
import style from './index.module.less'
import _ from 'lodash'

function DecodeJson () {
    const braceColor = ['#66dc60','#deeb52','#f646d6','#c1c809','#329f77','#66dc60','#deeb52','#f646d6','#c1c809','#329f77'];
    const defaultJSON = `{"type": "FeatureCollection","features": [{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.380859375,31.57853542647338]}}]}`
    const [jsonObj, setJsonObj] = useState({});
    const [expandJson, setExpandJson] = useState({});
    const [error, setError] = useState('');

    const refTextarea = useRef(null);

    useEffect(() => {
        JsonDataUpdate()
    },[]);

    useEffect(() => {
        console.log('reload')
    });

    const JsonDataUpdate = ()=>{
        const localJsonText = refTextarea.current.value
        try{
            const localJsonObj = JSON.parse(localJsonText)
            const localExpandNode = {}
            addExpandNode(localJsonObj,localExpandNode)
            setError('')
            setExpandJson(localExpandNode)
            setJsonObj(localJsonObj)
        }catch(error){
            setError(error.toString())
        }
    }

    const addExpandNode = (json,expandNode) => {
        if(json instanceof Object){
            const keys = Object.keys(json)
            expandNode[0] = false
            keys.forEach((key)=>{
                expandNode['$_'+key]={}
                addExpandNode(json[key],expandNode['$_'+key])
            })
        }
    }

    const changeExpandNode = (path) => {
        const localExpandJSON = _.cloneDeep(expandJson)
        let node = localExpandJSON
        path.forEach((pa)=>{
            node = node[`$_${pa}`]
        })
        node[0] = ! node[0]
        setExpandJson(localExpandJSON)
    }

    const renderLines = (key, obj, path, space) => {
        let lines = []
        //  如果有子项目
        if(obj instanceof Object){
            let localExpandNode = expandJson
            path.forEach((key)=>{
                localExpandNode = localExpandNode[`$_${key}`]
            })
            if(localExpandNode[0]){
                lines.push(<span key={path.toString()}>{space}<a className={style.expand} onClick={()=>{changeExpandNode(path)}}> - </a> <b>"{key}"</b>: <b style={{color:((path.length<10)?braceColor[path.length-1]:'#787878')}}>{`{`}</b><br/></span>)
                const nextSpace = space + '    '
                Object.keys(obj).forEach((localKey)=>{
                    const nextPath = path.concat([localKey])
                    lines = lines.concat(renderLines(localKey, obj[localKey], nextPath, nextSpace))
                })
                lines.push(<span key={`${path.toString()}_close`}>{space}   <b style={{color:((path.length<10)?braceColor[path.length-1]:'#787878')}}>{`}`}</b><br/></span>)
            }else{
                lines.push(<span key={path.toString()}>{space}<a className={style.expand} onClick={()=>{changeExpandNode(path)}}> + </a> <b>"{key}"</b>: <b style={{color:((path.length<10)?braceColor[path.length-1]:'#787878')}}>{`{...}`}</b><br/></span>)
            }
        //  如果没有子项目
        }else{
            if(typeof(obj)=='string'){
                lines.push(<span key={path.toString()}>{space}   <b>"{key}"</b>: "{obj}"<br/></span>)
            }else{
                lines.push(<span key={path.toString()}>{space}   <b>"{key}"</b>: <span className={style.number}>{obj}</span><br/></span>)
            }
        }
        return lines
    }

    const renderJson = ()=>{
        if(error){
            return <h4>{error}</h4>
        }else{
            let lines = []
            Object.keys(jsonObj).map((key)=>{
                const path = [key]
                const space = []
                lines = lines.concat(renderLines(key, jsonObj[key], path, space))
                lines.push(<hr key={`hr_${key}`} color='#987cb9' />)
            })
            return <div>{lines}</div>
        }
    }

    return (
    <div>
        <section className={style.leftpart}>
            <textarea className={style.inputBox} defaultValue={defaultJSON} ref={refTextarea} onChange={()=>{JsonDataUpdate()}}>
            </textarea>
        </section>
        <section className={style.rightpart}>
            <div className={style.outputBox}>
                {renderJson()}
            </div>
        </section>
    </div>
    )
}

export default DecodeJson