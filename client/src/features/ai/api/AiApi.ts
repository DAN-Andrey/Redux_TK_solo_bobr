import axiosInstance from "../../../shared/lib/axiosInstance";

class AiApi {
  static async getAiResponse(prompt: string) {
    const responce = await axiosInstance.post("/ai/aireq", prompt);
    return responce.data;
  }
}
export default AiApi;
