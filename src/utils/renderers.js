import {eventColors, brandColors, vehicleTypeColors, monthColors} from './utils.js';

const commonSymbol = {
    type: "simple-marker",
    size: 5,
    outline: {
      type: "simple-line",
      width: 0.75,
      color: [92, 92, 92, 0.5]
    }
  };

  export const limitRenderer = {
    type: "simple",
    symbol: commonSymbol,
    visualVariables: [{
      type: "color",
      field: "Ograniczenie_predkosci",
      stops: [
        { value: 20, color: "#2e5930" },
        { value: 40, color: "#467c47" },
        { value: 60, color: "#699e69" },
        { value: 80, color: "#ccaa00" },
        { value: 100, color: "#cc6666" },
        { value: 120, color: "#cc3333" },
        { value: 140, color: "#993333" }
      ]
    }]
  };

  export const areaRenderer = {
    type: "unique-value",
    field: "Rodzaj_obszaru",
    uniqueValueInfos: [
      {
        value: "Obszar Miejski",
        symbol: { ...commonSymbol, color: "#cc3333"}
      },
      {
        value: "Obszar Wiejski",
        symbol: { ...commonSymbol, color: "#467c47" }
      }
    ]
  };

  export const dayTimeRenderer = {
    type: "unique-value",
    field: "Pora_dnia",
    uniqueValueInfos: [
      { value: "Dzień", symbol: { ...commonSymbol, color: "#FFC857" } },
      { value: "Noc", symbol: { ...commonSymbol, color: "#0C2C54" } }
    ]
  };

  export const eventTypeRenderer = {
    type: "unique-value",
    field: "Rodzaj_zdarzenia",
    uniqueValueInfos: Object.keys(eventColors).map(value => ({
      value,
      symbol: { ...commonSymbol, color: eventColors[value] }
    }))
  };

  export const brandRenderer = {
    type: "unique-value",
    field: "Marka_sprawcy",
    uniqueValueInfos: Object.keys(brandColors).map(value => ({
      value,
      symbol: { ...commonSymbol, color: brandColors[value] }
    }))
  };

  export const vechicleRenderer = {
    type: "unique-value",
    field: "Rodzaj_pojazdu",
    uniqueValueInfos: Object.keys(vehicleTypeColors).map(value => ({
      value,
      symbol: { ...commonSymbol, color: vehicleTypeColors[value] }
    }))
  };

  export const monthRenderer = {
    type: "unique-value",
    field: "Miesiac",
    uniqueValueInfos: Object.keys(monthColors).map(value => ({
      value,
      symbol: { ...commonSymbol, color: monthColors[value] },
      label: getMonthName(value)
    }))
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
      "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];
    return monthNames[parseInt(monthNumber, 10) - 1];
  }
