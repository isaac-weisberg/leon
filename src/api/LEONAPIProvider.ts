import { Response } from 'node-fetch'
import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from "../types/HTTPHeaders";

export default interface LEONAPIProvider {
    requestBodyless(url: URL, method: MethodBodyless, searchParams: URLSearchParams, headers: HTTPHeaders|undefined): Promise<Response> 
}