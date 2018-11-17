import { Response } from 'node-fetch'
import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from "../types/HTTPHeaders";
import GenericRoute from "./GenericRoute";

export class BodylessRoute implements GenericRoute {
    async validate(response: Response): Promise<{ valid: boolean; }> {
        return { valid: false }
    }

    unity(): string {
        return `${this.method} ${this.url.href}`
    }

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