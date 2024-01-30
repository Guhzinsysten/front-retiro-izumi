import {IHasher} from "./interfaces/IHasher"
import bcrypt from "bcrypt"
export class BcryptHasher implements IHasher{
   async hash(data: string): Promise<string> {
        return await bcrypt.hash(data, 10)
    }
   async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted)
}
    
}

export const bcryptHasher = new BcryptHasher
