const FormService = require("../services/FormService");

const createForm = async (req, res) => {
  const {
    reportType,
    reportNumber,
    reportDate,
    reportUnit,
    patientName,
    patientNumber,
    patientDateOfBirth,
    patientGender,
    incidentLocation,
    incidentDate,
    incidentDescription,
    treatmentDescription,
    notifyDoctor,
    notifyFamily,
    incidentHappened,
    incidentEffect,
    incidentObject,
    incidentTime,
    specificLocation,
    patientMedicalRecord,
    notifyPatient,
  } = req.body;



  const result = await FormService.createForm({
    reportType,
    reportNumber,
    reportDate,
    reportUnit,
    patientName,
    patientNumber,
    patientDateOfBirth,
    patientGender,
    incidentLocation,
    incidentDate,
    incidentDescription,
    treatmentDescription,
    notifyDoctor,
    notifyFamily,
    incidentHappened,
    incidentEffect,
    incidentObject,
    incidentTime,
    specificLocation,
    patientMedicalRecord,
    notifyPatient,
  });

  if(!result.success){
    return res.status(400).json({
        success: false,
        message:  result.message
    })
  }

  else{
    return res.status(200).json({
        success:true,
        data: result.data
    })
  }
};



const getIncidentObjectCounts = async (req, res) => {
  const result = await FormService.getIncidentObjectCounts();

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    data: result.data,
  });
};

const getIncidentDateCounts = async (req, res) => {
  const result = await FormService.getIncidentDateCounts();

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    data: result.data,
  });
};

const getLocationCounts = async (req, res) => {
  const result = await FormService.getLocationCounts();

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    data: result.data,
  });
};


module.exports = {createForm, getIncidentObjectCounts, getIncidentDateCounts, getLocationCounts};