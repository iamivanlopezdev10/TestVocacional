const generarPDF = () => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  const nombreUsuario = aspirante.nombre || "Aspirante";
  const carreraGanadora = Object.keys(puntos).reduce((a, b) => puntos[a] > puntos[b] ? a : b);

  // 1. URL de la imagen que me pasaste (la subí a un hosting para que funcione directo)
  const plantillaImg = "https://res.cloudinary.com/du9yqkkdg/image/upload/v1776986818/TEST_VOCACIONAL_Millka_Valeria_Bravo_Ju%C3%A1rez_page-0001_bgji7p.jpg";

  // 2. Dibujar la imagen de fondo (ocupa toda la hoja A4: 210x297mm)
  doc.addImage(plantillaImg, 'JPEG', 0, 0, 210, 297);

  // 3. Configurar el estilo de texto para el NOMBRE
  // Nota: En tu imagen el "¡Hola!" ya está, así que ponemos el nombre a un lado.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0); // Negro puro
  doc.text(`${nombreUsuario}.`, 35, 38.5); // X=35mm (después del Hola), Y=38.5mm (alineado al texto)

  // 4. Configurar el estilo para la CARRERA
  // La ponemos justo debajo del birrete
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0); 
  doc.text(carreraGanadora.toUpperCase(), 105, 116, { align: "center" });

  // 5. Descargar
  doc.save(`Test_Vocacional_${nombreUsuario.replace(/\s+/g, '_')}.pdf`);
};