// ============================================
// GAMES MODULE — Catalunya Central
// ============================================

// ---- COMARCA DATA with SVG paths (simplified polygons) ----
const COMARQUES = {
  'Bages': {
    path: 'M 185,208 L 192,205 L 203,218 L 217,215 L 218,221 L 225,225 L 225,229 L 240,231 L 255,227 L 259,224 L 275,234 L 277,229 L 284,229 L 292,234 L 295,227 L 293,223 L 294,218 L 318,204 L 326,203 L 333,227 L 339,228 L 340,225 L 335,221 L 337,210 L 345,206 L 340,202 L 346,202 L 349,205 L 355,203 L 362,207 L 358,218 L 361,221 L 362,231 L 369,234 L 369,239 L 381,237 L 385,234 L 396,236 L 389,290 L 380,290 L 372,293 L 368,300 L 371,306 L 367,311 L 368,315 L 359,324 L 360,327 L 354,328 L 357,337 L 355,343 L 351,345 L 353,350 L 349,353 L 352,362 L 329,369 L 320,366 L 320,363 L 316,360 L 314,362 L 309,358 L 304,359 L 295,366 L 297,383 L 288,386 L 285,383 L 283,386 L 284,396 L 270,396 L 261,390 L 249,387 L 248,382 L 251,372 L 246,371 L 246,364 L 240,365 L 239,368 L 222,368 L 209,382 L 200,382 L 193,373 L 194,367 L 188,363 L 183,364 L 180,369 L 176,360 L 178,357 L 173,354 L 175,351 L 171,349 L 174,345 L 170,342 L 164,344 L 161,340 L 155,342 L 144,333 L 148,330 L 156,328 L 166,332 L 163,325 L 155,323 L 161,310 L 160,305 L 154,302 L 160,301 L 163,295 L 157,287 L 159,283 L 168,280 L 170,273 L 167,270 L 177,266 L 175,264 L 177,259 L 171,247 L 163,246 L 155,251 L 148,248 L 152,242 L 155,241 L 157,244 L 163,236 L 170,234 L 180,224 L 187,223 L 182,216 L 186,215 L 184,211 L 185,208 Z',
    capital: 'Manresa',
    poblacio: 175095,
    hint: 'La seva capital és la ciutat més poblada de la Catalunya Central.',
    hint2: 'El riu Cardener hi travessa la capital.',
    color: '#c45d35',
    municipis: ['Aguilar de Segarra','Artés','Avinyó','Balsareny','Callús','Cardona','Castellbell i el Vilar','Castellfollit del Boix','Castellgalí','Castellnou de Bages','Fonollosa','Gaià','Manresa','Marganell','Monistrol de Montserrat','Mura','Navarcles','Navàs','El Pont de Vilomara i Rocafort','Rajadell','Sallent','Sant Feliu Sasserra','Sant Fruitós de Bages','Sant Joan de Vilatorrada','Sant Mateu de Bages','Sant Salvador de Guardiola','Sant Vicenç de Castellet','Santpedor','Súria','Talamanca']
  },
  'Berguedà': {
    path: 'M 327,26 L 339,32 L 355,27 L 379,36 L 378,40 L 373,42 L 367,47 L 366,52 L 360,56 L 361,60 L 356,68 L 361,75 L 368,72 L 372,73 L 371,85 L 375,86 L 376,93 L 373,96 L 364,94 L 358,101 L 349,101 L 345,98 L 350,92 L 346,89 L 347,87 L 331,84 L 331,94 L 340,93 L 350,107 L 349,109 L 362,109 L 364,112 L 371,113 L 380,119 L 340,130 L 338,160 L 340,180 L 345,192 L 340,202 L 337,210 L 335,221 L 340,225 L 339,228 L 333,227 L 326,203 L 318,204 L 294,218 L 293,223 L 295,227 L 292,234 L 284,229 L 277,229 L 275,234 L 259,224 L 255,227 L 240,231 L 225,229 L 225,225 L 218,221 L 217,215 L 203,218 L 192,205 L 185,208 L 184,202 L 186,197 L 190,197 L 193,194 L 197,195 L 194,200 L 201,203 L 218,194 L 216,191 L 217,186 L 212,185 L 212,182 L 209,179 L 204,183 L 209,190 L 207,194 L 202,189 L 191,190 L 192,186 L 187,183 L 188,176 L 194,179 L 209,171 L 206,163 L 201,161 L 199,166 L 195,163 L 198,155 L 205,147 L 203,146 L 205,141 L 212,144 L 219,139 L 220,134 L 211,131 L 214,125 L 209,120 L 208,117 L 215,107 L 219,108 L 227,102 L 226,95 L 223,91 L 221,101 L 213,103 L 205,97 L 200,96 L 189,101 L 182,85 L 169,83 L 168,77 L 175,63 L 189,55 L 202,54 L 206,50 L 204,44 L 196,42 L 197,39 L 225,40 L 226,37 L 237,35 L 245,37 L 257,31 L 270,31 L 278,26 L 291,25 L 298,21 L 304,20 L 310,23 L 315,22 L 321,27 L 324,24 L 327,26 Z',
    capital: 'Berga',
    poblacio: 39013,
    hint: 'Comarca pirinenca coneguda pel riu Llobregat i els seus orígens.',
    hint2: 'La Patum és la seva festa més famosa.',
    color: '#d4853a',
    municipis: ['Avià','Bagà','Berga','Borredà','Capolat','Casserres','Castell de l\'Areny','Castellar de n\'Hug','Castellar del Riu','Cercs','Espunyola','Fígols','Gironella','Gisclareny','Gósol','Guardiola de Berguedà','Montclar','Montmajor','Olvan','La Pobla de Lillet','Puig-reig','La Quar','Sagàs','Saldes','Sant Jaume de Frontanyà','Sant Julià de Cerdanyola','Santa Maria de Merlès','Vallcebre','Vilada','Viver i Serrateix']
  },
  'Solsonès': {
    path: 'M 21,208 L 20,204 L 22,203 L 25,196 L 29,193 L 28,189 L 40,191 L 54,186 L 51,174 L 53,162 L 51,146 L 49,148 L 39,145 L 36,137 L 37,127 L 52,119 L 55,110 L 61,107 L 69,108 L 78,104 L 85,104 L 92,110 L 103,106 L 126,91 L 129,87 L 129,81 L 142,78 L 161,83 L 182,85 L 189,101 L 200,96 L 205,97 L 213,103 L 221,101 L 223,91 L 226,95 L 227,102 L 219,108 L 215,107 L 208,117 L 209,120 L 214,125 L 211,131 L 220,134 L 219,139 L 212,144 L 205,141 L 203,146 L 205,147 L 198,155 L 195,163 L 199,166 L 201,161 L 206,163 L 209,171 L 194,179 L 188,176 L 187,183 L 192,186 L 191,190 L 202,189 L 207,194 L 209,190 L 204,183 L 209,179 L 212,182 L 212,185 L 217,186 L 216,191 L 218,194 L 201,203 L 194,200 L 197,195 L 193,194 L 190,197 L 186,197 L 184,202 L 185,208 L 184,211 L 186,215 L 182,216 L 187,223 L 180,224 L 170,234 L 163,236 L 157,244 L 155,241 L 152,242 L 148,248 L 155,251 L 163,246 L 171,247 L 177,259 L 175,264 L 177,266 L 167,270 L 170,273 L 168,280 L 159,283 L 157,287 L 163,295 L 160,301 L 154,302 L 151,298 L 145,301 L 145,304 L 139,304 L 137,311 L 130,310 L 132,308 L 122,304 L 119,295 L 115,294 L 110,295 L 111,301 L 101,304 L 99,301 L 104,298 L 104,289 L 116,279 L 105,272 L 114,267 L 119,259 L 116,254 L 118,252 L 117,236 L 110,234 L 100,245 L 92,243 L 83,233 L 75,229 L 71,230 L 61,223 L 49,229 L 49,234 L 41,235 L 40,240 L 33,241 L 33,232 L 29,225 L 22,227 L 28,220 L 31,213 L 21,208 Z',
    capital: 'Solsona',
    poblacio: 13360,
    hint: 'Comarca amb la capital més petita de la Catalunya Central.',
    hint2: 'Famosa pel carnaval i els gegants bojos.',
    color: '#8b6f47',
    municipis: ['Castellar de la Ribera','Clariana de Cardener','La Coma i la Pedra','Guixers','Lladurs','Llobera','La Molsosa','Navès','Odèn','Olius','Pinell de Solsonès','Pinós','Riner','Sant Llorenç de Morunys','Solsona','Torà','Biosca']
  },
  'Moianès': {
    path: 'M 396,236 L 411,233 L 414,237 L 411,243 L 404,245 L 407,248 L 406,254 L 414,261 L 418,261 L 420,267 L 419,275 L 424,282 L 422,285 L 432,292 L 434,302 L 434,314 L 432,318 L 436,325 L 420,328 L 405,322 L 392,318 L 380,310 L 372,306 L 368,300 L 367,294 L 370,290 L 375,292 L 378,294 L 385,294 L 389,301 L 406,299 L 411,293 L 421,292 L 426,288 L 422,285 L 424,282 L 419,275 L 420,267 L 418,261 L 414,261 L 406,254 L 407,248 L 404,245 L 411,243 L 414,237 L 411,233 L 396,236 Z',
    capital: 'Moià',
    poblacio: 13279,
    hint: 'La comarca més jove de Catalunya, creada el 2015.',
    hint2: 'El seu nom prové de la seva capital.',
    color: '#6b8e5e',
    municipis: ['Calders','Castellcir','Castellterçol','Collsuspina','L\'Estany','Granera','Moià','Monistrol de Calders','Sant Quirze Safaja','Santa Maria d\'Oló']
  },
  'Osona': {
    path: 'M 380,119 L 394,114 L 393,122 L 405,128 L 414,118 L 422,116 L 433,117 L 434,122 L 439,122 L 445,119 L 443,117 L 445,113 L 479,114 L 481,110 L 480,105 L 474,102 L 476,101 L 484,101 L 487,105 L 504,99 L 521,98 L 525,100 L 513,103 L 509,109 L 509,115 L 522,122 L 519,128 L 522,133 L 531,133 L 529,141 L 535,149 L 544,154 L 555,146 L 561,147 L 566,153 L 568,151 L 573,151 L 576,156 L 569,159 L 570,162 L 580,170 L 577,175 L 575,175 L 575,180 L 578,180 L 577,185 L 563,189 L 572,193 L 568,195 L 564,200 L 565,202 L 555,203 L 548,199 L 544,202 L 550,207 L 548,213 L 564,218 L 568,222 L 569,229 L 557,240 L 552,240 L 551,245 L 556,248 L 553,257 L 550,257 L 548,261 L 542,260 L 540,266 L 543,269 L 537,273 L 535,277 L 536,286 L 539,287 L 533,288 L 523,284 L 514,293 L 515,304 L 501,308 L 498,296 L 487,290 L 480,294 L 468,290 L 461,299 L 463,307 L 461,313 L 467,316 L 468,324 L 436,325 L 432,318 L 434,314 L 434,302 L 432,292 L 396,236 L 393,221 L 395,210 L 394,114 L 380,119 Z',
    capital: 'Vic',
    poblacio: 156572,
    hint: 'Comarca amb una plana interior famosa per les seves boires.',
    hint2: 'La seva capital té una plaça Major emblemàtica.',
    color: '#5a7d9a',
    municipis: ['Aiguafreda','Balenyà','Brull','Calldetenes','Centelles','Espinelves','Folgueroles','Gurb','Les Masies de Roda','Les Masies de Voltregà','Manlleu','Malla','Montesquiu','Muntanyola','Oristà','Orís','El Brull','Prats de Lluçanès','Roda de Ter','Rupit i Pruit','Sant Boi de Lluçanès','Sant Bartomeu del Grau','Sant Hipòlit de Voltregà','Sant Julià de Vilatorta','Sant Martí d\'Albars','Sant Pere de Torelló','Sant Quirze de Besora','Sant Sadurní d\'Osormort','Sant Vicenç de Torelló','Santa Cecília de Voltregà','Santa Eugènia de Berga','Santa Eulàlia de Riuprimer','Seva','Sobremunt','Sora','Taradell','Tavèrnoles','Tona','Torelló','Vic','Vidrà','Viladrau','Vilanova de Sau']
  },
  'Anoia': {
    path: 'M 104,289 L 104,298 L 99,301 L 101,304 L 111,301 L 110,295 L 115,294 L 119,295 L 122,304 L 132,308 L 130,310 L 137,311 L 139,304 L 145,304 L 145,301 L 151,298 L 160,305 L 161,310 L 155,323 L 163,325 L 166,332 L 156,328 L 148,330 L 144,333 L 155,342 L 161,340 L 164,344 L 170,342 L 174,345 L 171,349 L 175,351 L 173,354 L 178,357 L 176,360 L 180,369 L 183,364 L 188,363 L 194,367 L 193,373 L 200,382 L 209,382 L 222,368 L 239,368 L 240,365 L 246,364 L 246,371 L 251,372 L 248,382 L 249,387 L 261,390 L 258,404 L 253,411 L 254,413 L 262,415 L 266,422 L 273,430 L 279,433 L 279,440 L 275,440 L 265,452 L 260,453 L 256,457 L 252,455 L 250,460 L 243,463 L 244,469 L 241,471 L 231,467 L 232,465 L 209,457 L 200,440 L 182,440 L 166,437 L 168,441 L 163,441 L 163,447 L 155,448 L 149,453 L 149,458 L 155,463 L 158,463 L 161,468 L 150,472 L 147,469 L 142,469 L 118,480 L 115,476 L 106,476 L 103,472 L 110,463 L 110,456 L 105,454 L 105,450 L 95,450 L 92,446 L 81,444 L 70,437 L 71,429 L 75,425 L 83,427 L 87,423 L 93,424 L 92,416 L 87,418 L 84,415 L 95,408 L 80,401 L 77,401 L 75,404 L 67,404 L 68,400 L 74,397 L 74,392 L 68,392 L 52,385 L 65,379 L 67,374 L 93,373 L 94,368 L 86,365 L 83,360 L 83,356 L 78,353 L 81,348 L 72,347 L 72,343 L 69,343 L 71,338 L 62,337 L 82,322 L 72,317 L 76,302 L 78,302 L 80,294 L 78,292 L 83,288 L 99,290 L 104,289 Z',
    capital: 'Igualada',
    poblacio: 120000,
    hint: 'Comarca que connecta la depressió central amb el litoral.',
    hint2: 'La seva capital és famosa per la indústria de la pell i el cuir.',
    color: '#9b7a5e',
    municipis: ['Argençola','Bellprat','El Bruc','Cabrera d\'Anoia','Calaf','Calonge de Segarra','Capellades','Carme','Castellfollit de Riubregós','Castellolí','Copons','Els Hostalets de Pierola','Igualada','Jorba','La Llacuna','Masquefa','Montmaneu','Òdena','Orpí','Piera','La Pobla de Claramunt','Pujalt','Rubió','Sant Martí de Tous','Sant Martí Sesgueioles','Santa Margarida de Montbui','La Torre de Claramunt','Vallbona d\'Anoia','Veciana','Vilanova del Camí']
  },
  'Lluçanès': {
    path: 'M 340,130 L 355,120 L 371,113 L 380,119 L 394,114 L 395,210 L 393,221 L 396,236 L 385,234 L 381,237 L 369,239 L 369,234 L 362,231 L 361,221 L 358,218 L 362,207 L 355,203 L 349,205 L 346,202 L 340,202 L 345,192 L 340,180 L 338,160 L 340,130 Z',
    capital: 'Prats de Lluçanès',
    poblacio: 8000,
    hint: 'La comarca més recent de Catalunya, creada el 2023.',
    hint2: 'Formada per municipis que abans pertanyien a Osona i Bages.',
    color: '#7a6b8e',
    municipis: ['Alpens','Lluçà','Olost','Oristà','Perafita','Prats de Lluçanès','Sant Agustí de Lluçanès','Sant Bartomeu del Grau','Sant Boi de Lluçanès','Sobremunt']
  }
};

