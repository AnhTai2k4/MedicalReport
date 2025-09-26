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
    patientDepartment,

    incidentLocation,
    incidentDate,

    incidentObject, // 👈 bây giờ là tham số, không gán ""
    incidentHappened,
    incidentTime,
    patientMedicalRecord,
    notifyPatient,

    incidentDescription,
    treatmentDescription,
    initialTreatment,
    notifyDoctor,
    notifyFamily,
    incidentClassification,
    incidentEffect,

    reportName,
    reportCall,
    reportEmail,
    reportObject,

    viewer1,
    viewer2,
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
  patientDepartment,

  incidentLocation,
  incidentDate,

  incidentObject,   // 👈 bây giờ là tham số, không gán ""
  incidentHappened,
  incidentTime,
  patientMedicalRecord,
  notifyPatient,

  incidentDescription,
  treatmentDescription,
  initialTreatment,
  notifyDoctor,
  notifyFamily,
  incidentClassification,
  incidentEffect,

  reportName,
  reportCall,
  reportEmail,
  reportObject,

  viewer1,
  viewer2,
  });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  } else {
    return res.status(200).json({
      success: true,
      data: result.data,
    });
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

const getExcel = async (req, res) => {
  console.log("iam here2");
  const result = await FormService.getExcel();

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

module.exports = {
  createForm,
  getIncidentObjectCounts,
  getIncidentDateCounts,
  getLocationCounts,
  getExcel,
};
