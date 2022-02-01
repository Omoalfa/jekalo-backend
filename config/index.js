import env from 'dotenv';

env.config();




const configuration = (environment) => {
    switch (environment) {
        case 'develop':
            return {
                port: process.env.PORT,
                db_uri: process.env.DB_URI
            }
        case 'test':
            return {
                port: process.env.TEST_PORT,
                db_uri: process.env.TEST_DB_URI
            }
        default:
            return {
                port: process.env.PORT,
                db_uri: process.env.DB_URI
            }
    }
}

export default configuration(process.env.NODE_ENV);
