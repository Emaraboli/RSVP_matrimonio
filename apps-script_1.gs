/**
 * SCRIPT DE BACKEND — RSVP Boda María Jesús & Enrique
 *
 * Qué hace:
 * 1. Recibe cada confirmación enviada desde el formulario (index.html)
 * 2. Agrega una fila nueva en una Google Sheet
 * 3. Envía un correo de notificación a los novios
 *
 * CÓMO INSTALARLO (una sola vez):
 * 1. Crea una Google Sheet nueva y vacía (el nombre no importa).
 * 2. Dentro de la Sheet: Extensiones > Apps Script.
 * 3. Borra el contenido de ejemplo y pega TODO este archivo.
 * 4. Reemplaza CORREO_DESTINO más abajo por el correo donde quieres
 *    recibir las notificaciones.
 * 5. Arriba, haz clic en "Implementar" > "Nueva implementación".
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo (tu correo)"
 *    - Quién tiene acceso: "Cualquier usuario"
 * 6. Autoriza los permisos que te pida Google (es tu propio script).
 * 7. Copia la URL que te entrega ("URL de la aplicación web").
 * 8. Pega esa URL en index.html, en la constante APPS_SCRIPT_URL.
 *
 * Nota: cada vez que edites este script después de haberlo publicado,
 * debes hacer "Implementar" > "Gestionar implementaciones" > editar
 * la implementación existente > Nueva versión, para que los cambios
 * tomen efecto en la URL ya publicada.
 */

const CORREO_DESTINO = "correo-de-los-novios@ejemplo.com"; // <-- CAMBIAR

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);

    guardarEnSheet(datos);
    enviarCorreo(datos);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function guardarEnSheet(datos) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Confirmaciones")
    || crearHojaConEncabezados();

  sheet.appendRow([
    datos.fechaEnvio || new Date().toISOString(),
    datos.tipoInvitado || "",
    datos.nombre || "",
    datos.asistencia || "",
    datos.tieneAcompanante || "",
    datos.nombreAcompanante || "",
    datos.alergias || "",
    datos.alergiasAcompanante || "",
    datos.mensaje || "",
    datos.cancion || ""
  ]);
}

function crearHojaConEncabezados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Confirmaciones");
  sheet.appendRow([
    "Fecha de envío",
    "Tipo de invitado",
    "Nombre",
    "Asistencia",
    "Tiene acompañante",
    "Nombre acompañante",
    "Alergias invitado",
    "Alergias acompañante",
    "Mensaje para los novios",
    "Canción infaltable"
  ]);
  sheet.setFrozenRows(1);
  return sheet;
}

function enviarCorreo(datos) {
  const asunto = datos.asistencia === "si"
    ? `✅ ${datos.nombre} confirmó asistencia`
    : `❌ ${datos.nombre} no podrá asistir`;

  let cuerpo = `Nombre: ${datos.nombre}\n`;
  cuerpo += `Tipo de invitación: ${datos.tipoInvitado}\n`;
  cuerpo += `Asistencia: ${datos.asistencia}\n`;

  if (datos.asistencia === "si") {
    cuerpo += `Acompañante: ${datos.tieneAcompanante === "si" ? datos.nombreAcompanante : "No"}\n`;
    cuerpo += `Alergias invitado: ${datos.alergias || "Ninguna indicada"}\n`;
    if (datos.tieneAcompanante === "si") {
      cuerpo += `Alergias acompañante: ${datos.alergiasAcompanante || "Ninguna indicada"}\n`;
    }
    cuerpo += `Mensaje: ${datos.mensaje || "-"}\n`;
    cuerpo += `Canción infaltable: ${datos.cancion || "-"}\n`;
  }

  MailApp.sendEmail(CORREO_DESTINO, asunto, cuerpo);
}
