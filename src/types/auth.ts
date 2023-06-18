export interface AuthLogin {
  email: string;
  password: string;
}
export interface AuthRegister {
  email: string;
  firstName: string;
  password: string;
  lastName?: string;
}

export interface RegisterNewUser extends AuthRegister {
  userAvatar: string;
  role?: 'ADMIN' | 'USER';
  accountId: string;
}
export interface SessionPayload {
  email: string;
  id: string;
  role: 'ADMIN' | 'USER' | string;
  accountId: string;
  //   type:"SESSION"|
}
