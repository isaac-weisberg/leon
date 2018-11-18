import View from "../view/View";
import * as fetch from 'node-fetch'
import LEONAPIProvider from "../api/LEONAPIProvider";
import { LEONAPIDefaultProvider } from "../api/LEONAPIDefaultProvider";
import { BodylessRoute } from "../routing/BodylessRoute";
import Unity from "../util/Unity";
import GenericRoute from "../routing/GenericRoute";

const provider: LEONAPIProvider = new LEONAPIDefaultProvider()

export interface HarrassmentResults {
    base: URL
    bodyless: BodylessHarrasmentResults[]
}

export default async function harasser(view: View): Promise<HarrassmentResults> {
    const base = view.base
    
    const bodylessRoutes = view.bodyless
        .map(bodyless => 
            new BodylessRoute(bodyless.path, bodyless.method, bodyless.query, base, bodyless.headers || {}, bodyless.response)
        )

    return {
        base: base,
        bodyless: await Promise.all(bodylessRoutes.map(route => harassBodyless(route)))
    }
}

export interface BodylessHarrasmentResults {
    route: BodylessRoute
    errors: Unity[]
}

async function harassBodyless(route: BodylessRoute): Promise<BodylessHarrasmentResults> {
    let response: fetch.Response
    try {
        response = await provider.requestBodyless(route)
    } catch(error) { return { route: route, errors: [ new HarasserError.NetworkingProvider(error, route) ] } }

    let rawObject: {}
    try {
        rawObject = await response.json()
    } catch(error) { return { route: route, errors: [ new HarasserError.JSONParsing(error) ] } }

    try {
        route.response.check(rawObject)
    } catch(error) { return { route: route, errors: [ new HarasserError.Validation(error) ] } }

    return { route: route, errors: []}
}

export namespace HarasserError {
    export class Error extends Unity {
        unity(): string {
            return "Unknown Harasser Error"
        }
    }

    export class NetworkingProvider extends Error {
        error: Unity
        route: GenericRoute

        unity(): string {
            return `${ this.route.unity() }: ${ this.error.unity() }`
        }

        constructor(error: Unity, route: GenericRoute) {
            super()
            this.error = error
            this.route = route
        }
    }

    export class JSONParsing extends Error {
        error: any

        unity(): string {
            return `JSON parsing error`
        }
        
        constructor(error: any) {
            super()
            this.error = error
        }
    }

    export class Validation extends Error {
        error: any

        constructor(error: any) {
            super()
            this.error = error
        }
    }
}
