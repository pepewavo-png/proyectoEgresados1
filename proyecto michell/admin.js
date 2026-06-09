import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function cargarDatos() {

  const querySnapshot = await getDocs(collection(db, "respuestas"));

  const contenedor = document.getElementById("contenedorRespuestas");

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    // Crear tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Título
    let contenido = `
      <h3>${data.nombre || "Sin nombre"}</h3>
    `;

    // Recorrer TODAS las respuestas automáticamente
    for (const clave in data) {

      contenido += `
        <p>
          <strong>${clave}:</strong>
          ${data[clave]}
        </p>
      `;
    }

    card.innerHTML = contenido;

    contenedor.appendChild(card);

  });

}

cargarDatos();

document.getElementById("exportar").addEventListener("click", async () => {

  const querySnapshot = await getDocs(collection(db, "respuestas"));

  let datos = [];

  querySnapshot.forEach((doc) => {
    datos.push(doc.data());
  });

  // Convertir a CSV
  const headers = [...new Set(
    datos.flatMap(obj => Object.keys(obj))
  )];

  let csv = headers.join(",") + "\n";

  datos.forEach(obj => {

    let fila = headers.map(header => {
      return `"${obj[header] || ""}"`;
    });

    csv += fila.join(",") + "\n";

  });

  // Descargar archivo
  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "respuestas.csv";

  a.click();

});
