import Head from 'next/head'

const MapboxHead = () => (
    <Head>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.2/mapbox-gl-draw.css' type='text/css' />
    </Head>
)

export default MapboxHead