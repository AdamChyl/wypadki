import { csv } from 'd3-request';
import { useEffect, useState } from "react";
import Map2D from "./components/Map2D/Map2D";
import Map3D from "./components/Map3D/Map3D";
import MainSlider from "./components/Sliders/MainSlider/MainSlider";
import DATA_URL from '/coords.csv?url';

// const DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRVJD3yQyqwTGSM1gtW1jcsd7DA8xQngfqjMMQoh08wLm8X9qGEkuWNrD4RA3p57cTA5k0BwA1fr79D/pub?output=csv";

function App() {


  const [coords, setCoords] = useState([]);
  const [map, setMap] = useState('3D');
  const [clicked, setClicked] = useState(true);
  const [sliderValue, setSliderValue] = useState('2016');
  const [isAllDate, setIsAllDate] = useState(false);

  useEffect(() => {
    csv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(d => [Number(d.lng), Number(d.lat), String(d.Gmina), String(d.Rok)]);
        setCoords(data);
      }
    });
  }, []);

  return (
    <>
      <div style={{ display: map === '3D' ? 'block' : 'none' }}>
        <Map3D data={coords} map={map} setMap={setMap} clicked={clicked} setClicked={setClicked} sliderValue={sliderValue} isAllDate={isAllDate} setIsAllDate={setIsAllDate} />
      </div>
      <div style={{ display: map === '2D' ? 'block' : 'none' }}>
        <Map2D map={map} setMap={setMap} clicked={clicked} setClicked={setClicked} sliderValue={sliderValue} setIsAllDate={setIsAllDate} isAllDate={isAllDate} />
      </div>
      {!isAllDate && <MainSlider handleChange={setSliderValue} sliderValue={sliderValue} map={map} />}
    </>
  );
}

export default App;