// ---- DIFFICULTY LEVELS ----
const DIFFICULTIES = {
  'molt-facil': { name: 'Molt Fàcil', emoji: '😊', maxErrors: 99, showHint1: true, showHint2: true, showCapital: true, desc: 'Pistes completes + capital visible' },
  'facil': { name: 'Fàcil', emoji: '🙂', maxErrors: 10, showHint1: true, showHint2: false, showCapital: false, desc: 'Una pista per comarca' },
  'normal': { name: 'Normal', emoji: '😐', maxErrors: 5, showHint1: false, showHint2: false, showCapital: false, desc: 'Sense pistes, 5 errors permesos' },
  'dificil': { name: 'Difícil', emoji: '😤', maxErrors: 3, showHint1: false, showHint2: false, showCapital: false, desc: 'Sense pistes, només 3 errors' },
  'moreneta': { name: 'Moreneta Mode', emoji: '🙏', maxErrors: 1, showHint1: false, showHint2: false, showCapital: false, desc: 'Un sol error i perds. Per als valents!' }
};

// ---- FUN FACTS ----
const FUN_FACTS = [
  { fact: "El Bages és conegut com «el cor de Catalunya» per la seva situació geogràfica central.", source: "Viu el Bages" },
  { fact: "La Séquia de Manresa, construïda al segle XIV, té 26 km i porta aigua del Llobregat a la ciutat. Va ser una obra d'enginyeria medieval impressionant.", source: "Patrimoni de Manresa" },
  { fact: "Montserrat rep més de 2,5 milions de visitants cada any, sent el santuari més visitat de Catalunya.", source: "Turisme de Catalunya" },
  { fact: "La muntanya de sal de Cardona és un fenomen geològic únic al món. S'hi pot visitar una mina de sal que va estar activa durant més de 1.000 anys.", source: "Turisme Cardona" },
  { fact: "La Patum de Berga, declarada Patrimoni Immaterial de la Humanitat per la UNESCO el 2005, és una de les festes més antigues de Catalunya.", source: "UNESCO" },
  { fact: "Vic és famosa per les seves boires persistents a l'hivern, un fenomen causat per la inversió tèrmica a la plana d'Osona.", source: "Servei Meteorològic de Catalunya" },
  { fact: "El Carnaval de Solsona és famós pels «gegants bojos» i per penjar un ruc del campanar — una tradició que simbolitza la bogeria del carnaval.", source: "Cultura Popular Solsonès" },
  { fact: "El Moianès és la comarca més jove de Catalunya, creada el 15 d'abril de 2015, amb Moià com a capital.", source: "Generalitat de Catalunya" },
  { fact: "Manresa va ser la ciutat on Sant Ignasi de Loiola va tenir les seves visions místiques el 1522, que van portar a la fundació dels Jesuïtes.", source: "Cova de Sant Ignasi" },
  { fact: "La Seu de Manresa (Basílica de Santa Maria de la Seu) és un dels edificis gòtics més grans de Catalunya, amb una nau de 18 metres d'amplada.", source: "Manresa Turisme" },
  { fact: "El Geoparc de la Catalunya Central, declarat per la UNESCO el 2012, és l'únic geoparc de Catalunya i un dels pocs d'Espanya.", source: "UNESCO Geoparcs" },
  { fact: "Igualada és la capital europea de la pell i el cuir, amb una tradició que es remunta al segle XVIII.", source: "Museu de la Pell d'Igualada" },
  { fact: "El Pont Vell de Manresa, d'origen medieval (segle XII), és un dels ponts romànics més ben conservats de Catalunya.", source: "Patrimoni de Manresa" },
  { fact: "A la Catalunya Central hi viuen més de 500.000 persones repartides en més de 150 municipis.", source: "Idescat" },
  { fact: "El riu Llobregat neix a Castellar de n'Hug (Berguedà) i travessa tota la Catalunya Central fins arribar al mar a prop de Barcelona.", source: "ACA" },
  { fact: "La paraula «pipiripip» per referir-se a la rosella (amapola) és gairebé exclusiva del Bages i rodalies — no es troba documentada en cap altre lloc del domini lingüístic català.", source: "ALDC" },
  { fact: "Manresa té el rècord de temperatura més baixa registrada en una capital comarcal de la depressió central: -18,2°C.", source: "Servei Meteorològic de Catalunya" },
  { fact: "El Lluçanès és la comarca més recent de Catalunya, creada el 2023, formada per municipis que abans pertanyien a Osona.", source: "Generalitat de Catalunya" },
  { fact: "Les Comarques Centrals tenen un 89,3% de població que sap parlar català, la taxa més alta de tot Catalunya.", source: "EULP 2023, Idescat" },
  { fact: "La comarca del Berguedà va ser un dels principals centres industrials tèxtils de Catalunya al segle XIX, amb les colònies industrials al llarg del Llobregat.", source: "Museu de les Colònies" },
  { fact: "El santuari de la Mare de Déu de Montserrat alberga la imatge de la Moreneta, una talla romànica del segle XII, patrona de Catalunya.", source: "Abadia de Montserrat" },
  { fact: "A Manresa s'hi diu «torreta» al que a la resta de Catalunya en diuen «test» (maceta). El 93,1% dels manresans utilitza aquesta paraula.", source: "Estudi El Català Manresà" },
  { fact: "El mot «prouta» (en comptes de «prou» + «ta») és un dels trets més característics del parlar bagenc.", source: "Estudi El Català Manresà" },
  { fact: "Calaf és coneguda com «la cruïlla de Catalunya» pel seu encreuament històric de camins entre Barcelona, Lleida i el Pirineu.", source: "Turisme Anoia" },
  { fact: "El pantà de la Llosa del Cavall, al Solsonès, és un dels embassaments més grans de la Catalunya Central amb 80 hm³ de capacitat.", source: "ACA" },
  { fact: "Vic celebra el Mercat Medieval cada desembre, un dels mercats temàtics més grans de Catalunya amb més de 500 parades.", source: "Ajuntament de Vic" },
  { fact: "La torre de l'amo de la colònia Vidal, a Puig-reig, va ser dissenyada per un deixeble de Gaudí.", source: "Patrimoni del Berguedà" },
  { fact: "Santpedor, amb un 75,4% d'ús de la variant manresana, té fins i tot un índex més alt que la pròpia Manresa (73,6%).", source: "Estudi El Català Manresà" },
  { fact: "Les mines de Súria i Sallent produeixen potassa i sal des de principis del segle XX, formant un dels complexos miners més importants del sud d'Europa.", source: "ICL Ibérica" },
  { fact: "El Parc Natural de Sant Llorenç del Munt i l'Obac, entre el Bages i el Vallès, té el cim de La Mola a 1.104 metres amb un monestir al capdamunt.", source: "Diputació de Barcelona" }
];

