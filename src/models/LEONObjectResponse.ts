import { Runtype, Record } from "runtypes";
import { LEONBaseResponseMeat } from "./LEONBaseResponse";

const LEONObjectResponseMeat =  {
    ...LEONBaseResponseMeat
}

export default function LEONObjectResponse(type: Runtype) {
    const genericRecord = {
        ...LEONObjectResponseMeat,
        data: type
    }
    
    return Record(genericRecord)
}