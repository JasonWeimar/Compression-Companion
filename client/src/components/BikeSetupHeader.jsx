const BikeSetupHeader = ({ currentSetup, onPrevious, onNext }) => {

    return (
        <div className="headerContainerStyle">
            <button onClick={onPrevious}>←</button>
            <h2>{currentSetup.bikeName}</h2>
            <button onClick={onNext}>→</button>

            <div className="dataSquareContainer">
                <div className="dataSquare">
                    <p>Fork PSI: {currentSetup.forkPSI || 'N/A'}</p>
                </div>
                <div className="dataSquare">
                    <p>Shock Spring Rate: {currentSetup.shockSpringRate || 'N/A'}</p>
                </div>
                <div className="dataSquare">
                    <p>Front Tire Pressure: {currentSetup.tirePressureFront || 'N/A'}</p>
                </div>
                <div className="dataSquare">
                    <p>Rear Tire Pressure: {currentSetup.tirePressureRear || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default BikeSetupHeader;