// ---- GAME STATE ----
let gameMode = 'comarques'; // 'comarques' or 'municipis'
let gameDifficulty = 'normal';
let gameComarcaFilter = null; // for municipis mode
let gameQuestions = [];
let gameCurrentIdx = 0;
let gameErrors = 0;
let gameCorrect = 0;
let gameFinished = false;

// ---- INIT GAMES ----
function initGames() {
  renderDifficultySelector();
  renderFunFact();
}

function renderDifficultySelector() {
  const container = document.getElementById('game-setup');
  if (!container) return;

  let html = `
    <div class="game-mode-selector">
      <h4>Mode de joc</h4>
      <div class="game-mode-btns">
        <button class="game-mode-btn active" data-mode="comarques" onclick="setGameMode('comarques')">
          <span class="mode-emoji">🗺️</span>
          <span class="mode-name">Comarques</span>
          <span class="mode-desc">Endevina les 7 comarques</span>
        </button>
        <button class="game-mode-btn" data-mode="municipis" onclick="setGameMode('municipis')">
          <span class="mode-emoji">🏘️</span>
          <span class="mode-name">Municipis</span>
          <span class="mode-desc">Endevina poblacions per comarca</span>
        </button>
      </div>
    </div>

    <div id="comarca-filter-section" class="hidden">
      <h4>Escull la comarca</h4>
      <div class="comarca-filter-btns">
        ${Object.keys(COMARQUES).map(c => `<button class="comarca-filter-btn" onclick="setComarcaFilter('${c}')">${c}</button>`).join('')}
      </div>
    </div>

    <div class="difficulty-selector">
      <h4>Dificultat</h4>
      <div class="difficulty-btns">
        ${Object.entries(DIFFICULTIES).map(([key, d]) => `
          <button class="diff-btn ${key === 'normal' ? 'active' : ''}" data-diff="${key}" onclick="setDifficulty('${key}')">
            <span class="diff-emoji">${d.emoji}</span>
            <span class="diff-name">${d.name}</span>
            <span class="diff-desc">${d.desc}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <button class="cta-btn" id="start-game-btn" onclick="startGame()">Començar!</button>
  `;
  container.innerHTML = html;
}

function setGameMode(mode) {
  gameMode = mode;
  document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  const filterSection = document.getElementById('comarca-filter-section');
  if (mode === 'municipis') {
    filterSection.classList.remove('hidden');
  } else {
    filterSection.classList.add('hidden');
    gameComarcaFilter = null;
  }
}

function setComarcaFilter(comarca) {
  gameComarcaFilter = comarca;
  document.querySelectorAll('.comarca-filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === comarca);
  });
}

function setDifficulty(diff) {
  gameDifficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-diff="${diff}"]`).classList.add('active');
}

