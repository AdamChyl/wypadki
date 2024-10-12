import React, { useState } from 'react';
import { limitRenderer, areaRenderer, dayTimeRenderer, eventTypeRenderer, brandRenderer, vechicleRenderer, monthRenderer } from '../../utils/renderers';

export default function RendererSelector({ onRendererChange, defaultRenderer }) {
  const renderers = [
    { label: 'Biała', value: 'default', renderer: defaultRenderer },
    { label: 'Ograniczenie prędkości', value: 'limit', renderer: limitRenderer },
    { label: 'Typ obszaru', value: 'area', renderer: areaRenderer },
    { label: 'Pora dnia', value: 'dayTime', renderer: dayTimeRenderer },
    // { label: 'Rodzaj zdarzenia', value: 'eventType', renderer: eventTypeRenderer },
    // { label: 'Marka sprawcy', value: 'brand', renderer: brandRenderer },
    // { label: 'Rodzaj pojazdu', value: 'vechicle', renderer: vechicleRenderer },
    // { label: 'Miesiąc', value: 'month', renderer: monthRenderer }
  ];

  const [selectedRenderer, setSelectedRenderer] = useState(null);

  const handleRendererChange = (e) => {
    const selectedValue = e.target.value;
    const selectedRenderer = renderers.find(renderer => renderer.value === selectedValue);
    setSelectedRenderer(selectedRenderer);
    onRendererChange(selectedRenderer.renderer);
  };

  return (
    <div id='rendererContent' style={{marginTop: '-5px'}}>
      <select value={selectedRenderer ? selectedRenderer.value : ''} onChange={handleRendererChange} className='render-select'>
        <option value='' disabled hidden>Wybierz symbolizację</option>
        {renderers.map(renderer => (
          <option key={renderer.value} value={renderer.value}>{renderer.label}</option>
        ))}
      </select>
    </div>
  );
};
