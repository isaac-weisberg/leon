import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from "../types/HTTPHeaders";
import GenericRoute from "./GenericRoute";
import { Runtype } from "runtypes";

export class BodylessRoute implements GenericRoute {
    unity(): string {
        return `${this.method} ${this.url.href}`
    }

    path: string
    base: URL
    url: URL
    method: MethodBodyless
    query?: URLSearchParams
    headers: HTTPHeaders
    response: Runtype

    constructor(path: string, method: MethodBodyless, query: URLSearchParams|undefined, base: URL, headers: HTTPHeaders, response: Runtype) {
        this.path = path
        this.base = base
        this.url = new URL(path, base)
        this.method = method
        this.headers = headers
        this.query = query
        this.response = response
    }
}