// ---- START GAME ----
function startGame() {
  gameCurrentIdx = 0;
  gameErrors = 0;
  gameCorrect = 0;
  gameFinished = false;

  if (gameMode === 'comarques') {
    gameQuestions = Object.keys(COMARQUES).sort(() => Math.random() - 0.5);
  } else {
    if (!gameComarcaFilter) {
      alert('Escull una comarca primer!');
      return;
    }
    const municipis = COMARQUES[gameComarcaFilter].municipis;
    gameQuestions = [...municipis].sort(() => Math.random() - 0.5);
  }

  document.getElementById('game-setup').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  document.getElementById('game-result').classList.add('hidden');
  showGameQuestion();
}

function showGameQuestion() {
  const diff = DIFFICULTIES[gameDifficulty];

  if (gameCurrentIdx >= gameQuestions.length || gameErrors >= diff.maxErrors) {
    showGameResult();
    return;
  }

  const target = gameQuestions[gameCurrentIdx];
  const play = document.getElementById('game-play');

  // Generate map SVG
  let mapHtml = '';
  if (gameMode === 'comarques') {
    mapHtml = generateComarquesMap(target, diff);
  } else {
    mapHtml = generateMunicipisQuestion(target, diff);
  }

  const progress = `${gameCurrentIdx + 1} / ${gameQuestions.length}`;
  const maxErr = diff.maxErrors === 99 ? '∞' : diff.maxErrors;
  const heartsLeft = diff.maxErrors === 99 ? '∞' : (diff.maxErrors - gameErrors);

  play.innerHTML = `
    <div class="game-hud">
      <div class="hud-item">
        <span class="hud-label">Progrés</span>
        <span class="hud-value">${progress}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Encerts</span>
        <span class="hud-value hud-correct">${gameCorrect}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Errors</span>
        <span class="hud-value hud-errors">${gameErrors} / ${maxErr}</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Dificultat</span>
        <span class="hud-value">${diff.emoji} ${diff.name}</span>
      </div>
      <div class="hud-item">
        <button class="hud-reset-btn" onclick="confirmResetGame()">↺ Reiniciar</button>
      </div>
    </div>
    ${mapHtml}
  `;
}

