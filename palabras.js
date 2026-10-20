// Palabras comunes en español, sin tildes ni ñ, para las frases de contraseña.
// Se pueden agregar más: app.js quita duplicados y calcula la fuerza con el total real.
window.PALABRAS = `
abeja abrazo abrigo abuelo aceite acero agua aguila ahorro aire ajedrez ajo alas alba
alegre alfombra alga almendra almohada alto amarillo amigo ancla angel anillo animal
antena anzuelo apio arbol arcilla arena arete armario arroz arte asiento atun aurora
avena avion azucar azul bahia baile balcon ballena balon banco bandera barco barro
bastante bateria baul bebida bello beso biblioteca bicicleta bigote blanco bolsa
bombilla bosque bota botella brazo brillo brisa brocha bruja buho burbuja burro buzon
caballo cabra cacao cactus cadena cafe caja calabaza calcetin caldo calle calma cama
camino camisa campana campo canal canasta cancion cangrejo canoa cantar caracol carbon
carta casa cascada castillo cebolla cebra cena cepillo cereza cerro chaleco chispa
chocolate cielo cine cinta circo ciruela ciudad clavel clima cobre coco cocina codo
cohete cojin colina collar color cometa cometa concha conejo copa corazon cordero
corona cortina cosecha cristal cuaderno cuchara cuento cuerda cueva cumbre cuna
dado dama delfin desierto diamante dibujo diente domingo dorado dragon ducha dulce
durazno eco elefante enano enero escalera escoba espejo espiga esponja estrella
fabula faro feria fiesta flauta flecha flor foca fogata fresa fruta fuego fuente
galleta gallina ganso garaje gato gaviota gigante girasol globo gorila gorra gota
grano granja grillo guante guitarra gusano hada hamaca harina helado helecho hielo
hierba higo hilo hoja hongo hormiga horno hotel huerto hueso huevo humo iglesia
imagen isla jabon jaguar jardin jarra jirafa joya juego jugo juguete ladrillo lago
lagarto lampara lana lapiz largo lata laurel leche lechuga leon letra libro lima
limon lindo linterna lirio llama llave lluvia lobo loro luna lupa madera maiz mango
mano manta manzana mapa mar marea mariposa martillo melon mesa miel mochila molino
mono montana morado mosca motor muela mundo museo musica naranja nariz nido niebla
nieve noche nube nuez oasis ocaso oceano ola olivo olla oro oruga oso otono oveja
pajaro palma paloma pan panda papel paraguas parque pasto pastel pato pavo payaso
pecera pegaso peine pelota pera perla perro pescado piano pie piedra pino pinata
pintura pirata piscina pizarra planeta plata platano plato playa pluma pollo postre
pozo prado primo puente puerta pulpo queso radio raiz rama rana raton rayo regalo
reloj remo rio roble roca rojo rosa rueda sal salsa sandia sapo selva semilla
serpiente silla sirena sol sombra sombrero sopa suelo sueno tambor taza teatro tejado
telar tenedor tesoro tiburon tierra tigre tijera tinta tomate tormenta toro torre
tortuga trigo trompeta trueno tucan tulipan tunel uva vaca valle vapor vaso vela
velero venado ventana verano verde viento violin volcan yate yogur zanahoria zapato
zorro abanico acuarela adobe aguacate alacena aldea alcancia almeja amanecer arbusto
ardilla arroyo ataud azulejo bambu baston bellota berenjena bizcocho bodega bombero
boton bufanda burrito cabana cacerola camello canela capitan caramelo cartero
casco catarata cereal cerdo cesta chicle chimenea cisne clavo cocodrilo colmena
columpio compas cosmos cuarzo cubeta dardo duende escudo esmeralda espada estufa
faisan farol fideo flamenco frijol gacela granada guayaba hipopotamo hojalata horizonte
iguana jamon jazmin koala laguna lechuza lenteja libelula lombriz loseta luciernaga
madeja maleta mandarina mapache marimba medusa mermelada mimbre mirlo mostaza nopal
nutria ostra palmera pantera papaya pepino perico pimienta pinguino pistacho pupusa
quetzal rabano rebozo relampago repollo salmon semilla sendero tamal tapete tecla
torogoz tortilla tranvia trebol volcan yuca zafiro zarzamora
`.split(/\s+/).filter(Boolean);
