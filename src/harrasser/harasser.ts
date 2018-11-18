import View from "../view/View";
import * as fetch from 'node-fetch'
import LEONAPIProvider from "../api/LEONAPIProvider";
import { LEONAPIDefaultProvider } from "../api/LEONAPIDefaultProvider";
import { BodylessRoute } from "../routing/BodylessRoute";
import Unity from "../util/Unity";
import GenericRoute from "../routing/GenericRoute";

export interface HarassmentResult {

}

const provider: LEONAPIProvider = new LEONAPIDefaultProvider()

export default async function(view: View) {
    const base = view.base
    
    const bodylessRoutes = view.bodyless
        .map(bodyless => 
            new BodylessRoute(bodyless.path, bodyless.method, bodyless.query, base, bodyless.headers || {})
        )

    return await Promise.all(bodylessRoutes.map(route => harassBodyless(route)))
}

async function harassBodyless(route: BodylessRoute): Promise<Unity[]> {
    let response: fetch.Response
    try {
        response = await provider.requestBodyless(route)
    } catch(error) { return [ new HarasserError.NetworkingProvider(error, route) ] }

    let rawObject: {}
    try {
        rawObject = await response.json()
    } catch(error) { return [ new HarasserError.JSONParsing(error) ] }



    return []
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
}
