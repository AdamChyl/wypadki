import './AlertSplash.css';

const AlertSplash = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <h4 className="alert-header">Uwaga!</h4>
        <div className="alert-content">
          {message}
        </div>
        <div className="alert-footer">
          <button className="alert-button" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSplash;
