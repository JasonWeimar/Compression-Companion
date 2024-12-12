import Setup from "../models/setup.model.js";


const SetupController = {

    "createNewSetup": async (req, res) => {
        try {
            const newSetup = await Setup.create(req.body)
            res.json(newSetup)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    "getAllSetups": async (req, res) => {
        try {
            const allSetups = await Setup.find()
            res.json(allSetups)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    "getOneSetup": async (req, res) => {
        try {
            const oneSetup = await Setup.findById(req.params.id)
            res.json(oneSetup)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },


    "editSetup": async (req, res) => {
        const setupId = req.params.id;
        const { bikeName, locationName, terrainType, bikeImage, mainPartFrame, mainPartFork, mainPartShock, tirePressureFront, tirePressureRear, forkPSI, forkHSC, forkLSC, forkHSR, forkLSR, forkSag, shockSpringRate, shockHSC, shockLSC, shockHSR, shockLSR, shockSag } = req.body;

        try {
            const updatedSetup = await Setup.findOneAndUpdate(
                { _id: setupId },
                {
                    bikeName,
                    locationName,
                    terrainType,
                    bikeImage,
                    mainPartFrame,
                    mainPartFork,
                    mainPartShock,
                    tirePressureFront,
                    tirePressureRear,
                    forkPSI,
                    forkHSC,
                    forkLSC,
                    forkHSR,
                    forkLSR,
                    forkSag,
                    shockSpringRate,
                    shockHSC,
                    shockLSC,
                    shockHSR,
                    shockLSR,
                    shockSag
                },
                { runValidators: true, new: true }
            );

            if (updatedSetup) {
                res.json(updatedSetup);
            } else {
                res.status(404).json({ message: "Setup not found!" });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },


    "deleteSetupById": async (req, res) => {
        const setupId = req.params.id;

        try {
            const deletedSetup = await Setup.findOneAndDelete({ _id: setupId });

            if (deletedSetup) {
                res.json(deletedSetup);
            } else {
                res.status(400).json({ message: "Setup not found." });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }

}

export default SetupController;