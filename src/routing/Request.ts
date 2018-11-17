import LEONRoute from "./LEONRoute";
import { MethodBodyless, MethodBodyful } from "../types/Methods";
import { RequestBody } from "../types/RequestBody";
import HTTPHeaders from "../types/HTTPHeaders";

export class BodyfulRoute implements LEONRoute {
    path: string
    base: URL
    url: URL
    method: MethodBodyful
    body: RequestBody
    headers: HTTPHeaders

    constructor(path: string, method: MethodBodyful, body: RequestBody, base: URL, headers: HTTPHeaders) {
        this.path = path
        this.base = base
        this.url = new URL(path, base)
        this.method = method
        this.headers = headers
        this.body = body
    }
}

export class BodylessRoute implements LEONRoute {
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