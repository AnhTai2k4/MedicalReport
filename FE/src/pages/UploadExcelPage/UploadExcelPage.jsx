import React, { useEffect, useState } from "react";
import axios from "axios";

function UploadExcelPage() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    console.log("file" ,e.target.files[0])
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:3001/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setData(res.data.data);
  };

  useEffect(()=>{
    console.log(data)
  }, [data])

  return (
    <div style={{color: "black"}}>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadExcelPage;