function generateComarquesMap(targetComarca, diff) {
  const svgW = 520, svgH = 400;

  let paths = '';
  Object.entries(COMARQUES).forEach(([name, data]) => {
    const isTarget = name === targetComarca;
    const isCorrect = gameQuestions.indexOf(name) < gameCurrentIdx && gameQuestions.indexOf(name) >= 0;
    const alreadyDone = gameCurrentIdx > gameQuestions.indexOf(name) && gameQuestions.indexOf(name) !== -1;

    let fill = 'var(--c-bg-alt)';
    let stroke = 'var(--c-border)';
    let opacity = '1';
    let cursor = 'pointer';
    let label = '';

    if (alreadyDone && !isTarget) {
      fill = data.color;
      stroke = data.color;
      opacity = '0.4';
      cursor = 'default';
      label = name;
    }

    paths += `<path d="${data.path}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${opacity}" 
      style="cursor:${cursor};transition:all 0.2s" 
      onclick="guessComarca('${name}')" 
      onmouseenter="this.style.opacity='0.7'" onmouseleave="this.style.opacity='${opacity}'"
      data-comarca="${name}"/>`;

    // Show label for completed ones
    if (alreadyDone && !isTarget) {
      const bounds = getPathCenter(data.path);
      paths += `<text x="${bounds.x}" y="${bounds.y}" text-anchor="middle" fill="var(--c-text)" font-size="11" font-family="Inter" font-weight="500" pointer-events="none">${name}</text>`;
    }
  });

  // Hints
  let hintsHtml = '';
  const targetData = COMARQUES[targetComarca];
  if (diff.showCapital) {
    hintsHtml += `<div class="game-hint">🏛️ Capital: <strong>${targetData.capital}</strong></div>`;
  }
  if (diff.showHint1) {
    hintsHtml += `<div class="game-hint">💡 ${targetData.hint}</div>`;
  }
  if (diff.showHint2) {
    hintsHtml += `<div class="game-hint">💡 ${targetData.hint2}</div>`;
  }

  return `
    <div class="game-question-text">On és <strong>${targetComarca}</strong>?</div>
    ${hintsHtml}
    <div class="game-map-container">
      <svg viewBox="0 0 ${svgW} ${svgH}" class="game-map-svg">${paths}</svg>
    </div>
  `;
}

