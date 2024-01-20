import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { AmbientLight, LightingEffect, PointLight } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';
import { useState } from 'react';
import { Map } from 'react-map-gl';
import Credits from '../Credits/Credits';
import Header from '../Header/Header';
import MapChangeButton from '../MapChangeButton/MapChangeButton';
import Settings3D from '../Settings3D/Settings3D';
import Splash from '../Splash/Splash';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [23.574174416179034, 52.02631715945221, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [14.73646024424136, 52.169143293427, , 8000]
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight1, pointLight2 });

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};

const INITIAL_VIEW_STATE = {
  longitude: 19.87330368764314,
  latitude: 50.8549967758753,
  zoom: 6.790577937314907,
  minZoom: 5,
  maxZoom: 15,
  pitch: 55.09607828582955,
  bearing: 1.448818536736879,
};



const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

function getTooltip({ object }) {
  if (!object) {
    return null;
  }

  const lat = object.position[1];
  const lng = object.position[0];
  const gmina = object.points[0].source[2];
  const count = object.points.length;

  return `\
    ${gmina}
    ${count} Wypadków

    x: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    y: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    `;

}

export default function Map3D({
  data = coords,
  mapStyle = MAP_STYLE,
  coverage = 0.85,
  map,
  setMap,
  clicked,
  setClicked,
  sliderValue,
  setIsAllDate,
  isAllDate
}) {

  const [upperPercentile, setUpperPercentile] = useState(100);
  const [lowerPercentile, setLowerPercentile] = useState(1);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(1500);
  const [isExpanded, setIsExpanded] = useState(false);

  // const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  // useEffect(() => {
  //   console.log('Current View State:', viewState);
  // }, [viewState]);

  let filteredData = data;

  if (!isAllDate) {
    filteredData = data.filter(d => d[3] === sliderValue);
  }

  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      colorRange,
      coverage,
      data: filteredData,
      elevationRange: [0, height],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      pickable: true,
      autoHighlight: true,
      getPosition: d => d,
      radius: width,
      upperPercentile,
      lowerPercentile,
      material,
      transitions: {
        elevationScale: 1000
      },
    })
  ];

  return (
    <>
      <div onContextMenu={evt => evt.preventDefault()}>
        <DeckGL
          layers={layers}
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={{ touchRotate: true }}
          getTooltip={getTooltip}
        // onViewStateChange={({ viewState: newViewState }) => setViewState(newViewState)}
        >
          <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
        </DeckGL>
      </div>
      <Settings3D
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setWidth={setWidth}
        width={width}
        setIsAllDate={setIsAllDate}
        isAllDate={isAllDate}
        height={height}
        setHeight={setHeight}
        setLowerPercentile={setLowerPercentile}
        lowerPercentile={lowerPercentile}
        setUpperPercentile={setUpperPercentile}
        upperPercentile={upperPercentile}
      />
      <MapChangeButton isExpanded={isExpanded} setMap={setMap}>
        2D
      </MapChangeButton>
      <Header position={'left'}>Mapa Wypadków 3D</Header>
      <Credits />
      <Splash isExpanded={isExpanded} clicked={clicked} setClicked={setClicked} map={map} />
    </>
  );

}
