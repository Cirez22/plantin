// ---------------------------------------------------------------
// Plantín — datos de ejemplo (todo inventado, salvo las especies)
// Para la demo: poné tu número acá y los pedidos te llegan a vos.
// ---------------------------------------------------------------
const DEMO_WHATSAPP = '5491100000000';    // número al que llegan los pedidos de prueba (formato internacional, sin "+")
const PLANTIN_WHATSAPP = '5491100000000'; // número de Plantín para el formulario "Agregá tu vivero"

// Métricas para el panel admin (en pausa: ver proximamente/README.md).
// activo: false = el sitio no registra nada. Para retomarlo: activo: true y, para juntar la actividad
// de todos los visitantes, la URL y la "anon key" de Supabase (la anon key es pública: solo permite ENVIAR eventos).
const METRICAS = {
  activo: false,
  supabaseUrl: '',  // ej.: 'https://abcdefgh.supabase.co'
  supabaseKey: '',  // la "anon public" key del proyecto
};

const ZONAS = {
  caba: 'CABA',
  norte: 'Zona Norte',
};

// img 'ilus-…' = ilustración SVG (para lo que no tiene foto). forma/color: la familia del logo que la representa (js/logo.js); latin: especie de la foto de portada; pos: encuadre vertical (ver diseño/Plantin - Portadas de categoria.html)
const CATEGORIAS = [
  { id: 'interior',   nombre: 'Interior', forma: 'wavy', color: '#2E6B3E',   img: 'monstera',        pos: '42%', latin: 'Monstera deliciosa',               bajada: 'Las que viven bien adentro, con luz de ventana.' },
  { id: 'exterior',   nombre: 'Exterior', forma: 'clover', color: '#76866A',   img: 'ave-del-paraiso', pos: '50%', latin: 'Strelitzia nicolai',       bajada: 'Para el balcón, el patio o el jardín.' },
  { id: 'suculentas', nombre: 'Suculentas', forma: 'star', color: '#D4A03A', img: 'echeveria-mix',   pos: '50%', latin: 'Echeveria elegans',           bajada: 'Poca agua, mucho carácter.' },
  { id: 'cactus',     nombre: 'Cactus', forma: 'spiky', color: '#C98A5E',     img: 'cereus',          pos: '58%', latin: 'Cereus forbesii',   bajada: 'Pinchudos, a pleno sol y casi sin agua.' },
  { id: 'orquideas',  nombre: 'Orquídeas', forma: 'scallop', color: '#A9552F',  img: 'cymbidium',       pos: '45%', latin: 'Cymbidium hybridum', bajada: 'Flor que dura semanas si la tratás bien.' },
  { id: 'macetas',    nombre: 'Macetas', forma: 'blob', color: '#B04A6A',    img: 'ficus-lyrata',    pos: '55%', latin: 'Cemento, cerámica y barro',         bajada: 'Cemento, barro y esmaltadas.' },
  { id: 'jardineria', nombre: 'Jardinería', forma: 'clover', color: '#1F8A83', img: 'jardineria',      pos: '38%', latin: 'Sustratos, abonos y herramientas', bajada: 'Lo que hace falta para que tus plantas estén bien.' },
  { id: 'semillas',   nombre: 'Semillas', forma: 'scallop', color: '#7d4f2f', img: 'semillas',        pos: '60%', latin: 'Para sembrar en casa', bajada: 'Aromáticas, huerta y flores para arrancar desde cero.' },
  // tapa: false = no aparece como portada en el home (sí en el catálogo, los filtros y cada vivero)
  { id: 'servicios',  nombre: 'Servicios', forma: 'wavy', color: '#2E7FB8', img: 'ilus-serv-paisajismo', pos: '50%', latin: 'Paisajismo, riego y más', bajada: 'Lo que los viveros hacen además de vender plantas: paisajismo, riego, mantenimiento.', tapa: false },
];

