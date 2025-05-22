import axios from "@/src/config/axios";
import { apiUrls } from "@/src/config/requests";

export const invitationsService = {
  invite: async (data: any) => {
    try {
      const response = await axios.post(apiUrls.invitations.create,data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  resend: async (data: any) => {
    try {
      const response = await axios.post(apiUrls.invitations.resend,data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getBySenderId: async (id: any) => {
    try {
      const response = await axios.get(apiUrls.invitations.getBySender+ id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  deleteById: async (id: any) => {
    try {
      const response = await axios.delete(apiUrls.invitations.deleteByid+ id);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },


};
