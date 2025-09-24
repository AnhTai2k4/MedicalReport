const FormModel = require("../models/FormModel.js");

const createForm = async ({
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
}) => {
  try {
    const newForm = await FormModel.create({
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

    console.log(newForm);

    return {
      success: true,
      data: newForm,
    };
  } catch (e) {
    throw e;
  }
};

// Aggregate counts of incidentObject values across all forms
const getIncidentObjectCounts = async () => {
  try {
    const pipeline = [
      { $unwind: "$incidentObject" },
      { $group: { _id: "$incidentObject", cnt: { $sum: 1 } } },
      { $project: { _id: 0, value: "$_id", cnt: 1 } },
      { $sort: { value: 1 } },
    ];

    const results = await FormModel.aggregate(pipeline);

    return {
      success: true,
      data: results,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Failed to aggregate incidentObject counts",
    };
  }
};

const getIncidentDateCounts = async () => {
  try {
    const pipeline = [
      // B1: Lọc dữ liệu trong năm 2025
      {
        $match: {
          incidentDate: {
            $gte: new Date("2025-01-01T00:00:00.000Z"),
            $lt: new Date("2026-01-01T00:00:00.000Z"),
          },
        },
      },
      // B2: Tách năm và tháng từ incidentDate
      {
        $project: {
          month: { $month: "$incidentDate" },
          year: { $year: "$incidentDate" },
        },
      },
      // B3: Nhóm theo tháng và đếm số lượng
      {
        $group: {
          _id: "$month",
          cnt: { $sum: 1 },
        },
      },
      // B4: Định dạng lại output
      {
        $project: {
          _id: 0,
          month: "$_id",
          cnt: 1,
        },
      },
      // B5: Sắp xếp theo tháng
      {
        $sort: { month: 1 },
      },
    ];

    const results = await FormModel.aggregate(pipeline);

    return {
      success: true,
      data: results,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Failed to aggregate incidentObject counts",
    };
  }
};

// Aggregate counts of incidentObject values across all forms
const getLocationCounts = async () => {
  try {
    const pipeline = [
      { $group: { _id: "$specificLocation", cnt: { $sum: 1 } } },
      { $project: { _id: 0, value: "$_id", cnt: 1 } },
      { $sort: { value: 1 } },
    ];

    const results = await FormModel.aggregate(pipeline);

    return {
      success: true,
      data: results,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Failed to aggregate incidentObject counts",
    };
  }
};

module.exports = { createForm, getIncidentObjectCounts, getIncidentDateCounts,getLocationCounts };
