export const TOKEN_KEY: string = "dmmrr-2025-token";
export const ROLE_KEY: string = 'dmmrr-2025-role';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getRole = (): string | null => localStorage.getItem(ROLE_KEY);

export const estaAutenticado = (): boolean => getToken() !== null;

export const login = (token: string, role: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
};

export const cadastro = (token: string, role: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role)
};

export const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
};