const keys = [
  { a: "@" },
  { b: "1" },
  { c: "2" },
  { d: "#" },
  { e: "/" },
  { f: "a" },
  { g: "-" },
  { h: "+" },
  { i: "=" },
  { j: ";" },
  { k: "?" },
  { l: "<" },
  { m: ">" },
  { n: "3" },
  { o: "5" },
  { p: "4" },
  { q: "n" },
  { r: "!" },
  { s: "0" },
  { t: "o" },
  { u: "m" },
  { v: "z" },
  { w: "j" },
  { x: "k" },
  { y: "A" },
  { z: "t" },
  { A: "z" },
  { B: "6" },
  { C: "7" },
  { D: "8" },
  { E: "9" },
  { F: "l" },
  { G: "`" },
  { H: "~" },
  { I: "b" },
  { J: "c" },
  { K: "d" },
  { L: "e" },
  { M: "'" },
  { N: ":" },
  { O: "]" },
  { P: "[" },
  { Q: "}" },
  { R: "{" },
  { S: "f" },
  { T: "g" },
  { U: "_" },
  { V: "|" },
  { W: ")" },
  { X: "(" },
  { Y: "h" },
  { Z: "i" },
  { 0: "B" },
  { 1: "C" },
  { 2: "D" },
  { 3: "E" },
  { 4: "F" },
  { 5: "G" },
  { 6: "Q" },
  { 7: "W" },
  { 8: "E" },
  { 9: "R" },
  { ".": "Y" },
  { "`": "L" },
  { "~": " " },
  { "^": "H" },
  { "*": "I" },
  { "(": "J" },
  { ")": "K" },
  { "-": "M" },
  { _: "N" },
  { "=": "O" },
  { "+": "P" },
  { "@": "U" },
  { "|": "T" },
  { "{": "U" },
  { "}": "V" },
  { "]": "S" },
  { "[": "X" },
  { "/": "p" },
  { "?": "q" },
  { ".": "r" },
  { ",": "s" },
  { ";": "t" },
  { ":": "u" },
  { "'": "v" },
  { "#": "w" },
  { $: "x" },
  { "&": "y" },
];

const letters = [
  "@",
  "b",
  "!",
  "c",
  "d",
  "e",
  "h",
  "s",
  "i",
  "#",
  "a",
  "p",
  "m",
  "n",
  "A",
  "B",
  "/",
  ".",
  "S",
  ";",
  ":",
  "'",
  "&",
  "*",
  "^",
  "2",
];

var privateKeys = [];

const handleDocumentPart = () => {
  let email = "";
  let getInput = document.getElementById("email");
  let encryptedText = "";

  getInput.addEventListener("input", () => {
    email = getInput.value;
  });

  let getBtn = document.getElementById("btn");

  getBtn.addEventListener("click", () => {
    encryptedText = encryption(email);
    document.getElementById(
      "encrypt"
    ).innerHTML = `Encryption: ${encryptedText}`;
  });

  document.getElementById("dec").addEventListener("click", () => {
    document.getElementById("decrypt").innerHTML = `Decryption: ${decryption(
      encryptedText
    )}`;
  });
};

const encryption = (plainText) => {
  let originalEncryption = "";
  const asciResult = genPrivateKeys_and_textToAsci_ENCRYPTED(plainText);
  const ascisValue = asciResult.split(",");
  const textResult = convert_ASCI_toText(ascisValue);

  for (let i = 0; i < textResult.length; i++) {
    keys.map((keys) =>
      Object.keys(keys).includes(textResult[i])
        ? (originalEncryption += keys[textResult[i]])
        : ""
    );
  }

  let secretKey = "";
  const genSecretKeyLength = Math.ceil(Math.random() * 8);
  for (let i = 0; i < genSecretKeyLength; i++) {
    const genNumber = Math.ceil(Math.random() * 25);
    secretKey += letters[genNumber];
  }
  const encryptedText = originalEncryption + "%^!@" + secretKey;
  return encryptedText;
};

const genPrivateKeys_and_textToAsci_ENCRYPTED = (text) => {
  let finalAsciResult = "";
  let min = 1;
  let max = 4;

  for (let i = 0; i < text.length; i++) {
    let genKeys = Math.ceil(Math.random() * (max - min) + min);
    console.log(text[i].charCodeAt());
    finalAsciResult += text[i].charCodeAt() + genKeys + ",";
    privateKeys.push(genKeys);
  }
  console.log("ASCI value: ", finalAsciResult);
  console.log("Private Keys: ", privateKeys);
  return finalAsciResult;
};

const convert_ASCI_toText = (asciValues) => {
  let final_Text_result = "";
  for (let i = 0; i < asciValues.length - 1; i++) {
    let textValue = String.fromCharCode(asciValues[i]);
    final_Text_result += textValue;
  }
  return final_Text_result;
};

const usePrivateKeys_getAsciValue_DECRYPTED = (text) => {
  let toBeOriginal = "";

  for (let i = 0; i < text.length; i++) {
    let ascinumbers = text[i].charCodeAt();
    let originalNumbers = ascinumbers - privateKeys[i];
    toBeOriginal += originalNumbers + ",";
  }

  return toBeOriginal;
};

const decryption = (encryptedText) => {
  const toDecrypt = encryptedText.split("%");
  let reverse_TEXT_by_mapping = "";

  for (let i = 0; i < toDecrypt[0].length; i++) {
    keys.map((keys) =>
      Object.values(keys).includes(toDecrypt[0][i])
        ? (reverse_TEXT_by_mapping += Object.keys(keys))
        : ""
    );
  }

  const getOriginalAsci = usePrivateKeys_getAsciValue_DECRYPTED(
    reverse_TEXT_by_mapping
  );
  const storeOriginal = getOriginalAsci.split(",");

  return convert_ASCI_toText(storeOriginal);
};

handleDocumentPart();
