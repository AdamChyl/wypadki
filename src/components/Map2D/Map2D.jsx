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
import { queryAndProcessStatistics } from "../../utils/utils";
import { limitRenderer, areaRenderer, eventTypeRenderer, brandRenderer, vechicleRenderer, dayTimeRenderer, monthRenderer } from "../../utils/renderers";
import RendererSelector from "../RendererSelector/RendererSelector";
import Charts from "../Charts/Charts";

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
    const [viewState, setView] = useState(null);
    const [currentExtent, setCurrentExtent] = useState(null);
    const [accidentsCount, setAccidentsCount] = useState(null);
    const [defaultRenderer, setDefaultRenderer] = useState(null);

    const [brandsStatistics, setBrandsStatistics] = useState(null);
    const [accidentTypeStatistics, setAccidentTypeStatistics] = useState(null);
    const [vechicleType, setVechicleType] = useState(null);

    const containerRef2D = useRef(null);
    const rendererInputRef = useRef(null);

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
            expandTooltip: "Szukaj",
            group: "top-right"
        });
        var content = document.getElementById('content2D');

        let Map2DSettingsExpand = new Expand({
            expandIconClass: 'esri-icon-settings',
            expandTooltip: 'Ustawienia',
            content: content,
            container: containerRef2D.current,
            group: "top-right"
        });

        var contentRenderer = document.getElementById('rendererContent');

        let renderer = new Expand({
            expandIconClass: 'esri-icon-maps',
            expandTooltip: 'Symbolizacja',
            content: contentRenderer,
            container: rendererInputRef.current,
            group: "top-right"
        });

        let legend = new Legend({
            view: view
        });

        let legendExpand = new Expand({
            expandIconClass: 'esri-icon-legend',
            expandTooltip: 'Legenda',
            content: legend,
            group: "top-right"
        });


        view.ui.padding = { left: 15, top: 30, right: 15, bottom: 15 };

        view.when(() => {

            const accidentsLayer = webMap.layers.find(layer => layer.title === "Wypadki");
            setAccidentsLayer(accidentsLayer);
            setDefaultRenderer(accidentsLayer.renderer);

            accidentsLayer.renderer = limitRenderer;

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

            view.ui.add(searchWidgetExpand, "top-right");

            view.ui.add(renderer, "top-right");

            view.ui.add(legendExpand, "top-right");

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

                const conditions = [
                    { condition: limit !== 'all', expression: `Ograniczenie_predkosci = '${limit}'` },
                    { condition: accidentType !== 'all', expression: `Rodzaj_zdarzenia = '${accidentType}'` },
                    { condition: month !== 'all', expression: `Miesiac = '${month}'` },
                    { condition: brand !== 'all', expression: `Marka_sprawcy = '${brand}'` },
                    { condition: timeOfDay !== 'all', expression: `Pora_dnia = '${timeOfDay}'` },
                    { condition: voivodeship !== 'all', expression: `Województwo = '${voivodeship}'` },
                    { condition: carType !== 'all', expression: `Rodzaj_pojazdu = '${carType}'` },
                    { condition: typeOfArea !== 'all', expression: `Rodzaj_obszaru = '${typeOfArea}'` },
                ];

                conditions.forEach(({ condition, expression }) => {
                    if (condition) {
                        whereClause += (whereClause.length === 0 ? '' : ' AND ') + expression;
                    }
                });
            } else {
                const conditions = [
                    { condition: limit !== 'all', expression: `Ograniczenie_predkosci = ${limit}` },
                    { condition: accidentType !== 'all', expression: `Rodzaj_zdarzenia = '${accidentType}'` },
                    { condition: month !== 'all', expression: `Miesiac = '${month}'` },
                    { condition: brand !== 'all', expression: `Marka_sprawcy = '${brand}'` },
                    { condition: timeOfDay !== 'all', expression: `Pora_dnia = '${timeOfDay}'` },
                    { condition: voivodeship !== 'all', expression: `Województwo = '${voivodeship}'` },
                    { condition: carType !== 'all', expression: `Rodzaj_pojazdu = '${carType}'` },
                    { condition: typeOfArea !== 'all', expression: `Rodzaj_obszaru = '${typeOfArea}'` },
                ];

                conditions.forEach(({ condition, expression }) => {
                    if (condition) {
                        whereClause += (whereClause.length === 0 ? '' : ' AND ') + expression;
                    }
                });
            }

            accidentsLayer.definitionExpression = whereClause;

            const queryExtent = accidentsLayer.createQuery();
            queryExtent.geometry = viewState.extent;
            queryExtent.where = whereClause;

            accidentsLayer.queryFeatureCount(queryExtent).then(count => {
                setAccidentsCount(count);
            });

            queryAndProcessStatistics("Marka_sprawcy", setBrandsStatistics, accidentsLayer, viewState, whereClause);
            queryAndProcessStatistics("Rodzaj_zdarzenia", setAccidentTypeStatistics, accidentsLayer, viewState, whereClause);
            queryAndProcessStatistics("Rodzaj_pojazdu", setVechicleType, accidentsLayer, viewState, whereClause);
        }

    }, [viewState, currentExtent, accidentsLayer, limit, isAllDate,
        accidentType, month, brand, timeOfDay, voivodeship, carType, typeOfArea]);

    function handleClick() {
        setClicked((prev) => !prev);
    }

    function handleRendererChange(renderer) {
        if (accidentsLayer) {
            accidentsLayer.renderer = renderer;
        }
    };

    return (
        <>
            <div id="viewDiv"></div>
            {/* <Header position="left">Mapa Wypadków 2D</Header> */}
            <SplashScreenWidget className={clicked ? "" : "hide"} onClick={handleClick} map={map}></SplashScreenWidget>
            <Charts brandsStatistics={brandsStatistics} accidentTypeStatistics={accidentTypeStatistics} vechicleType={vechicleType} />
            <div ref={rendererInputRef}>
                <RendererSelector onRendererChange={handleRendererChange} defaultRenderer={defaultRenderer} />
            </div>
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
