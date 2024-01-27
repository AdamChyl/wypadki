import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { brandColors, eventColors, vehicleTypeColors } from '../../utils/utils';

export default function Charts({ brandsStatistics, accidentTypeStatistics, vechicleType }) {
  const chartBrandRef = useRef(null);
  const chartBrandInstance = useRef(null);

  const chartAccidentTypeRef = useRef(null);
  const chartAccidentTypeInstance = useRef(null);

  const chartVehicleTypeRef = useRef(null);
  const chartVehicleTypeInstance = useRef(null);

  useEffect(() => {
    const handleEmptyData = (chartRef, chartInstance, labelsText) => {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [labelsText],
          datasets: [{
            data: [1],
            backgroundColor: ["#cccccc"],
            borderWidth: 0,
          }],
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      });
    };

    if (!brandsStatistics) {
      handleEmptyData(chartBrandRef, chartBrandInstance, "Brak danych");
    } else {
      const brandEntries = Object.entries(brandsStatistics);
      const onlyInnaBrak = brandEntries.every(([brand]) => brand === "Inna" || brand === "Brak");

      if (onlyInnaBrak) {
        handleEmptyData(chartBrandRef, chartBrandInstance, "Brak danych");
      } else {
        const sortedData = brandEntries
          .sort((a, b) => b[1] - a[1])
          .filter(([brand]) => brand !== "Inna" && brand !== "Brak")
          .slice(0, 10);

        const labels = sortedData.map(([brand]) => brand);
        const data = sortedData.map(([brand, count]) => count);

        const ctx = chartBrandRef.current.getContext('2d');
        const backgroundColors = labels.map(brand => brandColors[brand]);

        if (chartBrandInstance.current) {
          chartBrandInstance.current.destroy();
        }

        chartBrandInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
              borderWidth: 1,
            }],
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'white',
                  font: {
                    size: 10,
                  },
                },
              },
            },
          },
        });
      }
    }

    if (!accidentTypeStatistics) {
      handleEmptyData(chartAccidentTypeRef, chartAccidentTypeInstance, "Brak danych");
    } else {
      const accidentTypeEntries = Object.entries(accidentTypeStatistics);
      const onlyInne = accidentTypeEntries.every(([type]) => type.toLowerCase() === "inne");

      if (onlyInne) {
        handleEmptyData(chartAccidentTypeRef, chartAccidentTypeInstance, "Brak danych");
      } else {
        const sortedData = accidentTypeEntries
          .filter(([type]) => type.toLowerCase() !== "inne")
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const labels = sortedData.map(([type]) => type);
        const data = sortedData.map(([type, count]) => count);

        const ctx = chartAccidentTypeRef.current.getContext('2d');
        const backgroundColors = labels.map(event => eventColors[event]);

        if (chartAccidentTypeInstance.current) {
          chartAccidentTypeInstance.current.destroy();
        }

        chartAccidentTypeInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map(color => color && color.replace ? color.replace('0.8', '1') : color),
              borderWidth: 1,
            }],
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'white',
                  font: {
                    size: 10,
                  },
                },
              },
            },
          },
        });
      }
    }

    if (!vechicleType) {
      handleEmptyData(chartVehicleTypeRef, chartVehicleTypeInstance, "Brak danych");
    } else {
      const vehicleTypeEntries = Object.entries(vechicleType);
      const onlyInne = vehicleTypeEntries.every(([type]) => type === "Inne" || type === "Brak" || type === "Pojazd nieustalony");

      if (onlyInne) {
        handleEmptyData(chartVehicleTypeRef, chartVehicleTypeInstance, "Brak danych");
      } else {
        const sortedData = vehicleTypeEntries
          .filter(([type]) => type !== "Inne" && type !== "Brak" && type !== "Pojazd nieustalony")
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const labels = sortedData.map(([type]) => type);
        const data = sortedData.map(([type, count]) => count);

        const ctx = chartVehicleTypeRef.current.getContext('2d');
        const backgroundColors = labels.map(vehicleType => vehicleTypeColors[vehicleType]);

        if (chartVehicleTypeInstance.current) {
          chartVehicleTypeInstance.current.destroy();
        }

        chartVehicleTypeInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map(color => color && color.replace ? color.replace('0.8', '1') : color),
              borderWidth: 1,
            }],
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'white',
                  font: {
                    size: 10,
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [brandsStatistics, accidentTypeStatistics, vechicleType]);

  return (
    <div className="mobile-charts">
    <div className="charts-div">
      <div className='inner-charts-div'>
        <h3 className='charts-desc'>Sprawca</h3>
        <canvas ref={chartBrandRef} className='charts'></canvas>
        <hr className="filter-break-line" style={{ marginTop: "10px"}} />
        <h3 className='charts-desc'>Zdarzenie</h3>
        <canvas ref={chartAccidentTypeRef} className='charts'></canvas>
        <hr className="filter-break-line" style={{ marginTop: "10px"}} />
        <h3 className='charts-desc'>Typ Pojazdu</h3>
        <canvas ref={chartVehicleTypeRef} className='charts'></canvas>
      </div>
    </div>
    </div>
  );
}
