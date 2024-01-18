import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import React, { useEffect, useRef } from 'react';

const HeightSlider = ({ handleChange, height }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const stepSlider = sliderRef.current;

    noUiSlider.create(stepSlider, {
      start: height,
      step: 50,
      range: {
        min: [50],
        max: [3000],
      },
    });

    stepSlider.noUiSlider.on('update', (values) => {
      handleChange(values[0]);
    });

    return () => {
      stepSlider.noUiSlider.destroy();
    };
  }, [handleChange]);

  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <div ref={sliderRef} className="settings-slider"></div>
    </div>
  );
};

export default HeightSlider;