function generateMunicipisQuestion(targetMunicipi, diff) {
  const comarca = gameComarcaFilter;
  const allMunicipis = COMARQUES[comarca].municipis;

  // Generate multiple choice (4 options)
  let options = [targetMunicipi];
  const others = allMunicipis.filter(m => m !== targetMunicipi);
  while (options.length < Math.min(4, allMunicipis.length)) {
    const rand = others[Math.floor(Math.random() * others.length)];
    if (!options.includes(rand)) options.push(rand);
  }
  options.sort(() => Math.random() - 0.5);

  let hintsHtml = '';
  if (diff.showHint1) {
    const idx = allMunicipis.indexOf(targetMunicipi);
    hintsHtml += `<div class="game-hint">💡 La primera lletra és: <strong>${targetMunicipi[0]}</strong></div>`;
  }
  if (diff.showHint2) {
    hintsHtml += `<div class="game-hint">💡 Té ${targetMunicipi.length} lletres</div>`;
  }

  return `
    <div class="game-question-text">Quin d'aquests municipis pertany a <strong>${comarca}</strong>?</div>
    <div class="game-question-sub">Selecciona: <strong>${targetMunicipi}</strong></div>
    ${hintsHtml}
    <div class="game-options-grid">
      ${options.map(o => `
        <button class="game-option-btn" onclick="guessMunicipi('${o.replace(/'/g, "\\'")}', '${targetMunicipi.replace(/'/g, "\\'")}')">${o}</button>
      `).join('')}
    </div>
  `;
}

