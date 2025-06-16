import { jwtDecode } from "jwt-decode";

export const TOKEN_KEY: string = "dmmrr-2025-token";
export const ROLE_KEY: string = "dmmrr-2025-role";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getRole = (): string | null => localStorage.getItem(ROLE_KEY);

export const estaAutenticado = (): boolean => getToken() !== null;

export const login = (token: string, role: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

export const cadastro = (token: string, role: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

interface DecodedToken {
  role: string;
  userId: string;
  exp: number;
}

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
export const getUserIdAsUuid = (): string | null => {
  return getUserId();
};

export const isAdmin = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<{ role: string }>(token);
    return decoded.role === "ADMIN";
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(ROLE_KEY);
