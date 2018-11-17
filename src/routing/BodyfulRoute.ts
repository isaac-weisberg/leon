import { MethodBodyful } from "../types/Methods";
import { RequestBody } from "../types/RequestBody";
import HTTPHeaders from "../types/HTTPHeaders";

export class BodyfulRoute {
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
