import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from "../types/HTTPHeaders";

export class BodylessRoute {
    path: string
    base: URL
    url: URL
    method: MethodBodyless
    query?: URLSearchParams
    headers: HTTPHeaders

    constructor(path: string, method: MethodBodyless, query: URLSearchParams|undefined, base: URL, headers: HTTPHeaders) {
        this.path = path
        this.base = base
        this.url = new URL(path, base)
        this.method = method
        this.headers = headers
        this.query = query
    }
}