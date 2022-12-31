const secp = require("ethereum-cryptography/secp256k1")
const { toHex, hexToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

function getPublicAddress(publicKey) {
    let publicKeyInBytes = hexToBytes(publicKey)
    let hash = keccak256(publicKeyInBytes.slice(1))
    return toHex(hash.slice(-20))
}

module.exports = getPublicAddress

