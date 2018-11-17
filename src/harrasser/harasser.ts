import View from "../view/View";
import LEONAPIProvider from "../api/LEONAPIProvider";
import { LEONAPIDefaultProvider } from "../api/LEONAPIDefaultProvider";
import { BodylessRoute } from "../routing/BodylessRoute";

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
            )
    )
}