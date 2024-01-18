export default function AllDateButton({ isAllDate, setIsAllDate, map }) {

  let divClass;

  if (map === "2D") {
    divClass = "all-date-button-div-2D";
  } else {
    divClass = "all-date-button-div-3D";
  }

  return (
    <div
      className={divClass}
      onClick={() => setIsAllDate((prev) => !prev)}>
      <input
        type="checkbox"
        id="allDate"
        name="allDate"
        checked={isAllDate}
        onChange={() => (1)}
        style={{ marginRight: '5px', cursor: 'pointer', background: "#333" }}
      />
      <label className="all-date-label">
        Wszystkie lata
      </label>
    </div>
  )
}