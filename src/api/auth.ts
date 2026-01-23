import { AUTH_ENDPOINTS } from "@/configs/endpoints";
import { api } from "@/lib/api";

// Login
export function login(payload: { email: string; password: string }) {
	return api.post(AUTH_ENDPOINTS.LOGIN, payload);
}

// Register
export function register(payload: {
	email: string;
	password: string;
	name?: string;
}) {
	return api.post(AUTH_ENDPOINTS.REGISTER, payload);
}

// Logout
export function logout() {
	return api.post(AUTH_ENDPOINTS.LOGOUT);
}

// Refresh token
export function refresh() {
	return api.post(AUTH_ENDPOINTS.REFRESH);
}

// Get current user
export function getMe() {
	return api.get(AUTH_ENDPOINTS.ME);
}
