import { useState } from "react";
import { createSetupService } from "../services/setup.service.js";
import { useNavigate, Link } from "react-router-dom";
const CreateSetupForm = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [setupData, setSetupData] = useState({
        bikeName: '',
        locationName: '',
        terrainType: '',
        bikeImage: '',
        mainPartFrame: '',
        mainPartFork: '',
        mainPartShock: '',
        tirePressureFront: 0,
        tirePressureRear: 0,
        forkPSI: 0,
        forkHSC: 0,
        forkLSC: 0,
        forkHSR: 0,
        forkLSR: 0,
        forkSag: 0,
        shockSpringRate: 0,
        shockHSC: 0,
        shockLSC: 0,
        shockHSR: 0,
        shockLSR: 0,
        shockSag: 0,
    })

    const updateSetupData = (e) => {
        const { name, value } = e.target;
        setSetupData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const createSetup = (e) => {
        e.preventDefault();

        createSetupService(setupData)
            .then((response) => {
                console.log(response);
                const newSetupId = response._id;
                if (newSetupId) {
                    setSetupData({
                        bikeName: '',
                        locationName: '',
                        terrainType: '',
                        bikeImage: '',
                        mainPartFrame: '',
                        mainPartFork: '',
                        mainPartShock: '',
                        tirePressureFront: 0,
                        tirePressureRear: 0,
                        forkPSI: 0,
                        forkHSC: 0,
                        forkLSC: 0,
                        forkHSR: 0,
                        forkLSR: 0,
                        forkSag: 0,
                        shockSpringRate: 0,
                        shockHSC: 0,
                        shockLSC: 0,
                        shockHSR: 0,
                        shockLSR: 0,
                        shockSag: 0,
                    });
                    navigate(`/companion/manage/${newSetupId}`);
                } else {
                    console.error('Failed to create setup. _id is missing from response.');
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <>
            <h2 className="createSetupTitle">Create a new bike setup</h2>
            <form onSubmit={createSetup} className="setupFormStyle">
                {errors.bikeName && <p className="errorStyle">{errors.bikeName.message}</p>}
                <label>
                    Bike Name:
                    <input
                        type="text"
                        name="bikeName"
                        value={setupData.bikeName}
                        onChange={updateSetupData}
                    />
                </label>
                {errors.locationName && <p className="errorStyle">{errors.locationName.message}</p>}
                <label>
                    Location Name:
                    <input
                        type="text"
                        name="locationName"
                        value={setupData.locationName}
                        onChange={updateSetupData}
                    />
                </label>
                {errors.terrainType && <p className="errorStyle">{errors.terrainType.message}</p>}
                <label>
                    Terrain Type: *
                    <select
                        name="terrainType"
                        value={setupData.terrainType}
                        onChange={updateSetupData}
                    >
                        <option value="">select terrain type</option>
                        <option value="Downhill">Downhill</option>
                        <option value="Enduro">Enduro</option>
                        <option value="Cross-Country">Cross-Country</option>
                        <option value="Dirt-Jumps">Dirt Jumps</option>
                    </select>
                </label>
                <label>
                    Bike Image: (coming soon)
                    <input
                        type="file"
                        name="bikeImage"
                    />
                </label>
                <h3 className="mainComponentsTitle">Main Components</h3>
                {errors.mainPartFrame && <p className="errorStyle">{errors.mainPartFrame.message}</p>}
                <label>
                    Frame:
                    <input
                        type="text"
                        name="mainPartFrame"
                        onChange={updateSetupData}
                    />
                </label>
                {errors.mainPartFork && <p className="errorStyle">{errors.mainPartFork.message}</p>}
                <label>
                    Fork: *
                    <input
                        type="text"
                        name="mainPartFork"
                        onChange={updateSetupData}
                    />
                </label>
                {errors.mainPartShock && <p className="errorStyle">{errors.mainPartShock.message}</p>}
                <label>
                    Shock: *
                    <input
                        type="text"
                        name="mainPartShock"
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="tiresTitle">Tires</h3>
                <label>
                    Tire Pressure (psi) - Front:
                    <input
                        type="number"
                        name="tirePressureFront"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Tire Pressure (psi) - Rear:
                    <input
                        type="number"
                        name="tirePressureRear"
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="forkAdjustmentsTitle">Fork Adjustments</h3>
                <label>
                    Fork Spring Rate (psi):
                    <input
                        type="number"
                        name="forkPSI"
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="forkDampeningTitle">Compression/Rebound Dampening (# of clicks)</h3>
                <label>
                    Fork - High Speed Compression:
                    <input
                        type="number"
                        name="forkHSC"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - Low Speed Compression:
                    <input
                        type="number"
                        name="forkLSC"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - High Speed Rebound:
                    <input
                        type="number"
                        name="forkHSR"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - Low Speed Rebound:
                    <input
                        type="number"
                        name="forkLSR"
                        onChange={updateSetupData}
                    />
                </label>
                <h4 className="forkSagTitle">Fork Sag - (formula: amount of sag (mm) ➗ total travel (mm) = sag percentage)</h4>
                <label>
                    Fork - Sag (%):
                    <input
                        type="number"
                        name="forkSag"
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="mainComponentsTitle">Shock Adjustments</h3>
                <label>
                    Shock - Spring Rate (lbs/psi):
                    <input
                        type="number"
                        name="shockSpringRate"
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="mainComponentsTitle">Shock Dampening Adjustments (# of clicks)</h3>
                <label>
                    Shock - High Speed Compression:
                    <input
                        type="number"
                        name="shockHSC"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - Low Speed Compression:
                    <input
                        type="number"
                        name="shockLSC"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - High Speed Rebound:
                    <input
                        type="number"
                        name="shockHSR"
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - Low Speed Rebound:
                    <input
                        type="number"
                        name="shockLSR"
                        onChange={updateSetupData}
                    />
                </label>
                <h4 className="shockSagTitle">Shock Sag - (formula: amount of sag (mm) ➗ total travel (mm) = sag percentage)</h4>
                <label>
                    Shock - Sag(%):
                    <input
                        type="number"
                        name="shockSag"
                        onChange={updateSetupData}
                    />
                </label>
                <div>
                    <input
                        type="submit"
                        value="Create"
                    />
                </div>
            </form>
        </>
    )
}

export default CreateSetupForm;