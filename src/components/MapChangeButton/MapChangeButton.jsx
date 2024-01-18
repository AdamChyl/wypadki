export default function MapChangeButton({ children, isExpanded, setMap }) {

    return (
        <>
            <div
                className="esri-widget widget-div"
                style={{
                    right: "1rem",
                    top: isExpanded ? "4.75rem" : "31.75rem",
                    position: "absolute",
                    cursor: "pointer",
                    minWidth: "32px",
                    minHeight: "32px",
                    overflow: "visible",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={() => setMap((prev) => prev === "2D" ? "3D" : "2D")}
            >
                <div style={{
                    minWidth: "32px",
                    minHeight: "32px",
                    paddingTop: "8px",
                    paddingLeft: "7px",
                }}>{children}</div>
            </div>
        </>
    );
}