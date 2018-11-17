import { Record, String, Array, Always } from 'runtypes'

export const LEONBaseResponseMeat = {
    code: String,
    message: String,
    errors: Array(Always)
}

const LEONBaseResponse = Record(LEONBaseResponseMeat)

export default LEONBaseResponse