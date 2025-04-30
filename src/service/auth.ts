export const TOKEN_KEY: string = "dmmrr-2025";

export const getToken = (): string|null => localStorage.getItem(TOKEN_KEY);

export const estaAutenticado = (): boolean => getToken() !== null;

export const login = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const cadastro = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};