const VIVEROS = [
  {
    id: 'el-ombu',
    ejemplo: true, // inventado: muestra la etiqueta "Ejemplo" en el vivero y en todos sus productos
    sigla: 'EO',
    nombre: 'Vivero El Ombú',
    zona: 'norte',
    barrio: 'San Isidro',
    direccion: 'Av. Márquez 1420, San Isidro',
    coords: [-34.497, -58.553], // aproximadas, para ordenar por cercanía
    anios: 32,
    whatsapp: DEMO_WHATSAPP,
    cover: 'ficus-rama',
    inicial: 'O',
    corto: 'Vivero de familia, tres generaciones. Fuertes en plantas de exterior, nativas y árboles chicos para jardín.',
    descripcion: 'Empezó como un puesto de plantines en la feria de San Isidro y hoy ocupa media manzana. Lo llevan los hermanos Ferreyra, que heredaron el ojo del padre para elegir ejemplares. Tienen un sector de nativas armado junto a una asociación vecinal.',
    horario: 'Lun a sáb 8 a 18 · Dom 9 a 13',
    especialidad: 'Exterior y nativas',
    entrega: 'Envío a domicilio en Zona Norte',
    // Identidad del cartel y de su página (ver js/carteles.js)
    marca: { bg: '#F3EEE3', ink: '#1B1B1B', accent: '#2F8A4C', on: '#F3EEE3', tint: '#F4A6D7', display: "'Schibsted Grotesk', sans-serif", body: "'Schibsted Grotesk', sans-serif", size: 'clamp(52px, 7vw, 112px)', caso: 'uppercase', peso: 500 },
  },
  {
    id: 'las-canitas',
    ejemplo: true, // inventado: muestra la etiqueta "Ejemplo" en el vivero y en todos sus productos
    sigla: 'LC',
    nombre: 'Las Cañitas Plantas',
    zona: 'caba',
    barrio: 'Palermo',
    direccion: 'Arévalo 2870, Palermo',
    coords: [-34.5705, -58.433], // aproximadas, para ordenar por cercanía
    anios: 11,
    whatsapp: DEMO_WHATSAPP,
    cover: 'calathea',
    inicial: 'C',
    corto: 'Local chico en Palermo, especializado en plantas de interior. Muy buen asesoramiento para departamentos con poca luz.',
    descripcion: 'Lo abrió Julia Ocampo después de años de trabajar en paisajismo. Son conocidos por conseguir variedades que no se ven en cualquier lado: calatheas, anthuriums, alocasias.',
    horario: 'Mar a dom 10 a 19',
    especialidad: 'Interior y hoja rara',
    entrega: 'Envíos en CABA, martes a sábado',
    marca: { bg: '#F7F3E6', ink: '#111111', accent: '#FF5A1F', on: '#111111', tint: '#FF5A1F', display: "'Dela Gothic One', sans-serif", body: "'Space Mono', monospace", size: 'clamp(36px, 4.6vw, 72px)', caso: 'uppercase', peso: 400 },
  },
  {
    id: 'don-aurelio',
    ejemplo: true, // inventado: muestra la etiqueta "Ejemplo" en el vivero y en todos sus productos
    sigla: 'DA',
    nombre: 'Vivero Don Aurelio',
    zona: 'norte',
    barrio: 'Tigre',
    direccion: 'Ruta 27 km 3,5, Tigre',
    coords: [-34.44, -58.6], // aproximadas, para ordenar por cercanía
    anios: 47,
    whatsapp: DEMO_WHATSAPP,
    cover: 'orquidea-closeup',
    inicial: 'A',
    corto: 'El vivero de orquídeas de la zona. Casi cincuenta años de invernaderos en Tigre y ejemplares que no se consiguen en otro lado.',
    descripcion: 'Aurelio Bianchi plantó el primer invernadero en el 79 y su hija Marta lo sigue manejando con el mismo criterio: pocas variedades, bien cuidadas. Phalaenopsis, cymbidium, dendrobium y algunas rarezas que crían ellos mismos.',
    horario: 'Lun a sáb 9 a 17',
    especialidad: 'Orquídeas de invernadero',
    entrega: 'Coordinada por WhatsApp',
    marca: { bg: '#E8B415', ink: '#1E5A2B', accent: '#1E5A2B', on: '#F3ECD9', tint: '#F3ECD9', display: "'Bricolage Grotesque', sans-serif", body: "'Bricolage Grotesque', sans-serif", size: 'clamp(48px, 6.6vw, 104px)', caso: 'lowercase', peso: 600 },
  },
  {
    id: 'flor-de-barrio',
    ejemplo: true, // inventado: muestra la etiqueta "Ejemplo" en el vivero y en todos sus productos
    sigla: 'FB',
    nombre: 'Flor de Barrio',
    zona: 'caba',
    barrio: 'Villa Crespo',
    direccion: 'Padilla 830, Villa Crespo',
    coords: [-34.5975, -58.438], // aproximadas, para ordenar por cercanía
    anios: 6,
    whatsapp: DEMO_WHATSAPP,
    cover: 'fittonia',
    inicial: 'F',
    corto: 'Vivero de barrio con precios de barrio. Suculentas, cactus y macetas de cemento hechas por ellos.',
    descripcion: 'Nació en plena pandemia en el garage de una casa de Villa Crespo y nunca se fue de ahí. Tomás y Cande hacen las macetas de cemento en el fondo y arman combos de suculentas para regalar. Reparten en bici por la zona.',
    horario: 'Lun a sáb 10 a 20',
    especialidad: 'Suculentas, cactus y macetas',
    entrega: 'Bici-envío en Villa Crespo',
    marca: { bg: '#F8F1E7', ink: '#151515', accent: '#D5343A', on: '#FFF3EA', tint: '#6DB38E', display: "'Londrina Solid', sans-serif", body: "'Young Serif', Georgia, serif", size: 'clamp(56px, 8vw, 128px)', caso: 'uppercase', peso: 400 },
  },
];

