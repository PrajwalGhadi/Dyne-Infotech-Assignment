const app = require('../dyne_project_backend/src/app');
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Connected to PORT: ${PORT}`);
})