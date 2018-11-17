import { Response } from 'node-fetch'
import { BodylessRoute } from '../routing/BodylessRoute';

export default interface LEONAPIProvider {
    requestBodyless(route: BodylessRoute): Promise<Response> 
}