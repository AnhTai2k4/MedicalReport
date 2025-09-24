
const express = require("express");
const router = express.Router();
const FormController = require('../controllers/FormControllers.js')


router.post("/createForm", FormController.createForm);
router.get("/incidentObjectCounts", FormController.getIncidentObjectCounts);
router.get("/incidentDateCounts", FormController.getIncidentDateCounts);
router.get("/locationCounts", FormController.getLocationCounts);



module.exports = router;
