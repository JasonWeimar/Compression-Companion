import axios from "axios";

const SETUP_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

// Create a new bike setup
export const createSetupService = async (setupData) => {
    try {
        const res = await SETUP_INSTANCE.post('/setup', setupData);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get all bike setups
export const getAllBikeSetupsService = async () => {
    try {
        const res = await SETUP_INSTANCE.get('/setup');
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get a single bike setup by ID
export const getBikeSetupByIdService = async (id) => {
    try {
        const res = await SETUP_INSTANCE.get(`/setup/${id}/details`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Update a bike setup by ID
export const updateBikeSetupByIdService = async (id, bikesetupData) => {
    try {
        const res = await SETUP_INSTANCE.patch(`/setup/${id}/edit`, bikesetupData);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Delete a bike setup by ID
export const deleteBikeSetupByIdService = async (id) => {
    try {
        const res = await SETUP_INSTANCE.delete(`/setup/${id}/details`);
        return res.data;
    } catch (error) {
        throw error;
    }
}