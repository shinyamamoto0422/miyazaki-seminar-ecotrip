import axios from "axios";

export const getPark = async (parkId: string) => {
  const response = await axios.get(`/api/park/${parkId}`);
  return response.data;
};
