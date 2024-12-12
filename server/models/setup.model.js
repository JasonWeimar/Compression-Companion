import { model, Schema} from 'mongoose';

const SetupSchema = new Schema (
    {
        bikeName: {
            type: String,
            required: [true, "A Bike Name is reuqired."]
        },
        locationName: {
            type: String,
            required: false
        },
        terrainType: {
            type: String,
            enum: ['Downhill', 'Enduro', 'Cross-Country', 'Dirt-Jumps'],
            required: [true, "Terrain type is required."]
        },
        bikeImage: {
            type: String,
            required: false
        },
        mainPartFrame: {
            type: String,
            required: false
        },
        mainPartFork: {
            type: String,
            required: [true, "A Fork is required."]
        },
        mainPartShock: {
            type: String,
            required: [true, "A Shock is required."]
        },
        tirePressureFront: {
            type: Number,
            required: false
        },
        tirePressureRear: {
            type: Number,
            required: false
        },
        forkPSI: {
            type: Number,
            required: false
        },
        forkHSC: {
            type: Number,
            required: false
        },
        forkLSC: {
            type: Number,
            required: false
        },
        forkHSR: {
            type: Number,
            required: false
        },
        forkLSR: {
            type: Number,
            required: false
        },
        forkSag: {
            type: Number,
            required: false
        },
        shockSpringRate: {
            type: Number,
            required: false
        },
        shockHSC: {
            type: Number,
            required: false
        },
        shockLSC: {
            type: Number,
            required: false
        },
        shockHSR: {
            type: Number,
            required: false
        },
        shockLSR: {
            type: Number,
            required: false
        },
        shockSag: {
            type: Number,
            required: false
        },

        notes:  {
            type: String,
            required: false
        }
    }
);

const Setup = model("Setup", SetupSchema);
export default Setup;