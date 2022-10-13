import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "apisauce";


const api = create({
  baseURL: "http://localhost:5005",
  timeout: 25000, // 25s
});

api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) request.headers.Authorization = `Bearer ${token}`;
});

api.addResponseTransform((response) => {
  if (!response.ok) {
    throw response;
  }
});

export default api;
