import { Uint8ArrayToString, stringToUint8Array } from './util.js'
import { decrypt } from 'aes-decrypter'
import CryptoJS from 'crypto-js'
import { webcrypto } from 'node:crypto'

const str = 'hello world'
// console.log('str: ', str)
// const convertedArr = stringToUint8Array(str)
// console.log('convertedArr: ', convertedArr)
// const convertedStr = Uint8ArrayToString(convertedArr)
// console.log('convertedStr: ', convertedStr)

// const key = new Uint32Array([0, 0, 0, 0])
// const initVector = key
// // the string "howdy folks" encrypted
const encrypted = new Uint8Array([
  0xce, 0x90, 0x97, 0xd0, 0x08, 0x46, 0x4d, 0x18, 0x4f, 0xae, 0x01, 0x1c, 0x82,
  0xa8, 0xf0, 0x67
])

console.log(encrypted)

// console.log(Uint8ArrayToString(encrypted))

// const stringFromBytes = function (bytes) {
//   let result = ''

//   for (let i = 0; i < bytes.length; i++) {
//     result += String.fromCharCode(bytes[i])
//   }
//   return result
// }

// console.log(Uint8ArrayToString(key))

// console.log(stringFromBytes(decrypt(encrypted, key, initVector)))
// console.log(
//   CryptoJS.AES.encrypt(Uint8ArrayToString(encrypted), Uint8ArrayToString(key), {
//     iv: Uint8ArrayToString(key)
//   }).toString(CryptoJS.enc.Utf8)
// )

// const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  })
  console.log(decrypt)
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

//加密方法
function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  })
  return encrypted.ciphertext.toString().toUpperCase()
}

const key = CryptoJS.enc.Hex.parse('0000000000') //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Hex.parse('0000000000') //十六位十六进制数作为密钥偏移量

console.log(key.toString(CryptoJS.enc.Utf8))

const tmpEncrypted = Encrypt('howdy folks')
console.log(tmpEncrypted)
console.log(stringToUint8Array(tmpEncrypted))
const encryptStr = new TextDecoder('utf-8').decode(
  stringToUint8Array(tmpEncrypted)
)
console.log(encryptStr)
// const tmpDecrypted = Decrypt(encryptStr)
// console.log(tmpDecrypted)

function hex2U8Array(hex) {
  return Buffer.from(hex, 'hex')
}

webcrypto.subtle
  .generateKey(
    {
      name: 'AES-CTR',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  )
  .then((key) => {
    console.log(key)
    // const encryptButton = document.querySelector('.aes-ctr .encrypt-button')
    // encryptButton.addEventListener('click', () => {
    //   encryptMessage(key)
    // })

    // const decryptButton = document.querySelector('.aes-ctr .decrypt-button')
    // decryptButton.addEventListener('click', () => {
    //   decryptMessage(key)
    // })
  })

// webcrypto.subtle.decrypt(
//   {
//     name: 'AES-CTR',
//     iv: hex2U8Array(iv.toString(CryptoJS.enc.Hex))
//   },
//   new CryptoKey(hex2U8Array(key.toString(CryptoJS.enc.Hex))),
//   encryptStr
// )
