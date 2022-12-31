import * as secp from "ethereum-cryptography/secp256k1" 
import { sha256 } from "ethereum-cryptography/sha256" 
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils" 

export async function signTransaction(message, privateKey) {
    let messageHash = toHex(sha256(utf8ToBytes(message)));
    const sign = await secp.sign(messageHash, privateKey)
    return toHex(sign)
}