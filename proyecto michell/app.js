import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(form);
  let objeto = {};

  datos.forEach((valor, clave) => {
    objeto[clave] = valor;
  });

  try {
    await addDoc(collection(db, "respuestas"), objeto);
    document.getElementById("mensaje").style.display = "block";
    form.reset();
  } catch (error) {
    alert("Error al guardar");
  }
});