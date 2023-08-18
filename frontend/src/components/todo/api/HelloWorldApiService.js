import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () => {
  return apiClient.get('/hello-world-bean');
}

export const retrievePathVariable = (variable) => {
  return apiClient.get(`/hello-world/path-variable/${variable}`);
}