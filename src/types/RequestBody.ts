import BodyPayload from "./BodyPayload";
import HTTPHeaders from "./HTTPHeaders";

export interface RequestBody {
    payload(): BodyPayload|undefined

    headers(): HTTPHeaders|undefined
}