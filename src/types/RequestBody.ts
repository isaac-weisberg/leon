import BodyPayload from "./BodyPayload";
import HTTPHeaders from "./HTTPHeaders";

export interface RequestBody {
    payload(): BodyPayload

    headers(): HTTPHeaders
}