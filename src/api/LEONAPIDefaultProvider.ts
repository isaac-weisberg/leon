import * as fetch from 'node-fetch';
import LEONAPIProvider from "./LEONAPIProvider";
import { MethodBodyless } from "../types/Methods";
import HTTPHeaders from '../types/HTTPHeaders';

export class LEONAPIDefaultProvider implements LEONAPIProvider {
    async requestBodyless(url: URL, method: MethodBodyless, searchParams: URLSearchParams, headers: HTTPHeaders|undefined): Promise<fetch.Response> {
        searchParams.forEach((value, name) => {
            url.searchParams.append(name, value)
        })

        return fetch(url.href, {
            method: method,
            headers: headers
        })
    }
}