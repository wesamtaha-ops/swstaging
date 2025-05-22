import axios from "@/src/config/axios";
import { apiUrls } from "@/src/config/requests";

export const usersService = {
  deleteById: async (id: any) => {
    try {
      const response = await axios.delete(apiUrls.users.deleteByid + id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  updateRole: async (data: {
    userId: string;
    newRole: string;
    entityId?: string;
    entityType?: string;
    confirmReassign?: string;
  }) => {
    try {
      const response = await axios.put(apiUrls.users.updateRole, data);

      return response;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updatePermission: async (id:string) => {
    try {
      const response = await axios.put(apiUrls.users.updatePermission + id);
      return response.data.user;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },
};
