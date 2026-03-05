export const UserAuthField = {
  USER: "user",
  ROLES: "roles",
  ACTIVE_CONTEXT: "active_context",
} as const;

export interface AdminAuthProfile {
  [UserAuthField.USER]: UserProfile;
  [UserAuthField.ROLES]: Role[];
  [UserAuthField.ACTIVE_CONTEXT]: ActiveContext;
}

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  name: string;
  avatar_url: string;
}

export interface Role {
  role: string;
  scope: string;
  franchise_id: string;
  franchise_name: string;
}

export interface ActiveContext {
  role: string;
  scope: string;
  franchise_id: string;
}

export const isAdminContext = (context: ActiveContext | null | undefined): context is ActiveContext => {
  return !!context;
};
