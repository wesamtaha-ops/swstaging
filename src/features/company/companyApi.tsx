import axios from "@/src/config/axios";
import { apiUrls } from "@/src/config/requests";

export const companyService = {
  create: async (data: any) => {
    try {
      const response = await axios.post(apiUrls.company.create, data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getCompaniesByUseId: async (id: any) => {
    try {
      const response = await axios.get(apiUrls.company.getAllByUserId + id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  getTeamByCompanyId: async (id: any) => {
    try {
      const response = await axios.get(apiUrls.company.getTeamByCompanyId + id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  deleteCompanyById: async (id: any) => {
    try {
      const response = await axios.delete(
        apiUrls.company.deleteCompanyById + id
      );

      return response;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updateCompanyById: async (data: { id: string; name: string }) => {
    try {
      const response = await axios.put(
        `${apiUrls.company.updateCompanyById}${data.id}`, 
        { name: data.name }
      );

      return response;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },


};
