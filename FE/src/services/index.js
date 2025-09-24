import axios from "axios";

const API_ENDPOINTS = {
  FROM_INCIDDENT_OBJECT_COUNTS : "form/incidentObjectCounts" 
}

const incidentObjectCounts = async () => {
  try {
    const result = await axios.get(
      "http://localhost:3001/form/incidentObjectCounts"
    );

    return result.data.data; // Trả về data từ backend
  } catch (error) {
    console.log("Lỗi khi gọi API:", error);
    return null; // hoặc throw error nếu muốn
  }
};

const incidentDateCounts = async () => {
  try {
    const result = await axios.get(
      "http://localhost:3001/form/incidentDateCounts"
    );

    return result.data.data; // Trả về data từ backend
  } catch (error) {
    console.log("Lỗi khi gọi API:", error);
    return null; // hoặc throw error nếu muốn
  }
};

const locationDataCounts = async () => {
  try {
    const result = await axios.get("http://localhost:3001/form/locationCounts");

    const datas = result.data.data;

     datas.map((data) => {
      if (data.value ==="") {
       data.value = "Khác"
      }
    });
    // var totalCnt = 0;

    // datas.map((data) => {
    //   if (data.value !== "Nhà vệ sinh" && data.value !== "Bãi đậu xe") {
    //     console.log("data me", data);
    //     totalCnt += data.cnt;
    //     console.log("totalCnt me", totalCnt);
    //   }
    // });

    // var newDatas = datas.filter(
    //   (data) => data.value === "Nhà vệ sinh" || data.value === "Bãi đậu xe"
    // );

    // const endDatas = [...newDatas, { value: "Khác", cnt: totalCnt }];
    // console.log("endDatas:", endDatas);

    // return endDatas; // Trả về data từ backend

    return datas
  } catch (error) {
    console.log("Lỗi khi gọi API:", error);
    return null; // hoặc throw error nếu muốn
  }
};
export { incidentObjectCounts, incidentDateCounts, locationDataCounts };
