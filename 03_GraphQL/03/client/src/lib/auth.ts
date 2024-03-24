import jwtDecode, { JwtPayload } from "jwt-decode";

const API_URL = "http://localhost:4000";
const ACCESS_TOKEN_KEY = "accessToken"; //* Key name in localStorage

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUser() {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return username;
  }
  return null;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getUserFromToken(token: string) {
  const jwtPayload = jwtDecode<JwtPayload>(token);
  return jwtPayload.sub;
}
