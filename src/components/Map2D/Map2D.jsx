import WebMap from "@arcgis/core/WebMap.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import MapView from "@arcgis/core/views/MapView.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Search from "@arcgis/core/widgets/Search.js";
import Zoom from "@arcgis/core/widgets/Zoom.js";
import { useEffect, useRef, useState } from 'react';
import AccidentsCount from '../AccidentsCount/AccidentsCount';
import Header from "../Header/Header";
import Settings2D from '../Settings2D/Settings2D';
import SplashScreenWidget from '../Splash/SplashScreenWidget/SplashScreenWidget';

export default function Map2D({ map, setMap, clicked, setClicked, sliderValue, isAllDate, setIsAllDate }) {

    const [limit, setLimit] = useState("all");
    const [accidentType, setAccidentType] = useState("all");
    const [brand, setBrand] = useState("all");
    const [month, setMonth] = useState("all");
    const [timeOfDay, setTimeOfDay] = useState("all");
    const [carType, setCarType] = useState("all");
    const [typeOfArea, setTypeOfArea] = useState("all");
    const [voivodeship, setVoivodeship] = useState("all");

    const [accidentsLayer, setAccidentsLayer] = useState(null);
    // const [heatmapLayer, setHeatmapLayer] = useState(null);
    const [viewState, setView] = useState(null);
    const [currentExtent, setCurrentExtent] = useState(null);
    const [accidentsCount, setAccidentsCount] = useState(null);
    const containerRef2D = useRef(null);

    useEffect(() => {
        const webMap = new WebMap({
            portalItem: {
                id: "d9b710a5ab684894a79ead1c01b0ae38"
            }
        });

        const view = new MapView({
            map: webMap,
            container: "viewDiv",
            zoom: 6,
            // center: [22.667427, 51.160614]
            center: [19.485405, 51.131697],
            ui: {
                components: ["attribution"]
            }
        });

        setView(view);

        let searchWidget = new Search({
            view: view
        });

        let searchWidgetExpand = new Expand({
            expandIcon: "search",
            view: view,
            content: searchWidget,
            expandTooltip: "Szukaj"
        });
        var content = document.getElementById('content2D');

        let Map2DSettingsExpand = new Expand({
            expandIconClass: 'esri-icon-settings',
            expandTooltip: 'Ustawienia',
            content: content,
            container: containerRef2D.current
        });

        view.ui.padding = { left: 15, top: 30, right: 15, bottom: 15 };

        view.when(() => {

            setAccidentsLayer(webMap.layers.find(layer => layer.title === "Wypadki"))

            // setHeatmapLayer(webMap.layers.find(layer => layer.title === "Heatmap"))

            // view.ui.add(zoom, {
            //     position: "top-right"
            //   });

            view.ui.add(Map2DSettingsExpand, {
                position: "top-right"
            });

            const mapChangeButton = document.createElement("div");
            mapChangeButton.id = "mapChangeButton";
            mapChangeButton.classList.add("esri-widget", "widget-div");
            mapChangeButton.style = `
                cursor: pointer;
                min-width: 32px;
                min-height: 32px;
                overflow: visible;
                align-items: center;
                justify-content: center;
            `;
            mapChangeButton.addEventListener("click", () => {
                setMap((prev) => (prev === "2D" ? "3D" : "2D"));
            });

            const buttonContent = document.createElement("div");
            buttonContent.style = `
                min-width: 32px;
                min-height: 32px;
                padding-top: 8px;
                padding-left: 7px;
            `;
            buttonContent.textContent = "3D";

            mapChangeButton.appendChild(buttonContent);
            view.ui.add(mapChangeButton, "top-right");

            const additionalWidget = document.createElement("div");
            additionalWidget.className = "esri-widget widget-div";
            additionalWidget.style = `

                cursor: pointer;
                min-width: 32px;
                min-height: 32px;
                overflow: visible;
                align-items: center;
                justify-content: center;
            `;
            additionalWidget.addEventListener("click", handleClick);

            const iconSpan = document.createElement("span");
            iconSpan.className = "esri-icon esri-icon-notice-round";
            iconSpan.style = `
                min-width: 32px;
                min-height: 32px;
                padding-top: 8px;
                padding-left: 8px;
            `;

            additionalWidget.appendChild(iconSpan);

            view.ui.add(additionalWidget, "top-right");

            view.ui.add(searchWidgetExpand, {
                position: "top-right"
            });

            const extentWatchHandle = reactiveUtils.when(
                () => view.stationary === true,
                () => {
                    setCurrentExtent(view.extent);
                }
            );
        });

        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (accidentsLayer) {

            let whereClause = '';

            if (!isAllDate) {

                whereClause = `rok = '${sliderValue}'`;

                if (limit !== 'all') {
                    whereClause += ` AND Ograniczenie_predkosci = '${limit}'`;
                }

                if (accidentType !== 'all') {
                    whereClause += ` AND Rodzaj_zdarzenia = '${accidentType}'`;
                }

                if (month !== 'all') {
                    whereClause += ` AND Miesiac = '${month}'`;
                }

                if (brand !== 'all') {
                    whereClause += ` AND Marka_sprawcy = '${brand}'`;
                }

                if (timeOfDay !== 'all') {
                    whereClause += ` AND Pora_dnia = '${timeOfDay}'`;
                }

                if (voivodeship !== 'all') {
                    whereClause += ` AND Województwo = '${voivodeship}'`;
                }

                if (carType !== 'all') {
                    whereClause += ` AND Rodzaj_pojazdu = '${carType}'`;
                }

                if (typeOfArea !== 'all') {
                    whereClause += ` AND Rodzaj_obszaru = '${typeOfArea}'`;
                }


            } else {

                if (limit !== 'all' && whereClause.length === 0) {
                    whereClause += `Ograniczenie_predkosci = ${limit}`;
                } else if (limit !== 'all') {
                    whereClause += ` AND Ograniczenie_predkosci = ${limit}`;
                }

                if (accidentType !== 'all' && whereClause.length === 0) {
                    whereClause += `Rodzaj_zdarzenia = '${accidentType}'`;
                } else if (accidentType !== 'all') {
                    whereClause += ` AND Rodzaj_zdarzenia = '${accidentType}'`;
                }

                if (month !== 'all' && whereClause.length === 0) {
                    whereClause += `Miesiac = '${month}'`;
                } else if (month !== 'all') {
                    whereClause += ` AND Miesiac = '${month}'`;
                }

                if (brand !== 'all' && whereClause.length === 0) {
                    whereClause += `Marka_sprawcy = '${brand}'`;
                } else if (brand !== 'all') {
                    whereClause += ` AND Marka_sprawcy = '${brand}'`;
                }

                if (timeOfDay !== 'all' && whereClause.length === 0) {
                    whereClause += `Pora_dnia = '${timeOfDay}'`;
                } else if (timeOfDay !== 'all') {
                    whereClause += ` AND Pora_dnia = '${timeOfDay}'`;
                }

                if (voivodeship !== 'all' && whereClause.length === 0) {
                    whereClause += `Województwo = '${voivodeship}'`;
                } else if (voivodeship !== 'all') {
                    whereClause += ` AND Województwo = '${voivodeship}'`;
                }
                if (carType !== 'all' && whereClause.length === 0) {
                    whereClause += ` Rodzaj_pojazdu = '${carType}'`;
                } else if (carType !== 'all') {
                    whereClause += ` AND Rodzaj_pojazdu = '${carType}'`;
                }

                if (typeOfArea !== 'all' && whereClause.length === 0) {
                    whereClause += `Rodzaj_obszaru = '${typeOfArea}'`;
                } else if (typeOfArea !== 'all') {
                    whereClause += ` AND Rodzaj_obszaru = '${typeOfArea}'`;
                }
            }

            accidentsLayer.definitionExpression = whereClause;
            // heatmapLayer.definitionExpression = whereClause;

            const queryExtent = accidentsLayer.createQuery();
            queryExtent.geometry = viewState.extent;

            accidentsLayer.queryFeatureCount(queryExtent).then(count => {
                setAccidentsCount(count);
            })
        }

    }, [viewState, currentExtent, accidentsLayer, limit, isAllDate,
        accidentType, month, brand, timeOfDay, voivodeship, carType, typeOfArea]);


    // useEffect(() => {
    //     if (accidentsLayer) {
    //         const queryExtent = accidentsLayer.createQuery();
    //         queryExtent.geometry = viewState.extent;

    //         accidentsLayer.queryFeatureCount(queryExtent).then(count => {
    //             setAccidentsCount(count);
    //         }).catch(error => {
    //         });
    //     }
    // }, [viewState, currentExtent]);

    function handleClick() {
        setClicked((prev) => !prev);
    }

    // if (heatmapLayer) {
    //     heatmapLayer.popupTemplate = null;
    // }

    return (
        <>
            <div id="viewDiv"></div>
            <Header position="left">Mapa Wypadków 2D</Header>
            <SplashScreenWidget className={clicked ? "" : "hide"} onClick={handleClick} map={map}></SplashScreenWidget>

            <div ref={containerRef2D} className='widget-container' >
                <Settings2D
                    isAllDate={isAllDate}
                    setIsAllDate={setIsAllDate}
                    limit={limit}
                    setLimit={setLimit}
                    accidentType={accidentType}
                    setAccidentType={setAccidentType}
                    brand={brand}
                    setBrand={setBrand}
                    month={month}
                    setMonth={setMonth}
                    timeOfDay={timeOfDay}
                    setTimeOfDay={setTimeOfDay}
                    voivodeship={voivodeship}
                    setVoivodeship={setVoivodeship}
                    carType={carType}
                    setCarType={setCarType}
                    typeOfArea={typeOfArea}
                    setTypeOfArea={setTypeOfArea}
                />
            </div>

            <AccidentsCount isAllDate={isAllDate} accidentsCount={accidentsCount} />

        </>
    );
}
