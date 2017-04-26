const publicKeyRegexp = /(0x)?[0-9a-f]{130}/i;

function formatKey(key) {
  key = key.toLowerCase();
  if (key.substr(0, 2) !== "0x") key = "0x" + key
  return key;
}

module.exports = (message) => {
  const pubKey = message.match(publicKeyRegexp);
  
  if (pubKey) {
    return formatKey(pubKey[0])
  }
  
  return false
}
