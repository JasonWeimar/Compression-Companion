import { connect } from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Load the DocumentDB URI and SSL certificate path from the .env file
const DOCUMENTDB_URI = process.env.DOCUMENTDB_URI;
const SSL_CA_CERT = process.env.SSL_CA_CERT;

async function dbConnect() {
    try {
        await connect(DOCUMENTDB_URI, {
            dbName: 'companiondb', // Ensure this matches your database name
            tls: true, // Enable TLS (Transport Layer Security)
            tlsCAFile: path.resolve(SSL_CA_CERT), // Provide the path to the certificate
        });
        console.log("Successfully connected to AWS DocumentDB!");
    } catch (error) {
        console.error("Error connecting to AWS DocumentDB:", error);
        throw error;
    }
}

export default dbConnect;






// import { connect } from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();
// const DOCUMENTDB_URI = process.env.DOCUMENTDB_URI;

// async function dbConnect() {
//     try {
//         await connect(DOCUMENTDB_URI, {
//             dbName: 'companiondb',
//         });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
// export default dbConnect;