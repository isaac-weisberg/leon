import * as fetch from 'node-fetch';
import LEONAPIProvider from "./LEONAPIProvider";
import { BodylessRoute } from '../routing/BodylessRoute';

export class LEONAPIDefaultProvider implements LEONAPIProvider {
    async requestBodyless(route: BodylessRoute): Promise<fetch.Response> {
        const url = route.url
        if (route.query) {
            route.query.forEach((value, name) => {
                url.searchParams.append(name, value)
            })
        } 

        return fetch(url.href, {
            method: route.method,
            headers: {
                ...route.headers
            }
        })
    }
}