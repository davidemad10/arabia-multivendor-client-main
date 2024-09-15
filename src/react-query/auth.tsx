import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL




// Buyer RegisterView

export const buyerRegister=async (email:object)=>{
    return await axios.post(`${BACKEND_URL}/en/api/account/buyer/register/`,email)
}

export function useBuyerRegister() {
    return useMutation({
        mutationFn: (email:object) => buyerRegister(email),
    })
}
// Buyer RegisterView




// Login

export const login=async (userData:object)=>{
    return await axios.post(`${BACKEND_URL}/en/api/account/buyer/login/`,userData)
}

export function useLogin() {
    return useMutation({
        mutationFn: (userData:object) => login(userData),
    })
}
// Login