function getPathCenter(pathStr) {
  const nums = pathStr.match(/[\d.]+/g).map(Number);
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < nums.length; i += 2) {
    if (i + 1 < nums.length) {
      sumX += nums[i];
      sumY += nums[i + 1];
      count++;
    }
  }
  return { x: sumX / count, y: sumY / count };
}

// ---- GUESS HANDLERS ----
function guessComarca(guess) {
  if (gameFinished) return;
  const target = gameQuestions[gameCurrentIdx];

  if (guess === target) {
    gameCorrect++;
    gameCurrentIdx++;
    // Flash green on the path
    const el = document.querySelector(`[data-comarca="${guess}"]`);
    if (el) {
      el.style.fill = COMARQUES[guess].color;
      el.style.opacity = '0.6';
    }
    setTimeout(() => showGameQuestion(), 400);
  } else {
    gameErrors++;
    // Flash red
    const el = document.querySelector(`[data-comarca="${guess}"]`);
    if (el) {
      el.style.fill = '#e74c3c';
      setTimeout(() => { el.style.fill = 'var(--c-bg-alt)'; }, 500);
    }
    // Check if game over
    if (gameErrors >= DIFFICULTIES[gameDifficulty].maxErrors) {
      setTimeout(() => showGameResult(), 600);
    } else {
      // Update HUD errors
      const errEl = document.querySelector('.hud-errors');
      if (errEl) {
        const maxErr = DIFFICULTIES[gameDifficulty].maxErrors === 99 ? '∞' : DIFFICULTIES[gameDifficulty].maxErrors;
        errEl.textContent = `${gameErrors} / ${maxErr}`;
      }
    }
  }
}

function guessMunicipi(guess, target) {
  if (gameFinished) return;

  if (guess === target) {
    gameCorrect++;
    gameCurrentIdx++;
    setTimeout(() => showGameQuestion(), 300);
  } else {
    gameErrors++;
    if (gameErrors >= DIFFICULTIES[gameDifficulty].maxErrors) {
      setTimeout(() => showGameResult(), 300);
    } else {
      // Mark wrong button
      event.target.style.background = '#e74c3c';
      event.target.style.color = '#fff';
      event.target.style.pointerEvents = 'none';
    }
  }
}

