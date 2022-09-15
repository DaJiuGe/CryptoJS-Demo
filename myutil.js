import CryptoJS from "crypto-js";

export default {
  //加密
  encrypt(data, keyStr = 'fXoY5SYpr2uz4yFr', ivStr = 'UV4kibe6BDBN3HrE') {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    // 密文使用Hex编码
    return encrypted.toString(CryptoJS.format.Hex);
  },

  //解密
  decrypt(data, keyStr = 'fXoY5SYpr2uz4yFr', ivStr = 'UV4kibe6BDBN3HrE') {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    // Hex编码格式解密
    let decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv, format: CryptoJS.format.Hex });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
