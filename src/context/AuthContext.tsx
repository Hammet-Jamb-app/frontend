"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { UserRole } from "@/types/auth"
import { decodeToken, getToken, saveToken, removeToken } from "@/utils/token"

interface AuthContextType {
    role: UserRole | null
    userId: string | null
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<UserRole | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const token = getToken()

        if (token) {
            const decoded = decodeToken(token)
            if (decoded) {
                setRole(decoded.role)
                setUserId(decoded.user_id)
            }
        }
    }, [])

    const login = (token: string) => {
        saveToken(token)
        const decoded = decodeToken(token)
        if (decoded) {
            setRole(decoded.role)
            setUserId(decoded.user_id)
        }
    }

    const logout = () => {
        removeToken()
        setRole(null)
        setUserId(null)
    }

    if (!mounted) return null

    return (
        <AuthContext.Provider value={{ role, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}