import AllDateButton from "../AllDateButton/AllDateButton";
import Select from "../Select/Select";

export default function Settings2D({
    isAllDate, setIsAllDate, limit, setLimit, accidentType,
    setAccidentType, brand, setBrand, month, setMonth, timeOfDay,
    setTimeOfDay, voivodeship, setVoivodeship, carType, setCarType,
    typeOfArea, setTypeOfArea
}) {

    return (
        <>
            <div id='content2D' className='settings-content' style={{ backgroundColor: "#303030" }}>
                <div style={{ backgroundColor: "#303030" }}>
                    <div className='header-container'>
                        <h4 style={{ paddingTop: '10px', paddingLeft: '10px' }}>Ustawienia</h4>
                    </div>
                    <Select handleChange={setLimit} currentValue={limit} title="Ograniczenie">
                        <option value="all">Wszystkie</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                        <option value="110">110</option>
                        <option value="120">120</option>
                        <option value="130">130</option>
                        <option value="140">140</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setTypeOfArea} currentValue={typeOfArea} title="Obszar">
                        <option value="all">Wszystkie</option>
                        <option value="Obszar Miejski">Miejski</option>
                        <option value="Obszar Wiejski">Wiejski</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setAccidentType} currentValue={accidentType} title="Rodzaj">
                        <option value="all">Wszystkie</option>
                        <option value="Zderzenie pojazdów boczne">Zderzenie pojazdów boczne</option>
                        <option value="Zderzenie pojazdów tylne">Zderzenie pojazdów tylne</option>
                        <option value="Najechanie na pieszego">Najechanie na pieszego</option>
                        <option value="Zderzenie pojazdów czołowe">Zderzenie pojazdów czołowe</option>
                        <option value="Zdarzenie z osobą UWR">Zdarzenie z osobą UWR</option>
                        <option value="Najechanie na pojazd unieruchomiony">Najechanie na pojazd unieruchomiony</option>
                        {/* <option value="Najechanie na drzewo, słup, inny obiekt drogowy">Najechanie na drzewo, słup, inny obiekt drogowy</option> */}
                        <option value="Najechanie na drzewo">Najechanie na drzewo</option>
                        <option value="Najechanie na słup, znak">Najechanie na słup, znak</option>
                        <option value="Najechanie na zapore kolejową">Najechanie na zapore kolejową</option>
                        <option value="Najechanie na dziurę, wybój, garb">Najechanie na dziurę, wybój, garb</option>
                        <option value="Najechanie na zwierzę">Najechanie na zwierzę</option>
                        <option value="Najechanie na barierę ochronną">Najechanie na barierę ochronną</option>
                        <option value="Wywrócenie się pojazdu">Wywrócenie się pojazdu</option>
                        <option value="Wypadek z pasażerem">Wypadek z pasażerem</option>
                        <option value="Inne">Inne</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setBrand} currentValue={brand} title="Sprawca">
                        <option value="all">Wszystkie</option>
                        <option value="TOYOTA">Toyota</option>
                        <option value="VOLKSWAGEN">Volkswagen</option>
                        <option value="OPEL">Opel</option>
                        <option value="AUDI">Audi</option>
                        <option value="SKODA">Skoda</option>
                        <option value="RENAULT">Renault</option>
                        <option value="FORD">Ford</option>
                        <option value="BMW">Bmw</option>
                        <option value="PEUGEOT">Peugeot</option>
                        <option value="CITROEN">Citroen</option>
                        <option value="HONDA">Honda</option>
                        <option value="FIAT">Fiat</option>
                        <option value="MERCEDES">Mercedes</option>
                        <option value="SEAT">Seat</option>
                        <option value="HYUNDAI">Hyundai</option>
                        <option value="KIA">Kia</option>
                        <option value="VOLVO">Volvo</option>
                        <option value="NISSAN">Nissan</option>
                        <option value="MAZDA">Mazda</option>
                        <option value="MITSUBISHI">Mitsubishi</option>
                        <option value="Brak">Brak</option>
                        <option value="Inna">Inna</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setCarType} currentValue={carType} title="Typ Pojazdu">
                        <option value="all">Wszystkie</option>
                        <option value="Samochód osobowy">Samochód osobowy</option>
                        <option value="Samochód ciężarowy">Samochód ciężarowy</option>
                        <option value="Rower">Rower</option>
                        <option value="Motocykl">Motocykl</option>
                        <option value="Autobus komunikacji">Autobus komunikacji</option>
                        <option value="Autobus inny">Autobus inny</option>
                        <option value="Ciągnik rolniczy">Ciągnik rolniczy</option>
                        <option value="Inne">Inny</option>
                        <option value="Brak">Nieokreślony</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setTimeOfDay} currentValue={timeOfDay} title="Pora dnia">
                        <option value="all">Wszystkie</option>
                        <option value="Dzień">Dzień</option>
                        <option value="Noc">Noc</option>
                    </Select>
                    <hr className="filter-break-line" />
                    <Select handleChange={setMonth} currentValue={month} title="Miesiąc">
                        <option value="all">Wszystkie</option>
                        <option value="1">Styczeń</option>
                        <option value="2">Luty</option>
                        <option value="3">Marzec</option>
                        <option value="4">Kwiecień</option>
                        <option value="5">Maj</option>
                        <option value="6">Czerwiec</option>
                        <option value="7">Lipiec</option>
                        <option value="8">Sierpień</option>
                        <option value="9">Wrzesień</option>
                        <option value="10">Październik</option>
                        <option value="11">Listopad</option>
                        <option value="12">Grudzień</option>
                    </Select>
                    {/* <hr className="filter-break-line" />
                    <Select handleChange={setVoivodeship} currentValue={voivodeship} title="Województwo">
                        <option value="all">Wszystkie</option>
                        <option value="Lubelskie">Lubelskie</option>
                        <option value="Małopolskie">Małopolskie</option>
                        <option value="Dolnośląskie">Dolnośląskie</option>
                    </Select> */}
                    <hr className="filter-break-line" />
                    <AllDateButton isAllDate={isAllDate} setIsAllDate={setIsAllDate} map={("2D")} />

                    <div style={{ marginBottom: '0px', marginTop: '0px', visibility: 'hidden' }}>_</div>
                </div>
            </div>
        </>
    )
}