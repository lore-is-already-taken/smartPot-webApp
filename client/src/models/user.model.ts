import { Roles } from "./roles";

export interface UserInfo {
  id?: number;
  name: string;
  email: string;
  password: string;
  rol?: Roles;
}
