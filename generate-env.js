const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.API_URL);
console.log('==== GENERATE ENVIRONMENT ====');

const envContent = `
export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envContent);

console.log('==== AFTER ====');
const after = require('./src/environments/environment.ts');
console.log(after);
console.log(after.environment);
console.log('==== AFTER ====');
