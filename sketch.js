// ========================================================
// UCA UNITE - APP P5.JS (ADAPTABLE A CUALQUIER PANTALLA)
// ========================================================

const C_PURPLE = '#7936F5';
const C_PURPLE_DARK = '#6424DB';
const C_PURPLE_LIGHT = '#B994FA';
const C_PURPLE_SOFT = '#DCD0F9';
const C_LIME = '#D2F836';
const C_MINT = '#B7FAAB';
const C_ORANGE = '#F47A4C';
const C_ORANGE_LIGHT = '#F8A482';
const C_YELLOW_BTN = '#E3DF76';
const C_BG = '#EFEFEF';
const C_TEXT = '#1E1E1E';
const REQUIRED_PASSWORD = 'UCAUNITE';

const BASE_W = 375;
const BASE_H = 812;

// ========================================================
// CONFIGURACIÓN DE IMÁGENES (Pon aquí tus archivos o URLs)
// ========================================================
const IMAGE_FILES = {
  // Pantalla de bienvenida y pantalla de carga 
  welcome_bg: 'FONDO.png',
  splash_bg: 'FONDO.png',

  // Imágenes del logo según color 
  logo_lime: 'LIMA.png',
  logo_purple: 'MORADO.png',

    // Ícono de FUTBOL
  icon_futbol_default: 'FUTBOL LOGO.png',

  // Ícono de BÁSKET
    icon_basquet_default: 'BASKET LOGO.png',

  // Ícono de VOLEY
  icon_voleibol_purple: 'VOLEY LOGO.png',

  // Ícono de TEATRO
  icon_cultura_default: 'TEATRO LOGO.png',

  // Íconos del LIBRO 
  icon_libro_default: 'LIBRO LOGO.png',

  // Resto de imágenes de la app
  banner_home: 'HOME.png',
  avatar_claire: 'Lyra pf.png',
  foto_60_uca: 'DDMF_3.png',
  imagen_60_uca: 'UCA 60.png',
  team_voleibol_1: 'EDF_2.jpg',
  team_voleibol_2: 'EDF_1.png',
  team_voleibol_3: 'EDF_3.jpg',
  team_voleibol_4: 'ED_5.png',
  team_voleibol_5: 'EDF_3.jpg',
  cast_teatro_capa_1: 'DDMF_1.png',
  cast_musica_guitarra: 'DDMF_3.png',
  cast_teatro_escena: 'DDMF_4.png',
  cast_musica_bateria: 'DDMF_5.png',
  cast_banda_ensayo: 'ECF_2.jpg',
  cast_teatro_monje: 'ECF_3.jpg',
  cast_teatro_capa_2: 'ECF_4.jpg'
};

// Mapeo de color -> clave en IMAGE_FILES
const LOGO_COLOR_MAP = {
  '#D2F836': 'logo_lime',
  '#7936F5': 'logo_purple',
  '#6424DB': 'logo_purple'
};

// Mapeo de variantes por color para cada ícono
const ICON_COLOR_MAPS = {
  futbol: {
    '#1E1E1E': 'icon_futbol_dark',
    '#7936F5': 'icon_futbol_purple',
    '#6424DB': 'icon_futbol_purple',
    '#D2F836': 'icon_futbol_lime',
    default: 'icon_futbol_default'
  },
  basquet: {
    '#1E1E1E': 'icon_basquet_dark',
    '#7936F5': 'icon_basquet_purple',
    '#6424DB': 'icon_basquet_purple',
    '#D2F836': 'icon_basquet_lime',
    default: 'icon_basquet_default'
  },
  voleibol: {
    '#D2F836': 'icon_voleibol_lime',
    '#7936F5': 'icon_voleibol_purple',
    '#6424DB': 'icon_voleibol_purple',
    '#1E1E1E': 'icon_voleibol_dark',
    default: 'icon_voleibol_default'
  },
  cultura: {
    '#D2F836': 'icon_cultura_lime',
    '#7936F5': 'icon_cultura_purple',
    '#6424DB': 'icon_cultura_purple',
    '#1E1E1E': 'icon_cultura_dark',
    default: 'icon_cultura_default'
  },
  libro: {
    '#D2F836': 'icon_libro_lime',
    '#7936F5': 'icon_libro_purple',
    '#6424DB': 'icon_libro_purple',
    '#1E1E1E': 'icon_libro_dark',
    default: 'icon_libro_default'
  }
};

let imgs = {};
let loadingKeys = {};
let p5CanvasRef = null;

// Variables de adaptación a pantalla
let viewScale = 1;
let viewOffsetX = 0;
let viewOffsetY = 0;
let logicalMouseX = 0;
let logicalMouseY = 0;
let logicalPMouseX = 0;
let logicalPMouseY = 0;

// ========================================================
// ESTADO DE LA APLICACIÓN
// ========================================================
let currentScreen = 'welcome';
let previousScreen = 'welcome';
let culturaSubTitle = 'DANZA';
let userType = 'Estudiante';
let loggedInNombre = 'Lyra Maria Belen\nSamayoa Hernandez';
let loggedInCarnet = '00201625';
let splashTimer = 0;
let scrollY = 0;
let maxScroll = 0;

let hitboxes = [];
let currentScrollOffset = 0;

// Modal Reservas
let showReservaModal = false;
let switchAreaJuego = false;
let switchCancha = true;
let switchEnviar = false;
let horarioSeleccionado = '10:00 AM - 12:00 PM';

// Inputs HTML
let inpNombre, inpCarnet, inpCorreo, inpPass;
let inpResNombre, inpResCarnet, inpResCancha;
let inpPropTitulo, inpPropDesc, inpPropFecha, inpPropHora, inpPropOrg, inpPropFac;

// Marcadores en vivo
let scoreFutbolPumas = 1, scoreFutbolUCA = 3;
let scoreBasquetJaguar = 44, scoreBasquetBuhos = 64;
let scoreVoleiAguila = 2, scoreVoleiBuhos = 1;

// Datos Propuestas
let propuestasData = [
  {
    titulo: 'TORNEO\nNOCTURNO\nVOLEYBALL',
    desc: 'Partido nocturno en el polideportivo\nuniversitaro',
    autor: 'Por Juan M',
    hora: '6:00 PM • POLI',
    pct: '88%',
    votos: 34,
    votado: false,
    noti: false
  },
  {
    titulo: 'TORNEO ENTRE\nCARRERAS',
    desc: 'Partido de futbol entre carreras',
    autor: 'Por María H',
    hora: '10:00 AM • POLI',
    pct: '75%',
    votos: 68,
    votado: false,
    noti: false
  },
  {
    titulo: 'GRUPO DE DANZA\nKPOP',
    desc: 'Grupo de Danza K pop Aprendizaje de\ncoreografia y practicas de baile',
    autor: 'Por Nohe C',
    hora: '6:00 PM • ANEXO\nCCU',
    pct: '98%',
    votos: 112,
    votado: false,
    noti: false
  }
];

// Galería MEET THE TEAM
let teamGallery = [
  { col: 0, y: 270, h: 240, tag: 'Volleybol', imgKey: 'team_voleibol_1', liked: false },
  { col: 1, y: 270, h: 240, tag: 'Volleybol', imgKey: 'team_voleibol_2', liked: false },
  { col: 0, y: 525, h: 190, tag: 'Volleybol', imgKey: 'team_voleibol_3', liked: false },
  { col: 1, y: 525, h: 250, tag: 'Volleybol', imgKey: 'team_voleibol_4', liked: false },
  { col: 0, y: 730, h: 240, tag: 'Volleybol', imgKey: 'team_voleibol_5', liked: false }
];

// Galería MEET THE CAST
let castGallery = [
  { col: 0, y: 270, h: 250, tag: 'Teatro', imgKey: 'cast_teatro_capa_1', liked: false },
  { col: 1, y: 270, h: 250, tag: 'Musica', imgKey: 'cast_musica_guitarra', liked: false },
  { col: 0, y: 535, h: 200, tag: 'Teatro', imgKey: 'cast_teatro_escena', liked: false },
  { col: 1, y: 535, h: 260, tag: 'Musica', imgKey: 'cast_musica_bateria', liked: false },
  { col: 0, y: 750, h: 200, tag: 'Banda', imgKey: 'cast_banda_ensayo', liked: false },
  { col: 1, y: 810, h: 250, tag: 'Teatro', imgKey: 'cast_teatro_monje', liked: false },
  { col: 0, y: 965, h: 250, tag: 'Teatro', imgKey: 'cast_teatro_capa_2', liked: false }
];

// Estado Perfil y Crear Propuesta
let selectedDay = 'TUE';
let perfilTab = 'EVENTOS';
let userEventsCount = 14;
let userProposalsCount = 3;
let userClubsCount = 2;

let crearTab = 'DETALLES';
let selectedCategoria = 'DANZA';
let selectedEspacioIdx = 0;
let espaciosCampus = [
  { nombre: 'Salon multiusos', cap: 'Hasta 120' },
  { nombre: 'Anexo CCU', cap: 'Hasta 80' },
  { nombre: 'Salon multiusos', cap: 'Hasta 120' }
];
let escalaAforo = [
  { label: '15-40', desc: 'Pequeño (15 - 40 personas)', tarifa: 10 },
  { label: '41-120', desc: 'Mediano (41 - 120 personas)', tarifa: 15 },
  { label: '121- 300', desc: 'Grande (121 - 300 personas)', tarifa: 25 },
  { label: '301-600', desc: 'Masivo (301 - 600 personas)', tarifa: 40 }
];
let selectedEscalaIdx = 1;
let cobrarTaquilla = true;
let promocionarEvento = false;
let metodoPago = 'TARJETA';

let toastMessage = '';
let toastTimer = 0;

function drawCleanWhiteText(txt, x, y, sz, styleMode = BOLD, alignH = LEFT, alignV = TOP) {
  push();
  noStroke();
  fill(255);
  textAlign(alignH, alignV);
  textStyle(styleMode);
  textSize(sz);
  text(txt, x, y);
  pop();
}

function ensureImageLoaded(key) {
  if (!key) return null;
  if (imgs[key] && imgs[key].width > 0) return imgs[key];

  let pathOrUrl = IMAGE_FILES[key];
  if (!pathOrUrl) return null;

  if (!loadingKeys[key]) {
    loadingKeys[key] = true;
    let urlToLoad = pathOrUrl.startsWith('http') ? pathOrUrl : encodeURI(pathOrUrl);
    loadImage(
      urlToLoad,
      (loadedImg) => {
        imgs[key] = loadedImg;
        loadingKeys[key] = false;
      },
      () => {
        if (urlToLoad !== pathOrUrl) {
          loadImage(
            pathOrUrl,
            (fallbackImg) => {
              imgs[key] = fallbackImg;
              loadingKeys[key] = false;
            },
            () => {
              imgs[key] = null;
              loadingKeys[key] = false;
            }
          );
        } else {
          imgs[key] = null;
          loadingKeys[key] = false;
        }
      }
    );
  }
  return imgs[key] || null;
}

function getContainerSize() {
  let frameEl = document.getElementById('phone-frame');
  if (frameEl && frameEl.clientWidth > 0 && frameEl.clientHeight > 0) {
    return { w: frameEl.clientWidth, h: frameEl.clientHeight };
  }
  return { w: windowWidth, h: windowHeight };
}

