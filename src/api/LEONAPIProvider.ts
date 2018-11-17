import { Response } from 'node-fetch'
import { BodylessRoute } from '../routing/BodylessRoute';
import Unity from '../util/Unity';

export namespace LEONAPIError {
    export class Error extends Unity {
        unity(): string {
            return "Unknown LEON API Error"
        }
    }

    export class NetworkingError extends Error {
        error: any

        unity(): string {
            return "Networking LEON API Error"
        }

        constructor(error: any) {
            super()
            this.error = error
        }
    }
}

export default interface LEONAPIProvider {
    requestBodyless(route: BodylessRoute): Promise<Response> 
}