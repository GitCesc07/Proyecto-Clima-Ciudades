const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima)
})

function buscarClima(e) {
  e.preventDefault();

  // Validaciones
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {

    // Hubo un error
    mostrarError("Ambos campos son obligatorios");
    return;
  }

  // Consulta a la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {

  const mensajeAlerta = document.querySelector(".bg-red-100");

  if (!mensajeAlerta) {
    // Crear alerta
    const alerta = document.createElement("div");

    alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded",
      "max-w-md", "mx-auto", "mt-6", "text-center");

    alerta.innerHTML = `
      <strong class="font-bold">¡Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // Se elimine la alerta después de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {

  // ID del navegador donde encontramos la API
  const appID = 'afbd6db1ec4caf4aa75f8fd7084fe84e';

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}';

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))
}