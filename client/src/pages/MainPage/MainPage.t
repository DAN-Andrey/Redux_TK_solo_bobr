import { useState } from "react";
import axiosInstance from "../../shared/lib/axiosInstance";

export default function MainPage() {
  const [aires, setAires] = useState(null);
  const getAiRes = async () => {
    try {
      const response = await axiosInstance.post("/api/ai/aireq", {
        band: "The Beatles",
      });
      console.log("+++++++++++++++++++++++++", response);
      setAires(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={getAiRes}>Get AI Response</button>
      {aires && <p>{aires}</p>}
    </div>
  );
}
