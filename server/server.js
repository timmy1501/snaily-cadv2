const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { port } = require("../config.json");
const { connectToDatabase } = require("./utils/db")

// Require Routes
// ADMIN ROUTERS
const adminRouter = require("./routes/admin/admin");
const citizenManagementRouter = require("./routes/admin/citizenManagement");
const memberManagementRouter = require("./routes/admin/memberManagement");
const editCadRouter = require("./routes/admin/editCad");

const authRouter = require("./routes/authentication/auth");
const citizenRouter = require("./routes/citizen/citizen");
const companyRouter = require("./routes/citizen/company");
const medicalRecordRoute = require("./routes/citizen/medicalRecords");
const licensesRouter = require("./routes/citizen/licenses");
const citizenWeaponsRouter = require("./routes/citizen/weapons");
const citizenVehiclesRouter = require("./routes/citizen/vehicles");


// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// All Routers
app.use("/auth", authRouter);

// Admin Routers
app.use("/admin", adminRouter);
app.use("/admin/citizen", citizenManagementRouter);
app.use("/admin/members", memberManagementRouter);
app.use("/admin/edit-cad", editCadRouter);

app.use("/citizen", citizenRouter);

app.use("/company", companyRouter)

app.use("/medical", medicalRecordRoute)

app.use("/licenses", licensesRouter);

app.use("/c/weapons", citizenWeaponsRouter);

app.use("/c/vehicles", citizenVehiclesRouter);

function start() {
    // Run connectToDB
    connectToDatabase().then(() => {
        console.log("Connected to Database");
    })
        .catch(err => console.log(err))
    // Run app on port
    app.listen(port, () => {
        console.log("Running On port: %s", port);
    });
};

start();