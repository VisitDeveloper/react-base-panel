import jwt_decode from "jwt-decode";

export const jwtDecoder = (token: string): any => {
  return jwt_decode(token); //// prints jwt body
};
export const getPermissionsFromToken = (
  accessToken: string | null
): string[] => {
  if (accessToken) return jwtDecoder(accessToken)?.realm_access?.roles;
  else return [];
};
