const generarPDF = () => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  const nombreUsuario = (aspirante.nombre || "Aspirante").toUpperCase();
  const carreraGanadora = Object.keys(puntos).reduce((a, b) => puntos[a] > puntos[b] ? a : b);

  // 1. La plantilla (Fondo)
  const plantillaImg = "https://res.cloudinary.com/du9yqkkdg/image/upload/v1776986818/TEST_VOCACIONAL_Millka_Valeria_Bravo_Ju%C3%A1rez_page-0001_bgji7p.jpg";

  // Usamos un bloque try/catch por si la imagen tarda en cargar
  try {
    // Dibujar fondo
    doc.addImage(plantillaImg, 'JPEG', 0, 0, 210, 297);

    // 2. NOMBRE (Después del ¡Hola!)
    // Le bajé un pelín el tamaño para que no se vea tosco
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16); 
    doc.setTextColor(30, 30, 30); // Un gris casi negro se ve más real que el negro puro
    doc.text(`${nombreUsuario}.`, 35, 38.2); 

    // 3. CARRERA (Debajo del birrete)
    // Usamos un color un poco más "institucional" o negro sólido
    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    // Bajé la coordenada Y a 118 para que respire mejor con el birrete
    doc.text(carreraGanadora.toUpperCase(), 105, 118, { align: "center" });

    // 4. EXTRA: Fecha opcional en una esquina (para que se vea oficial)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Válido al: ${new Date().toLocaleDateString()}`, 170, 285);

    // Descarga
    doc.save(`Resultado_TecTux_${nombreUsuario.split(' ')[0]}.pdf`);

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Hubo un detalle al generar tu PDF, pero no te preocupes, tus resultados están guardados.");
  }
};