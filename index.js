
import { decrypt, Decrypter, AsyncStream } from 'aes-decrypter';
import CryptoJS from 'crypto-js'
import { Uint8ArrayToString, stringToUint8Array } from './util.js'
import { unpad } from 'pkcs7'
import { encryptMeta } from './meta.js'

const key = new Uint32Array([1634495593, 1852662896, 1818327397, 1915760944]);
const iv = new Uint32Array([0, 0, 0, 0]);
// the string "howdy folks" encrypted
const encrypted = new Uint8Array([
  0xce, 0x90, 0x97, 0xd0,
  0x08, 0x46, 0x4d, 0x18,
  0x4f, 0xae, 0x01, 0x1c,
  0x82, 0xa8, 0xf0, 0x67
]);


// new Decrypter(
//   encryptMeta,
//   key,
//   iv,
//   function (err, decrypt) {
//     console.log('aes', decrypt)
//   }
// )

const stringFromBytes = function (bytes) {
  let result = '';

  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
};

// console.log(unpad(decrypt(encrypted, key, iv)))

function convert_word_array_to_uint8Array(wordArray) {
  var len = wordArray.words.length,
    u8_array = new Uint8Array(len << 2),
    offset = 0, word, i
    ;
  for (i = 0; i < len; i++) {
    word = wordArray.words[i];
    u8_array[offset++] = word >> 24;
    u8_array[offset++] = (word >> 16) & 0xff;
    u8_array[offset++] = (word >> 8) & 0xff;
    u8_array[offset++] = word & 0xff;
  }
  return u8_array;
}

function myencrypt(str, key, iv) {
  const keyW = CryptoJS.enc.Hex.parse(key)
  const ivW = CryptoJS.enc.Hex.parse(iv)

  const encrypt = CryptoJS.AES.encrypt(str, keyW, { iv: ivW, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  // const encryptW = CryptoJS.enc.Base64.parse(encrypt)
  return convert_word_array_to_uint8Array(encrypt.ciphertext)
}

function mydecrypt(word, key, iv) {
  const keyW = CryptoJS.enc.Hex.parse(key)
  const ivW = CryptoJS.enc.Hex.parse(iv)

  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, keyW, {
    iv: ivW,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return convert_word_array_to_uint8Array(decrypt)
  // const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  // return decryptedStr.toString();
}

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' +
    x.toString(16)).slice(-2)).join('');
}

const ntoh = function (word) {
  return (word << 24) |
    ((word & 0xff00) << 8) |
    ((word & 0xff0000) >> 8) |
    (word >>> 24);
};

const meta = ntoh(encryptMeta)
console.log(meta)

// console.log(buf2hex(key.buffer))
// console.log(myencrypt('howdy folks', buf2hex(key.buffer), buf2hex(iv.buffer)))
console.log(unpad(mydecrypt(buf2hex(encryptMeta.buffer), buf2hex(key.buffer), buf2hex(iv.buffer))))