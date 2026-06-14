const express = require('express');
const app = express();
const adminRouter = require('./routes/user');
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/user", adminRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});