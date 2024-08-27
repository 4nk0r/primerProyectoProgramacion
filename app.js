function prepararYValidarTexto() {
  const textoEntrada = document.querySelector(".text-area").value;
  const textoInstrucciones = document.querySelector(".informacion");
  const seccionSalida = document.querySelector(".mensaje");
  const contenedorError = document.querySelector(".contenedor-error");

  // Verifica que el texto solo contenga letras minúsculas y espacios.
  if (!/^[a-z\s]*$/.test(textoEntrada) || textoEntrada.trim() === "") {
    textoInstrucciones.classList.add("error");
    contenedorError.innerHTML = `
      <img src="./assets/exclamacion.png" alt="Error">
      <h6 class="informacion">Por favor, revise su entrada y solo use letras minúsculas y sin acentos.</h6>
    `;
    contenedorError.style.display = "flex"; // Asegura que se use display flex para alinear correctamente
    seccionSalida.value = "";
    mostrarBotonCopiar();
    mostrarElementosNotFound(true); // Mostrar elementos si hay error o el campo está vacío
    return null; // Retorna null si el texto no es válido
  }
  textoInstrucciones.classList.remove("error");
  contenedorError.style.display = "none";
  return textoEntrada;
}

// Función para encriptar texto ingresado por el usuario.
function encriptarTexto() {
  const textoEntrada = document.querySelector(".text-area").value;
  const textoValidado = prepararYValidarTexto();
  if (textoValidado === null) return; // Si el texto no es válido, salir de la función

  // Reemplazar las letras según las reglas
  let textoEncriptado = textoEntrada
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");

  // Mostrar el texto encriptado en la sección de salida
  document.querySelector(".mensaje").value = textoEncriptado;
  mostrarBotonCopiar();
  mostrarElementosNotFound(false); // Ocultar elementos si hay texto
}

function desencriptarTexto() {
  const textoEntrada = document.querySelector(".text-area").value;
  const textoValidado = prepararYValidarTexto();
  if (textoValidado === null) return; // Si el texto no es válido, salir de la función

  // Revertir el proceso de encriptación
  let textoDesencriptado = textoEntrada
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");

  // Mostrar el texto desencriptado en la sección de salida
  document.querySelector(".mensaje").value = textoDesencriptado;
  mostrarBotonCopiar();
  mostrarElementosNotFound(false); // Ocultar elementos si hay texto
}

function mostrarBotonCopiar() {
  const mensajeSalida = document.querySelector(".mensaje");
  const botonCopiar = document.querySelector(".btn-copiar");

  // Verifica si hay texto en el área de mensaje y muestra u oculta el botón "Copiar"
  if (mensajeSalida.value.trim() !== "") {
    botonCopiar.style.display = "block"; // Muestra el botón si hay texto
  } else {
    botonCopiar.style.display = "none"; // Oculta el botón si no hay texto
  }
}

function copiarTexto() {
  const mensajeSalida = document.querySelector(".mensaje");

  // Verifica si hay texto para copiar
  if (mensajeSalida.value === "") {
    alert("No hay texto para copiar."); // Opcional: agregar una alerta si no hay texto
    return;
  }

  // Selecciona el contenido del área de texto
  mensajeSalida.select();
  mensajeSalida.setSelectionRange(0, 99999); // Para dispositivos móviles

  // Copia el texto seleccionado al portapapeles
  navigator.clipboard
    .writeText(mensajeSalida.value)
    .then(() => {
      alert("Texto copiado al portapapeles."); // Mensaje de éxito
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err); // Muestra un error si ocurre
    });
}

// Función para mostrar u ocultar los elementos 'no-found'
function mostrarElementosNotFound(mostrar) {
  const elementosNotFound = document.querySelectorAll(
    ".no-found, .texto-no-found, .apoyo-not-found"
  );
  elementosNotFound.forEach((elemento) => {
    elemento.style.display = mostrar ? "block" : "none"; // Usar 'display' para controlar la visibilidad
    elemento.style.opacity = mostrar ? "1" : "0"; // Mantener la opacidad para una transición suave
  });
}
