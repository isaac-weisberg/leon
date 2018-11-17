import { Response } from 'node-fetch'

export default interface GenericRoute {
    unity(): string

    validate(response: Response): Promise<{ valid: boolean }>
}