function updateViewportLayout() {
  let sz = getContainerSize();
  let scaleX = sz.w / BASE_W;
  let scaleY = sz.h / BASE_H;
  viewScale = min(scaleX, scaleY);
  viewOffsetX = (sz.w - BASE_W * viewScale) / 2;
  viewOffsetY = (sz.h - BASE_H * viewScale) / 2;
}

function windowResized() {
  let sz = getContainerSize();
  resizeCanvas(sz.w, sz.h);
  updateViewportLayout();
}

function toLogicalX(screenX) {
  return (screenX - viewOffsetX) / viewScale;
}

function toLogicalY(screenY) {
  return (screenY - viewOffsetY) / viewScale;
}

function setup() {
  let sz = getContainerSize();
  p5CanvasRef = createCanvas(sz.w, sz.h);
  let frameEl = document.getElementById('phone-frame');
  if (frameEl) {
    p5CanvasRef.parent('phone-frame');
  }
  updateViewportLayout();
  textFont('sans-serif');

  for (let key in IMAGE_FILES) {
    ensureImageLoaded(key);
  }

  inpNombre = createAppInput('Tu nombre');
  inpCarnet = createAppInput('00123426');
  inpCorreo = createAppInput('usuario@uca.edu.sv');
  inpPass = createAppInput('••••••••', 'password');

  inpResNombre = createAppInput('Nombre');
  inpResCarnet = createAppInput('Carnet');
  inpResCancha = createAppInput('Ej. Cancha Techada #1');

  inpPropTitulo = createAppInput('Título...');
  inpPropDesc = createAppInput('Objetivo y dinámica...');
  inpPropFecha = createAppInput('30/11/26');
  inpPropHora = createAppInput('14:00 - 16:00');
  inpPropOrg = createAppInput('Organizador');
  inpPropFac = createAppInput('Facultad');
}

function createAppInput(placeholder, type = 'text') {
  let inp = createInput('', type);
  inp.attribute('placeholder', placeholder);
  inp.addClass('app-input');
  inp.hide();
  return inp;
}

function placeInput(inp, x, y, w, h = 24) {
  let realY = y - currentScrollOffset;
  if (!p5CanvasRef || !p5CanvasRef.elt || realY + h < 88 || realY > BASE_H) {
    inp.hide();
    return;
  }
  let rectC = p5CanvasRef.elt.getBoundingClientRect();
  let sx = rectC.width / width;
  let sy = rectC.height / height;

  let leftPx = rectC.left + (viewOffsetX + x * viewScale) * sx;
  let topPx = rectC.top + (viewOffsetY + realY * viewScale) * sy;
  let widthPx = w * viewScale * sx;
  let heightPx = h * viewScale * sy;

  inp.show();
  inp.elt.style.left = leftPx + 'px';
  inp.elt.style.top = topPx + 'px';
  inp.elt.style.width = widthPx + 'px';
  inp.elt.style.height = heightPx + 'px';
  inp.elt.style.fontSize = Math.max(10, 12.5 * viewScale * sy) + 'px';
}

function draw() {
  updateViewportLayout();
  background(C_BG);

  logicalMouseX = toLogicalX(mouseX);
  logicalMouseY = toLogicalY(mouseY);
  logicalPMouseX = toLogicalX(pmouseX);
  logicalPMouseY = toLogicalY(pmouseY);

  push();
  translate(viewOffsetX, viewOffsetY);
  scale(viewScale);

  hitboxes = [];
  currentScrollOffset = 0;
  hideAllInputs();

  switch (currentScreen) {
    case 'welcome': drawWelcomeScreen(); break;
    case 'login': drawLoginScreen(); break;
    case 'splash': drawSplashScreen(); break;
    case 'home': drawHomeScreen(); break;
    case 'deportes': drawDeportesScreen(); break;
    case 'futbol': drawFutbolScreen(); break;
    case 'basquetbol': drawBasquetbolScreen(); break;
    case 'voleibol': drawVoleibolScreen(); break;
    case 'cultura': drawCulturaScreen(); break;
    case 'cultura_sub': drawCulturaSubScreen(); break;
    case 'propuestas': drawPropuestasScreen(); break;
    case 'meet_team': drawMeetTeamScreen(); break;
    case 'meet_cast': drawMeetCastScreen(); break;
    case 'perfil': drawPerfilScreen(); break;
    case 'crear_propuesta': drawCrearPropuestaScreen(); break;
  }

  if (showReservaModal) {
    drawReservaModal();
  }

  drawPhoneChrome();

  if (toastTimer > 0) {
    drawToast();
    toastTimer--;
  }

  pop();
}

function hideAllInputs() {
  [
    inpNombre, inpCarnet, inpCorreo, inpPass,
    inpResNombre, inpResCarnet, inpResCancha,
    inpPropTitulo, inpPropDesc, inpPropFecha, inpPropHora, inpPropOrg, inpPropFac
  ].forEach(i => i.hide());
}

function addHitbox(x, y, w, h, action, isFixed = false) {
  let realY = isFixed ? y : (y - currentScrollOffset);
  if (realY + h > 0 && realY < BASE_H) {
    hitboxes.push({ x: x, y: realY, w: w, h: h, action: action });
  }
}

function beginScrollView() {
  push();
  currentScrollOffset = scrollY;
  translate(0, -scrollY);
}

function endScrollView() {
  pop();
  currentScrollOffset = 0;
}

// ========================================================
// VALIDACIONES DE FORMULARIOS
// ========================================================
function validarLogin() {
  let nombre = inpNombre.value().trim();
  let carnet = inpCarnet.value().trim();
  let correo = inpCorreo.value().trim();
  let pass = inpPass.value();
  let docLabel = userType === 'Externo' ? 'DUI / Doc' : 'Número de carnet';

  if (!nombre) {
    showToast('⚠️ Completa el campo Nombre');
    return false;
  }
  if (!carnet) {
    showToast('⚠️ Completa el campo ' + docLabel);
    return false;
  }
  if (!correo) {
    showToast('⚠️ Completa el campo Correo');
    return false;
  }
  if (!pass) {
    showToast('⚠️ Ingresa tu contraseña');
    return false;
  }
  if (pass !== REQUIRED_PASSWORD) {
    showToast('❌ Contraseña incorrecta. Verifica e intenta de nuevo');
    return false;
  }

  loggedInNombre = nombre;
  loggedInCarnet = carnet;
  return true;
}

function validarDetallesPropuesta() {
  let campos = [
    { val: inpPropTitulo.value().trim(), msg: '⚠️ Completa el Título del evento' },
    { val: inpPropDesc.value().trim(), msg: '⚠️ Completa la Descripción / objetivo' },
    { val: inpPropFecha.value().trim(), msg: '⚠️ Completa la Fecha del evento' },
    { val: inpPropHora.value().trim(), msg: '⚠️ Completa el Bloque horario' },
    { val: inpPropOrg.value().trim(), msg: '⚠️ Completa el campo Organizador' },
    { val: inpPropFac.value().trim(), msg: '⚠️ Completa el campo Facultad' }
  ];

  for (let c of campos) {
    if (!c.val) {
      showToast(c.msg);
      return false;
    }
  }
  return true;
}

function intentarAvanzarAforo() {
  if (!validarDetallesPropuesta()) {
    crearTab = 'DETALLES';
    return;
  }
  crearTab = 'AFORO';
  scrollY = 0;
}

// ========================================================
// 1. BIENVENIDA -> LIMA.png
// ========================================================
function drawWelcomeScreen() {
  background(C_PURPLE);
  drawImageOrFallback(imgs.welcome_bg, 0, 0, BASE_W, BASE_H, null);
  drawLogo(BASE_W / 2, 305, 1.05, C_LIME);

  drawButton(105, 520, 165, 36, 'Estudiante Universitario', C_LIME, C_TEXT, 18, 11.5, () => {
    userType = 'Estudiante';
    goToScreen('login');
  });
  drawButton(105, 570, 165, 36, 'Personal Universitario', C_LIME, C_TEXT, 18, 11.5, () => {
    userType = 'Personal';
    goToScreen('login');
  });
  drawButton(105, 620, 165, 36, 'Externo', C_LIME, C_TEXT, 18, 11.5, () => {
    userType = 'Externo';
    goToScreen('login');
  });
}

// ========================================================
// 2. LOGIN (DATOS DEL USUARIO) -> LIMA.png
// ========================================================
function drawLoginScreen() {
  background(255);
  drawLogo(BASE_W / 2, 112, 0.92, C_LIME);

  fill(255); stroke('#E0E0E0'); strokeWeight(1);
  rect(22, 220, 331, 120, 12);

  noStroke(); fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(NORMAL); textSize(13.5);
  text('Nombre:', 36, 255);
  text(userType === 'Externo' ? 'DUI / Doc:' : 'Número de carnet:', 36, 305);

  placeInput(inpNombre, 102, 243, 236, 24);
  placeInput(inpCarnet, 166, 293, 172, 24);

  fill(255); stroke('#E0E0E0');
  rect(22, 365, 331, 120, 12);

  noStroke(); fill(C_TEXT);
  text(userType === 'Externo' ? 'Correo:' : 'Correo Universitario:', 36, 400);
  text('Contraseña:', 36, 450);

  placeInput(inpCorreo, 182, 388, 156, 24);
  placeInput(inpPass, 124, 438, 214, 24);

  drawButton(102, 610, 170, 44, 'Acceder', C_PURPLE, '#FFFFFF', 10, 15, () => {
    if (!validarLogin()) return;
    splashTimer = 0;
    goToScreen('splash');
  });

  addHitbox(87, 665, 200, 34, () => goToScreen('welcome'), true);
  fill(120); textAlign(CENTER, CENTER); textSize(12);
  text('← Cambiar tipo de usuario', BASE_W / 2, 682);
}

// ========================================================
// 3. SPLASH (PANTALLA DE CARGA) -> LIMA.png
// ========================================================
function drawSplashScreen() {
  background(C_PURPLE);
  drawImageOrFallback(imgs.splash_bg, 0, 0, BASE_W, BASE_H, null);

  let pulse = 1.05 + sin(frameCount * 0.1) * 0.04;
  drawLogo(BASE_W / 2, BASE_H / 2 - 15, pulse, C_LIME);

  addHitbox(0, 0, BASE_W, BASE_H, () => { splashTimer = 0; goToScreen('home'); }, true);

  splashTimer++;
  if (splashTimer > 70) {
    splashTimer = 0;
    goToScreen('home');
  }
}

