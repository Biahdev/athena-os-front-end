const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envContent = `
export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envContent);