// destacado: true → sube al principio en el orden "Destacados" (lo elige Plantín, nunca por precio)
// mayorista: { min, precio } → precio por unidad llevando `min` unidades o más (pedidos para revender, eventos, paisajismo)
// servicio: true → no se compra con el carrito: precio null ("a consultar") y botón para consultar por WhatsApp. alcance: dónde lo hacen.
// luz: 'Sol directo' | 'Luz indirecta' | 'Media sombra' | 'Sombra'
const PLANTAS = [
  // ---------- Interior ----------
  { id: 'monstera-deliciosa', nombre: 'Monstera Deliciosa', cat: 'interior', vivero: 'las-canitas', img: 'monstera', precio: 24500, destacado: true,
    latin: 'Monstera deliciosa', stock: 6, tamanos: [{ n: 'Chica', tam: 'Maceta N°12 · 35-40 cm', precio: 14900 }, { n: 'Mediana', tam: 'Maceta N°18 · 60-70 cm', precio: 24500 }, { n: 'Grande', tam: 'Maceta N°24 · 100-120 cm', precio: 42000 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°18 · 60-70 cm', luz: 'Luz indirecta', riego: 'Cada 7 a 10 días', dificultad: 'Fácil',
    desc: 'La planta de las hojas agujereadas. Crece rápido con buena luz y agradece un tutor para trepar. Ideal para un rincón luminoso del living.' },
  { id: 'ficus-lyrata', nombre: 'Ficus Lyrata', cat: 'interior', vivero: 'las-canitas', img: 'ficus-lyrata', precio: 38000,
    latin: 'Ficus lyrata', stock: 3, fotos: ['ficus-lyrata', 'ficus-rama'], tamanos: [{ n: 'Chica', tam: 'Maceta N°14 · 50-60 cm', precio: 19900 }, { n: 'Mediana', tam: 'Maceta N°22 · 90-110 cm', precio: 38000 }, { n: 'Grande', tam: 'Maceta N°30 · 150-170 cm', precio: 69000 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°22 · 90-110 cm', luz: 'Luz indirecta', riego: 'Cuando la tierra está seca arriba', dificultad: 'Media',
    desc: 'Hojas grandes en forma de violín. Es un poco caprichosa con los cambios de lugar: elegile un sitio con buena luz y dejala ahí.' },
  { id: 'sansevieria', nombre: 'Sansevieria', cat: 'interior', vivero: 'flor-de-barrio', img: 'sansevieria', precio: 12800, mayorista: { min: 10, precio: 10200 },
    latin: 'Sansevieria trifasciata', stock: 12, tamanos: [{ n: 'Chica', tam: 'Maceta N°10 · 25-30 cm', precio: 7900 }, { n: 'Mediana', tam: 'Maceta N°14 · 50-60 cm', precio: 12800 }, { n: 'Grande', tam: 'Maceta N°18 · 70-80 cm', precio: 19500 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°14 · 50-60 cm', luz: 'Media sombra', riego: 'Cada 15 a 20 días', dificultad: 'Muy fácil',
    desc: 'La lengua de suegra. Aguanta olvidos, poca luz y aire acondicionado. Si es tu primera planta, empezá por acá.' },
  { id: 'zamioculca', nombre: 'Zamioculca', cat: 'interior', vivero: 'flor-de-barrio', img: 'zamioculca', precio: 16500, mayorista: { min: 10, precio: 13200 },
    latin: 'Zamioculcas zamiifolia', stock: 8, tamanos: [{ n: 'Chica', tam: 'Maceta N°12 · 30-35 cm', precio: 9900 }, { n: 'Mediana', tam: 'Maceta N°16 · 50-60 cm', precio: 16500 }, { n: 'Grande', tam: 'Maceta N°20 · 70-80 cm', precio: 26000 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°16 · 50-60 cm', luz: 'Media sombra', riego: 'Cada 15 días', dificultad: 'Muy fácil',
    desc: 'Hojas brillantes, casi de plástico. Guarda agua en la raíz, así que el enemigo es regarla de más. Perfecta para oficinas.' },
  { id: 'gomero', nombre: 'Gomero', cat: 'interior', vivero: 'el-ombu', img: 'gomero', precio: 29000, destacado: true, mayorista: { min: 6, precio: 23500 },
    latin: 'Ficus elastica', stock: 4, tamanos: [{ n: 'Chica', tam: 'Maceta N°14 · 40-50 cm', precio: 15500 }, { n: 'Mediana', tam: 'Maceta N°20 · 80-100 cm', precio: 29000 }, { n: 'Grande', tam: 'Maceta N°26 · 130-150 cm', precio: 49000 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°20 · 80-100 cm', luz: 'Luz indirecta', riego: 'Cada 7 a 10 días', dificultad: 'Fácil',
    desc: 'Ficus elástica, el clásico de las casas de las abuelas. Hojas grandes, oscuras y brillantes. Crece de a poco pero llega alto.' },
  { id: 'calathea-orbifolia', nombre: 'Calathea Orbifolia', cat: 'interior', vivero: 'las-canitas', img: 'calathea', precio: 21000, destacado: true,
    latin: 'Goeppertia orbifolia', stock: 5, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°16 · 40-50 cm', luz: 'Media sombra', riego: 'Cada 5 a 7 días, tierra siempre húmeda', dificultad: 'Media',
    desc: 'Hojas redondas rayadas en dos verdes. Le gusta la humedad: lejos del aire acondicionado y con un pulverizador cerca.' },
  { id: 'anthurium-clarinervium', nombre: 'Anthurium Clarinervium', cat: 'interior', vivero: 'las-canitas', img: 'anthurium', precio: 34000,
    latin: 'Anthurium clarinervium', stock: 2, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°14 · 35-45 cm', luz: 'Luz indirecta', riego: 'Cada 7 días', dificultad: 'Media',
    desc: 'Hojas aterciopeladas con nervaduras blancas. Una planta de colección que igual se porta bien en un departamento.' },
  { id: 'helecho-nido', nombre: 'Helecho Nido de Ave', cat: 'interior', vivero: 'el-ombu', img: 'helecho-nido', precio: 14200,
    latin: 'Asplenium nidus', stock: 7, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°14 · 40 cm', luz: 'Media sombra', riego: 'Cada 5 días', dificultad: 'Fácil',
    desc: 'Hojas onduladas que salen del centro como un nido. Va bárbaro en baños con ventana, donde hay humedad.' },
  { id: 'fittonia', nombre: 'Fittonia Roja', cat: 'interior', vivero: 'flor-de-barrio', img: 'fittonia', precio: 6900,
    latin: 'Fittonia albivenis', stock: 15, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°10 · 15 cm', luz: 'Media sombra', riego: 'Cada 3 a 4 días', dificultad: 'Media',
    desc: 'Hojas chiquitas con venas fucsia. Avisa cuando tiene sed: se desmaya entera y revive a los minutos de regarla.' },
  { id: 'filodendro', nombre: 'Filodendro Cordatum', cat: 'interior', vivero: 'el-ombu', img: 'filodendro', precio: 11500, mayorista: { min: 10, precio: 9200 },
    latin: 'Philodendron hederaceum', stock: 9, maceta: 'Colgante de plástico con gancho',
    tam: 'Colgante N°16 · guías de 60 cm', luz: 'Luz indirecta', riego: 'Cada 7 días', dificultad: 'Muy fácil',
    desc: 'Hojas en forma de corazón y guías que caen. Colgado de una ventana se va poniendo cada vez más frondoso.' },

  // ---------- Exterior ----------
  { id: 'ave-del-paraiso', nombre: 'Ave del Paraíso', cat: 'exterior', vivero: 'el-ombu', img: 'ave-del-paraiso', precio: 27500, destacado: true, mayorista: { min: 5, precio: 22000 },
    latin: 'Strelitzia nicolai', stock: 4, tamanos: [{ n: 'Chica', tam: 'Maceta N°14 · 50-60 cm', precio: 14900 }, { n: 'Mediana', tam: 'Maceta N°22 · 90-120 cm', precio: 27500 }, { n: 'Grande', tam: 'Maceta N°30 · 150-180 cm', precio: 48000 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°22 · 90-120 cm', luz: 'Sol directo', riego: 'Cada 5 a 7 días en verano', dificultad: 'Fácil',
    desc: 'Strelitzia, hojas grandes tipo banano. Aguanta el sol del balcón y el frío porteño sin problema. Con los años florece.' },
  { id: 'ficus-ginseng', nombre: 'Ficus Ginseng', cat: 'exterior', vivero: 'don-aurelio', img: 'ficus-ginseng', precio: 19800,
    latin: 'Ficus microcarpa', stock: 6, maceta: 'Cerámica esmaltada con plato',
    tam: 'Bonsái · 25-30 cm', luz: 'Luz indirecta', riego: 'Cada 4 a 5 días', dificultad: 'Media',
    desc: 'Bonsái con raíces gordas a la vista. Va bien en un balcón protegido o adentro cerca de una ventana. Un regalo que queda.' },
  { id: 'dichondra-exterior', nombre: 'Dichondra', cat: 'exterior', vivero: 'el-ombu', img: 'dichondra', precio: 4800, mayorista: { min: 10, precio: 3800 },
    latin: 'Dichondra repens', stock: 20, fotos: ['dichondra'], maceta: 'Bandeja de 15 plantines',
    tam: 'Bandeja de 15 plantines', luz: 'Media sombra', riego: 'Cada 3 días hasta que agarre', dificultad: 'Fácil',
    desc: 'Cubresuelos para reemplazar el césped en lugares con sombra. Hojas redondas, alfombra verde, cero cortadora.' },

  // ---------- Suculentas ----------
  { id: 'echeveria-mix', nombre: 'Echeverias Variadas', cat: 'suculentas', vivero: 'flor-de-barrio', img: 'echeveria-mix', precio: 9500, destacado: true, mayorista: { min: 10, precio: 7600 },
    latin: 'Echeveria spp.', stock: 10, maceta: 'Bandeja de plástico, 6 macetas N°8',
    tam: 'Bandeja de 6 · maceta N°8', luz: 'Sol directo', riego: 'Cada 15 a 20 días', dificultad: 'Muy fácil',
    desc: 'Seis echeverias distintas, rosetas verdes, grises y azuladas. Mucha luz, poca agua y se van multiplicando solas.' },
  { id: 'cactus-crestado', nombre: 'Cactus Crestado', cat: 'cactus', vivero: 'flor-de-barrio', img: 'cactus-crestado', precio: 8200, destacado: true, mayorista: { min: 12, precio: 6500 },
    latin: 'Cereus forbesii monstrosa', stock: 3, fotos: ['cactus-crestado', 'macetas-duo'], maceta: 'Cemento hecho en el vivero, con drenaje',
    tam: 'Maceta de cemento N°12', luz: 'Sol directo', riego: 'Cada 20 días', dificultad: 'Muy fácil',
    desc: 'Cactus con forma de cerebro, cada ejemplar es distinto. Viene en maceta de cemento hecha en el vivero.' },
  { id: 'senecio-maceta', nombre: 'Senecio en Cemento', cat: 'suculentas', vivero: 'flor-de-barrio', img: 'maceta-blanca', precio: 6400, mayorista: { min: 12, precio: 5100 },
    latin: 'Senecio talinoides', stock: 8, fotos: ['maceta-blanca', 'macetas-duo'], maceta: 'Cemento hecho en el vivero, con drenaje',
    tam: 'Maceta de cemento N°10', luz: 'Sol directo', riego: 'Cada 15 días', dificultad: 'Muy fácil',
    desc: 'Suculenta de hojas finitas tipo dedos, en maceta blanca de cemento. Para el escritorio o la mesa de la cocina.' },

  // ---------- Cactus ----------
  { id: 'cereus', nombre: 'Cereus Peruano', cat: 'cactus', vivero: 'flor-de-barrio', img: 'cereus', precio: 14500,
    latin: 'Cereus forbesii', stock: 5, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°14 · 40-50 cm', luz: 'Sol directo', riego: 'Cada 20 a 30 días', dificultad: 'Muy fácil',
    desc: 'Cactus columnar de crecimiento rápido. Pleno sol, casi nada de agua en invierno y con los años florece de noche.' },

  // ---------- Orquídeas ----------
  { id: 'phalaenopsis-blanca', nombre: 'Phalaenopsis Blanca', cat: 'orquideas', vivero: 'don-aurelio', img: 'phalaenopsis-blanca', precio: 18900, destacado: true, mayorista: { min: 10, precio: 15500 },
    latin: 'Phalaenopsis hybrida', stock: 9, fotos: ['phalaenopsis-blanca', 'orquidea-closeup'], tamanos: [{ n: '1 vara', tam: 'Maceta N°12 · 1 vara', precio: 12900 }, { n: '2 varas', tam: 'Maceta N°12 · 2 varas', precio: 18900 }, { n: '3 varas', tam: 'Maceta N°14 · 3 varas', precio: 26500 }], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°12 · 2 varas', luz: 'Luz indirecta', riego: 'Cada 7 a 10 días por inmersión', dificultad: 'Fácil',
    desc: 'La orquídea más agradecida para empezar. Flor blanca con centro rosado, dura hasta dos meses. Vara y tutor incluidos.' },
  { id: 'phalaenopsis-rosa', nombre: 'Phalaenopsis Rosa', cat: 'orquideas', vivero: 'don-aurelio', img: 'phalaenopsis-rosa', precio: 18900, mayorista: { min: 10, precio: 15500 },
    latin: 'Phalaenopsis hybrida', stock: 7, fotos: ['phalaenopsis-rosa', 'orquidea-closeup'], maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°12 · 2 varas', luz: 'Luz indirecta', riego: 'Cada 7 a 10 días por inmersión', dificultad: 'Fácil',
    desc: 'Rosa suave, dos varas florecidas. Lejos del sol directo y con el sustrato apenas húmedo, vuelve a florecer todos los años.' },
  { id: 'phalaenopsis-rayada', nombre: 'Phalaenopsis Rayada', cat: 'orquideas', vivero: 'don-aurelio', img: 'phalaenopsis-rayada', precio: 21500,
    latin: 'Phalaenopsis hybrida', stock: 4, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°12 · 1 vara', luz: 'Luz indirecta', riego: 'Cada 7 a 10 días por inmersión', dificultad: 'Fácil',
    desc: 'Pétalos fucsia con rayas más oscuras. De las que llaman la atención en la mesa. Criada en Tigre.' },
  { id: 'paphiopedilum', nombre: 'Orquídea Zapatito', cat: 'orquideas', vivero: 'don-aurelio', img: 'paphiopedilum', precio: 26000,
    latin: 'Paphiopedilum insigne', stock: 2, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°10 · 1 vara', luz: 'Media sombra', riego: 'Cada 5 a 7 días', dificultad: 'Media',
    desc: 'Paphiopedilum, la de la flor con forma de zapato. Rara de ver en viveros comunes. Le gusta la sombra y la humedad.' },
  { id: 'dendrobium-azul', nombre: 'Dendrobium Azul', cat: 'orquideas', vivero: 'don-aurelio', img: 'dendrobium-azul', precio: 23000,
    latin: 'Dendrobium phalaenopsis', stock: 3, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°12 · 1 vara', luz: 'Luz indirecta', riego: 'Cada 7 días', dificultad: 'Media',
    desc: 'Racimo de flores azul violeta. Florece dos veces al año si pasa el invierno fresco y seco.' },
  { id: 'cymbidium', nombre: 'Cymbidium Bordó', cat: 'orquideas', vivero: 'don-aurelio', img: 'cymbidium', precio: 31000, destacado: true, mayorista: { min: 6, precio: 26000 },
    latin: 'Cymbidium hybridum', stock: 5, maceta: 'Plástico de cultivo (cachepot aparte)',
    tam: 'Maceta N°16 · 2 varas', luz: 'Luz indirecta', riego: 'Cada 5 a 7 días', dificultad: 'Media',
    desc: 'Orquídea de balcón: aguanta el frío y de hecho lo necesita para florecer. Flores bordó grandes que duran más de un mes.' },

  // ---------- Macetas ----------
  { id: 'macetas-duo', nombre: 'Dúo de Macetas de Cemento', cat: 'macetas', vivero: 'flor-de-barrio', img: 'macetas-duo', precio: 11000, mayorista: { min: 10, precio: 8800 },
    latin: 'Cemento hecho a mano', stock: 12, fotos: ['macetas-duo', 'maceta-blanca', 'cactus-crestado'],
    tam: 'N°10 y N°14 · con drenaje', luz: '', riego: '', dificultad: '',
    desc: 'Dos macetas de cemento hechas a mano en el vivero, una blanca y una gris moteada. Con agujero de drenaje y plato.' },
  { id: 'maceta-blanca', nombre: 'Maceta de Cemento Blanca', cat: 'macetas', vivero: 'flor-de-barrio', img: 'maceta-blanca', precio: 5200, mayorista: { min: 20, precio: 3900 },
    latin: 'Cemento hecho a mano', stock: 18,
    tam: 'N°10 · con drenaje', luz: '', riego: '', dificultad: '',
    desc: 'Cilíndrica, terminación lisa, pintada a mano. Entra una suculenta o un cactus chico. Plato incluido.' },
  // ---------- Semillas ----------
  { id: 'semillas-albahaca', nombre: 'Semillas de Albahaca', cat: 'semillas', vivero: 'el-ombu', img: 'ilus-semillas-albahaca', precio: 1800,
    latin: 'Ocimum basilicum', stock: 30, maceta: 'Sobre de papel',
    tam: 'Sobre de 1 g · aprox. 600 semillas', luz: 'Sol directo', riego: 'Sustrato húmedo hasta que germine', dificultad: 'Muy fácil',
    desc: 'La aromática más agradecida para empezar. Se siembra en primavera y verano, en maceta o en la huerta. Germina en una semana.' },
  { id: 'semillas-tomate', nombre: 'Semillas de Tomate Cherry', cat: 'semillas', vivero: 'el-ombu', img: 'ilus-semillas-tomate', precio: 2100,
    latin: 'Solanum lycopersicum', stock: 25, maceta: 'Sobre de papel',
    tam: 'Sobre de 0,5 g · aprox. 150 semillas', luz: 'Sol directo', riego: 'Regular, sin encharcar', dificultad: 'Fácil',
    desc: 'Tomatitos para el balcón. Se siembran a fines de invierno en almácigo y se pasan a maceta grande con tutor.' },
  { id: 'semillas-girasol', nombre: 'Semillas de Girasol', cat: 'semillas', vivero: 'flor-de-barrio', img: 'ilus-semillas-girasol', precio: 1900,
    latin: 'Helianthus annuus', stock: 20, maceta: 'Sobre de papel',
    tam: 'Sobre de 20 semillas', luz: 'Sol directo', riego: 'Cada 2 a 3 días', dificultad: 'Muy fácil',
    desc: 'Para sembrar con chicos: crecen rápido y se ve todo el proceso. Primavera, a pleno sol y en maceta honda.' },
  { id: 'semillas-lavanda', nombre: 'Semillas de Lavanda', cat: 'semillas', vivero: 'el-ombu', img: 'ilus-semillas-lavanda', precio: 2300,
    latin: 'Lavandula angustifolia', stock: 15, maceta: 'Sobre de papel',
    tam: 'Sobre de 0,3 g · aprox. 250 semillas', luz: 'Sol directo', riego: 'Poco, cuando la tierra está seca', dificultad: 'Media',
    desc: 'Tarda en germinar y pide paciencia, pero después aguanta sol y sequía. Perfuma el balcón y atrae abejas.' },

  // ---------- Jardinería ----------
  { id: 'sustrato-universal', nombre: 'Sustrato Universal 10 L', cat: 'jardineria', vivero: 'flor-de-barrio', img: 'ilus-sustrato', precio: 6500, mayorista: { min: 10, precio: 5200 },
    latin: 'Turba, compost y perlita', stock: 40,
    tam: 'Bolsa de 10 litros', luz: '', riego: '', dificultad: '',
    desc: 'Mezcla liviana para trasplantar casi cualquier planta de interior o balcón. Drena bien y retiene la humedad justa.' },
  { id: 'corteza-pino', nombre: 'Corteza de Pino para Orquídeas', cat: 'jardineria', vivero: 'don-aurelio', img: 'ilus-corteza', precio: 4200,
    latin: 'Corteza de pino compostada', stock: 20,
    tam: 'Bolsa de 5 litros', luz: '', riego: '', dificultad: '',
    desc: 'El sustrato que usan en el vivero para las phalaenopsis: aireado, para que las raíces respiren. Ideal para el trasplante.' },
  { id: 'fertilizante-orquideas', nombre: 'Fertilizante para Orquídeas', cat: 'jardineria', vivero: 'don-aurelio', img: 'ilus-fertilizante', precio: 5800,
    latin: 'Fertilizante líquido', stock: 18,
    tam: 'Frasco de 250 ml', luz: '', riego: '', dificultad: '',
    desc: 'Unas gotas en el agua de riego, cada dos semanas en primavera y verano. Ayuda a que vuelvan a florecer.' },
  { id: 'tijera-podar', nombre: 'Tijera de Podar', cat: 'jardineria', vivero: 'el-ombu', img: 'ilus-tijera', precio: 14500,
    latin: 'Acero con mango de goma', stock: 10,
    tam: '20 cm · corte hasta 2 cm', luz: '', riego: '', dificultad: '',
    desc: 'Para podar arbustos, cortar esquejes y sacar hojas secas. Con traba de seguridad.' },
  { id: 'regadera', nombre: 'Regadera de Metal', cat: 'jardineria', vivero: 'las-canitas', img: 'ilus-regadera', precio: 12900,
    latin: 'Chapa galvanizada pintada', stock: 8,
    tam: '1,5 litros · pico largo', luz: '', riego: '', dificultad: '',
    desc: 'Pico largo y fino para regar macetas de interior sin mojar las hojas ni desbordar el plato.' },
  // ---------- Servicios (se consultan por WhatsApp, no van al carrito) ----------
  { id: 'serv-paisajismo-ombu', nombre: 'Diseño de Jardines y Paisajismo', cat: 'servicios', vivero: 'el-ombu', img: 'ilus-serv-paisajismo', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'San Isidro, Vicente López y Tigre', tam: 'Presupuesto según el espacio',
    desc: 'Te visitan, miden el espacio y te proponen un diseño con plantas que se adaptan a tu jardín, con foco en nativas. Incluye la plantación.' },
  { id: 'serv-riego-ombu', nombre: 'Instalación de Riego', cat: 'servicios', vivero: 'el-ombu', img: 'ilus-serv-riego', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'Zona Norte', tam: 'Presupuesto según el espacio',
    desc: 'Riego por goteo para canteros y macetas, o por aspersión para jardines. Con programador para que se riegue solo.' },
  { id: 'serv-mantenimiento-ombu', nombre: 'Mantenimiento de Jardines', cat: 'servicios', vivero: 'el-ombu', img: 'ilus-serv-mantenimiento', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'San Isidro y alrededores', tam: 'Visitas quincenales o mensuales',
    desc: 'Poda, limpieza de canteros, fertilización y control de plagas. Se coordina una frecuencia fija o visitas sueltas.' },
  { id: 'serv-trasplante-canitas', nombre: 'Trasplante a Domicilio', cat: 'servicios', vivero: 'las-canitas', img: 'ilus-serv-trasplante', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'Palermo, Belgrano y Colegiales', tam: 'Por planta o por visita',
    desc: 'Van a tu casa con sustrato y macetas, trasplantan tus plantas de interior y te dejan anotado cómo cuidarlas.' },
  { id: 'serv-orquideas-aurelio', nombre: 'Cuidado de Orquídeas', cat: 'servicios', vivero: 'don-aurelio', img: 'ilus-serv-orquideas', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'En el vivero, en Tigre', tam: 'Por planta, por temporada',
    desc: 'Si tu orquídea no vuelve a florecer, la dejás en el invernadero: la cuidan, la trasplantan si hace falta y te avisan cuando está lista.' },
  { id: 'serv-regalos-flor', nombre: 'Combos para Regalar', cat: 'servicios', vivero: 'flor-de-barrio', img: 'ilus-serv-regalos', precio: null, servicio: true,
    latin: 'Servicio', alcance: 'Villa Crespo (entrega en bici)', tam: 'Armado a pedido',
    desc: 'Arman un combo de suculentas en maceta de cemento, con tarjeta y envoltorio, y lo llevan en bici por el barrio.' },
];