// ========================================================
// 4. HOME PRINCIPAL -> LIMA.png
// ========================================================
function drawHomeScreen() {
  maxScroll = 520;
  beginScrollView();

  fill(C_PURPLE_DARK); noStroke();
  rect(0, 88, BASE_W, 168);
  drawImageOrFallback(imgs.banner_home, 0, 88, BASE_W, 168, () => drawBannerArt(0, 88, BASE_W, 168));

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12);
  text('Vive tu experiencia universitaria a otro nivel encuentra tu\nsiguiente evento en nuestro campus desde Danza y teatro\nhasta el siguiente emocionante partido', 18, 270);

  textSize(13);
  text('EXPLORAR AREAS', 20, 338);

  addHitbox(20, 364, 335, 164, () => goToScreen('deportes'));
  drawGradientCard(20, 364, 335, 164, 22, C_ORANGE, C_ORANGE_LIGHT);
  fill(C_PURPLE); noStroke(); rect(36, 380, 54, 54, 12);
  let voleibolPurpleImg = ensureImageLoaded('icon_voleibol_purple');
  if (voleibolPurpleImg && voleibolPurpleImg.width > 0) {
    drawIconImage('voleibol', 63, 407, 42, C_PURPLE);
  } else {
    drawVolleyball(63, 407, 42, C_LIME);
  }
  drawCleanWhiteText('ZONA\nDEPORTES', 104, 376, 23.5);
  drawArrowRight(318, 396, C_TEXT);
  drawCleanWhiteText('Marcadores en vivo, Reserva de\ncanchas y convocatorias especiales', 104, 436, 12.5);

  drawButton(48, 488, 82, 28, 'FÚTBOL', C_YELLOW_BTN, C_TEXT, 14, 10.5, () => goToScreen('futbol'));
  drawButton(138, 488, 82, 28, 'BÁSQUET', C_YELLOW_BTN, C_TEXT, 14, 10.5, () => goToScreen('basquetbol'));
  drawButton(228, 488, 98, 28, 'VOLLEYBALL', C_YELLOW_BTN, C_TEXT, 14, 10.5, () => goToScreen('voleibol'));

  addHitbox(20, 542, 335, 164, () => goToScreen('cultura'));
  drawGradientCard(20, 542, 335, 164, 22, C_PURPLE_LIGHT, C_PURPLE);
  fill(C_PURPLE); noStroke(); rect(36, 558, 54, 54, 12);
  drawTheaterMasks(63, 585, 38, C_LIME);
  drawCleanWhiteText('ZONA\nCULTURAL', 104, 554, 23.5);
  drawArrowRight(318, 574, C_TEXT);
  drawCleanWhiteText('Funciones de teatro musical, puestas\nen escena, danza, música, coro y más.', 104, 614, 12.5);

  drawButton(42, 666, 88, 28, 'DANZA', C_MINT, C_TEXT, 14, 10.5, () => { culturaSubTitle = 'DANZA'; goToScreen('cultura_sub'); });
  drawButton(140, 666, 88, 28, 'TEATRO', C_MINT, C_TEXT, 14, 10.5, () => { culturaSubTitle = 'TEATRO'; goToScreen('cultura_sub'); });
  drawButton(238, 666, 88, 28, 'CANTO', C_MINT, C_TEXT, 14, 10.5, () => { culturaSubTitle = 'MUSICA CORO Y CANTO'; goToScreen('cultura_sub'); });

  fill(C_TEXT); textSize(13); text('EXPLORAR PROPUESTAS', 20, 728);

  addHitbox(20, 754, 170, 232, () => goToScreen('propuestas'));
  drawGradientCard(20, 754, 170, 232, 22, C_MINT, '#E0FCE0');
  fill(C_TEXT); textSize(21); text('PROPUESTAS', 32, 772);
  textStyle(NORMAL); textSize(12.5);
  text('Quieres crear una\npropuesta adelante\nte escuchamos\nahora disponible en\ntu perfil votar por\npropuestas toca\naquí', 34, 810);
  textStyle(BOLD);
  drawButton(78, 942, 102, 26, 'VOTA YA', C_PURPLE_LIGHT, C_TEXT, 13, 11, () => goToScreen('propuestas'));

  addHitbox(202, 754, 153, 152, () => goToScreen('propuestas'));
  drawGradientCard(202, 754, 153, 152, 22, C_PURPLE, C_PURPLE_LIGHT);
  drawCleanWhiteText('Un espacio\nespecial para que\npuedas conectar\ncon las\npropuestas de\nlos demás', 216, 770, 14);

  addHitbox(202, 916, 72, 72, () => goToScreen('crear_propuesta'));
  fill(C_PURPLE); noStroke(); rect(202, 916, 72, 72, 16);
  drawBookIcon(238, 952, 54, C_LIME);

  fill(C_TEXT); textSize(13); text('CONOCENOS', 20, 1012);

  addHitbox(20, 1036, 335, 116, () => goToScreen('meet_team'));
  drawGradientCard(20, 1036, 335, 116, 22, '#E9E3F5', '#EFEFEF');
  fill(C_PURPLE); textSize(22); text('MEET THE TEAM', 38, 1058);
  fill(C_TEXT); textSize(13); text('Nuestros atletas, equipos favoritos y\nthrowbacks de partidos', 38, 1092);

  addHitbox(20, 1166, 335, 126, () => goToScreen('meet_cast'));
  drawGradientCard(20, 1166, 335, 126, 22, '#E9E3F5', '#EFEFEF');
  fill(C_PURPLE); textSize(22); text('MEET THE CAST', 38, 1188);
  fill(C_TEXT); textSize(13); text('Solistas, bailarines, actores y ensamble\nmusical universitario. Toca cada ficha para\nexplorar su retrato y galería en escena.', 38, 1222);

  endScrollView();

  fill(C_PURPLE); noStroke(); rect(0, 0, BASE_W, 88);
  drawLogo(72, 58, 0.56, C_LIME);
  addHitbox(16, 35, 118, 46, () => { scrollY = 0; }, true);
  addHitbox(310, 36, 48, 46, () => goToScreen('perfil'), true);
  drawProfileAvatar(334, 60, 30);
}

// ========================================================
// 5. DEPORTES GENERAL -> MORADO.png
// ========================================================
function drawDeportesScreen() {
  maxScroll = 230;
  beginScrollView();

  drawGradientCard(20, 106, 335, 142, 22, C_ORANGE, C_ORANGE_LIGHT);
  drawPillBadge(188, 94, 152, 25, 'Espacio Deportivo', C_MINT);

  drawCleanWhiteText('FUTBOL -\nBASQUETBAL -VOLEIBOL', 36, 118, 21.5);
  drawCleanWhiteText('Marcadores en vivo, Reserva de canchas y\nconvocatorias especiales', 36, 176, 12.5);

  fill(C_TEXT); textSize(13); text('DISCIPLINAS', 36, 266);

  drawButton(36, 290, 90, 26, 'FUTBOL', C_MINT, C_TEXT, 13, 10.5, () => goToScreen('futbol'));
  drawButton(136, 290, 100, 26, 'BASQUETBAL', C_MINT, C_TEXT, 13, 10.5, () => goToScreen('basquetbol'));
  drawButton(246, 290, 90, 26, 'VOLEYBAL', C_MINT, C_TEXT, 13, 10.5, () => goToScreen('voleibol'));

  drawButton(36, 323, 90, 26, 'MARCADOR', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { scrollY = 260; showToast('En vivo - Fútbol Masculino'); });
  drawButton(136, 323, 100, 26, 'RESERVAS', C_MINT, C_TEXT, 13, 10.5, () => { showReservaModal = true; });
  drawButton(246, 323, 90, 26, 'TRYOUTS', C_MINT, C_TEXT, 13, 10.5, () => { goToScreen('futbol'); scrollY = 330; });

  drawGradientCard(20, 366, 335, 132, 22, C_PURPLE_LIGHT, C_PURPLE);
  fill(C_TEXT); textSize(12.5); text('EN VIVO - FUTBOL MASCULINO', 36, 380);

  fill(C_MINT); noStroke();
  rect(38, 405, 108, 70, 10);
  rect(158, 422, 58, 38, 10);
  rect(228, 405, 108, 70, 10);

  fill(C_TEXT); textAlign(CENTER, CENTER); textSize(18);
  text('JAGUAR\n' + scoreFutbolPumas, 92, 440);
  textSize(12.5); text('VS', 187, 441);
  textSize(18); text('UCA\n' + scoreFutbolUCA, 282, 440);

  textAlign(LEFT, TOP); textSize(12.5);
  text('ENCUENTROS DEL MES', 20, 518);
  text('TABLERO', 225, 518);

  drawMatchMiniCard(20, 542, 'soccer', '6:00 PM •', 'JAGUARES -\nPUMA MATIAS', () => showToast('✓ Agendado: Jaguares vs Puma Matías'));
  drawMatchMiniCard(20, 695, 'basket', '4:00 PM •', 'UCA - PUMA\nMATIAS', () => showToast('✓ Agendado: UCA vs Puma Matías'));
  drawMatchMiniCard(20, 848, 'soccer', '4:00 PM •', 'CLASICO\nINTERFACULTAD', () => showToast('✓ Agendado: Clásico Interfacultad'));

  drawStandingsColumn(225, 542, 130, 285, 'FUTBOL', C_MINT);

  endScrollView();
  drawWhiteSubHeader('DEPORTES', () => goToScreen('home'));
}

// ========================================================
// 6. FUTBOL -> MORADO.png
// ========================================================
function drawFutbolScreen() {
  maxScroll = 350;
  beginScrollView();

  drawGradientCard(20, 106, 335, 118, 22, C_ORANGE, C_ORANGE_LIGHT);
  drawPillBadge(188, 94, 152, 25, 'Espacio Deportivo', C_MINT);

  drawCleanWhiteText('FUTBOL', 36, 118, 22.5);
  drawCleanWhiteText('Descubre el marcador en vivo los encuentros\ndel mes tryouts y mas', 36, 156, 13);

  drawLiveScoreCard(
    20, 255, 'EN VIVO - FUTBOL MASCULINO', 'Min 63',
    'PUMAS', scoreFutbolPumas, 'UCA', scoreFutbolUCA,
    () => { if (random() > 0.5) scoreFutbolUCA++; else scoreFutbolPumas++; showToast('⚽ ¡Marcador actualizado!'); },
    () => showToast('📱 QR de grada generado')
  );

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13); text('ENCUENTROS DEL MES', 30, 448);
  drawWideMatchCard(20, 474, 'soccer', 'JAGUARES - UCA BUHOS', 'Cuartos de final', '6:00 PM • Cancha de cesped\nnatural', 'AGENDAR', () => showToast('✓ Partido agendado'));
  drawWideMatchCard(20, 634, 'soccer', 'ENCUENTRO FACULTADES ING\nVS ARQ', 'Amistoso', '12:00 PM • Cancha de cesped\nnatural', 'AGENDAR', () => showToast('✓ Amistoso agendado'));

  fill(C_TEXT); textSize(13); text('TRYOUTS', 30, 805);
  drawTryoutCard(20, 830, 'soccer', '6:00 PM •', 'SELECCION\nMASCULINA', 'Cancha cesped', () => showToast('✓ Tryout Masculino inscrito'));
  drawTryoutCard(20, 982, 'soccer', '4:00 PM •', 'SELECCION\nFEMENINA', 'Cancha cesped', () => showToast('✓ Tryout Femenino inscrito'));

  drawStandingsColumn(208, 830, 147, 290, 'FUTBOL', '#E2E2E8');

  endScrollView();
  drawWhiteSubHeader('DEPORTES', () => goToScreen('deportes'));
}

