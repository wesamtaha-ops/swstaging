export const apiUrls = {
  company: {
    create: "/entreprises/create",
    getAllByUserId: "/entreprises/getentreprisebyUserid/",
    getTeamByCompanyId: "/entreprises/getTeambycompanyid/",

    deleteCompanyById: "/entreprises/deletebyid/",
    updateCompanyById: "/entreprises/updatebyid/",
  },
  invitations: {
    create: "/invitations/invite",
    resend: "/invitations/resend",

    getBySender: "/invitations/getbySenderId/",
    deleteByid: "/invitations/deletebyid/",
  },
  workspaces: {
    create: "/workspaces/create",
    getAll: "/workspaces/getAll",
    getAllBycompanyOwner: "/workspaces/getAllBycompanyOwner/",
    deleteByid: "/workspaces/delete",
    updat: "/workspaces/update",
    getbyid: "/workspaces/getById",
    getTeam: "/workspaces/getTeamByWorkspaceId/",
  },
  users: {
    deleteByid: "/user/deleteUser/",
    updateRole: "/user/updateRole/",
    updatePermission: "/user/permission/",
  },
  // roles: {
  //   create: "/roles/createrole",
  //   getbyuserid: "/roles/getbyuserid/",
  // },
};
