// fs
import fs from 'fs';

// crypto
import crypto from 'crypto';

/**
 * sign
 * @param {*} privateKeyPath
 * @param {*} signStr
 * @returns
 */
export const sign = (privateKeyPath, signStr) => {
  // sign
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const signer = crypto.createSign('sha256');
  signer.update(signStr);

  // r
  return signer.sign(privateKey, 'base64');
};

/**
 * signWithBody
 * @param {*} method
 * @param {*} path
 * @param {*} timestamp
 * @param {*} nonceStr
 * @param {*} privateKeyPath
 * @param {*} body
 * @returns
 */
export const signWithBody = (method, path, timestamp, nonceStr, privateKeyPath, body) => {
  // sign str
  const requestBody = JSON.stringify(body);
  const signStr = `${method}\n${path}\n${timestamp}\n${nonceStr}\n${requestBody}\n`;

  // r
  return sign(privateKeyPath, signStr);
};

/**
 * unsign
 * @param {*} key
 * @param {*} nonce
 * @param {*} associatedData
 * @param {*} ciphertext
 * @returns
 */
export const unsign = (key, nonce, associatedData, ciphertext) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  decipher.setAAD(Buffer.from(associatedData));
  decipher.setAuthTag(Buffer.from(ciphertext.slice(-16), 'base64'));
  const decrypted = decipher.update(Buffer.from(ciphertext.slice(0, -16), 'base64'), null, 'utf8');
  decipher.final();
  return decrypted;
};
