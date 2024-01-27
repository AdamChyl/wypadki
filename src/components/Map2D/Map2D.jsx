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
import { processStatisticsResult } from "../../utils/utils";
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
            expandTooltip: "Szukaj"
        });
        var content = document.getElementById('content2D');

        let Map2DSettingsExpand = new Expand({
            expandIconClass: 'esri-icon-settings',
            expandTooltip: 'Ustawienia',
            content: content,
            container: containerRef2D.current
        });

        var contentRenderer = document.getElementById('rendererContent');

        let renderer = new Expand({
            expandIconClass: 'esri-icon-maps',
            expandTooltip: 'Symbolizacja',
            content: contentRenderer,
            container: rendererInputRef.current
        });

        let legend = new Legend({
            view: view
          });

        let legendExpand = new Expand({
            expandIconClass: 'esri-icon-legend',
            expandTooltip: 'Legenda',
            content: legend,
        });


        view.ui.padding = { left: 15, top: 30, right: 15, bottom: 15 };

        view.when(() => {

            setAccidentsLayer(webMap.layers.find(layer => layer.title === "Wypadki"))
            setDefaultRenderer(webMap.layers.find(layer => layer.title === "Wypadki").renderer);

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

            const queryExtent = accidentsLayer.createQuery();
            queryExtent.geometry = viewState.extent;

            accidentsLayer.queryFeatureCount(queryExtent).then(count => {
                setAccidentsCount(count);
            })

            const queryBrandsExtent = accidentsLayer.createQuery();
            queryBrandsExtent.geometry = viewState.extent;

            queryBrandsExtent.where = whereClause;
            queryBrandsExtent.outFields = ["Marka_sprawcy"];

            queryBrandsExtent.groupByFieldsForStatistics = "Marka_sprawcy";
            queryBrandsExtent.outStatistics = [{
                statisticType: 'count',
                onStatisticField: 'Marka_sprawcy',
                outStatisticFieldName: 'Count'
            }];

            accidentsLayer.queryFeatures(queryBrandsExtent).then(result => {
                setBrandsStatistics(processStatisticsResult(result, "Marka_sprawcy"));
            })


            const queryAccidentTypeExtent = accidentsLayer.createQuery();
            queryAccidentTypeExtent.geometry = viewState.extent;

            queryAccidentTypeExtent.where = whereClause;
            queryAccidentTypeExtent.outFields = ["Rodzaj_zdarzenia"];

            queryAccidentTypeExtent.groupByFieldsForStatistics = "Rodzaj_zdarzenia";
            queryAccidentTypeExtent.outStatistics = [{
                statisticType: 'count',
                onStatisticField: 'Rodzaj_zdarzenia',
                outStatisticFieldName: 'Count'
            }];

            accidentsLayer.queryFeatures(queryAccidentTypeExtent).then(result => {
                setAccidentTypeStatistics(processStatisticsResult(result, "Rodzaj_zdarzenia"));
            })

            const queryVechicleTypeExtent = accidentsLayer.createQuery();
            queryVechicleTypeExtent.geometry = viewState.extent;

            queryVechicleTypeExtent.where = whereClause;
            queryVechicleTypeExtent.outFields = ["Rodzaj_pojazdu"];

            queryVechicleTypeExtent.groupByFieldsForStatistics = "Rodzaj_pojazdu";
            queryVechicleTypeExtent.outStatistics = [{
                statisticType: 'count',
                onStatisticField: 'Rodzaj_pojazdu',
                outStatisticFieldName: 'Count'
            }];

            accidentsLayer.queryFeatures(queryVechicleTypeExtent).then(result => {
                setVechicleType(processStatisticsResult(result, "Rodzaj_pojazdu"));
            })
        }

    }, [viewState, currentExtent, accidentsLayer, limit, isAllDate,
        accidentType, month, brand, timeOfDay, voivodeship, carType, typeOfArea]);

    function handleClick() {
        setClicked((prev) => !prev);
    }

    const handleRendererChange = (renderer) => {
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
                <RendererSelector onRendererChange={handleRendererChange} defaultRenderer={defaultRenderer}/>
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
