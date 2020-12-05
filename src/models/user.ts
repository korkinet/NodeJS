export enum Role {
  Viewer = 'viewer',
  Admin = 'admin'
}

export interface User {
  username: string;
  password: string;
  roles: Role[];
}
