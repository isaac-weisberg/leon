import { Record, String, Array, Always } from 'runtypes'

const LEONBaseResponse = Record({
    code: String,
    message: String,
    errors: Array(Always)
})

export default LEONBaseResponse