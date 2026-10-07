const bytes = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0)),
  base64 = (b) => btoa(String.fromCharCode(...new Uint8Array(b))),
  encoder = new TextEncoder();
async function key(password, salt, cryptoApi) {
  if (String(password).length < 12) throw Error("noteFailure");
  const material = await cryptoApi.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return cryptoApi.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
export async function encryptNote(
  value,
  password,
  context,
  cryptoApi = globalThis.crypto,
) {
  if (encoder.encode(value).length > 40000) throw Error("invalid_note");
  const salt = cryptoApi.getRandomValues(new Uint8Array(16)),
    iv = cryptoApi.getRandomValues(new Uint8Array(12)),
    k = await key(password, salt, cryptoApi),
    cipher = await cryptoApi.subtle.encrypt(
      { name: "AES-GCM", iv, additionalData: encoder.encode(context) },
      k,
      encoder.encode(value),
    );
  return {
    version: 1,
    salt: base64(salt),
    iv: base64(iv),
    ciphertext: base64(cipher),
  };
}
export async function decryptNote(
  note,
  password,
  context,
  cryptoApi = globalThis.crypto,
) {
  const salt = bytes(note.salt),
    iv = bytes(note.iv),
    k = await key(password, salt, cryptoApi);
  const plain = await cryptoApi.subtle.decrypt(
    { name: "AES-GCM", iv, additionalData: encoder.encode(context) },
    k,
    bytes(note.ciphertext),
  );
  return new TextDecoder().decode(plain);
}
