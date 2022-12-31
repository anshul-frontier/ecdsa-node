import * as secp from "ethereum-cryptography/secp256k1"
import { keccak256 } from "ethereum-cryptography/keccak"
import { toHex } from "ethereum-cryptography/utils"

export function getPublicAddress(privateKey) {
    let publicKey = secp.getPublicKey(privateKey)
    let hash = keccak256(publicKey.slice(1))
    return toHex(hash.slice(-20))
}

export function getPublicKey(privateKey) {
    return toHex(secp.getPublicKey(privateKey))
}
