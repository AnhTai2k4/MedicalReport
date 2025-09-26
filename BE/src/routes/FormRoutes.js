
const express = require("express");
const router = express.Router();
const FormController = require('../controllers/FormControllers.js')

console.log("iam here")


router.post("/createForm", FormController.createForm);
router.get("/incidentObjectCounts", FormController.getIncidentObjectCounts);
router.get("/incidentDateCounts", FormController.getIncidentDateCounts);
router.get("/locationCounts", FormController.getLocationCounts);
router.get('/getExcel', FormController.getExcel)



module.exports = router;
