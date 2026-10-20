(() => {
  const CLAVE = "contrasenas.v1";
  const PALABRAS = [...new Set(window.PALABRAS)];

  const MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
  const NUMEROS = "0123456789";
  const SIMBOLOS = "!@#$%&*?-_=+.:;";
  const PARECIDOS = /[0O1lI|]/g;

  const $ = (id) => document.getElementById(id);

  const opcionesPorDefecto = {
    modo: "aleatoria",
    largo: 16,
    mayusculas: true,
    minusculas: true,
    numeros: true,
    simbolos: true,
    sinParecidos: true,
    palabras: 5,
    separador: "-",
    capitalizar: true,
    conNumero: true,
    digitos: 6,
  };

  let opciones = { ...opcionesPorDefecto, ...leerOpciones() };

  function leerOpciones() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || {};
    } catch {
      return {};
    }
  }

  function guardarOpciones() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(opciones));
    } catch {
      /* sin almacenamiento: solo no se recuerdan las opciones */
    }
  }

  // ---------- Azar ----------

  // Entero uniforme en [0, n) usando rechazo para evitar el sesgo de módulo
  function azar(n) {
    const limite = Math.floor(0x100000000 / n) * n;
    const buf = new Uint32Array(1);
    do crypto.getRandomValues(buf);
    while (buf[0] >= limite);
    return buf[0] % n;
  }

  const elegir = (lista) => lista[azar(lista.length)];

  // ---------- Generadores ----------

  function generarAleatoria() {
    const quitar = (s) => (opciones.sinParecidos ? s.replace(PARECIDOS, "") : s);
    const grupos = [];
    if (opciones.mayusculas) grupos.push(quitar(MAYUSCULAS));
    if (opciones.minusculas) grupos.push(quitar(MINUSCULAS));
    if (opciones.numeros) grupos.push(quitar(NUMEROS));
    if (opciones.simbolos) grupos.push(quitar(SIMBOLOS));
    if (!grupos.length) return { clave: "", bits: 0 };

    const todos = grupos.join("");
    let clave;
    // Se repite hasta que tenga al menos un carácter de cada tipo elegido
    do {
      clave = Array.from({ length: opciones.largo }, () => elegir(todos)).join("");
    } while (!grupos.every((g) => [...clave].some((c) => g.includes(c))));

    return { clave, bits: opciones.largo * Math.log2(todos.length) };
  }

  function generarFrase() {
    let bits = opciones.palabras * Math.log2(PALABRAS.length);
    const partes = Array.from({ length: opciones.palabras }, () => {
      const p = elegir(PALABRAS);
      return opciones.capitalizar ? p[0].toUpperCase() + p.slice(1) : p;
    });
    if (opciones.conNumero) {
      partes.push(String(azar(100)));
      bits += Math.log2(100);
    }
    return { clave: partes.join(opciones.separador), bits };
  }

  function generarPin() {
    const clave = Array.from({ length: opciones.digitos }, () => azar(10)).join("");
    return { clave, bits: opciones.digitos * Math.log2(10) };
  }

  // ---------- Fuerza ----------

  function fuerza(bits) {
    if (bits < 40) return { texto: "Débil", color: "var(--debil)" };
    if (bits < 60) return { texto: "Aceptable", color: "var(--aceptable)" };
    if (bits < 80) return { texto: "Fuerte", color: "var(--fuerte)" };
    return { texto: "Muy fuerte", color: "var(--muy-fuerte)" };
  }

  // ---------- Pantalla ----------

  const salida = $("clave");
  const nivel = $("fuerza-nivel");
  const textoFuerza = $("fuerza-texto");
  const botonCopiar = $("copiar");

  function generar() {
    const generador = { aleatoria: generarAleatoria, frase: generarFrase, pin: generarPin }[opciones.modo];
    const { clave, bits } = generador();
    salida.textContent = clave || "Elige al menos un tipo de carácter";
    const f = fuerza(bits);
    nivel.style.width = `${Math.min(100, (bits / 100) * 100)}%`;
    nivel.style.backgroundColor = f.color;
    textoFuerza.textContent = clave ? `${f.texto} · ${Math.round(bits)} bits` : "";
    botonCopiar.disabled = !clave;
    botonCopiar.textContent = "Copiar";
    botonCopiar.classList.remove("copiado");
  }

  function mostrarModo() {
    document.querySelectorAll(".modos button").forEach((b) => {
      b.setAttribute("aria-selected", String(b.dataset.modo === opciones.modo));
    });
    document.querySelectorAll("[data-panel]").forEach((p) => {
      p.hidden = p.dataset.panel !== opciones.modo;
    });
  }

  function mostrarValores() {
    $("largo-valor").textContent = opciones.largo;
    $("palabras-valor").textContent = opciones.palabras;
    $("digitos-valor").textContent = opciones.digitos;
  }

  // ---------- Copiar ----------

  async function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return true;
    }
    // Respaldo para http: textarea temporal + execCommand
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    area.setSelectionRange(0, texto.length);
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }

  botonCopiar.addEventListener("click", async () => {
    let ok = false;
    try {
      ok = await copiar(salida.textContent);
    } catch {
      ok = false;
    }
    botonCopiar.textContent = ok ? "¡Copiada!" : "Mantén presionada para copiar";
    botonCopiar.classList.toggle("copiado", ok);
  });

  $("otra").addEventListener("click", generar);

  // ---------- Opciones ----------

  document.querySelector(".modos").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-modo]");
    if (!b) return;
    opciones.modo = b.dataset.modo;
    guardarOpciones();
    mostrarModo();
    generar();
  });

  const controles = {
    largo: ["largo", "numero"],
    mayusculas: ["mayusculas", "casilla"],
    minusculas: ["minusculas", "casilla"],
    numeros: ["numeros", "casilla"],
    simbolos: ["simbolos", "casilla"],
    sinParecidos: ["sin-parecidos", "casilla"],
    palabras: ["palabras", "numero"],
    separador: ["separador", "texto"],
    capitalizar: ["capitalizar", "casilla"],
    conNumero: ["con-numero", "casilla"],
    digitos: ["digitos", "numero"],
  };

  for (const [opcion, [id, tipo]] of Object.entries(controles)) {
    const el = $(id);
    if (tipo === "casilla") el.checked = !!opciones[opcion];
    else el.value = opciones[opcion];

    el.addEventListener(tipo === "numero" ? "input" : "change", () => {
      if (tipo === "casilla") opciones[opcion] = el.checked;
      else if (tipo === "numero") opciones[opcion] = Number(el.value);
      else opciones[opcion] = el.value;
      guardarOpciones();
      mostrarValores();
      generar();
    });
  }

  mostrarModo();
  mostrarValores();
  generar();
})();
