export interface Permission {
  id: string;
  name: string;
  actions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export const DEFAULT_PERMISSIONS: Permission[] = [
  {
    id: 'billing',
    name: 'Billing',
    actions: { view: false, add: false, edit: false, delete: false }
  },
  {
    id: 'companys',
    name: 'companys',
    actions: { view: false, add: false, edit: false, delete: false }
  },
  {
    id: 'workspaces',
    name: 'Workspaces',
    actions: { view: false, add: false, edit: false, delete: false }
  },
  {
    id: 'forms',
    name: 'Forms',
    actions: { view: false, add: false, edit: false, delete: false }
  },
  {
    id: 'templates',
    name: 'Templates',
    actions: { view: false, add: false, edit: false, delete: false }
  },
  {
    id: 'users',
    name: 'Users',
    actions: { view: false, add: false, edit: false, delete: false }
  }
];

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'accountOwner',
    name: 'Account Owner',
    description: ' access for billing,company,and template management',
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      ...p,
      actions: {
        view: ['billing', 'companys', 'templates',"users","forms","workspaces"].includes(p.id),
        add: ['billing', 'companys', 'templates',"users"].includes(p.id),
        edit: ['billing', 'companys', 'templates'].includes(p.id),
        delete: ['companys', 'templates'].includes(p.id)
      }
    }))
  },
  {
    id: 'companyOwner',
    name: 'company Owner',
    description: 'Full access to manage company',
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      ...p,
      actions: {
      
      
        view: ['workspaces', 'forms', 'templates', 'users'].includes(p.id),
        add: ['workspaces', 'forms', 'templates', 'users'].includes(p.id),
        edit: ['workspaces', 'forms', 'templates', 'users'].includes(p.id),
        delete: ['workspaces', 'forms', 'templates'].includes(p.id)
      }
    }))
  },
  {
    id: 'workspaceOwner',
    name: 'Workspace Owner',
    description: 'Manages everything within their workspace only',
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      ...p,
      actions: {
        view: ['forms', 'templates'].includes(p.id),
        add: ['forms', 'templates'].includes(p.id),
        edit: ['forms', 'templates'].includes(p.id),
        delete: ['forms', 'templates'].includes(p.id)
      }
    }))
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can view and edit forms within their assigned workspace',
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      ...p,
      actions: {
        view: ['forms'].includes(p.id),
        add: false,
        edit: ['forms'].includes(p.id),
        delete: false
      }
    }))
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to forms within their assigned workspace',
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      ...p,
      actions: {
        view: ['forms'].includes(p.id),
        add: false,
        edit: false,
        delete: false
      }
    }))
  }
];