export const processStatisticsResult = (result, fieldName) => {
    const dictionary = {};

    if (result && result.features && result.features.length > 0) {
        result.features.forEach(feature => {
            const attributes = feature.attributes;
            const fieldValue = attributes[fieldName];
            const count = attributes["Count"];

            if (fieldValue && count !== undefined) {
                dictionary[fieldValue] = count;
            }
        });
    }

    return dictionary;
};

export const brandColors = {
    "VOLKSWAGEN": '#004D40',
    "HYUNDAI": '#FF6F00',
    "BMW": '#0044A1',
    "MERCEDES": '#37474F',
    "FIAT": '#FFA000',
    "SEAT": '#558B2F',
    "HONDA": '#FF8F00',
    "KIA": '#4527A0',
    "OPEL": '#FFC400',
    "MITSUBISHI": '#7CB342',
    "TOYOTA": '#D81B60',
    "RENAULT": '#005CBF',
    "AUDI": '#5D4037',
    "NISSAN": '#AD1457',
    "MAZDA": '#6A1B9A',
    "CITROEN": '#FFC400',
    "VOLVO": '#0069C0',
    "SKODA": '#00796B',
    "FORD": '#FF6F00',
    "PEUGEOT": '#AD1457',
    "BRAK": '#BDBDBD',
    "Inna": '#FF6F00',
};

export const eventColors = {
    "Najechanie na barierę ochronną": '#cab2d6',
    "Najechanie na drzewo": '#b2df8a',
    "Najechanie na dziurę, wybój, garb": '#fdbf6f',
    "Najechanie na pieszego": '#e31a1c',
    "Najechanie na pojazd unieruchomiony": '#fdbf6f',
    "Najechanie na słup, znak": '#fb9a99',
    "Najechanie na zapore kolejową": '#33a02c',
    "Najechanie na zwierzę": '#ff7f00',
    "Wypadek z pasażerem": '#fb9a99',
    "Wywrócenie się pojazdu": '#b2df8a',
    "Zderzenie pojazdów boczne": '#1f78b4',
    "Zderzenie pojazdów czołowe": '#ff7fd0',
    "Zderzenie pojazdów tylne": '#33a02c',
    "Zdarzenie z osobą UWR": '#cab2d6',
    "Inne": '#a6cee3',
  };

export const vehicleTypeColors = {
    "Autobus inny": '#FF5733',
    "Autobus komunikacji": '#8E44AD',
    "Brak": '#BDC3C7',
    "Ciągnik rolniczy": '#3498DB',
    "Inne": '#EC7063',
    "Motocykl": '#F39C12',
    "Pojazd nieustalony": '#A569BD',
    "Rower": '#2ECC71',
    "Samochód ciężarowy": '#34495E',
    "Samochód osobowy": '#E74C3C',
};

export const monthColors = {
    "1": "#1f78b4",   // Styczeń
    "2": "#33a02c",   // Luty
    "3": "#e31a1c",   // Marzec
    "4": "#ff7f00",   // Kwiecień
    "5": "#cab2d6",   // Maj
    "6": "#fdbf6f",   // Czerwiec
    "7": "#b2df8a",   // Lipiec
    "8": "#fb9a99",   // Sierpień
    "9": "#ff7f00",   // Wrzesień
    "10": "#fdbf6f",  // Październik
    "11": "#ff7f00",  // Listopad
    "12": "#999999"   // Grudzień
  };



