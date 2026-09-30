// ---------------------------------------------------------------
// Plantín — el árbol genealógico de las plantas del catálogo.
// Ramas: grandes grupos → familias botánicas → especies (hojas).
// Cada hoja puede apuntar a un producto (planta: id de PLANTAS).
// Datos botánicos resumidos para que se entiendan; fuente general: APG IV.
// ---------------------------------------------------------------

const ARBOL = {
  nombre: 'Plantas',
  nota: 'Todas vienen de un ancestro común que salió del agua hace unos 470 millones de años.',
  ramas: [
    {
      nombre: 'Helechos',
      nota: 'Más antiguos que las flores: no dan flores ni semillas y se reproducen por esporas.',
      forma: 'spiky', color: '#76866A',
      familias: [
        { familia: 'Aspleniaceae', apodo: 'Los helechos de hoja entera', hojas: [
          { id: 'asplenium', nombre: 'Helecho Nido de Ave', latin: 'Asplenium nidus', planta: 'helecho-nido', origen: 'Trópicos de Asia, Oceanía y África oriental',
            dato: 'No tiene flores ni semillas: se reproduce por esporas, que se forman en líneas marrones debajo de las hojas.' },
        ] },
      ],
    },
    {
      nombre: 'Monocotiledóneas',
      nota: 'Plantas con flor que nacen con una sola hojita (cotiledón). Sus hojas tienen nervaduras paralelas.',
      forma: 'wavy', color: '#2E6B3E',
      familias: [
        { familia: 'Araceae', apodo: 'La familia de la monstera', hojas: [
          { id: 'monstera', nombre: 'Monstera', latin: 'Monstera deliciosa', planta: 'monstera-deliciosa', origen: 'Selvas de México y Centroamérica',
            dato: 'Los agujeros de las hojas aparecen recién cuando la planta madura. Su fruto maduro es comestible.' },
          { id: 'filodendro', nombre: 'Filodendro', latin: 'Philodendron hederaceum', planta: 'filodendro', origen: 'América tropical',
            dato: 'Philodendron quiere decir "que ama los árboles": en la selva trepa por los troncos.' },
          { id: 'anthurium', nombre: 'Anthurium', latin: 'Anthurium clarinervium', planta: 'anthurium-clarinervium', origen: 'Chiapas, México',
            dato: 'En la naturaleza crece sobre rocas calizas, casi sin tierra.' },
          { id: 'zamioculca', nombre: 'Zamioculca', latin: 'Zamioculcas zamiifolia', planta: 'zamioculca', origen: 'África oriental',
            dato: 'Guarda agua en unos tallos subterráneos gruesos: por eso aguanta semanas sin riego.' },
        ] },
        { familia: 'Orchidaceae', apodo: 'Las orquídeas, una de las familias más grandes', hojas: [
          { id: 'phalaenopsis', nombre: 'Phalaenopsis', latin: 'Phalaenopsis', planta: 'phalaenopsis-blanca', origen: 'Sudeste asiático',
            dato: 'Su nombre significa "parecida a una polilla". En la naturaleza vive agarrada a los árboles, no en la tierra.' },
          { id: 'cymbidium', nombre: 'Cymbidium', latin: 'Cymbidium', planta: 'cymbidium', origen: 'Asia y Australia',
            dato: 'Para florecer necesita noches frescas: la diferencia de temperatura entre el día y la noche le avisa que es época.' },
          { id: 'dendrobium', nombre: 'Dendrobium', latin: 'Dendrobium', planta: 'dendrobium-azul', origen: 'Asia y Oceanía',
            dato: 'Es uno de los géneros de orquídeas más grandes: tiene más de mil especies.' },
          { id: 'paphiopedilum', nombre: 'Orquídea Zapatito', latin: 'Paphiopedilum', planta: 'paphiopedilum', origen: 'Asia',
            dato: 'El zapatito es una trampa: el insecto cae adentro y, para salir, tiene que pasar por el polen.' },
        ] },
        { familia: 'Asparagaceae', apodo: 'La familia del espárrago', hojas: [
          { id: 'sansevieria', nombre: 'Sansevieria', latin: 'Dracaena trifasciata', planta: 'sansevieria', origen: 'África occidental',
            dato: 'Hoy los botánicos la llaman Dracaena trifasciata. Abre sus poros de noche para perder menos agua.' },
        ] },
        { familia: 'Marantaceae', apodo: 'Las plantas que rezan', hojas: [
          { id: 'calathea', nombre: 'Calathea', latin: 'Goeppertia orbifolia', planta: 'calathea-orbifolia', origen: 'Bolivia',
            dato: 'Levanta las hojas a la noche y las baja de día: por eso a su familia le dicen "plantas que rezan".' },
        ] },
        { familia: 'Strelitziaceae', apodo: 'Parientes lejanas de la banana', hojas: [
          { id: 'strelitzia', nombre: 'Ave del Paraíso', latin: 'Strelitzia nicolai', planta: 'ave-del-paraiso', origen: 'Sudáfrica',
            dato: 'Está en el mismo orden botánico que la banana y el jengibre: por eso sus hojas se parecen a las del bananero.' },
        ] },
      ],
    },
    {
      nombre: 'Eudicotiledóneas',
      nota: 'Plantas con flor que nacen con dos hojitas. Sus hojas tienen nervaduras en forma de red.',
      forma: 'scallop', color: '#A9552F',
      familias: [
        { familia: 'Moraceae', apodo: 'La familia de la higuera', hojas: [
          { id: 'ficus-lyrata', nombre: 'Ficus Lyrata', latin: 'Ficus lyrata', planta: 'ficus-lyrata', origen: 'África occidental',
            dato: 'Lyrata viene de "lira": la hoja tiene forma de lira o de violín.' },
          { id: 'gomero', nombre: 'Gomero', latin: 'Ficus elastica', planta: 'gomero', origen: 'Sur y sudeste de Asia',
            dato: 'Si se corta, larga una savia blanca (látex) que antes se usaba para hacer caucho. De ahí "elastica".' },
          { id: 'ficus-ginseng', nombre: 'Ficus Ginseng', latin: 'Ficus microcarpa', planta: 'ficus-ginseng', origen: 'Asia y Oceanía',
            dato: 'La base gorda no es la raíz de un árbol viejo: se forma en cultivo para que parezca un bonsái.' },
        ] },
        { familia: 'Cactaceae', apodo: 'Los cactus, casi todos americanos', hojas: [
          { id: 'cereus', nombre: 'Cereus', latin: 'Cereus forbesii', planta: 'cereus', origen: 'Sudamérica',
            dato: 'Florece de noche: la flor se abre al atardecer y se cierra a la mañana. El cactus crestado es una forma rara de crecer de la misma planta.' },
        ] },
        { familia: 'Crassulaceae', apodo: 'Las suculentas de roseta', hojas: [
          { id: 'echeveria', nombre: 'Echeveria', latin: 'Echeveria', planta: 'echeveria-mix', origen: 'México y Centroamérica',
            dato: 'De una sola hoja que se cae puede nacer una planta nueva.' },
        ] },
        { familia: 'Asteraceae', apodo: 'La familia del girasol y la margarita', hojas: [
          { id: 'senecio', nombre: 'Senecio', latin: 'Curio talinoides', planta: 'senecio-maceta', origen: 'Sudáfrica',
            dato: 'Parece un cactus, pero es pariente de la margarita y del girasol.' },
          { id: 'girasol', nombre: 'Girasol', latin: 'Helianthus annuus', planta: 'semillas-girasol', origen: 'América del Norte',
            dato: 'Lo que parece una sola flor son cientos de florcitas juntas: cada una da una semilla.' },
        ] },
        { familia: 'Lamiaceae', apodo: 'La familia de la menta', hojas: [
          { id: 'albahaca', nombre: 'Albahaca', latin: 'Ocimum basilicum', planta: 'semillas-albahaca', origen: 'Asia tropical',
            dato: 'Es de la misma familia que la menta, el romero y el orégano. Sus tallos son cuadrados.' },
          { id: 'lavanda', nombre: 'Lavanda', latin: 'Lavandula angustifolia', planta: 'semillas-lavanda', origen: 'Mediterráneo',
            dato: 'Su perfume está en unas glándulas diminutas de las flores y las hojas. Atrae abejas.' },
        ] },
        { familia: 'Acanthaceae', apodo: 'Parientes tropicales de la menta', hojas: [
          { id: 'fittonia', nombre: 'Fittonia', latin: 'Fittonia albivenis', planta: 'fittonia', origen: 'Selvas de Sudamérica',
            dato: 'Cuando le falta agua se desmaya entera, y se recupera a los minutos de regarla.' },
        ] },
        { familia: 'Solanaceae', apodo: 'La familia de la papa', hojas: [
          { id: 'tomate', nombre: 'Tomate', latin: 'Solanum lycopersicum', planta: 'semillas-tomate', origen: 'Los Andes',
            dato: 'Es pariente de la papa, el ají y la berenjena. Viene de los Andes, como la papa.' },
        ] },
        { familia: 'Convolvulaceae', apodo: 'La familia de la batata', hojas: [
          { id: 'dichondra', nombre: 'Dichondra', latin: 'Dichondra repens', planta: 'dichondra-exterior', origen: 'Australia y Nueva Zelanda',
            dato: 'Es de la misma familia que la batata y la campanilla, aunque crece al ras como un césped.' },
        ] },
      ],
    },
  ],
};

// Todas las hojas en una lista plana, con su rama y familia.
const HOJAS = ARBOL.ramas.flatMap(r => r.familias.flatMap(f => f.hojas.map(h => ({ ...h, rama: r, familia: f }))));

// Lo que cada persona fue aprendiendo (queda en su navegador).
const MiArbol = {
  KEY: 'plantin_arbol',
  leer() { try { return new Set(JSON.parse(localStorage.getItem(this.KEY) || '[]')); } catch { return new Set(); } },
  guardar(set) { try { localStorage.setItem(this.KEY, JSON.stringify([...set])); } catch {} },
  aprender(id) { const s = this.leer(); s.add(id); this.guardar(s); return s; },
  reiniciar() { this.guardar(new Set()); },
};
