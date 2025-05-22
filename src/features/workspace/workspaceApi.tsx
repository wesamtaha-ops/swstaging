import axios from "@/src/config/axios";
import { apiUrls } from "@/src/config/requests"

export const workspacesService = {
  create: async (data: any) => {
    try {
      const response = await axios.post(apiUrls.workspaces.create, data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },


  getAll: async () => {
    const response = await axios.get(apiUrls.workspaces.getAll);
    return response.data;
  },
  getAllByCompanyOwner: async (id:string) => {
    const response = await axios.get(apiUrls.workspaces.getAllBycompanyOwner+id);
    return response.data;
  },
 
  getTeamByWorkspaceId: async (id:string) => {
    const response = await axios.get(apiUrls.workspaces.getTeam+id);
    return response.data;
  },
 
  deleteById: async (id: string) => {
    return await axios.delete(`${apiUrls.workspaces.deleteByid}/${id}`);
  },
  updateById: async (data: { id: string; name: string }) => {
    const response = await axios.put(`${apiUrls.workspaces.updat}/${data.id}`, {
      name: data.name,
    });
    return response.data;
  },
};