// ========================================================
// 7. BÁSQUETBOL -> MORADO.png
// ========================================================
function drawBasquetbolScreen() {
  maxScroll = 350;
  beginScrollView();

  drawGradientCard(20, 106, 335, 118, 22, C_ORANGE, C_ORANGE_LIGHT);
  drawPillBadge(188, 94, 152, 25, 'Espacio Deportivo', C_MINT);

  drawCleanWhiteText('BÁSQUETBOL', 36, 118, 22.5);
  drawCleanWhiteText('Descubre el marcador en vivo los encuentros\ndel mes tryouts y mas', 36, 156, 13);

  drawLiveScoreCard(
    20, 255, 'EN VIVO - BÁSQUETBOL', '4TO 4:00mins',
    'JAGUAR', scoreBasquetJaguar, 'BUHOS', scoreBasquetBuhos,
    () => { let p = random([2, 3]); if (random() > 0.4) scoreBasquetBuhos += p; else scoreBasquetJaguar += p; showToast('🏀 +' + p + ' PTS actualizados'); },
    () => showToast('📱 QR de grada generado')
  );

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13); text('ENCUENTROS DEL MES', 30, 448);
  drawWideMatchCard(20, 476, 'basket', 'UCA BUHO - PUMA MATIAS', 'Semi final', '6:00 PM • Cancha techada •\n 12 nov', 'AGENDAR', () => showToast('✓ Semifinal agendada'));
  drawWideMatchCard(20, 642, 'basket', 'ENCUENTRO FACULTADES ING\nVS IDIOMAS', 'Final', '6:00 PM • Cancha techada •\n 13 nov', 'AGENDAR', () => showToast('✓ Final agendada'));

  fill(C_TEXT); textSize(13); text('TRYOUTS', 30, 810);
  drawTryoutCard(20, 835, 'basket', '6:00 PM 22nov', 'SELECCIÓN\nMASCULINA', 'Cancha\ntechada', () => showToast('✓ Tryout Básquet inscrito'));

  drawGradientCard(208, 835, 147, 235, 22, C_PURPLE_LIGHT, C_PURPLE);
  let basketStandings = ['JAGUARES UNI -\nBASQUET- 38 PTS', 'GATOS UEES -\nBASQUET- 21 PTS', 'TBD'];
  for (let i = 0; i < basketStandings.length; i++) {
    let sy = 856 + i * 64;
    fill('#E2E2E8'); noStroke(); rect(218, sy, 127, 48, 10);
    fill(C_TEXT); textSize(10.5); textStyle(BOLD);
    textAlign(basketStandings[i] === 'TBD' ? CENTER : LEFT, CENTER);
    text(basketStandings[i], basketStandings[i] === 'TBD' ? 281 : 224, sy + 24);
  }

  endScrollView();
  drawWhiteSubHeader('DEPORTES', () => goToScreen('deportes'));
}

// ========================================================
// 8. VOLEIBOL -> MORADO.png
// ========================================================
function drawVoleibolScreen() {
  maxScroll = 350;
  beginScrollView();

  drawGradientCard(20, 106, 335, 118, 22, C_ORANGE, C_ORANGE_LIGHT);
  drawPillBadge(188, 94, 152, 25, 'Espacio Deportivo', C_MINT);

  drawCleanWhiteText('VOLEIBOL', 36, 118, 22.5);
  drawCleanWhiteText('Descubre el marcador en vivo los encuentros\ndel mes tryouts y mas', 36, 156, 13);

  drawLiveScoreCard(
    20, 255, 'EN VIVO - VOLEIBOL', 'SET 4',
    'AGUILA', scoreVoleiAguila, 'BUHOS', scoreVoleiBuhos,
    () => { if (random() > 0.5) scoreVoleiAguila++; else scoreVoleiBuhos++; showToast('🏐 ¡Punto de Set actualizado!'); },
    () => showToast('📱 QR de grada generado')
  );

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13); text('ENCUENTROS DEL MES', 30, 448);
  drawWideMatchCard(20, 476, 'volley', 'BUHOS UCA - LEONES UTEC', 'Cuartos de final', '6:00 PM • Cancha de cesped\nnatural • 18 Nov', 'AGENDAR', () => showToast('✓ Partido agendado'));

  fill(C_TEXT); textSize(13); text('TRYOUTS', 30, 645);
  drawTryoutCard(20, 670, 'volley', '6:00 PM • 15 Nov', 'SELECCIÓN\nMASCULINA', 'Cancha\ntechada', () => showToast('✓ Tryout Voleibol Masc. inscrito'));
  drawTryoutCard(20, 835, 'volley', '4:00 PM • 16 Nov', 'SELECION\nFEMENINA', 'Cancha\ntechada', () => showToast('✓ Tryout Voleibol Fem. inscrito'));

  drawStandingsColumn(208, 670, 147, 310, 'VOLEIBOL', '#E2E2E8');

  endScrollView();
  drawWhiteSubHeader('DEPORTES', () => goToScreen('deportes'));
}

// ========================================================
// 9. MODAL RESERVAS
// ========================================================
function drawReservaModal() {
  push();
  fill(0, 0, 0, 95); noStroke(); rect(0, 88, BASE_W, BASE_H - 88);
  fill('#E3DEE8'); stroke(255); strokeWeight(1.5); rect(35, 110, 305, 620, 22);

  drawButton(50, 124, 86, 32, 'Volver', '#C484FC', '#FFFFFF', 16, 13, () => { showReservaModal = false; }, true);

  fill(255); noStroke(); rect(52, 174, 271, 82, 14);
  fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(NORMAL); textSize(13.5);
  text('Nombre:', 64, 200);
  text('Carnet:', 64, 232);

  placeInput(inpResNombre, 122, 188, 192, 24);
  placeInput(inpResCarnet, 118, 220, 196, 24);

  fill(255); rect(52, 274, 271, 130, 14);
  fill(C_TEXT); textSize(14);
  text('Area de juego', 68, 312);
  text('Cancha', 68, 356);

  drawToggleSwitch(235, 298, switchAreaJuego, () => { switchAreaJuego = !switchAreaJuego; if (switchAreaJuego) switchCancha = false; }, true);
  drawToggleSwitch(235, 342, switchCancha, () => { switchCancha = !switchCancha; if (switchCancha) switchAreaJuego = false; }, true);

  fill(255); rect(52, 422, 271, 82, 14);
  fill(C_TEXT); textSize(12.5);
  text('Cancha o area que se quiere\n reservar', 68, 446);
  placeInput(inpResCancha, 68, 470, 238, 24);

  drawButton(117, 522, 140, 34, 'HORARIO', C_PURPLE_LIGHT, C_TEXT, 17, 12, () => {
    horarioSeleccionado = horarioSeleccionado === '10:00 AM - 12:00 PM' ? '2:00 PM - 4:00 PM' : '10:00 AM - 12:00 PM';
    showToast('🕒 Horario: ' + horarioSeleccionado);
  }, true);

  fill(255); rect(52, 576, 271, 54, 14);
  fill(C_TEXT); textStyle(BOLD); textSize(13.5);
  text('Enviar y Regresar', 70, 603);
  drawToggleSwitch(248, 589, switchEnviar, () => {
    if (!inpResNombre.value().trim()) {
      showToast('⚠️ Completa el campo Nombre');
      return;
    }
    if (!inpResCarnet.value().trim()) {
      showToast('⚠️ Completa el campo Carnet');
      return;
    }
    if (!inpResCancha.value().trim()) {
      showToast('⚠️ Indica la cancha o área a reservar');
      return;
    }
    switchEnviar = true;
    setTimeout(() => {
      switchEnviar = false;
      showReservaModal = false;
      showToast('✓ Reserva enviada (' + horarioSeleccionado + ')');
    }, 220);
  }, true);
  pop();
}

// ========================================================
// 10. CULTURA Y ARTES -> MORADO.png
// ========================================================
function drawCulturaScreen() {
  maxScroll = 540;
  beginScrollView();

  drawGradientCard(20, 106, 335, 128, 22, C_PURPLE, C_PURPLE_LIGHT);
  drawPillBadge(188, 94, 152, 25, 'Espacio Cultural', C_PURPLE_SOFT);

  drawCleanWhiteText('CULTURA Y\nARTES', 36, 118, 22.5);
  drawCleanWhiteText('Descubre la oferta artística de nuestro campus:\nasiste a musicales y conciertos', 36, 176, 12.5);

  fill(C_TEXT); textSize(13); text('DISCIPLINAS', 36, 252);
  drawButton(36, 276, 88, 26, 'DANZA', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { culturaSubTitle = 'DANZA'; goToScreen('cultura_sub'); });
  drawButton(134, 276, 92, 26, 'TEATRO', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { culturaSubTitle = 'TEATRO'; goToScreen('cultura_sub'); });
  drawButton(236, 276, 92, 26, 'MUSICA', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { culturaSubTitle = 'MUSICA CORO Y CANTO'; goToScreen('cultura_sub'); });
  drawButton(48, 308, 122, 26, 'CORO Y CANTO', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { culturaSubTitle = 'MUSICA CORO Y CANTO'; goToScreen('cultura_sub'); });
  drawButton(180, 308, 142, 26, 'TEATRO MUSICAL', C_PURPLE_LIGHT, C_TEXT, 13, 10.5, () => { culturaSubTitle = 'TEATRO MUSICAL'; goToScreen('cultura_sub'); });

  fill(C_TEXT); textSize(13.5); text('PROXIMAS PRESENTACIONES Y\nOBRAS', 20, 354);

  drawCulturalEventCard(20, 402, 'CUERPOS EN\nMOVIMIENTO', '30 nov', 'Muestra anual de coreografías originales\nfusionando danza contemporánea y ritmos\nurbanos.', '6:00 PM • CCU', 'RESERVAR', () => showToast('🎟️ Reserva confirmada: Cuerpos en Movimiento'));
  drawCulturalEventCard(20, 608, 'BODAS DE\nSANGRE', '01 dic', 'Adaptación escénica inmersiva a cargo del\ntaller avanzado de actuación universitaria.', '6:00 PM • CCU', 'RESERVAR', () => showToast('🎟️ Reserva confirmada: Bodas de Sangre'));

  drawTheaterBanner60UCA(0, 822);

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13.5);
  text('CONVOCATORIA Y AUDICIONES\nABIERTAS', 20, 1058);

  drawAuditionCard(20, 1110, 'AUDICIÓN DE\nCANTO', '01 dic', 'Buscamos sopranos, contraltos, tenores y\nbajos para el ensamble polifónico\nuniversitario.', 'Requisito: Preparar pieza a cappella', '4:00 PM • CCU', () => showToast('🎤 Inscripción registrada para Audición de Canto'));

  endScrollView();
  drawWhiteSubHeader('CULTURA Y ARTES', () => goToScreen('home'));
}

