const express = require("express");

//create router for express
const router = new express.Router();

const userController = require("../controller/userController");

const upload = require("../multerConfig/storageConfig");

//defining routes for each http request
router.post("/employee/register", upload.single("user_profile"), userController.register);

//get all employee details
router.get("/employee/get-all-employee-details", userController.getusers);

//view a profile
router.get("/employee/view-profile/:id", userController.viewuser);

//remove user
router.delete("/employee/remove-user/:id", userController.removeuser);

//export router
module.exports = router;
