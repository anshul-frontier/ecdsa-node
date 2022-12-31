const secp = require("ethereum-cryptography/secp256k1")
const { sha256 } = require("ethereum-cryptography/sha256")
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils")

function isSignValid(message, signature, publicKey) {
    let messageHash = toHex(sha256(utf8ToBytes(message)))
    return secp.verify(signature, messageHash, publicKey)
}

module.exports = isSignValid
