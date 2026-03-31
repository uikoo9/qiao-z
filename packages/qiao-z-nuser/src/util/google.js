// crypto
const crypto = require('crypto');

/**
 * getGoogleAuthUrl
 * @returns
 */
exports.getGoogleAuthUrl = () => {
  const state = crypto.randomBytes(16).toString('hex');
  const params = new URLSearchParams({
    client_id: global.QZ_CONFIG.google.clientID,
    redirect_uri: global.QZ_CONFIG.google.callbackUrl,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'offline',
    prompt: 'consent',
  });
  const finalUrl = `${global.QZ_CONFIG.google.authUrl}?${params.toString()}`;

  // r
  return { state, finalUrl };
};
