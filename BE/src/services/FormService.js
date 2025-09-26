const FormModel = require("../models/FormModel.js");
const xlsx = require("xlsx");

const createForm = async ({
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
      { $group: { _id: "$incidentHappened", cnt: { $sum: 1 } } },
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

const getExcel = async (req, res) => {
  //Lấy đường dẫn file excel
  const excelPath = "D:\\Intern\\Medical_Report\\BE\\public\\DS_KHoaPHòng.xlsx";
  console.log("excelPath", excelPath);

  // đọc file excel
  const workbook = xlsx.readFile(excelPath);
  console.log("workbook", workbook);
  const sheetName = workbook.SheetNames[0]; // lấy sheet đầu tiên
  const sheet = workbook.Sheets[sheetName];
  const results = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // chuyển sang JSON

  return {
    success: true,
    data: results,
  };
};

module.exports = {
  createForm,
  getIncidentObjectCounts,
  getIncidentDateCounts,
  getLocationCounts,
  getExcel,
};
