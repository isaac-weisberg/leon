import View from "../view/View";
import LEONAPIProvider from "../api/LEONAPIProvider";
import { LEONAPIDefaultProvider } from "../api/LEONAPIDefaultProvider";
import { BodylessRoute } from "../routing/BodylessRoute";
import Unity from "../util/Unity";
import GenericRoute from "../routing/GenericRoute";


export default async function(view: View) {
    const base = view.base

    const provider: LEONAPIProvider = new LEONAPIDefaultProvider()
    
    const responsePromises = view.bodyless
        .map(bodyless => 
            new BodylessRoute(bodyless.path, bodyless.method, bodyless.query, base, bodyless.headers || {})
        )
        .map(route =>
            provider.requestBodyless(route)
                .catch(err => {
                    throw new HarasserError.NetworkingProvider(err, route)
                })
                .then(response => ({
                    response: response,
                    route: route
                }))
        )

    for (const promise of responsePromises) {
        const { response, route } = await promise
        const validationResult = await route.validate(response)
        
    }

    return (await Promise.all(
        view.bodyless
            .map(bodyless => 
                new BodylessRoute(bodyless.path, bodyless.method, bodyless.query, base, bodyless.headers || {})
            )
            .map(route =>
                provider.requestBodyless(route)
                    .catch(err => {
                        throw new HarasserError.NetworkingProvider(err, route)
                    })
                    .then(response => ({
                        response: response,
                        route: route
                    }))
            )
    )).map(({ response, route }) => {
        route.validate(response)
            .catch(err => { throw new HarasserError.ValidationProcess(err) })
            .then(result => ({
                response: response,
                route: route,
                result: result
            }))
    })
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

    export class ValidationProcess extends Error {
        constructor(error: any) {
            super()
            this.error = error
        }

        error: any

        unity() {
            return `FUCK: Harassment Route Validation Process has crashed because\n${ this.error }\n`
        }
    }
}
