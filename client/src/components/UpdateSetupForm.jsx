import { useState, useEffect } from "react";
import { getBikeSetupByIdService, updateBikeSetupByIdService } from "../services/setup.service.js";
import { useNavigate, useParams, Link} from "react-router-dom";

const EditSetupForm = () => {
    const navigate = useNavigate()
    const { id } = useParams();
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

    useEffect(() => {
        getBikeSetupByIdService(id)
            .then((res) => {
                setSetupData(res);
            })
            .catch(error => console.log(error))
    }, [id]);

    const updateSetupData = (e) => {
        const { name, value } = e.target;
        setSetupData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const UpdateSetup = (e) => {
        e.preventDefault();

        updateBikeSetupByIdService(id, setupData)
            .then(res => {
                console.log(res);
                navigate(`/companion/manage/${id}`);
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
            <div className="updateSetupHeaderContainer">
                <h2 className="updateSetupTitle">Edit Setup for {setupData.bikeName}</h2>
                <Link to={`/companion/manage/${id}`} className="cancelUpdateButtonStyle">Cancel</Link>
            </div>
            <form onSubmit={UpdateSetup} className="setupFormStyle">
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
                        <option value="">{setSetupData.terrainType}</option>
                        <option value="Downhill">Downhill</option>
                        <option value="Enduro">Enduro</option>
                        <option value="Cross-Country">Cross-Country</option>
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
                        value={setupData.mainPartFrame}
                        onChange={updateSetupData}
                    />
                </label>
                {errors.mainPartFork && <p className="errorStyle">{errors.mainPartFork.message}</p>}
                <label>
                    Fork: *
                    <input
                        type="text"
                        name="mainPartFork"
                        value={setupData.mainPartFork}
                        onChange={updateSetupData}
                    />
                </label>
                {errors.mainPartShock && <p className="errorStyle">{errors.mainPartShock.message}</p>}
                <label>
                    Shock: *
                    <input
                        type="text"
                        name="mainPartShock"
                        value={setupData.mainPartShock}
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="tiresTitle">Tires</h3>
                <label>
                    Tire Pressure (psi) - Front:
                    <input
                        type="number"
                        name="tirePressureFront"
                        value={setupData.tirePressureFront}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Tire Pressure (psi) - Rear:
                    <input
                        type="number"
                        name="tirePressureRear"
                        value={setupData.tirePressureRear}
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="forkAdjustmentsTitle">Fork Adjustments</h3>
                <label>
                    Fork Spring Rate (psi):
                    <input
                        type="number"
                        name="forkPSI"
                        value={setupData.forkPSI}
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="forkDampeningTitle">Compression/Rebound Dampening (# of clicks)</h3>
                <label>
                    Fork - High Speed Compression:
                    <input
                        type="number"
                        name="forkHSC"
                        value={setupData.forkHSC}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - Low Speed Compression:
                    <input
                        type="number"
                        name="forkLSC"
                        value={setupData.forkLSC}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - High Speed Rebound:
                    <input
                        type="number"
                        name="forkHSR"
                        value={setupData.forkHSR}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Fork - Low Speed Rebound:
                    <input
                        type="number"
                        name="forkLSR"
                        value={setupData.forkLSR}
                        onChange={updateSetupData}
                    />
                </label>
                <h4 className="forkSagTitle">Fork Sag - (formula: amount of sag (mm) ➗ total travel (mm) = sag percentage)</h4>
                <label>
                    Fork - Sag (%):
                    <input
                        type="number"
                        name="forkSag"
                        value={setupData.forkSag}
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="mainComponentsTitle">Shock Adjustments</h3>
                <label>
                    Shock - Spring Rate (lbs/psi):
                    <input
                        type="number"
                        name="shockSpringRate"
                        value={setupData.shockSpringRate}
                        onChange={updateSetupData}
                    />
                </label>
                <h3 className="mainComponentsTitle">Shock Dampening Adjustments (# of clicks)</h3>
                <label>
                    Shock - High Speed Compression:
                    <input
                        type="number"
                        name="shockHSC"
                        value={setupData.shockHSC}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - Low Speed Compression:
                    <input
                        type="number"
                        name="shockLSC"
                        value={setupData.shockLSC}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - High Speed Rebound:
                    <input
                        type="number"
                        name="shockHSR"
                        value={setupData.shockHSR}
                        onChange={updateSetupData}
                    />
                </label>
                <label>
                    Shock - Low Speed Rebound:
                    <input
                        type="number"
                        name="shockLSR"
                        value={setupData.shockLSR}
                        onChange={updateSetupData}
                    />
                </label>
                <h4 className="shockSagTitle">Shock Sag - (formula: amount of sag (mm) ➗ total travel (mm) = sag percentage)</h4>
                <label>
                    Shock - Sag(%):
                    <input
                        type="number"
                        name="shockSag"
                        value={setupData.shockSag}
                        onChange={updateSetupData}
                    />
                </label>
                <div>
                    <input
                        type="submit"
                        value="Update Setup"
                    />
                </div>
            </form>
        </>
    )
}

export default EditSetupForm;