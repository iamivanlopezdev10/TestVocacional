import React, { useState } from 'react';
import { jsPDF } from "jspdf";

export default function TestVocacional() {

  // =========================
  // 1. ESTADOS
  // =========================
  const [aspirante, setAspirante] = useState({
    nombre: '',
    whatsapp: '',
    grado: '',
    grupo: '',
    escuela: ''
  });

  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [puntos, setPuntos] = useState({});

  // =========================
  // 2. CONFIGURACIÓN
  // =========================
  const configuracionCarreras = {
    "Criminología": { color: "#E63946", bg: "#fdeaea" },
    "Enfermería": { color: "#00B4D8", bg: "#e0f7fa" },
    "Sistemas Computacionales": { color: "#38b000", bg: "#eafae1" },
    "Arquitectura": { color: "#F4A261", bg: "#fef3e9" },
    "Pedagogía": { color: "#9B5DE5", bg: "#f3eafa" },
    "Derecho": { color: "#1D3557", bg: "#e2e8f0" },
    "Contaduría Pública": { color: "#2A9D8F", bg: "#e6f4f2" },
    "Mercadotecnia": { color: "#F15BB5", bg: "#fbe6f2" },
    "Administración de Empresas": { color: "#FFB703", bg: "#fff8e6" }
  };

  // =========================
  // 3. PREGUNTAS
  // =========================
  const preguntas = [
    { q: "1.- Me gustaría dirigir un grupo de personas hacia un objetivo común.", area: "Administración de Empresas" },
    { q: "2.- Disfruto dibujar o imaginar estructuras y espacios nuevos.", area: "Arquitectura" },
    { q: "3.- Me gusta analizar números, presupuestos o balances.", area: "Contaduría Pública" },
    { q: "4.- Tengo paciencia y disfruto enseñar a otras personas.", area: "Pedagogía" },
    { q: "5.- Me intriga investigar cómo y por qué ocurren ciertos hechos.", area: "Criminología" },
    { q: "6.- Me gusta debatir y defender mis ideas con argumentos sólidos.", area: "Derecho" },
    { q: "7.- Me atrae entender cómo influir en las decisiones de los consumidores.", area: "Mercadotecnia" },
    { q: "8.- Me interesa aprender sobre tecnología, programación o sistemas.", area: "Sistemas Computacionales" },
    { q: "9.- Me motiva ayudar a otros cuando se sienten mal.", area: "Enfermería" },
    { q: "10.- Soy una persona organizada y meticulosa con los detalles.", area: "Administración de Empresas" },
    { q: "11.- Me gusta crear cosas que sean tanto funcionales como estéticas.", area: "Arquitectura" },
    { q: "12.- Disfruto planear y coordinar proyectos.", area: "Administración de Empresas" },
    { q: "13.- Me interesa el desarrollo emocional y cognitivo de las personas.", area: "Pedagogía" },
    { q: "14.- Me considero observador y detallista.", area: "Criminología" },
    { q: "15.- Me gustaría conocer y aplicar las leyes en distintos casos.", area: "Derecho" },
    { q: "16.- Sigo tendencias de redes sociales y me gusta analizar campañas.", area: "Mercadotecnia" },
    { q: "17.- Disfruto resolver problemas técnicos o de software.", area: "Sistemas Computacionales" },
    { q: "18.- Me siento cómodo trabajando bajo presión si se trata de cuidar personas.", area: "Enfermería" },
    { q: "19.- Me gustaría aprender sobre materiales, estructuras y construcción.", area: "Arquitectura" },
    { q: "20.- Me atrae la idea de emprender o crear mi propio negocio.", area: "Administración de Empresas" },
    { q: "21.- Prefiero tareas que requieran exactitud y control financiero.", area: "Contaduría Pública" },
    { q: "22.- Disfruto ayudar a otros a aprender cosas nuevas.", area: "Pedagogía" },
    { q: "23.- Me gustaría participar en investigaciones sobre delitos o comportamientos humanos.", area: "Criminología" },
    { q: "24.- Me interesa promover la justicia y la equidad en la sociedad.", area: "Derecho" },
    { q: "25.- Me gusta proponer ideas creativas para promocionar productos o servicios.", area: "Mercadotecnia" },
    { q: "26.- Disfruto aprender sobre inteligencia artificial o nuevas tecnologías digitales.", area: "Sistemas Computacionales" },
    { q: "27.- Me gusta escuchar a las personas y brindarles apoyo emocional.", area: "Enfermería" },
    { q: "28.- Me atrae diseñar espacios que sean útiles y agradables a la vista.", area: "Arquitectura" },
    { q: "29.- Disfruto analizar los resultados de un negocio y proponer mejoras.", area: "Administración de Empresas" },
    { q: "30.- Me interesa la contabilidad y la administración del dinero.", area: "Contaduría Pública" },
    { q: "31.- Me gusta enseñar y ver el progreso de mis alumnos o compañeros.", area: "Pedagogía" },
    { q: "32.- Me atrae investigar pruebas o analizar evidencias.", area: "Criminología" },
    { q: "33.- Me siento cómodo hablando frente a grupos o defendiendo una postura.", area: "Derecho" },
    { q: "34.- Me gusta pensar estrategias para que una marca tenga más impacto.", area: "Mercadotecnia" },
    { q: "35.- Disfruto usar programas o herramientas tecnológicas para resolver tareas.", area: "Sistemas Computacionales" },
    { q: "36.- Me interesa aprender sobre anatomía y salud humana.", area: "Enfermería" },
    { q: "37.- Me gusta planear espacios o ambientes funcionales.", area: "Arquitectura" },
    { q: "38.- Me motiva liderar equipos para cumplir metas específicas.", area: "Administración de Empresas" },
    { q: "39.- Me atraen las matemáticas y el análisis de datos.", area: "Contaduría Pública" },
    { q: "40.- Siento satisfacción al ver que alguien aprende gracias a mí.", area: "Pedagogía" },
    { q: "41.- Me gusta descubrir la verdad detrás de una situación o conflicto.", area: "Criminología" },
    { q: "42.- Me interesan las normas, derechos y obligaciones de las personas.", area: "Derecho" },
    { q: "43.- Me apasiona la comunicación y la publicidad.", area: "Mercadotecnia" },
    { q: "44.- Me siento entusiasmado por los avances en tecnología e innovación.", area: "Sistemas Computacionales" },
    { q: "45.- Me gustaría trabajar en un hospital o clínica cuidando personas.", area: "Enfermería" },
    { q: "46.- Me disfruto combinar el arte con la funcionalidad.", area: "Arquitectura" },
    { q: "47.- Me gusta buscar soluciones creativas para problemas empresariales.", area: "Administración de Empresas" },
    { q: "48.- Prefiero trabajos que requieran exactitud y control en las finanzas.", area: "Contaduría Pública" },
    { q: "49.- Me gusta guiar a otros en su desarrollo personal o académico.", area: "Pedagogía" },
    { q: "50.- Tengo curiosidad por entender el comportamiento delictivo.", area: "Criminología" },
    { q: "51.- Me gusta analizar conflictos y encontrar soluciones legales.", area: "Derecho" },
    { q: "52.- Disfruto crear estrategias para vender productos o posicionar marcas.", area: "Mercadotecnia" },
    { q: "53.- Me atrae el desarrollo de software o diseño web.", area: "Sistemas Computacionales" },
    { q: "54.- Me motiva ayudar a otros a recuperar su salud y bienestar.", area: "Enfermería" }
  ];

  const valores = {
    "Me gusta mucho": 3,
    "Me gusta": 2,
    "No me gusta": 1,
    "No me gusta nada": 0
  };

  // =========================
  // 4. PDF
  // =========================
  const descargarPDF = () => {

    const doc = new jsPDF();

    const resultadoFinal = Object.keys(puntos).reduce((a, b) =>
      puntos[a] > puntos[b] ? a : b
    );

    const fecha = new Date().toLocaleDateString();

    doc.setFillColor(29, 53, 87);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "TECNOLÓGICO UNIVERSITARIO TUXTLA",
      105,
      20,
      { align: "center" }
    );

    doc.setFontSize(12);

    doc.text(
      "RESULTADOS DEL TEST VOCACIONAL",
      105,
      30,
      { align: "center" }
    );

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(14);

    doc.text(`Aspirante: ${aspirante.nombre.toUpperCase()}`, 20, 60);
    doc.text(`Escuela: ${aspirante.escuela}`, 20, 70);
    doc.text(`WhatsApp: ${aspirante.whatsapp}`, 20, 80);

    doc.setFontSize(18);

    doc.text(
      "Tu carrera ideal según tu perfil es:",
      20,
      100
    );

    doc.setTextColor(230, 57, 70);

    doc.setFontSize(26);

    doc.text(
      resultadoFinal.toUpperCase(),
      105,
      120,
      { align: "center" }
    );

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 140, 190, 140);

    doc.setTextColor(29, 53, 87);
    doc.setFontSize(14);

    doc.text(
      "TUS BENEFICIOS AL INSCRIBIRTE:",
      20,
      150
    );

    doc.setTextColor(80, 80, 80);
    doc.setFontSize(12);

    doc.text("• COLEGIATURAS CONGELADAS TODA LA CARRERA", 25, 160);
    doc.text("• RVOES FEDERALES (VALIDEZ OFICIAL SEP)", 25, 170);
    doc.text("• TITULACIÓN GARANTIZADA", 25, 180);
    doc.text("• PROGRAMA DE EMPLEABILIDAD", 25, 190);

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);

    doc.text(
      `Fecha de consulta: ${fecha} | Tuxtla Gutiérrez, Chiapas.`,
      105,
      270,
      { align: "center" }
    );

    doc.save(
      `Resultado_Test_${aspirante.nombre.replace(/\s+/g, '_')}.pdf`
    );
  };

  const handleAnswer = async (valor) => {

    const area = preguntas[currentQuestion].area;

    const pts = valores[valor];

    const nuevosPuntos = {
      ...puntos,
      [area]: (puntos[area] || 0) + pts
    };

    setPuntos(nuevosPuntos);

    if (currentQuestion < preguntas.length - 1) {

      setCurrentQuestion(currentQuestion + 1);

    } else {

      setStep(2);
      await enviarAExcel(nuevosPuntos);

    }
  };

  // =========================
  // 6. ENVIAR A GOOGLE SHEETS
  // =========================
  const enviarAExcel = async (puntosFinales) => {

    const resultadoFinal = Object.keys(puntosFinales).reduce((a, b) =>
      puntosFinales[a] > puntosFinales[b] ? a : b
    );

    const data = {
      ...aspirante,
      resultado: resultadoFinal,
      puntos: puntosFinales
    };

    try {

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyL7b1sPperVcIuYK0eGYTX_44wHQnFXUn87uQjXvQsToHOw3oBMyuLm6HLTzWt7nIBeA/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.text();

      console.log("Datos enviados correctamente 🚀");
      console.log(result);

    } catch (e) {

      console.log("Error al enviar ❌", e);

    }
  };

  const resultadoArea =
    step === 2
      ? Object.keys(puntos).reduce((a, b) =>
          puntos[a] > puntos[b] ? a : b
        )
      : "";

  // =========================
  // 7. ESTILOS
  // =========================
  const styles = {

    container: {
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      maxWidth: '500px',
      margin: '30px auto',
      padding: '25px',
      borderRadius: '30px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
      textAlign: 'center',
      backgroundColor: '#fff'
    },

    title: {
      color: '#1D3557',
      fontSize: '22px',
      fontWeight: '800',
      marginBottom: '15px'
    },

    input: {
      width: '90%',
      padding: '12px',
      margin: '8px 0',
      borderRadius: '12px',
      border: '2px solid #eee',
      fontSize: '15px',
      outline: 'none'
    },

    btnMain: {
      backgroundColor: '#1D3557',
      color: 'white',
      padding: '16px',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      width: '100%',
      marginTop: '15px'
    },

    btnOption: {
      backgroundColor: '#f8f9fa',
      border: '2px solid #eee',
      padding: '14px',
      margin: '6px 0',
      borderRadius: '12px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      fontWeight: '500'
    },

    badge: {
      backgroundColor:
        configuracionCarreras[resultadoArea]?.bg || '#f0f0f0',

      color:
        configuracionCarreras[resultadoArea]?.color || '#333',

      padding: '25px 15px',
      borderRadius: '20px',
      fontSize: '26px',
      fontWeight: '900',
      margin: '20px 0',

      border:
        `3px dashed ${configuracionCarreras[resultadoArea]?.color}`
    },

    progressContainer: {
      height: '10px',
      backgroundColor: '#e9ecef',
      borderRadius: '10px',
      marginBottom: '25px',
      overflow: 'hidden'
    },

    progressFill: {
      height: '100%',
      backgroundColor: '#1D3557',
      transition: 'width 0.4s ease-out'
    }
  };

  // =========================
  // VISTA 0
  // =========================
  if (step === 0) return (

    <div style={styles.container}>

      <img
        src="https://res.cloudinary.com/du9yqkkdg/image/upload/v1768422714/LOGO_TUT_COLOR_SIN_FONDO_1_1_qfyne4.png"
        alt="Logo TecTux"
        style={{
          width: '220px',
          marginBottom: '15px'
        }}
      />

      <h1 style={styles.title}>
        ¡DESCUBRE TU FUTURO! 🚀
      </h1>

      <p style={{
        color: '#666',
        fontSize: '14px'
      }}>
        Completa tus datos para iniciar el test del
        <b> Tecnológico Universitario Tuxtla</b>.
      </p>

      <div style={{ marginTop: '20px' }}>

        <input
          style={styles.input}
          type="text"
          placeholder="Nombre completo"
          onChange={e =>
            setAspirante({
              ...aspirante,
              nombre: e.target.value
            })
          }
        />

        <input
          style={styles.input}
          type="tel"
          placeholder="WhatsApp (10 dígitos)"
          onChange={e =>
            setAspirante({
              ...aspirante,
              whatsapp: e.target.value
            })
          }
        />

        <div style={{
          display: 'flex',
          gap: '10px',
          width: '95%',
          margin: '0 auto'
        }}>

          <input
            style={{
              ...styles.input,
              width: '50%'
            }}
            type="text"
            placeholder="Grado"
            onChange={e =>
              setAspirante({
                ...aspirante,
                grado: e.target.value
              })
            }
          />

          <input
            style={{
              ...styles.input,
              width: '50%'
            }}
            type="text"
            placeholder="Grupo"
            onChange={e =>
              setAspirante({
                ...aspirante,
                grupo: e.target.value
              })
            }
          />

        </div>

        <input
          style={styles.input}
          type="text"
          placeholder="Escuela de procedencia"
          onChange={e =>
            setAspirante({
              ...aspirante,
              escuela: e.target.value
            })
          }
        />

      </div>

      <button
        style={styles.btnMain}
        onClick={() => setStep(1)}
        disabled={!aspirante.nombre || !aspirante.whatsapp}
      >
        COMENZAR TEST
      </button>

    </div>
  );

  // =========================
  // VISTA 1
  // =========================
  if (step === 1) return (

    <div style={styles.container}>

      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressFill,
            width: `${(currentQuestion / preguntas.length) * 100}%`
          }}
        />
      </div>

      <p style={{
        fontSize: '13px',
        color: '#999',
        fontWeight: 'bold'
      }}>
        PREGUNTA {currentQuestion + 1} DE {preguntas.length}
      </p>

      <h2 style={{
        ...styles.title,
        margin: '20px 0',
        minHeight: '60px',
        fontSize: '20px'
      }}>
        {preguntas[currentQuestion].q}
      </h2>

      <div style={{ marginTop: '20px' }}>

        {Object.keys(valores).map(v => (

          <button
            key={v}
            style={styles.btnOption}
            onClick={() => handleAnswer(v)}
          >
            {v}
          </button>

        ))}

      </div>

    </div>
  );

  // =========================
  // VISTA 2
  // =========================
  return (

    <div style={styles.container}>

      <h2 style={{
        fontSize: '28px',
        color: '#1D3557'
      }}>
        ¡EXCELENTE TRABAJO! 🎉
      </h2>

      <p style={{
        fontSize: '16px',
        margin: '10px 0'
      }}>
        <b>{aspirante.nombre.toUpperCase()}</b>,
        tu perfil es ideal para:
      </p>

      <div style={styles.badge}>
        {resultadoArea.toUpperCase()}
      </div>

      <div style={{
        textAlign: 'left',
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '15px',
        margin: '20px 0'
      }}>

        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          ✅ <b>RVOES Federales</b>
        </p>

        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          ✅ <b>Titulación Garantizada</b>
        </p>

        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          ✅ <b>Colegiaturas Congeladas</b>
        </p>

      </div>

      <button
        style={{
          ...styles.btnMain,
          backgroundColor:
            configuracionCarreras[resultadoArea]?.color
        }}
        onClick={descargarPDF}
      >
        DESCARGAR PDF
      </button>

      <button
        style={styles.btnMain}
        onClick={() => window.location.reload()}
      >
        FINALIZAR Y SALIR
      </button>

    </div>
  );
}