// ---- GAME RESULT ----
function showGameResult() {
  gameFinished = true;
  document.getElementById('game-play').classList.add('hidden');
  const result = document.getElementById('game-result');
  result.classList.remove('hidden');

  const total = gameQuestions.length;
  const pct = Math.round(gameCorrect / total * 100);
  const diff = DIFFICULTIES[gameDifficulty];
  const lost = gameErrors >= diff.maxErrors && diff.maxErrors < 99;

  let emoji, message;
  if (lost) {
    emoji = '💔';
    message = `Has perdut al ${diff.name}! Has encertat ${gameCorrect} de ${total} abans de superar el límit d'errors.`;
  } else if (pct === 100) {
    emoji = '🏆';
    message = `Perfecte! Has encertat totes ${total} ${gameMode === 'comarques' ? 'comarques' : 'preguntes'} al ${diff.name}!`;
  } else if (pct >= 70) {
    emoji = '🎉';
    message = `Molt bé! ${gameCorrect} de ${total} correctes (${pct}%) al ${diff.name}.`;
  } else {
    emoji = '📚';
    message = `${gameCorrect} de ${total} correctes (${pct}%). Segueix practicant!`;
  }

  result.innerHTML = `
    <div class="game-result-card">
      <div class="game-result-emoji">${emoji}</div>
      <h3>${lost ? 'Game Over!' : 'Resultat'}</h3>
      <p class="game-result-text">${message}</p>
      <div class="game-result-stats">
        <div class="grs"><span class="grs-val">${gameCorrect}</span><span class="grs-label">Encerts</span></div>
        <div class="grs"><span class="grs-val">${gameErrors}</span><span class="grs-label">Errors</span></div>
        <div class="grs"><span class="grs-val">${pct}%</span><span class="grs-label">Precisió</span></div>
      </div>
      <div class="game-result-actions">
        <button class="cta-btn" onclick="restartGame()">Torna a jugar</button>
        <button class="cta-btn cta-secondary" onclick="backToSetup()">Canviar opcions</button>
      </div>
    </div>
  `;
}

function confirmResetGame() {
  // Show confirmation overlay
  const play = document.getElementById('game-play');
  const existing = document.getElementById('reset-confirm-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'reset-confirm-overlay';
  overlay.className = 'reset-overlay';
  overlay.innerHTML = `
    <div class="reset-dialog">
      <p>N'est\u00e0s segur que vols reiniciar la partida?</p>
      <p class="reset-sub">Perdràs tot el progrés actual.</p>
      <div class="reset-actions">
        <button class="cta-btn" onclick="doResetGame()">Sí, reinicia</button>
        <button class="cta-btn cta-secondary" onclick="cancelReset()">No, continua</button>
      </div>
    </div>
  `;
  play.appendChild(overlay);
}

function doResetGame() {
  const overlay = document.getElementById('reset-confirm-overlay');
  if (overlay) overlay.remove();
  startGame();
}

function cancelReset() {
  const overlay = document.getElementById('reset-confirm-overlay');
  if (overlay) overlay.remove();
}

function restartGame() {
  startGame();
}

function backToSetup() {
  document.getElementById('game-play').classList.add('hidden');
  document.getElementById('game-result').classList.add('hidden');
  document.getElementById('game-setup').classList.remove('hidden');
}

// ---- FUN FACT ----
function renderFunFact() {
  const container = document.getElementById('fun-fact-container');
  if (!container) return;

  // Use day of year as seed for daily rotation
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const factIdx = dayOfYear % FUN_FACTS.length;
  const fact = FUN_FACTS[factIdx];

  container.innerHTML = `
    <div class="fun-fact-card">
      <div class="fun-fact-header">
        <span class="fun-fact-emoji">💡</span>
        <span class="fun-fact-title">Sabies que...</span>
        <span class="fun-fact-day">Curiositat del dia</span>
      </div>
      <p class="fun-fact-text">${fact.fact}</p>
      <p class="fun-fact-source">Font: ${fact.source}</p>
    </div>
    <button class="fun-fact-more" onclick="showRandomFact()">Mostra'n una altra →</button>
  `;
}

function showRandomFact() {
  const container = document.getElementById('fun-fact-container');
  const randomIdx = Math.floor(Math.random() * FUN_FACTS.length);
  const fact = FUN_FACTS[randomIdx];

  const card = container.querySelector('.fun-fact-card');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'fadeIn 0.3s ease';

  container.querySelector('.fun-fact-text').textContent = fact.fact;
  container.querySelector('.fun-fact-source').textContent = `Font: ${fact.source}`;
}

// Global exports
window.setGameMode = setGameMode;
window.setComarcaFilter = setComarcaFilter;
window.setDifficulty = setDifficulty;
window.startGame = startGame;
window.guessComarca = guessComarca;
window.guessMunicipi = guessMunicipi;
window.restartGame = restartGame;
window.backToSetup = backToSetup;
window.confirmResetGame = confirmResetGame;
window.doResetGame = doResetGame;
window.cancelReset = cancelReset;
window.showRandomFact = showRandomFact;
window.initGames = initGames;
