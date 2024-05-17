let plainText = "hello";
let encrypt = "";
let original = "";
let genSecretKey = [];

for (let i = 0; i < plainText.length; i++) {
  let genKey = Math.ceil(Math.random() * 26);
  encrypt += plainText[i].charCodeAt() + genKey + ",";
  genSecretKey.push(genKey);
}

const newEncrypteion = encrypt.split(",");
for (let i = 0; i < newEncrypteion.length - 1; i++) {
  original += String.fromCharCode(newEncrypteion[i] - genSecretKey[i]);
}
console.log(encrypt);

console.log(original);
