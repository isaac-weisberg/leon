import { Runtype, Array } from "runtypes";
import LEONObjectResponse from "./LEONObjectResponse";

export default function LEONArrayResponse(type: Runtype) {
    return LEONObjectResponse(Array(type))
}