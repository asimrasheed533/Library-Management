import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  userType: string;
}

export default function decodeJwt(token: string): DecodedToken {
  const decoded = jwtDecode<DecodedToken>(token);

  return { id: decoded.id, userType: decoded.userType };
}