// ========================================================
// 11. SUBPANTALLAS CULTURALES -> MORADO.png
// ========================================================
function drawCulturaSubScreen() {
  maxScroll = 150;
  beginScrollView();

  drawGradientCard(20, 106, 335, 114, 22, C_PURPLE_LIGHT, C_PURPLE);
  drawPillBadge(188, 94, 152, 25, 'Espacio Cultural', C_PURPLE_SOFT);

  drawCleanWhiteText(culturaSubTitle, 36, 120, culturaSubTitle.length > 12 ? 19.5 : 22.5);
  drawCleanWhiteText('Descubre nuestros proximos eventos\nconvocatorias audiciones abiertas', 36, 158, 13);

  fill(C_TEXT); textSize(13); text('PROXIMOS EVENTOS', 30, 242);
  drawCulturalEventCard(20, 268, 'CUERPOS EN\nMOVIMIENTO', '30 nov', 'Muestra anual de coreografías originales\nfusionando danza contemporánea y ritmos\nurbanos.', '6:00 PM • CCU', 'RESERVAR', () => showToast('🎟️ Reserva confirmada para ' + culturaSubTitle));

  fill(C_TEXT); textSize(13.5); text('CONVOCATORIA Y AUDICIONES\nABIERTAS', 30, 480);
  drawAuditionCard(20, 532, 'AUDICIÓN DE\nCANTO', '01 dic', 'Buscamos sopranos, contraltos, tenores y\nbajos para el ensamble polifónico\nuniversitario.', 'Requisito: Preparar pieza a cappella', '4:00 PM • CCU', () => showToast('🎤 Audición registrada'));

  endScrollView();
  drawWhiteSubHeader('CULTURA Y ARTES', () => goToScreen('cultura'));
}

// ========================================================
// 12. PROPUESTAS / VOTA YA -> MORADO.png
// ========================================================
function drawPropuestasScreen() {
  maxScroll = 220;
  beginScrollView();

  drawGradientCard(20, 106, 335, 162, 22, C_PURPLE, C_PURPLE_LIGHT);
  drawPillBadge(175, 94, 170, 25, 'Votación y asistencia', C_MINT);

  drawCleanWhiteText('VOTA YA', 36, 120, 22.5);
  drawCleanWhiteText('Un espacio especial para que puedas conectar\ncon las propuestas de los demas y publicar tus\npropuestas desde tu perfil, confirma tu\nasistencia o dale un upvote a propuestas que\ncrees que deben pasar.', 36, 156, 12.5);

  for (let i = 0; i < propuestasData.length; i++) {
    let p = propuestasData[i];
    let py = 288 + i * 210;

    drawGradientCard(20, py, 335, 192, 22, '#E5DFEC', '#EFEFEF');

    fill(C_PURPLE); textAlign(LEFT, TOP); textStyle(BOLD); textSize(18.5);
    text(p.titulo, 36, py + 15);

    addHitbox(232, py + 8, 34, 34, () => {
      p.noti = !p.noti;
      showToast(p.noti ? '🔔 Notificación activada' : '🔕 Notificación desactivada');
    });
    drawBellIcon(249, py + 24, p.noti);

    fill(C_PURPLE_SOFT); noStroke(); rect(270, py + 12, 70, 26, 13);
    fill(C_TEXT); textAlign(CENTER, CENTER); textStyle(NORMAL); textSize(12.5);
    text(p.pct, 305, py + 25);

    textAlign(LEFT, TOP); textStyle(BOLD); textSize(12);
    text(p.desc, 36, py + 100);

    fill(C_PURPLE); textSize(12);
    text(p.autor, 36, py + 156);

    fill(C_TEXT); textSize(11.5);
    text(p.hora, 138, py + 153);

    let btnCol = p.votado ? C_LIME : C_PURPLE_LIGHT;
    drawButton(262, py + 148, 78, 26, '▲  ' + p.votos, btnCol, C_TEXT, 13, 12.5, () => {
      p.votado = !p.votado;
      p.votos += p.votado ? 1 : -1;
      showToast(p.votado ? '▲ ¡Upvote registrado!' : 'Upvote retirado');
    });
  }

  endScrollView();
  drawWhiteSubHeader('PROPUESTAS', () => goToScreen('home'));
}

// ========================================================
// 13. MEET THE TEAM -> MORADO.png
// ========================================================
function drawMeetTeamScreen() {
  maxScroll = 230;
  beginScrollView();

  drawGradientCard(20, 106, 335, 126, 22, C_ORANGE, C_ORANGE_LIGHT);
  drawCleanWhiteText('MEET THE TEAM', 36, 120, 22.5);
  drawCleanWhiteText('Un look especial a nuestro cast de teatro\nmusica y mas', 36, 162, 13);

  for (let item of teamGallery) {
    let gx = item.col === 0 ? 20 : 197;
    drawGalleryCard(gx, item.y, 158, item.h, item.tag, item.imgKey, item.liked, () => {
      item.liked = !item.liked;
      showToast(item.liked ? '♥ Guardado en favoritos' : 'Quitado de favoritos');
    });
  }

  endScrollView();
  drawWhiteSubHeader('DEPORTES', () => goToScreen('home'));
}

// ========================================================
// 14. MEET THE CAST -> MORADO.png
// ========================================================
function drawMeetCastScreen() {
  maxScroll = 430;
  beginScrollView();

  drawGradientCard(20, 106, 335, 132, 22, C_PURPLE_LIGHT, C_PURPLE);
  drawCleanWhiteText('BAJO LAS LUCES', 36, 118, 22.5);
  drawCleanWhiteText('Solistas, bailarines, actores y ensamble musical\nuniversitario. Toca cada ficha para explorar su\nretrato y galeria en escena.', 36, 156, 12.5);

  fill(C_TEXT); textSize(13); text('GALERÍA DE ESCENA', 20, 248);

  for (let item of castGallery) {
    let gx = item.col === 0 ? 20 : 197;
    drawGalleryCard(gx, item.y, 158, item.h, item.tag, item.imgKey, item.liked, () => {
      item.liked = !item.liked;
      showToast(item.liked ? '♥ Guardado en favoritos' : 'Quitado de favoritos');
    });
  }

  endScrollView();
  drawWhiteSubHeader('MEET THE CAST', () => goToScreen('home'));
}

// ========================================================
// 15. PERFIL DE USUARIO -> MORADO.png
// ========================================================
function drawPerfilScreen() {
  maxScroll = 80;
  beginScrollView();

  drawButton(18, 98, 82, 30, 'Volver', '#C484FC', '#FFFFFF', 15, 12.5, () => goToScreen('home'));

  addHitbox(210, 98, 28, 30, () => goToScreen('crear_propuesta'));
  stroke(C_TEXT); strokeWeight(2.2); noFill(); circle(224, 113, 21);
  line(224, 107, 224, 119); line(218, 113, 230, 113);

  drawButton(244, 98, 113, 30, 'Crear propuesta', '#C484FC', '#FFFFFF', 15, 11.5, () => goToScreen('crear_propuesta'));

  drawGradientCard(18, 140, 339, 242, 24, C_PURPLE_LIGHT, C_PURPLE);
  drawImageOrFallback(imgs.avatar_claire, 36, 158, 82, 82, () => drawUserPortrait(36, 158, 82, 82), 14);

  drawCleanWhiteText(loggedInNombre, 128, 156, 15.5);
  drawCleanWhiteText(loggedInCarnet, 128, 198, 15.5);

  drawPillBadge(128, 224, 106, 24, userType === 'Externo' ? 'EXTERNO' : 'LIC.DISEÑO', C_MINT);

  let metrics = [
    { val: userEventsCount, lbl: 'EVENTOS', x: 32, act: () => showToast('Tienes 14 eventos agendados') },
    { val: userProposalsCount, lbl: 'PRPPUESTAS', x: 139, act: () => goToScreen('propuestas') },
    { val: userClubsCount, lbl: 'CLUBES', x: 246, act: () => goToScreen('cultura') }
  ];
  for (let m of metrics) {
    addHitbox(m.x, 270, 96, 80, m.act);
    fill(C_MINT); noStroke(); rect(m.x, 270, 96, 80, 14);
    fill(C_TEXT); textAlign(CENTER, CENTER); textStyle(BOLD);
    textSize(21); text(m.val, m.x + 48, 295);
    textSize(11); text(m.lbl, m.x + 48, 329);
  }

  let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FN'];
  for (let i = 0; i < days.length; i++) {
    let dx = 18 + i * 57;
    let active = selectedDay === days[i];
    drawButton(dx, 398, 51, 28, days[i], active ? C_PURPLE_LIGHT : C_MINT, C_TEXT, 14, 11, () => {
      selectedDay = days[i];
      showToast('📅 Agenda del ' + days[i]);
    });
  }

  addHitbox(18, 438, 339, 98, () => goToScreen('cultura'));
  drawGradientCard(18, 438, 339, 98, 22, '#E5DFEC', '#EFEFEF');
  drawPillBadge(268, 450, 74, 25, '30 nov', C_PURPLE_SOFT);
  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15.5);
  text('Danza De Los Sentidos', 36, 458);
  textStyle(NORMAL); textSize(13.5);
  text('6:00 PM • CCU', 36, 498);

  addHitbox(18, 548, 339, 98, () => goToScreen('deportes'));
  drawGradientCard(18, 548, 339, 98, 22, '#E5DFEC', '#EFEFEF');
  drawPillBadge(268, 560, 74, 25, '01 dic', C_PURPLE_SOFT);
  fill(C_TEXT); textStyle(BOLD); textSize(15.5);
  text('Partido UCA-GATOS UUE', 36, 568);
  textStyle(NORMAL); textSize(13.5);
  text('1:00 PM • POLI', 36, 608);

  drawButton(18, 662, 105, 28, 'PROPUESTAS', perfilTab === 'PROPUESTAS' ? C_PURPLE_LIGHT : C_MINT, C_TEXT, 14, 11, () => { perfilTab = 'PROPUESTAS'; goToScreen('propuestas'); });
  drawButton(135, 662, 105, 28, 'CREAR', C_MINT, C_TEXT, 14, 11, () => goToScreen('crear_propuesta'));
  drawButton(252, 662, 105, 28, 'EVENTOS', perfilTab === 'EVENTOS' ? C_PURPLE_LIGHT : C_MINT, C_TEXT, 14, 11, () => { perfilTab = 'EVENTOS'; showToast('Mostrando tus eventos'); });

  endScrollView();
  drawWhiteHeaderClean();
}

