import './SplashScreenWidget.css';

const SplashScreenWidget = ({ className, onClick, map }) => {

  return (
    <div className={className}>
      <div id='overlay' className='center' />
      <div id='intro' className='center'>
        <div className='column-17'>
          <div className='card card-wide'>
            <div className='card-content'>
              <h4 className='trailer-half header'>Interaktywna mapa wypadków drogowych</h4>
              <div className='font-size--1 trailer-half'>
                Przeglądaj i odkrywaj miejsca zdarzeń, identyfikuj najniebezpieczniejsze lokalizacje,
                filtruj dane, analizuj statystyki i zwiększ świadomość społeczną w zakresie bezpieczeństwa drogowego.<br />
                <br /> Dane wykorzystane do stworzenia aplikacji zostały pobrane ze strony <a href='https://sewik.pl/' target='_blank'>sewik.pl</a> przy
                pomocy <a href='https://github.com/AdamChyl/sewikScraper' target='_blank'>Web Scrapera</a>,
                pochodzą z Komendy Głównej Policji w Warszawie.
                Dane zostały przefiltrowane, usunięto większość wadliwych rekordów, jednakże błędy mogą nadal występować.
              </div>
              <div className='font-size--1 trailer-half mobile-splash'>
                <p style={{ marginBottom: '0.5rem' }}>Nie masz pełnego ekranu?</p>
                <ul style={{ marginTop: '0' }}>
                  <li>Przesuń palcem w dół na tym tekście, aby schować górny pasek przeglądarki.</li>
                </ul>
              </div>
              {map === '3D' && (
                <div className='font-size--1 trailer-half mobile-splash'>
                  <p style={{ marginBottom: '0.5rem' }}>Sterowanie na urządzeniach mobilnych:</p>
                  <ul style={{ marginTop: '0' }}>
                    <li>Użyj dwóch palców, aby obrócić widok.</li>
                    <li>Użyj trzech palców, aby zmienić nachylenie widoku.</li>
                  </ul>
                </div>
              )}
              <div style={{ textAlign: 'center' }}>&nbsp;</div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'hsl(0,0%,0%)' }}></span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'hsl(0,0%,0%)' }}>Zapraszamy do dzielenia się uwagami, pytaniami oraz sugestiami. Prosimy o kontakt pod adresem:
                  <a href='mailto:mapawypadkow@gmail.com'> MapaWypadkow@gmail.com</a></span>
              </div>
              <div style={{ textAlign: 'center' }}>&nbsp;</div>
              <div className='footer'>
                <button
                  className='start-button'
                  onClick={onClick}
                >
                  Rozpocznij
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreenWidget;
