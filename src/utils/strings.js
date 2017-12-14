export const titleize = text => text[0].toUpperCase() + text.substr(1);
export const foo = 3;

export function hexEncode(decoded) {
  // utf8 to latin1
  const unescaped = unescape(encodeURIComponent(decoded));
  let encoded = '';
  for (let i = 0; i < unescaped.length; i += 1) {
    encoded += unescaped.charCodeAt(i).toString(16);
  }
  return encoded;
}

export function hexDecode(encoded) {
  let unescaped = '';
  for (let i = 0; i < encoded.length; i += 2) {
    unescaped += String.fromCharCode(parseInt(encoded.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(unescaped));
}