// ========================================================
// 16. CREAR PROPUESTA
// ========================================================
function drawCrearPropuestaScreen() {
  maxScroll = crearTab === 'DETALLES' ? 360 : 440;
  beginScrollView();

  drawButton(18, 98, 165, 30, 'Detalles del evento', crearTab === 'DETALLES' ? C_PURPLE_LIGHT : C_PURPLE_SOFT, C_TEXT, 15, 12, () => { crearTab = 'DETALLES'; scrollY = 0; });
  drawButton(191, 98, 166, 30, 'Aforo, taquillas y pago', crearTab === 'AFORO' ? C_PURPLE_LIGHT : C_PURPLE_SOFT, C_TEXT, 15, 11, () => intentarAvanzarAforo());

  if (crearTab === 'DETALLES') {
    drawGradientCard(18, 142, 339, 140, 22, C_PURPLE_LIGHT, C_PURPLE);
    drawCleanWhiteText('CREA TU\nPROPUESTA', 36, 156, 22);
    drawCleanWhiteText('Define el formato tu propuesta', 36, 218, 13);

    drawGradientCard(18, 298, 339, 395, 22, '#E5DFEC', '#EFEFEF');
    fill(C_TEXT); textSize(13); text('TITULO DEL EVENTO*', 36, 316);
    placeInput(inpPropTitulo, 36, 340, 230, 28);

    fill(C_TEXT); text('CATEGORIA/AREA', 36, 388);
    let cats = [
      { l: 'DANZA', x: 44, y: 412, w: 70 }, { l: 'TEATRO', x: 122, y: 412, w: 80 }, { l: 'MUSICA', x: 210, y: 412, w: 82 },
      { l: 'CORO Y CANTO', x: 58, y: 446, w: 114 }, { l: 'TEATRO MUSICAL', x: 180, y: 446, w: 128 },
      { l: 'FUTBOL', x: 44, y: 480, w: 72 }, { l: 'BASQUETBOL', x: 124, y: 480, w: 96 }, { l: 'VOLLEYBOL', x: 228, y: 480, w: 90 }
    ];
    cats.forEach(c => {
      let active = selectedCategoria === c.l;
      drawButton(c.x, c.y, c.w, 26, c.l, active ? C_PURPLE_LIGHT : C_PURPLE_SOFT, C_TEXT, 13, 10, () => {
        selectedCategoria = c.l;
        showToast('Categoría: ' + c.l);
      });
    });

    fill(C_TEXT); text('DESCRIPCIÓN /OBJETIVO Y DINAMICA*', 36, 520);
    drawGradientCard(36, 544, 303, 130, 20, C_PURPLE_LIGHT, C_PURPLE_SOFT);
    placeInput(inpPropDesc, 48, 558, 278, 96);

    drawGradientCard(18, 708, 339, 258, 22, '#E5DFEC', '#EFEFEF');
    fill(C_TEXT); textSize(13);
    text('ESPACIO CAMPUS', 36, 726);
    text('CAP MAX', 258, 726);

    for (let i = 0; i < espaciosCampus.length; i++) {
      let ey = 750 + i * 66;
      let esp = espaciosCampus[i];
      let sel = selectedEspacioIdx === i;
      addHitbox(30, ey, 315, 54, () => { selectedEspacioIdx = i; showToast('Espacio: ' + esp.nombre); });
      drawGradientCard(30, ey, 315, 54, 27, sel ? C_PURPLE_LIGHT : '#DFD4F5', C_PURPLE_SOFT);
      fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(13);
      text(esp.nombre, 48, ey + 27);
      textAlign(RIGHT, CENTER);
      text(esp.cap, 327, ey + 27);
    }

    drawGradientCard(18, 980, 339, 152, 22, '#E5DFEC', '#EFEFEF');
    fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13);
    text('Fecha*', 36, 996);
    text('Bloque horario*', 194, 996);
    text('Organizador*', 36, 1058);
    text('Facultad*', 194, 1058);

    placeInput(inpPropFecha, 34, 1016, 136, 26);
    placeInput(inpPropHora, 192, 1016, 148, 26);
    placeInput(inpPropOrg, 34, 1078, 146, 26);
    placeInput(inpPropFac, 192, 1078, 148, 26);

    drawButton(170, 1144, 187, 34, 'AFORO Y TAQUILLA', C_PURPLE, '#FFFFFF', 17, 11.5, () => intentarAvanzarAforo());

  } else {
    let esc = escalaAforo[selectedEscalaIdx];
    let qrFee = cobrarTaquilla ? 2.50 : 0.00;
    let totalPago = esc.tarifa + qrFee;

    drawGradientCard(18, 142, 339, 224, 22, C_PURPLE_LIGHT, C_PURPLE);
    drawCleanWhiteText('CUANTAS PERSONAS\nASISTIRAN', 36, 156, 21.5);
    drawCleanWhiteText('Define la escala del evento', 36, 212, 13);

    for (let i = 0; i < escalaAforo.length; i++) {
      let bx = 28 + i * 80;
      let isSel = selectedEscalaIdx === i;
      drawButton(bx, 246, i === 2 ? 76 : 72, 28, escalaAforo[i].label, isSel ? C_PURPLE_LIGHT : C_PURPLE_SOFT, C_TEXT, 14, 11, () => {
        selectedEscalaIdx = i;
        showToast('Aforo ' + escalaAforo[i].label + ' ($' + escalaAforo[i].tarifa + ')');
      });
    }

    drawGradientCard(32, 290, 311, 52, 26, C_PURPLE_SOFT, '#E5DCF9');
    fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(12.5);
    text(esc.desc, 48, 316);
    fill(C_PURPLE_SOFT); noStroke(); rect(252, 300, 74, 32, 16);
    fill(C_TEXT); textAlign(CENTER, CENTER); text('$' + esc.tarifa, 289, 316);

    drawGradientCard(18, 380, 339, 258, 22, C_PURPLE_LIGHT, C_PURPLE);
    drawPillBadge(32, 368, 80, 25, 'Taquilla', C_PURPLE_SOFT);

    drawCleanWhiteText('CALCULO DINAMICO SEGUN AFORO', 34, 402, 13);
    drawCleanWhiteText('¿Cómo funciona? La tarifa de reserva y\nemisión de boletos QR se ajusta\nautomáticamente a la escala de asistentes', 34, 424, 12, NORMAL);

    drawGradientCard(30, 484, 148, 56, 28, C_PURPLE_SOFT, '#E5DCF9');
    fill(C_TEXT); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(12);
    text('Reserva de Espacio\n$' + esc.tarifa, 104, 512);

    drawGradientCard(190, 484, 152, 56, 28, C_PURPLE_SOFT, '#E5DCF9');
    text('Gestion taquilla QR\n$2.50', 266, 512);

    fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(12.5);
    text('COBRAR TAQUILLA', 36, 568);
    text('PROMOCIONAR EVENTO', 36, 608);
    drawToggleSwitch(272, 554, cobrarTaquilla, () => { cobrarTaquilla = !cobrarTaquilla; });
    drawToggleSwitch(272, 594, promocionarEvento, () => { promocionarEvento = !promocionarEvento; });

    drawGradientCard(18, 654, 339, 174, 22, '#E5DFEC', '#EFEFEF');
    fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13);
    text('RESUMEN DE RESERVA Y TAQUILLA', 34, 672);

    textSize(12.5);
    text('Tarifa base (' + esc.desc.split(' (')[0] + ':\n' + esc.label + ' personas)', 34, 702);
    drawPillBadge(278, 702, 62, 26, '$' + esc.tarifa, C_PURPLE_SOFT);

    text('Gestión taquilla QR', 34, 750);
    drawPillBadge(278, 744, 62, 26, '$' + qrFee.toFixed(qrFee === 0 ? 0 : 1), C_PURPLE_SOFT);

    text('TOTAL A PAGAR', 34, 792);
    drawPillBadge(274, 786, 70, 26, '$' + totalPago.toFixed(2), C_PURPLE_SOFT);

    drawGradientCard(18, 844, 339, 258, 22, '#E5DFEC', '#EFEFEF');
    fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13);
    text('METODO DE PAGO', 34, 862);

    let pays = [
      { l: 'TARJETA', x: 30, w: 88 },
      { l: 'QR', x: 128, w: 66 },
      { l: 'INSTALACIONES', x: 204, w: 130 }
    ];
    for (let p of pays) {
      drawButton(p.x, 886, p.w, 28, p.l, metodoPago === p.l ? C_PURPLE_LIGHT : C_PURPLE_SOFT, C_TEXT, 14, 10.5, () => {
        metodoPago = p.l;
        showToast('Método: ' + p.l);
      });
    }

    drawBankCard(30, 928, 315, 154);

    drawButton(172, 1116, 185, 34, 'ACEPTAR Y PAGAR', C_PURPLE, '#FFFFFF', 17, 12, () => {
      if (!validarDetallesPropuesta()) {
        crearTab = 'DETALLES';
        return;
      }
      let titulo = inpPropTitulo.value().trim();
      let desc = inpPropDesc.value().trim();
      let hora = inpPropHora.value().trim();

      propuestasData.unshift({
        titulo: titulo.toUpperCase().slice(0, 26),
        desc: desc,
        autor: 'Por ' + (inpPropOrg.value().trim() || 'Lyra S'),
        hora: hora + ' • ' + espaciosCampus[selectedEspacioIdx].nombre.toUpperCase(),
        pct: '100%',
        votos: 1,
        votado: true,
        noti: true
      });
      userProposalsCount++;
      showToast('✓ ¡Propuesta publicada ($' + totalPago.toFixed(2) + ')!');
      setTimeout(() => goToScreen('propuestas'), 400);
    });
  }

  endScrollView();
  drawCrearHeader();
}

function drawCrearHeader() {
  fill(255); noStroke(); rect(0, 0, BASE_W, 88);
  addHitbox(10, 36, 155, 46, () => goToScreen('perfil'), true);
  fill(C_TEXT); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(18);
  text('←', 18, 62);
  fill(C_PURPLE);
  text('PROPUESTAS', 44, 62);
  fill(C_TEXT); textAlign(RIGHT, CENTER); textSize(13.5);
  text(crearTab === 'DETALLES' ? 'PASO 1 DE 2' : 'PASO 2 DE 2', 357, 62);
}

function drawWhiteHeaderClean() {
  fill(255); noStroke(); rect(0, 0, BASE_W, 88);
  addHitbox(14, 34, 118, 48, () => goToScreen('home'), true);
  drawLogo(68, 56, 0.55, C_PURPLE);
}

// ========================================================
// CLICS Y SCROLL
// ========================================================
function mousePressed() {
  if (toastTimer > 0 && logicalMouseY > BASE_H - 88) {
    toastTimer = 0;
    return;
  }

  for (let i = hitboxes.length - 1; i >= 0; i--) {
    let hb = hitboxes[i];
    if (
      logicalMouseX >= hb.x && logicalMouseX <= hb.x + hb.w &&
      logicalMouseY >= hb.y && logicalMouseY <= hb.y + hb.h
    ) {
      if (typeof hb.action === 'function') {
        hb.action();
        return;
      }
    }
  }
}

function mouseWheel(event) {
  if (!showReservaModal && maxScroll > 0) {
    scrollY = constrain(scrollY + event.delta, 0, maxScroll);
    return false;
  }
}

function mouseDragged() {
  if (!showReservaModal && maxScroll > 0) {
    scrollY = constrain(scrollY - (logicalMouseY - logicalPMouseY), 0, maxScroll);
  }
}

// ========================================================
// COMPONENTES VISUALES E IMÁGENES
// ========================================================

function goToScreen(name) {
  previousScreen = currentScreen;
  currentScreen = name;
  scrollY = 0;
  maxScroll = 0;
}

function showToast(msg) {
  toastMessage = msg;
  toastTimer = 115;
}

function drawToast() {
  push();
  fill(30, 30, 30, 235); noStroke();
  rect(30, BASE_H - 80, BASE_W - 60, 40, 20);
  drawCleanWhiteText(toastMessage, BASE_W / 2, BASE_H - 60, 12.5, BOLD, CENTER, CENTER);
  pop();
}

function drawButton(x, y, w, h, label, bgCol, txtCol, radius, txtSize, action = null, isFixed = false) {
  if (typeof action === 'function') {
    addHitbox(x, y, w, h, action, isFixed);
  }
  push();
  noStroke(); fill(0, 0, 0, 22); rect(x, y + 2, w, h, radius);
  fill(bgCol); rect(x, y, w, h, radius);
  fill(txtCol); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(txtSize);
  text(label, x + w / 2, y + h / 2);
  pop();
}

