const userText = document.getElementById("user-text");
const encryptedMessage = document.getElementById("encrypted-text");

const encryptKeys = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function validateUserText(userText) {
  // /^(?=[a-z])[a-z\s]+$/
  // /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  return /^(?=[a-z!@#$%^&*()_+\-=\[\]{}])[a-z!@#$%^&*()_+\-=\[\]{}\s]+$/.test(
    userText.value.trim()
  )
    ? true
    : false || userText.focus();
}

function ecrypt(userText) {
  for (let i = 0; i < encryptKeys.length; i++) {
    if (userText.includes(encryptKeys[i][0])) {
      userText = userText.replaceAll(
        encryptKeys[i][0],
        encryptKeys[i][1]
      );
    }
  }
  return userText;
}

function decrypt(userText) {
  let foundedKeys = [];
  let charactersToReplace = [];
  for (let i = 0; i < encryptKeys.length; i++) {
    if (userText.includes(encryptKeys[i][1])) {
      charactersToReplace.push(encryptKeys[i][0]);
      foundedKeys.push(encryptKeys[i][1]);
    }
  }

  let counter = 0;

  for (const keys of foundedKeys) {
    userText = userText.replaceAll(
      keys,
      charactersToReplace[counter]
    );
    counter++;
  }

  // console.log(foundedKeys);
  // console.log(charactersToReplace);
  return userText;
}

function textoTextarea(text) {
  encryptedMessage.value = text;
  userText.value = "";
}

function changeStyleElements(attribute, display) {
  document.getElementById(attribute).style.display = display;
}

function btnEncriptar() {
  if (validateUserText(userText)) {
    changeStyleElements("seccion-muñeco", "none");
    changeStyleElements("seccion-copy", "block");
    const textoEncriptado = ecrypt(userText.value);
    textoTextarea(textoEncriptado);
  } else {
    changeStyleElements("seccion-muñeco", "block");
    changeStyleElements("seccion-copy", "none");
    alert("Ingrese solo letras minúsculas y sin acentos.");
  }
}

function btnDesencriptar() {
  if (validateUserText(userText)) {
    changeStyleElements("seccion-muñeco", "none");
    changeStyleElements("seccion-copy", "block");
    const textoDesencriptado = decrypt(userText.value);
    textoTextarea(textoDesencriptado);
  } else {
    changeStyleElements("seccion-muñeco", "block");
    changeStyleElements("seccion-copy", "none");
    alert("Ingrese solo letras minúsculas y sin acentos.");
  }
}

async function copyTexto() {
  try {
    await navigator.clipboard.writeText(encryptedMessage.value);
    alert("El texto se ha copiado correctamente");
    userText.focus();
  } catch (error) {
    console.error(`Ha ocurrido un error al copy al portapapeles: ${error}`);
  }
}
