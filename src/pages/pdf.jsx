const generarPDF = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    // 1. Configuración de datos (Asegúrate de que estas variables existan en tu estado)
    const nombreUsuario = aspirante.nombre || "Aspirante";
    const carreraGanadora = Object.keys(puntos).reduce((a, b) => puntos[a] > puntos[b] ? a : b);
    const fecha = new Date().toLocaleDateString();

    // --- DISEÑO: ENCABEZADO AZUL (Color #1D3557 de tu código) ---
    doc.setFillColor(29, 53, 87); 
    doc.rect(0, 0, 210, 45, 'F'); 

    // Texto Blanco en el encabezado
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("TECNOLÓGICO", 105, 18, { align: "center" });
    doc.text("UNIVERSITARIO TUXTLA", 105, 28, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("INNOVACIÓN CON SENTIDO HUMANO", 105, 36, { align: "center" });

    // --- CUERPO DEL PDF ---
    doc.setTextColor(60, 60, 60); // Gris oscuro
    doc.setFontSize(16);
    doc.text(`¡Hola! ${nombreUsuario.toUpperCase()}`, 20, 65);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("RESULTADOS DE TU TEST VOCACIONAL", 20, 80);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Basado en tus respuestas y perfil analizado, hemos determinado", 20, 95);
    doc.text("que la carrera que mejor se alinea a tus talentos es:", 20, 102);

    // --- RESULTADO DESTACADO (En Rojo #E63946) ---
    doc.setTextColor(230, 57, 70); 
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(carreraGanadora.toUpperCase(), 105, 125, { align: "center" });

    // --- CUADRO DE BENEFICIOS (Como el del HTML que pasaste) ---
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 145, 190, 145); // Línea divisoria

    doc.setTextColor(29, 53, 87);
    doc.setFontSize(14);
    doc.text("TUS BENEFICIOS AL INSCRIBIRTE:", 20, 155);

    doc.setTextColor(80, 80, 80);
    doc.setFontSize(11);
    doc.text("• COLEGIATURAS CONGELADAS", 25, 165);
    doc.text("• RVOES FEDERALES (VALIDEZ OFICIAL)", 25, 173);
    doc.text("• PROGRAMA DE EMPLEABILIDAD", 25, 181);
    doc.text("• TITULACIÓN GARANTIZADA", 25, 189);

    // --- PIE DE PÁGINA ---
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado el: ${fecha} - TecTux Digital`, 105, 275, { align: "center" });
    doc.text("Este documento es informativo y no constituye un comprobante de inscripción.", 105, 282, { align: "center" });

    // --- DISPARAR DESCARGA ---
    doc.save(`Resultado_Test_${nombreUsuario}.pdf`);
  };