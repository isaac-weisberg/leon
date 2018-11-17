import View from "../view/View";
import LEONAPIProvider from "../api/LEONAPIProvider";
import { LEONAPIDefaultProvider } from "../api/LEONAPIDefaultProvider";
import { BodylessRoute } from "../routing/BodylessRoute";
import Unity from "../util/Unity";
import GenericRoute from "../routing/GenericRoute";

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
}

export default async function(view: View) {
    const base = view.base

    const provider: LEONAPIProvider = new LEONAPIDefaultProvider()
    
    return Promise.all(
        view.bodyless
            .map(bodyless => 
                new BodylessRoute(bodyless.path, bodyless.method, bodyless.query, base, bodyless.headers || {})
            )
            .map(route =>
                provider.requestBodyless(route)
                    .catch(err => {
                        throw new HarasserError.NetworkingProvider(err, route)
                    })
            )
    )
}