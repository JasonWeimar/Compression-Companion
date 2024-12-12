import { useState, useEffect } from "react";
import {
    getBikeSetupByIdService,
    deleteBikeSetupByIdService,
    getAllBikeSetupsService,
} from "../services/setup.service.js";
import { useNavigate, useParams, Link } from "react-router-dom";

const ManageSetups = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bikeSetup, setBikeSetup] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [setups, setSetups] = useState([]);


    useEffect(() => {
        const fetchSetups = async () => {
            try {
                const res = await getAllBikeSetupsService();
                if (res.length > 0) {
                    setSetups(res);
                    const index = id ? res.findIndex(setup => setup._id === id) : 0;
                    setCurrentIndex(index >= 0 ? index : 0);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchSetups();
    }, [id]);


    useEffect(() => {
        const fetchBikeSetupById = async () => {
            if (id) {
                try {
                    const setup = await getBikeSetupByIdService(id);
                    setBikeSetup(setup);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchBikeSetupById();
    }, [id]);

    
    
    useEffect(() => {
        if (setups.length > 0 && currentIndex < setups.length) {
            const currentSetup = setups[currentIndex];
            setBikeSetup(currentSetup);
            navigate(`/companion/manage/${currentSetup._id}`, { replace: true });
        }
    }, [currentIndex, setups, navigate]);

    const goToNextSetup = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % setups.length);
    };

    const goToPreviousSetup = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + setups.length) % setups.length);
    };

    const deleteSetup = async (_id) => {
        try {
            await deleteBikeSetupByIdService(_id);
            const updatedSetups = setups.filter(setup => setup._id !== _id);
            setSetups(updatedSetups);
            setCurrentIndex(0);
            if (updatedSetups.length > 0) {
                navigate(`/companion/manage/${updatedSetups[0]._id}`);
            } else {
                navigate("/companion/manage");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="headerWithArrows">
                <button className="navArrow" onClick={goToPreviousSetup}>←</button>
                <h2 className="bikeNameTitle">Setup: {bikeSetup.bikeName || 'No Bike Name'}</h2>
                <h2 className="bikeFrameTitle">Bike: {bikeSetup.mainPartFrame || 'No Bike Name'}</h2>
                <button className="navArrow" onClick={goToNextSetup}>→</button>
            </div>
            <div className="mainBodyContainerStyle">
                <div className="dataAndButtonContainer">
                    <div className="forkDataContainer">
                        <h3>Fork (clicks)</h3>
                        <div className="dataGrid">
                            <div className="dataSquare">{bikeSetup.forkPSI || 'N/A'}
                                <p>PSI</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.forkHSC || 'N/A'}
                                <p>High Speed Compression</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.forkLSC || 'N/A'}
                                <p>Low Speed Compression</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.forkHSR || 'N/A'}
                                <p>High Speed Rebound</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.forkLSR || 'N/A'}
                                <p>Low Speed Rebound</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.forkSag || 'N/A'}
                                <p>Sag (%)</p>
                            </div>
                        </div>
                    </div>
                    <div className="tirePressureContainer">
                        <h3>Tires (psi)</h3>
                        <div className="dataColumn">
                            <div className="dataSquare">{bikeSetup.tirePressureFront || 'N/A'}
                                <p>Front</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.tirePressureRear || 'N/A'}
                                <p>Rear</p>
                            </div>
                        </div>
                    </div>
                    <div className="shockDataContainer">
                        <h3>Shock (clicks)</h3>
                        <div className="dataGrid">
                            <div className="dataSquare">{bikeSetup.shockSpringRate || 'N/A'}
                                <p>Spring Rate (lbs/psi)</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.shockHSC || 'N/A'}
                                <p>High Speed Compression</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.shockLSC || 'N/A'}
                                <p>Low Speed Compression</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.shockHSR || 'N/A'}
                                <p>High Speed Rebound</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.shockLSR || 'N/A'}
                                <p>Low Speed Rebound</p>
                            </div>
                            <div className="dataSquare">{bikeSetup.shockSag || 'N/A'}
                                <p>Sag (%)</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/companion/${id}/edit`} className="editSetupButtonStyle">Edit Setup</Link>
                    <button className="deleteButtonStyle" onClick={() => deleteSetup(bikeSetup._id)}>Delete This Setup</button>
                </div>
            </div>
        </div>
    );
}

export default ManageSetups;
