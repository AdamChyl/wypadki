import SplashScreenWidget from "./SplashScreenWidget/SplashScreenWidget";

export default function Splash({ isExpanded, setClicked, clicked, map }) {

  function handleClick() {
    setClicked((prev) => !prev);
  }

  return (
    <>
      <div
        className="esri-widget widget-div"
        style={{
          right: "1rem",
          top: isExpanded ? "7.50rem" : "34.50rem",
          position: "absolute",
          cursor: "pointer",
          minWidth: "32px",
          minHeight: "32px",
          overflow: "visible",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClick}
      >
        <span className="esri-icon esri-icon-notice-round" style={{
          minWidth: "32px",
          minHeight: "32px",
          paddingTop: "8px",
          paddingLeft: "8px",
        }}></span>
      </div>
      <SplashScreenWidget className={clicked ? "" : "hide"} onClick={handleClick} map={map}></SplashScreenWidget>
    </>
  );
}
