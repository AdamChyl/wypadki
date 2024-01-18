import React, { useEffect, useRef } from 'react';
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';

const WidthSlider = ({ handleChange }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const stepSlider = sliderRef.current;

    noUiSlider.create(stepSlider, {
      start: [400],
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

export default WidthSlider;