function drawPillBadge(x, y, w, h, label, col) {
  push();
  fill(col); noStroke(); rect(x, y, w, h, h / 2);
  fill(C_TEXT); textAlign(CENTER, CENTER); textStyle(NORMAL); textSize(12);
  text(label, x + w / 2, y + h / 2);
  pop();
}

function drawToggleSwitch(x, y, state, action = null, isFixed = false) {
  if (typeof action === 'function') {
    addHitbox(x - 6, y - 4, 66, 36, action, isFixed);
  }
  push();
  stroke('#706E75'); strokeWeight(1.8);
  fill(state ? C_PURPLE_LIGHT : '#E4DFE9');
  rect(x, y, 54, 28, 14);
  noStroke(); fill(state ? C_PURPLE : '#706E75');
  circle(state ? x + 39 : x + 15, y + 14, 18);
  pop();
}

function drawGradientCard(x, y, w, h, r, col1, col2) {
  push();
  noStroke(); fill(0, 0, 0, 18); rect(x, y + 4, w, h, r);

  let c1 = color(col1); let c2 = color(col2);
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(x, y, w, h, r);
  drawingContext.clip();

  let grad = drawingContext.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, c1.toString());
  grad.addColorStop(0.55, c2.toString());
  grad.addColorStop(1, c1.toString());
  drawingContext.fillStyle = grad;
  drawingContext.fillRect(x, y, w, h);
  drawingContext.restore();

  noFill(); stroke(255, 255, 255, 190); strokeWeight(1.5); rect(x, y, w, h, r);
  pop();
}

function drawWhiteSubHeader(title, backAction = null) {
  fill(255); noStroke(); rect(0, 0, BASE_W, 88);
  drawLogo(68, 56, 0.55, C_PURPLE);
  addHitbox(14, 34, 118, 48, () => goToScreen('home'), true);

  if (typeof backAction === 'function') {
    addHitbox(140, 36, 222, 46, backAction, true);
  }
  fill(C_PURPLE); textAlign(RIGHT, CENTER); textStyle(BOLD); textSize(18);
  text(title, 357, 62);
}

function drawImageOrFallback(imgObj, x, y, w, h, fallbackFn, radius = 0) {
  push();
  if (radius > 0) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(x, y, w, h, radius);
    drawingContext.clip();
  }
  if (imgObj && imgObj.width > 0) {
    let imgRatio = imgObj.width / imgObj.height;
    let boxRatio = w / h;
    let dw = w, dh = h, dx = x, dy = y;
    if (imgRatio > boxRatio) {
      dw = h * imgRatio;
      dx = x - (dw - w) / 2;
    } else {
      dh = w / imgRatio;
      dy = y - (dh - h) / 2;
    }
    image(imgObj, dx, dy, dw, dh);
  } else if (typeof fallbackFn === 'function') {
    fallbackFn();
  }
  if (radius > 0) {
    drawingContext.restore();
  }
  pop();
}

function getIconImageByColor(iconType, col) {
  let mapObj = ICON_COLOR_MAPS[iconType];
  if (!mapObj) return null;

  let normalizedMap = {};
  for (let k in mapObj) {
    normalizedMap[String(k).toUpperCase()] = mapObj[k];
  }

  if (col) {
    let cStr = String(col).toUpperCase();
    let exactKey = normalizedMap[cStr];
    let exactImg = ensureImageLoaded(exactKey);
    if (exactImg && exactImg.width > 0) {
      return exactImg;
    }
  }

  let defKey = normalizedMap.DEFAULT;
  let defImg = ensureImageLoaded(defKey);
  if (defImg && defImg.width > 0) {
    return defImg;
  }

  for (let k in mapObj) {
    if (String(k).toUpperCase() !== 'DEFAULT') {
      let anyImg = ensureImageLoaded(mapObj[k]);
      if (anyImg && anyImg.width > 0) {
        return anyImg;
      }
    }
  }

  return null;
}

function drawIconImage(iconType, x, y, size, col = null) {
  let iconImg = getIconImageByColor(iconType, col);
  if (!iconImg || iconImg.width <= 0) return false;

  push();
  imageMode(CENTER);
  noTint();
  let ratio = iconImg.width / iconImg.height;
  let dw = size;
  let dh = size;
  if (ratio > 1) {
    dh = size / ratio;
  } else {
    dw = size * ratio;
  }
  image(iconImg, x, y, dw, dh);
  pop();
  return true;
}

function drawGalleryCard(x, y, w, h, tag, imgKey, liked, onLike = null) {
  drawGradientCard(x, y, w, h, 18, '#E6E0EE', '#EFEFEF');
  let imgH = h - 46;
  drawImageOrFallback(imgs[imgKey], x + 9, y + 9, w - 18, imgH, () => drawFallbackScene(x + 9, y + 9, w - 18, imgH, imgKey), 12);

  drawPillBadge(x + 9, y + h - 34, 70, 24, tag, C_PURPLE_SOFT);
  if (typeof onLike === 'function') {
    addHitbox(x + w - 40, y + h - 40, 36, 36, onLike);
  }
  drawHeartIcon(x + w - 22, y + h - 22, liked);
}

function drawFallbackScene(x, y, w, h, key) {
  push();
  fill(key.includes('voleibol') ? '#7B746E' : '#2C1915');
  noStroke(); rect(x, y, w, h);
  drawCleanWhiteText(key, x + w / 2, y + h / 2, 11, BOLD, CENTER, CENTER);
  pop();
}

function drawUserPortrait(x, y, w, h) {
  push();
  background('#E8E4DF');
  fill('#5C3A21'); ellipse(x + w * 0.5, y + h * 0.48, w * 0.56, h * 0.68);
  fill('#F2C4A2'); ellipse(x + w * 0.5, y + h * 0.42, w * 0.4, h * 0.46);
  fill('#2B1D12'); circle(x + w * 0.42, y + h * 0.39, 4); circle(x + w * 0.58, y + h * 0.39, 4);
  noFill(); stroke('#B55D4C'); strokeWeight(2);
  arc(x + w * 0.5, y + h * 0.49, 14, 10, 0.1 * PI, 0.9 * PI);
  fill('#D6C3A5'); noStroke(); rect(x + w * 0.22, y + h * 0.66, w * 0.56, h * 0.36, 10);
  pop();
}

function drawProfileAvatar(cx, cy, d) {
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(cx, cy, d / 2, 0, TWO_PI);
  drawingContext.clip();
  drawImageOrFallback(imgs.avatar_claire, cx - d / 2, cy - d / 2, d, d, () => drawUserPortrait(cx - d / 2, cy - d / 2, d, d));
  drawingContext.restore();
  pop();
}

function drawBankCard(x, y, w, h) {
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(x, y, w, h, 14);
  drawingContext.clip();

  let grad = drawingContext.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, '#18181C');
  grad.addColorStop(0.65, '#141418');
  grad.addColorStop(1, '#5828B0');
  drawingContext.fillStyle = grad;
  drawingContext.fillRect(x, y, w, h);
  drawingContext.restore();

  fill(220); textAlign(LEFT, TOP); textStyle(BOLD); textSize(11.5);
  text('DÉBITO / CRÉDITO SV', x + 18, y + 18);

  fill('#3A3742'); rect(x + w - 86, y + 14, 68, 22, 5);
  fill(235); textAlign(CENTER, CENTER); textSize(10.5);
  text('VISA / MC', x + w - 52, y + 25);

  drawCleanWhiteText('4532 •••• •••• 8841', x + 18, y + 74, 17.5, BOLD, LEFT, CENTER);

  fill(170); textSize(10); text('TITULAR', x + 18, y + 110);
  textAlign(RIGHT, CENTER); text('EXPIRA', x + w - 18, y + 110);

  fill('#7A689E'); noStroke(); rect(x + 14, y + 120, 114, 22, 11);
  fill(15); textAlign(CENTER, CENTER); textSize(12);
  text('Lyra Samayoa', x + 71, y + 131);

  drawCleanWhiteText('09/29', x + w - 18, y + 128, 12.5, BOLD, RIGHT, CENTER);
  pop();
}

function drawHeartIcon(x, y, liked) {
  push();
  translate(x, y);
  stroke(liked ? '#E63946' : C_TEXT);
  strokeWeight(1.8);
  fill(liked ? '#E63946' : 'none');
  beginShape();
  vertex(0, 5);
  bezierVertex(-8, -2, -10, -9, 0, -4);
  bezierVertex(10, -9, 8, -2, 0, 5);
  endShape(CLOSE);
  pop();
}

function drawLiveScoreCard(x, y, title, badgeTxt, teamA, scoreA, teamB, scoreB, onUpdate, onQR) {
  drawGradientCard(x, y, 335, 172, 22, C_PURPLE_LIGHT, C_PURPLE);
  drawPillBadge(x + 212, y - 12, 108, 25, badgeTxt, C_MINT);

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12.5);
  text(title, x + 16, y + 13);

  fill(C_MINT); noStroke();
  rect(x + 16, y + 40, 108, 68, 10);
  rect(x + 136, y + 56, 60, 38, 10);
  rect(x + 208, y + 40, 108, 68, 10);

  fill(C_TEXT); textAlign(CENTER, CENTER); textSize(18.5);
  text(teamA + '\n' + scoreA, x + 70, y + 74);
  textSize(12.5); text('VS', x + 166, y + 75);
  textSize(18.5); text(teamB + '\n' + scoreB, x + 262, y + 74);

  drawButton(x + 16, y + 124, 148, 28, 'Actualizar Jugada', C_MINT, C_TEXT, 14, 11.5, onUpdate);
  drawButton(x + 180, y + 124, 136, 28, 'Ver grada QR', C_MINT, C_TEXT, 14, 11.5, onQR);
}

function drawMatchMiniCard(x, y, sport, timeStr, teams, onAgendar) {
  drawGradientCard(x, y, 192, 138, 20, C_ORANGE_LIGHT, C_ORANGE);
  fill('#EFE4F7'); noStroke(); rect(x + 11, y + 13, 62, 62, 12);
  if (sport === 'soccer') drawSoccerBall(x + 42, y + 44, 40, C_TEXT);
  else drawBasketball(x + 42, y + 44, 40, C_TEXT);

  drawClockIcon(x + 88, y + 25, 15);
  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12);
  text(timeStr, x + 101, y + 19);
  textSize(11.5); text(teams, x + 81, y + 46);

  drawButton(x + 10, y + 94, 92, 26, 'AGENDAR', C_YELLOW_BTN, C_TEXT, 13, 10.5, onAgendar);
}

function drawWideMatchCard(x, y, sport, title, sub, details, btnLabel, onBtn) {
  drawGradientCard(x, y, 335, 142, 22, '#E6E1EB', '#EFEFEF');
  if (sport === 'volley') {
    fill(C_PURPLE); noStroke(); rect(x + 14, y + 15, 60, 60, 12);
    drawVolleyball(x + 44, y + 45, 42, C_LIME);
  } else {
    fill('#EAE6EE'); noStroke(); rect(x + 14, y + 15, 60, 60, 12);
    if (sport === 'soccer') drawSoccerBall(x + 44, y + 45, 40, C_TEXT);
    else drawBasketball(x + 44, y + 45, 40, C_TEXT);
  }

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(13);
  text(title, x + 84, y + 18);
  textSize(12); fill(70);
  text(sub, x + 84, y + (title.includes('\n') ? 52 : 40));

  drawClockIcon(x + 30, y + 96, 17);
  fill(C_TEXT); textSize(12); text(details, x + 49, y + 88);

  drawButton(x + 216, y + 98, 102, 28, btnLabel, C_ORANGE, C_TEXT, 14, 11, onBtn);
}

