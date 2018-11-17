import { RequestBody } from "./RequestBody";
import HTTPHeaders from "./HTTPHeaders";
import BodyPayload from "./BodyPayload";


export default class VoidRequestBody implements RequestBody {
    payload(): BodyPayload|undefined {
        return undefined
    }
    headers(): HTTPHeaders|undefined {
        return undefined
    }

    private constructor() { }

    static void = new VoidRequestBody()
}