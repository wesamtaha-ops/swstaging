import axios from "@/src/config/axios";
import { apiUrls } from "@/src/config/requests";

export const rolesService = {
  create: async (data: any) => {
    try {
      const response = await axios.post(apiUrls.roles.create,data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },


  getRoleByUseId: async (id: any) => {
    try {
      const response = await axios.get(apiUrls.roles.getbyuserid + id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

};
