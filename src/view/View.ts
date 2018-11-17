import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from "../types/HTTPHeaders";

export default interface View {
    base: URL,
    bodyless: {
        method: MethodBodyless,
        path: string,
        query?: URLSearchParams,
        headers?: HTTPHeaders 
    }[]
}