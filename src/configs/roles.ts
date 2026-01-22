/**
 * User roles within the application.
 */
export const UserRole = {
	GYM_OWNER: "GymOwner",
	ADMIN: "Admin",
	TRAINER: "Trainer",
	FINANCE: "Finance",
} as const;

/**
 * Type representing user roles.
 */
export type TUserRole = (typeof UserRole)[keyof typeof UserRole];

/**
 * User permissions within the application.
 */
export const UserPermission = {
	CONTENT: "Content",
	FINANCE: "Finance",
	TRAINER: "Trainer",
	USER: "User",
	GYM: "Gym",
	STAFF: "Staff",
	ACCOUNT: "Account",
} as const;

/**
 * Type representing user permissions.
 */
export type TUserPermission =
	(typeof UserPermission)[keyof typeof UserPermission];
