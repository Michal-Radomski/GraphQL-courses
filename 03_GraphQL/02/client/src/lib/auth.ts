import jwtDecode, { JwtPayload } from "jwt-decode";

const API_URL = "http://localhost:4000";
const ACCESS_TOKEN_KEY = "accessToken"; //* Key name in localStorage

interface JwtPayloadCustom extends JwtPayload {
  email: string;
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return null;
  }
  const { token } = await response.json();
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  return getUserFromToken(token);
}

export function getUser(): User | null {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getUserFromToken(token: string) {
  const claims = jwtDecode<JwtPayloadCustom>(token);
  return {
    id: claims?.sub,
    email: claims?.email,
  };
}
