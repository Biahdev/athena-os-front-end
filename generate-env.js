const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const existingEnv = require('./src/environments/environment.development');
console.log(existingEnv);
let defaultEnv = {...existingEnv.environment};

console.log(defaultEnv);
const envContent = `
export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL || defaultEnv.apiUrl}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envContent);
