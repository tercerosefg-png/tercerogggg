import { useState, useEffect } from 'react';

// Base de datos con información relevante
const informacion: Record<string, string> = {
  alimentacion: "🥗 Una dieta equilibrada es la base de la salud. Incluye al menos 5 porciones de frutas y verduras al día. Evita los ultraprocesados y el exceso de azúcares.",
  ejercicio: "🏃‍♂️ La OMS recomienda al menos 150 minutos de actividad física moderada a la semana. Caminar, nadar o bailar son excelentes opciones para mantener un corazón sano.",
  descanso: "😴 Dormir entre 7 y 9 horas diarias es crucial. Un buen descanso mejora la memoria, regula las hormonas del estrés y fortalece el sistema inmunológico."
};

const consejosAleatorios = [
  "💧 Bebe un vaso de agua al despertar para activar tu metabolismo.",
  "🧘‍♀️ Practica 5 minutos de respiración profunda para reducir el estrés.",
  "🚶‍♂️ Levántate y estira cada 45 minutos si trabajas sentado.",
  "🍎 Come una fruta en lugar de un snack procesado a media tarde.",
  "☀️ Toma 15 minutos de sol al día para sintetizar Vitamina D.",
  "🧠 Mantén tu mente activa: lee, aprende algo nuevo o haz crucigramas."
];

function App() {
  const [temaActivo, setTemaActivo] = useState<string>('alimentacion');
  const [displayText, setDisplayText] = useState<string>(informacion['alimentacion']);
  const [opacity, setOpacity] = useState<number>(1);
  const [animating, setAnimating] = useState<boolean>(false);
  const [circuloRotando, setCirculoRotando] = useState<boolean>(false);
  const [pildoraColor, setPildoraColor] = useState<string>('white');

  useEffect(() => {
    setDisplayText(informacion[temaActivo]);
  }, []);

  const mostrarInfo = (tema: string) => {
    setTemaActivo(tema);
    setOpacity(0);
    setTimeout(() => {
      setDisplayText(informacion[tema] || "Información no disponible.");
      setOpacity(1);
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    }, 150);
  };

  const handlePildoraClick = () => {
    const consejo = consejosAleatorios[Math.floor(Math.random() * consejosAleatorios.length)];
    setOpacity(0);
    setTimeout(() => {
      setDisplayText(consejo);
      setOpacity(1);
    }, 150);
    setPildoraColor('#b0dca2');
    setTimeout(() => setPildoraColor('white'), 300);
  };

  const handleCirculoClick = () => {
    setOpacity(0);
    setTimeout(() => {
      setDisplayText("🌟 La salud no es solo la ausencia de enfermedades, es un estado de completo bienestar físico, mental y social.");
      setOpacity(1);
    }, 150);
    setCirculoRotando(true);
    setTimeout(() => setCirculoRotando(false), 500);
  };

  return (
    <div className="hoja-cuaderno">
      {/* Decoración de espiral */}
      <div className="espiral">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="agujero"></div>
        ))}
      </div>

      {/* Logotipo Scribé */}
      <div className="logo-scribe">Scribé</div>

      {/* Barra de Navegador */}
      <div className="barra-navegador">
        <div className="nav-izq">
          <div className="icono-nav" title="Atrás">&lt;</div>
          <div className="icono-nav" title="Adelante">&gt;</div>
        </div>
        <div className="nav-der">
          <div className="icono-nav" title="Inicio">🏠</div>
          <div className="icono-nav" title="Configuración">⚙️</div>
          <div className="icono-nav" title="Menú">☑️</div>
        </div>
      </div>

      {/* Título y Círculo */}
      <div className="seccion-titulo">
        <div
          className="circulo-vida"
          onClick={handleCirculoClick}
          title="Haz clic para un consejo"
          style={{
            transform: circuloRotando ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s ease'
          }}
        >
          <span>vida<br />saludable</span>
          <div className="linea-ondulada"></div>
        </div>
        <div className="caja-titulo">La vi da Salu dable</div>
      </div>

      {/* Zona Morada Interactiva */}
      <div className="zona-morada">
        {/* Pestañas superiores */}
        <div className="fila-pestanas">
          {(['alimentacion', 'ejercicio', 'descanso'] as const).map((tema) => {
            const labels: Record<string, string> = {
              alimentacion: 'Alimentación',
              ejercicio: 'Ejercicio',
              descanso: 'Descanso'
            };
            return (
              <div
                key={tema}
                className={`pestana ${temaActivo === tema ? 'activa' : ''}`}
                onClick={() => mostrarInfo(tema)}
              >
                {labels[tema]}
              </div>
            );
          })}
        </div>

        {/* Cuadro central de información */}
        <div
          className={`cuadro-central ${animating ? 'animar' : ''}`}
          style={{ opacity }}
        >
          {displayText}
        </div>

        {/* Píldora inferior */}
        <div
          className="pildora-inferior"
          onClick={handlePildoraClick}
          title="Haz clic para más información"
          style={{ backgroundColor: pildoraColor }}
        >
          🌟 Bienestar Integral
        </div>
      </div>
    </div>
  );
}

export default App;
