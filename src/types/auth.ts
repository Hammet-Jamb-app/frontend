export interface LoginResponse {
    access_token: string
    token_type: string
}

export type UserRole = "admin" | "tutor" | "student"

export interface JwtPayload {
    user_id: string
    role: UserRole
    exp: number
}