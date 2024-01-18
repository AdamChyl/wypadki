import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import React, { useEffect, useRef } from 'react';

const MainSlider = ({ handleChange, sliderValue, map }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const arbitraryValuesSlider = sliderRef.current;

    const arbitraryValuesForSlider = ['2016', '2017', '2018', '2019', '2020', '2021', '2022'];

    const format = {
      to: function (value) {
        return arbitraryValuesForSlider[Math.round(value)];
      },
      from: function (value) {
        return arbitraryValuesForSlider.indexOf(value);
      },
    };

    noUiSlider.create(arbitraryValuesSlider, {
      start: sliderValue,
      range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
      step: 1,
      format: format,
      pips: {
        mode: 'steps',
        format: format,
        density: 100,
      },
    });

    const updatePipsAndMarkers = (values, handle, unencoded) => {
      const pips = document.querySelector('.noUi-pips');
      if (pips) {
        const activePip = pips.querySelector('.noUi-value.active-pip');
        if (activePip) {
          activePip.classList.remove('active-pip');
        }

        const index = Math.round(unencoded[handle]);
        const value = pips.querySelectorAll('.noUi-value')[index];
        if (value) {
          value.classList.add('active-pip');
        }
      }

      const markers = document.querySelectorAll('.noUi-marker');
      markers.forEach((marker) => {
        marker.classList.remove('active-marker');
      });

      const activeMarkerIndex = Math.round(unencoded[handle]);
      const activeMarker = markers[activeMarkerIndex];
      if (activeMarker) {
        activeMarker.classList.add('active-marker');
      }
    };

    arbitraryValuesSlider.noUiSlider.on('update', (values, handle, unencoded) => {
      handleChange(values[handle]);
      updatePipsAndMarkers(values, handle, unencoded);
    });

    return () => {
      arbitraryValuesSlider.noUiSlider.destroy();
    };
  }, [sliderValue]);

  const sliderStyle = {
    position: 'absolute',
    bottom: '4.5rem',
    left: '20%',
    right: '20%',
    backgroundColor: map === '3D' ? '#222' : '#222',
    border: '1px solid #555',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div>
      <div ref={sliderRef} id="slider"></div>
    </div>
  );
};

export default MainSlider;
