import Expand from "@arcgis/core/widgets/Expand.js";
import { useEffect, useRef, useState } from "react";
import AllDateButton from "../AllDateButton/AllDateButton";
import HeightSlider from "../Sliders/HeightSlider/HeightSlider";
import PercentileSlider from "../Sliders/PercentileSlider/PercentileSlider";
import WidthSlider from "../Sliders/WidthSlider/WidthSlider";

export default function Settings3D({ lowerPercentile, setLowerPercentile, setIsExpanded, handleChange, sliderValue, setIsAllDate, isAllDate, setHeight, height, setUpperPercentile, upperPercentile }) {

  const containerRef = useRef(null);
  const [expandBool, setExpandBool] = useState(false);

  useEffect(() => {
    var content = document.getElementById('content');

    const Map3DSettingsExpand = new Expand({
      expandIconClass: 'esri-icon-settings',
      expandTooltip: 'Ustawienia',
      content: content,
      expanded: expandBool,
      container: containerRef.current
    });

    const watchHandler = () => {
      setExpandBool(Map3DSettingsExpand.expanded)
    };

    const watchHandle = Map3DSettingsExpand.watch("expanded", watchHandler);

    return () => {
      Map3DSettingsExpand.destroy();
      watchHandle.remove();
    };
  }, [setIsExpanded]);

  useEffect(() => {
    setIsExpanded(prevState => !prevState);
  }, [expandBool]);


  return (
    <div ref={containerRef} className='widget-container' style={{ right: '1rem', top: '2rem', position: 'absolute' }}>
      <div id='content' className='settings-content'>
        <div className='header-container'>
          <h4 style={{ margin: '10px' }}>Ustawienia</h4>
        </div>

        <p className="slider-settings-title" >Szerokość:</p>
        <WidthSlider handleChange={handleChange} />
        <p className="slider-settings-label" >Wybrana szerokość: <b>{Number(sliderValue).toFixed(0)}</b> metrów</p>

        <hr className="filter-break-line" />

        <p className="slider-settings-title" style={{ marginTop: "0px" }}>Wyskość:</p>
        <HeightSlider handleChange={setHeight} height={height} />
        <p className="slider-settings-label">Wybrana wyskość: <b>{Number(height).toFixed(0)}</b></p>

        <hr className="filter-break-line" />

        <p className="slider-settings-title" style={{ marginTop: "0px" }}>Percentyl:</p>
        <PercentileSlider setUpperPercentile={setUpperPercentile} setLowerPercentile={setLowerPercentile} />

        <AllDateButton isAllDate={isAllDate} setIsAllDate={setIsAllDate} map={"3D"} />

        <div style={{ marginBottom: '5px', marginTop: '0px', visibility: 'hidden' }}>_</div>
      </div>
    </div>
  );
};
