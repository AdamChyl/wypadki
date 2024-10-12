export const queryAndProcessStatistics = (field, stateSetter, accidentsLayer, viewState, whereClause) => {
    return new Promise((resolve, reject) => {
        const query = accidentsLayer.createQuery();
        query.geometry = viewState.extent;
        query.where = whereClause;
        query.outFields = [field];
        query.groupByFieldsForStatistics = field;
        query.outStatistics = [{
            statisticType: 'count',
            onStatisticField: field,
            outStatisticFieldName: 'Count'
        }];

        accidentsLayer.queryFeatures(query).then(result => {
            const dictionary = {};
            if (result && result.features && result.features.length > 0) {
                result.features.forEach(feature => {
                    const attributes = feature.attributes;
                    const fieldValue = attributes[field];
                    const count = attributes["Count"];

                    if (fieldValue && count !== undefined) {
                        dictionary[fieldValue] = count;
                    }
                });
            }
            stateSetter(dictionary);
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
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
    "AUDI": '#795548',
    "NISSAN": '#AD1457',
    "MAZDA": '#6A1B9A',
    "CITROEN": '#FFC400',
    "VOLVO": '#0069C0',
    "SKODA": '#00796B',
    "FORD": '#FF6F00',
    "PEUGEOT": '#AD1457',
    "BRAK": '#BDBDBD',
    "Inna": '#BDBDBD',
};

export const eventColors = {
    "Najechanie na barierę ochronną": '#D8BFD8',
    "Najechanie na drzewo": '#8FBC8F',
    "Najechanie na dziurę, wybój, garb": '#FFD700',
    "Najechanie na pieszego": '#B22222',
    "Najechanie na pojazd unieruchomiony": '#FFD700',
    "Najechanie na słup, znak": '#E9967A',
    "Najechanie na zaporę kolejową": '#2E8B57',
    "Najechanie na zwierzę": '#FFA500',
    "Wypadek z pasażerem": '#E9967A',
    "Wywrócenie się pojazdu": '#8FBC8F',
    "Zderzenie pojazdów boczne": '#1E90FF',
    "Zderzenie pojazdów czołowe": '#FF69B4',
    "Zderzenie pojazdów tylne": '#2E8B57',
    "Zdarzenie z osobą UWR": '#D8BFD8',
    "Inne": '#A6CEE3',
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



