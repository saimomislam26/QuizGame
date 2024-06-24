import axios, { AxiosError } from "axios";
import { ApiError } from "./types/ApiError";

export const getError = (error: Error | AxiosError<ApiError>) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message || error.message
    } else {
        return error.message
    }
}

export const shuffleArray = (array: any[])=>{
    return [...array].sort(() => Math.random() - .5)
}