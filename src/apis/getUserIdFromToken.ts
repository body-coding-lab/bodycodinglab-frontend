
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export function getUserIdFromToken() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  if (!token) return null;
  try {
    const decoded = jwtDecode<{ userId: number }>(token);
    return decoded.userId;
  } catch {
    return null;
  }
}