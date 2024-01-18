import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import React, { useEffect, useRef, useState } from 'react';

const PercentileSlider = ({ setUpperPercentile, setLowerPercentile }) => {
  const sliderRef = useRef(null);
  const [inputValues, setInputValues] = useState([95, 100]);

  useEffect(() => {
    const upperPercentileSlider = sliderRef.current;

    noUiSlider.create(upperPercentileSlider, {
      start: [1, 100],
      step: 0.01,
      range: {
        min: 1,
        max: 100,
      },
      connect: true,
    });

    upperPercentileSlider.noUiSlider.on('update', (values) => {
      const newValues = values.map(parseFloat);
      setInputValues(newValues);
      setUpperPercentile(newValues[1]);
      setLowerPercentile(newValues[0]);
    });

    return () => {
      upperPercentileSlider.noUiSlider.destroy();
    };
  }, [setUpperPercentile, setLowerPercentile]);

  const labelStyle = {
    marginRight: '10px',
    display: 'inline-block',
  };

  const inputStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #000',
    margin: '0',
    padding: '0',
    width: '40px',
    height: '20px',
    display: 'inline-block',
    color: '#d1d1d1',
    fontWeight: 'bold',
  };

  const handleInputChange = (index, value) => {
    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = value;
      return newInputValues;
    });
  };

  const handleInputBlur = (index) => {
    const newValues = [...inputValues].map(parseFloat);
    setUpperPercentile(newValues[1]);
    setLowerPercentile(newValues[0]);

    sliderRef.current.noUiSlider.set(newValues);
  };

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <div ref={sliderRef} className="settings-slider"></div>
      <div style={{ marginTop: '10px' }}>
        <label style={labelStyle}>Dolny:</label>
        <input
          type="number"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          onBlur={() => handleInputBlur(0)}
          style={{ ...inputStyle, WebkitAppearance: 'none' }}
        />
        <div style={{ float: "right" }}>
          <label style={labelStyle}>Górny:</label>
          <input
            type="number"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            onBlur={() => handleInputBlur(1)}
            style={{ ...inputStyle, WebkitAppearance: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PercentileSlider;
