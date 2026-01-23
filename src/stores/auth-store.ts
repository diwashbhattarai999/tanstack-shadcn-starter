import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
	type TUserPermission,
	type TUserRole,
	UserPermission,
	UserRole,
} from "@/configs/roles";
import { STORAGE_KEYS } from "@/configs/storage";

interface AuthUser {
	_id: string;
	email: string;
	fullName: string;
	userType: TUserRole;
	status: string;
	contactNumber: string;
	isActive: boolean;
	isEmailVerified: boolean;
	permission: string[];
	[key: string]: unknown;
}

interface AuthState {
	auth: {
		user: AuthUser | null;
		accessToken: string;
		refreshToken: string;
	};
	actions: {
		setUser: (user: AuthUser | null) => void;
		setAccessToken: (accessToken: string) => void;
		setRefreshToken: (refreshToken: string) => void;
		resetAccessToken: () => void;
		reset: () => void;
	};
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			auth: {
				user: null,
				accessToken: "",
				refreshToken: "",
			},
			actions: {
				setUser: (user) =>
					set((state) => ({ ...state, auth: { ...state.auth, user } })),
				setAccessToken: (accessToken) =>
					set((state) => ({ ...state, auth: { ...state.auth, accessToken } })),
				setRefreshToken: (refreshToken) =>
					set((state) => ({ ...state, auth: { ...state.auth, refreshToken } })),
				resetAccessToken: () =>
					set((state) => ({
						...state,
						auth: { ...state.auth, accessToken: "" },
					})),
				reset: () =>
					set((state) => ({
						...state,
						auth: {
							...state.auth,
							user: null,
							accessToken: "",
							refreshToken: "",
						},
					})),
			},
		}),
		{
			name: STORAGE_KEYS.AUTH,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ auth: state.auth }), // Only persist the auth state, not actions
		}
	)
);

export const selectUserPermissions = (state: AuthState) => {
	const user = state.auth.user;
	if (!user) return [];
	if (user.userType === UserRole.GYM_OWNER)
		return Object.values(UserPermission);

	return user.permission || [];
};

export const selectHasPermission = (
	state: AuthState,
	permission: TUserPermission
) => {
	const permissions = selectUserPermissions(state);
	return permissions.includes(permission);
};
