const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    reportType: { type: String }, // Hinh thuc bao cao su co
    reportNumber: { type: String }, // So bao cao/ Ma so su co
    reportDate: { type: Date }, // Ngay bao cao
    reportUnit: { type: String }, // Đơn vị báo cáo

    patientName: { type: String }, // Họ tên người bệnh
    patientNumber: { type: String }, // Số bệnh án
    patientDateOfBirth: { type: Date }, // Ngày sinh
    patientGender: { type: String }, // Giới tính
    patientDepartment: { type: String }, // Khoa người bệnh

    incidentLocation: { type: String }, // Nơi xảy ra sự cố
    incidentDate: { type: Date }, // Ngày xảy ra sự cố

    incidentObject: [{ type: String }], // Đối tượng xảy ra sự cố
    incidentHappened: { type: String }, // Vị trí cụ thể
    incidentTime: { type: String }, // Thời gian
    patientMedicalRecord: { type: String }, // Ghi nhận vào hồ sơ bệnh án
    notifyPatient: { type: String }, // Thông báo cho người bệnh

    incidentDescription: { type: String }, // Mô tả ngắn gọn về sự cố
    treatmentDescription: { type: String }, // Đề xuất giải pháp
    initialTreatment: { type: String }, // Điều trị/xử lí ban đầu
    notifyDoctor: { type: String }, // Thông báo cho bác sĩ
    notifyFamily: { type: String }, // Thông báo cho bác sĩ
    incidentClassification: { type: String }, // Phân loại sự cố
    incidentEffect: { type: String }, // Đánh giá ban đầu về mức độ ảnh hưởng của sự cố

    reportName: { type: String }, // Thông tin người báo cáo
    reportCall: { type: String }, // Số điện thoại người báo cáo
    reportEmail: { type: String }, // Email người báo cáo
    reportObject: { type: String }, // Đối tượng báo cáo
    viewer1: { type: String }, // Người chứng kiến 1
    viewer2: { type: String }, // Người chứng kiến 2
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