function drawTryoutCard(x, y, sport, timeStr, category, place, onTryout) {
  drawGradientCard(x, y, 176, 142, 20, C_ORANGE_LIGHT, C_ORANGE);
  if (sport === 'volley') {
    fill(C_PURPLE); noStroke(); rect(x + 10, y + 12, 58, 58, 12);
    drawVolleyball(x + 39, y + 41, 38, C_LIME);
  } else {
    fill('#EFE4F7'); noStroke(); rect(x + 10, y + 12, 58, 58, 12);
    if (sport === 'soccer') drawSoccerBall(x + 39, y + 41, 36, C_TEXT);
    else drawBasketball(x + 39, y + 41, 36, C_TEXT);
  }

  fill(C_TEXT); textAlign(LEFT, TOP); textStyle(BOLD); textSize(11.5);
  text(category, x + 74, y + 15);
  textSize(11); text(timeStr, x + 74, y + 54);
  text(place, x + 10, y + 78);

  drawButton(x + 78, y + 100, 88, 26, 'TRYOUT', C_YELLOW_BTN, C_TEXT, 13, 10.5, onTryout);
}

function drawStandingsColumn(x, y, w, h, sportLabel, pillCol) {
  drawGradientCard(x, y, w, h, 22, C_PURPLE_LIGHT, C_PURPLE);
  let standings = [
    'UCA BUHOS -\n' + sportLabel + '- 48 PTS',
    'JAGUARES UNI -\n' + sportLabel + '- 38 PTS',
    'GATOS UEES -\n' + sportLabel + '- 21 PTS',
    'TBD'
  ];
  for (let i = 0; i < standings.length; i++) {
    let sy = y + 18 + i * 62;
    fill(pillCol); noStroke(); rect(x + 9, sy, w - 18, 46, 10);
    fill(C_TEXT); textSize(10); textStyle(BOLD);
    textAlign(standings[i] === 'TBD' ? CENTER : LEFT, CENTER);
    text(standings[i], standings[i] === 'TBD' ? x + w / 2 : x + 14, sy + 23);
  }
}

function drawCulturalEventCard(x, y, title, dateStr, desc, timePlace, btnLabel, onBtn) {
  drawGradientCard(x, y, 335, 186, 22, '#E6E0EE', '#EFEFEF');
  drawPillBadge(x + 246, y + 14, 72, 25, dateStr, C_PURPLE_SOFT);

  fill(C_PURPLE); textAlign(LEFT, TOP); textStyle(BOLD); textSize(19.5); text(title, x + 20, y + 20);
  fill(C_TEXT); textSize(12); text(desc, x + 20, y + 78);

  drawClockIcon(x + 30, y + 148, 17);
  textSize(12.5); text(timePlace, x + 49, y + 141);

  drawButton(x + 216, y + 136, 102, 28, btnLabel, C_ORANGE_LIGHT, '#FFFFFF', 14, 11.5, onBtn);
}

function drawAuditionCard(x, y, title, dateStr, desc, req, timePlace, onBtn) {
  drawGradientCard(x, y, 335, 214, 22, '#E6E0EE', '#EFEFEF');
  drawPillBadge(x + 246, y + 14, 72, 25, dateStr, C_PURPLE_SOFT);

  fill(C_PURPLE); textAlign(LEFT, TOP); textStyle(BOLD); textSize(19.5); text(title, x + 20, y + 20);
  fill(C_TEXT); textSize(12); text(desc, x + 20, y + 78);
  text(req, x + 20, y + 136);

  drawClockIcon(x + 30, y + 180, 17);
  textSize(12.5); text(timePlace, x + 49, y + 173);

  drawButton(x + 216, y + 168, 102, 28, 'ATENDER', C_ORANGE_LIGHT, '#FFFFFF', 14, 11.5, onBtn);
}

// ========================================================
// ZONA 60 UCA: FOTO IZQUIERDA + IMAGEN/LOGO DERECHA
// ========================================================
function drawTheaterBanner60UCA(x, y) {
  addHitbox(x, y + 116, BASE_W, 98, () => goToScreen('propuestas'));
  push();

  let fotoIzq = (imgs.foto_60_uca && imgs.foto_60_uca.width > 0)
    ? imgs.foto_60_uca
    : imgs.banner_home;
  drawImageOrFallback(
    fotoIzq,
    x,
    y,
    255,
    116,
    () => drawFallbackScene(x, y, 255, 116, 'foto_60_uca')
  );

  fill(255); noStroke(); rect(x + 255, y, 120, 116);
  if (imgs.imagen_60_uca && imgs.imagen_60_uca.width > 0) {
    drawImageOrFallback(imgs.imagen_60_uca, x + 255, y, 120, 116, null);
  } else {
    fill(15); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(44); text('60', x + 315, y + 40);
    textSize(22); text('UCA', x + 315, y + 84);
    stroke(15); strokeWeight(4);
    line(x + 335, y + 14, x + 335, y + 46);
    line(x + 323, y + 25, x + 347, y + 25);
  }

  noStroke(); fill(C_PURPLE); rect(x, y + 116, BASE_W, 98);
  drawCleanWhiteText('propuestas', x + 20, y + 126, 13.5, BOLD);
  drawCleanWhiteText('Quieres crear una propuesta adelante te\nescuchamos ahora disponible en tu perfil\nvotar por propuestas toca aquí', x + 20, y + 148, 12, NORMAL);
  drawBookIcon(x + 325, y + 165, 52, C_LIME);
  pop();
}

// ========================================================
// LOGO UCA UNITE (SOLO IMÁGENES POR COLOR, SIN LETRAS)
// ========================================================
function getLogoImageByColor(col) {
  let cStr = String(col).toUpperCase();
  if (cStr === C_LIME.toUpperCase()) {
    return ensureImageLoaded('logo_lime');
  }
  if (cStr === C_PURPLE.toUpperCase() || cStr === C_PURPLE_DARK.toUpperCase()) {
    return ensureImageLoaded('logo_purple');
  }
  let mappedKey = LOGO_COLOR_MAP[cStr];
  if (mappedKey) {
    let mappedImg = ensureImageLoaded(mappedKey);
    if (mappedImg && mappedImg.width > 0) return mappedImg;
  }
  return null;
}

function drawLogo(x, y, sc, col) {
  let logoImg = getLogoImageByColor(col);
  if (logoImg && logoImg.width > 0) {
    push();
    imageMode(CENTER);
    noTint();
    let baseW = 195 * sc;
    let baseH = (baseW * logoImg.height) / logoImg.width;
    image(logoImg, x, y, baseW, baseH);
    pop();
  }
}

function drawBannerArt(x, y, w, h) {
  push();
  fill(45, 18, 95, 180); noStroke();
  ellipse(x + 38, y + 125, 58, 105);
  ellipse(x + 145, y + 120, 76, 125);
  ellipse(x + 270, y + 110, 90, 145);
  fill(C_LIME);
  triangle(x + 260, y + 110, x + 284, y + 110, x + 272, y + 158);
  pop();
}

function drawSoccerBall(x, y, d, col = C_TEXT) {
  if (drawIconImage('futbol', x, y, d, col)) return;
  push(); translate(x, y); stroke(col); strokeWeight(1.4); noFill();
  circle(0, 0, d);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let a = TWO_PI / 5 * i - HALF_PI;
    let vx = cos(a) * (d * 0.22); let vy = sin(a) * (d * 0.22);
    vertex(vx, vy);
    line(vx, vy, cos(a) * (d * 0.48), sin(a) * (d * 0.48));
  }
  endShape(CLOSE); pop();
}

function drawBasketball(x, y, d, col = C_TEXT) {
  if (drawIconImage('basquet', x, y, d, col)) return;
  push(); translate(x, y); stroke(col); strokeWeight(1.4); noFill();
  circle(0, 0, d);
  line(0, -d / 2, 0, d / 2);
  arc(-d * 0.38, 0, d * 0.65, d * 0.85, -HALF_PI, HALF_PI);
  arc(d * 0.38, 0, d * 0.65, d * 0.85, HALF_PI, PI + HALF_PI); pop();
}

function drawVolleyball(x, y, d, col = C_LIME) {
  if (drawIconImage('voleibol', x, y, d, col)) return;
  push(); translate(x, y); stroke(col); strokeWeight(1.8); noFill();
  circle(0, 0, d);
  for (let i = 0; i < 3; i++) {
    rotate(TWO_PI / 3);
    arc(0, d * 0.15, d * 0.85, d * 0.7, PI, TWO_PI);
  } pop();
}

function drawTheaterMasks(x, y, s, col = C_LIME) {
  if (drawIconImage('cultura', x, y, s, col)) return;
  push(); translate(x, y); stroke(col); strokeWeight(1.8); noFill();
  rect(-s * 0.45, -s * 0.45, s * 0.5, s * 0.55, 4, 4, 14, 14);
  arc(-s * 0.2, -s * 0.1, 10, 8, 0, PI);
  rect(-s * 0.05, -s * 0.15, s * 0.5, s * 0.55, 4, 4, 14, 14);
  arc(s * 0.2, s * 0.25, 10, 8, PI, TWO_PI); pop();
}

function drawBookIcon(x, y, s, col = C_LIME) {
  if (drawIconImage('libro', x, y, s, col)) return;
  push(); translate(x, y); stroke(col); strokeWeight(2.2); noFill();
  beginShape();
  vertex(-s * 0.45, -s * 0.35); vertex(0, -s * 0.25); vertex(0, s * 0.35); vertex(-s * 0.45, s * 0.25);
  endShape(CLOSE);
  beginShape();
  vertex(s * 0.45, -s * 0.35); vertex(0, -s * 0.25); vertex(0, s * 0.35); vertex(s * 0.45, s * 0.25);
  endShape(CLOSE); pop();
}

function drawBellIcon(x, y, active) {
  push(); translate(x, y); stroke(C_TEXT); strokeWeight(1.8);
  fill(active ? C_LIME : 'none');
  arc(0, 2, 16, 18, PI, TWO_PI);
  line(-8, 2, -10, 7); line(8, 2, 10, 7); line(-10, 7, 10, 7);
  arc(0, 7, 5, 5, 0, PI); pop();
}

function drawClockIcon(x, y, d) {
  push(); translate(x, y); stroke(C_TEXT); strokeWeight(1.6); noFill();
  circle(0, 0, d);
  line(0, 0, 0, -d * 0.28); line(0, 0, d * 0.22, 0);
  line(-d * 0.45, -d * 0.35, -d * 0.25, -d * 0.52);
  line(d * 0.45, -d * 0.35, d * 0.25, -d * 0.52); pop();
}

function drawArrowRight(x, y, col) {
  push(); stroke(col); strokeWeight(2);
  line(x - 12, y, x + 6, y);
  line(x, y - 6, x + 6, y);
  line(x, y + 6, x + 6, y); pop();
}

function drawPhoneChrome() {
  // Hora removida según solicitud
}