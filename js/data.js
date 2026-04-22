// Datos de las canciones
// Corregido y actualizado (att. jose luis)

const songs = [
    {
        id: 1,
        title: 'Amándote',
        artist: 'Anna Carina',
        cover: 'IMG/amandote.jpg',
        audio: 'audio/amandote.mp3',
        favorite: false
    },
    {
        id: 2,
        title: 'Amárrame',
        artist: 'Mon Laferte',
        cover: 'IMG/amarrame.jpg',
        audio: 'audio/amarrame.mp3',
        favorite: false
    },
    {
        id: 3,
        title: 'Amor con Hielo',
        artist: 'Morat',
        cover: 'IMG/amorconhielo.jpg',
        audio: 'audio/amorconhielo.mp3',
        favorite: false
    },
    {
        id: 4,
        title: 'Butter',
        artist: 'BTS',
        cover: 'IMG/butter.jpeg',
        audio: 'audio/butter.mp3',
        favorite: false
    },
    {
        id: 5,
        title: 'Consejos de Amor',
        artist: 'Morat, Tini',
        cover: 'IMG/consejosdeamor.jpg',
        audio: 'audio/consejosdeamor.mp3',
        favorite: false
    },
    {
        id: 6,
        title: 'Cuando Nadie Ve',
        artist: 'Morat',
        cover: 'IMG/cuandonadieve.jpg',
        audio: 'audio/cuandonadieve.mp3',
        favorite: false
    },
    {
        id: 7,
        title: 'Dynamite',
        artist: 'BTS',
        cover: 'IMG/dynamite.jpg',
        audio: 'audio/dynamite.mp3',
        favorite: false
    },
    {
        id: 8,
        title: 'Besos en Guerra',
        artist: 'Morat',
        cover: 'IMG/besosenguerra.jpg',
        audio: 'audio/enguerra.mp3',
        favorite: false
    },
    {
        id: 9,
        title: 'Forever Young',
        artist: 'BLACKPINK',
        cover: 'IMG/foreveryoung.jpg',
        audio: 'audio/foreveryoung.mp3',
        favorite: false
    },
    {
        id: 10,
        title: 'How You Like That',
        artist: 'BLACKPINK',
        cover: 'IMG/howyoulikethat.jpg',
        audio: 'audio/howyoulikethat.mp3',
        favorite: false
    },
    {
        id: 11,
        title: 'Idol',
        artist: 'BTS',
        cover: 'IMG/idol.jpg',
        audio: 'audio/idol.mp3',
        favorite: false
    },
    {
        id: 12,
        title: 'Kill This Love',
        artist: 'BLACKPINK',
        cover: 'IMG/killthislove.jpg',
        audio: 'audio/killthislove.mp3',
        favorite: false
    },
    {
        id: 13,
        title: 'La Correcta',
        artist: 'Morat y Nabález',
        cover: 'IMG/lacorrecta.jpg',
        audio: 'audio/lacorrecta.mp3',
        favorite: false
    },
    {
        id: 14,
        title: 'LALISA',
        artist: 'Lisa',
        cover: 'IMG/lalisa.jpg',
        audio: 'audio/lalisa.mp3',
        favorite: false
    },
    {
        id: 15,
        title: 'Lovesick Girls',
        artist: 'BLACKPINK',
        cover: 'IMG/lovesickgirls.jpg',
        audio: 'audio/lovesickgirls.mp3',
        favorite: false
    },
    {
        id: 16,
        title: 'MANTRA',
        artist: 'JENNIE',
        cover: 'IMG/mantra.jpg',
        audio: 'audio/mantra.mp3',
        favorite: false
    },
    {
        id: 17,
        title: 'Mi Buen Amor',
        artist: 'MON Lafertee',
        cover: 'IMG/mibuenamor.jpg',
        audio: 'audio/mibuenamor.mp3',
        favorite: false
    },
    
    {  id: 18,
        title: 'On The Ground',
        artist: 'Rosé',
        cover: 'IMG/ontheground.jpg',
        audio: 'audio/ontheground.mp3',
        favorite: false
    },
    {
        id: 19,
        title: 'Pink Venom',
        artist: 'BLACKPINK',
        cover: 'IMG/pinkvenom.jpg',
        audio: 'audio/pinkvenom.mp3',
        favorite: false
    },
    {
        id: 20,
        title: 'Presiento',
        artist: 'Morat',
        cover: 'IMG/presiento.jpg',
        audio: 'audio/presiento.mp3',
        favorite: false
    },
    {
        id: 21,
        title: 'Rockstar',
        artist: 'Lisa',
        cover: 'IMG/rockstar.jpg',
        audio: 'audio/rockstar.mp3',
        favorite: false
    },
    {
        id: 22,
        title: 'Seven',
        artist: 'Jungkook',
        cover: 'IMG/seven.jpg',
        audio: 'audio/seven.mp3',
        favorite: false
    },
    {
        id: 23,
        title: 'Solo',
        artist: 'Jennie',
        cover: 'IMG/solo.jpg',
        audio: 'audio/solo.mp3',
        favorite: false
    },
    {
        id: 24,
        title: 'Sour Candy',
        artist: 'Lady Gaga & BLACKPINK',
        cover: 'IMG/sourcandy.jpg',
        audio: 'audio/sourcandy.mp3',
        favorite: false
    },
    {
        id: 25,
        title: 'Tu Falta de Querer',
        artist: 'Mon Laferte',
        cover: 'IMG/tufaltadequerer.jpg',
        audio: 'audio/tufaltadequerer.mp3',
        favorite: false
    },
    {
        id: 26,
        title: 'Vas a Querer Volver',
        artist: 'Maite Perroni',
        cover: 'IMG/vasaquerervolver.jpg',
        audio: 'audio/vasaquerervolver.mp3',
        favorite: false
    },
    {
        id: 27,

        title: 'No se Va',
        artist: 'Morat',
        cover: 'IMG/noseva.jpg',
        audio: 'audio/noseva.mp3',
        favorite: false
    },
    {
        id: 28,
        title: 'TQG',
        artist: 'Karol G, Shakira',
        cover: 'IMG/tqg.jpg',
        audio: 'audio/tqg.mp3',
        favorite: false
    },
    {
        id: 29,
        title: 'Paloma Ajena',
        artist: 'Agua Marina',
        cover: 'IMG/palomajena.jpg',
        audio: 'audio/palomajena.mp3',
        favorite: false
    },
    {
        id: 30,
        title: 'Tu Boda y Yo',
        artist: 'Corazon Serrano',
        cover: 'IMG/tubodayyo.jpg',
        audio: 'audio/tubodayyo.mp3',
        favorite: false
    },
    {
        id: 31,
        title: 'Sejodioto',
        artist: 'Karol G',
        cover: 'IMG/sejodioto.jpg',
        audio: 'audio/sejodioto.mp3',
        favorite: false
    },
    {
        id: 32,
        title: 'Pineapple',
        artist: 'Karol G, Becky G',
        cover: 'IMG/pineapple.jpg',
        audio: 'audio/pineapple.mp3',
        favorite: false

    },
    {
        id: 33,
        title: 'El Makinon',
        artist: 'Karol G',
        cover: 'IMG/makinon.jpg',
        audio: 'audio/makinon.mp3',
        favorite: false
    },
    { id: 34,
        title: 'Provenza',
        artist: 'Karol G',
        cover: 'IMG/provenza.jpg',
        audio: 'audio/provenza.mp3',
        favorite: false
    },
    { id: 35,
        title: 'Mi Cama',
        artist: 'Karol G',
        cover: 'IMG/micama.jpg',
        audio: 'audio/micama.mp3',
        favorite: false
    },
    { id: 36,
        title: 'Gatúbela',
        artist: 'Karol G, Maldy',
        cover: 'IMG/gatubela.jpg',
        audio: 'audio/gatubela.mp3',
        favorite: false
    },
    { id: 37,
        title: 'Ahora Me Llama',
        artist: 'Karol G, Bad Bunny',
        cover: 'IMG/ahoramellama.jpg',
        audio: 'audio/ahoramellama.mp3',
        favorite: false
    },
    { id: 38,
        title: 'Mamii',
        artist: 'Karol G, Becky G',
        cover: 'IMG/mamii.jpg',
        audio: 'audio/mamii.mp3',
        favorite: false
    },
    { id: 39,
        title: 'Si Antes Te Hubiera Conocido',
        artist: 'Karol G',
        cover: 'IMG/si.jpg',
        audio: 'audio/si.mp3',
        favorite: false
    },
    { id: 40,
        title: ' Mix Amargura',
        artist: 'Karol G',
        cover: 'IMG/mixamargura.jpg',
        audio: 'audio/mixamargura.mp3',
        favorite: false
    },
    {
        id: 41,
        title: 'Amargura',
        artist: 'Karol G',
        cover: 'IMG/mixamargura.jpg',
        audio: 'audio/amargura.mp3',
        favorite: false

    },
    {
        id: 42,
        title: 'MI EX TENÍA RAZÓN',
        artist: 'Karol G',
        cover: 'IMG/miex.jpg',
        audio: 'audio/miex.mp3',
        favorite: false
    },
    {
        id: 43,
        title: 'Culpables',
        artist: 'Karol G, Anuel AA',
        cover: 'IMG/culpables.jpg',
        audio: 'audio/culpables.mp3',
        favorite: false

    },
    {
        id: 44,
        title: 'El Barco',
        artist: 'Karol G',
        cover: 'IMG/elbarco.jpg',
        audio: 'audio/elbarco.mp3',
        favorite: false
    },
    {
        id: 45,
        title: 'Créeme',
        artist: 'Karol G, Maluma',
        cover: 'IMG/creeme.jpg',
        audio: 'audio/creeme.mp3',
        favorite: false
    },
    {
        id: 46,
        title: 'Ocean',
        artist: 'Karol G',
        cover: 'IMG/ocean.jpg',
        audio: 'audio/ocean.mp3',
        favorite: false

    },
    {
        id: 47,
        title: 'Punto G',
        artist: 'Karol G',
        cover: 'IMG/puntog.jpg',
        audio: 'audio/puntog.mp3',
        favorite: false
    },
    {
        id: 48,
        title: 'Tusa',
        artist: 'Karol G, Nicki Minaj',
        cover: 'IMG/tusa.jpg',
        audio: 'audio/tusa.mp3',
        favorite: false
    },
    {
        id: 49,
        title: 'Secreto ',
        artist: 'Anuel AA, KAROL G',
        cover: 'IMG/secreto.jpg',
        audio: 'audio/secreto.mp3',
        favorite: false
    },
    {
        id: 50,
        title: 'A Ella',
        artist: 'Karol G',
        cover: 'IMG/aella.jpg',
        audio: 'audio/aella.mp3',
        favorite: false
    },
    {
        id: 51,
        title: 'Poblado',
        artist: 'J.Balvin, Karol G, Nicky Jam, Crissin, Totoy El Frio, Natan & Shander',
        cover: 'IMG/poblado.jpg',
        audio: 'audio/poblado.mp3',
        favorite: false
    },
    {
        id: 52,
        title: 'Cairo',
        artist: 'Karol G, Ovy On The Drums',
        cover: 'IMG/cairo.jpg',
        audio: 'audio/cairo.mp3',
        favorite: false

    },
    {
        id: 53,
        title: 'Location',
        artist: 'Karol G, Anuel AA, J Balvin',
        cover: 'IMG/location.jpg',
        audio: 'audio/location.mp3',
        favorite: false
    },
    {
        id: 54,
        title: 'X Si Volvemos ',
        artist: 'Karol G, Romeo Santos',
        cover: 'IMG/xsi.jpg',
        audio: 'audio/xsi.mp3',
        favorite: false
    },
    {
        id: 55,
        title: 'Pero tu',
        artist: 'Karol G x Quevedo',
        cover: 'IMG/perotu.jpg',
        audio: 'audio/perotu.mp3',
        favorite: false ,

    },
    {
        id: 56,
        title: 'China ',
        artist: 'Anuel AA, Karol G, J. Balvin, Daddy Yankee, Ozuna',
        cover: 'IMG/china.jpg',
        audio: 'audio/china.mp3',
        favorite: false
    },
    {
        id: 57,
        title: 'GUCCI LOS PAÑOS',
        artist: 'Karol G',
        cover: 'IMG/gucci.jpg',
        audio: 'audio/gucci.mp3',
        favorite: false
    },
    {
        id: 58,
        title: 'Mientras Me Curo Del Cora',
        artist: 'Karol G',
        cover: 'IMG/mientras.jpg',
        audio: 'audio/mientras.mp3',
        favorite: false
    },
    {
        id: 59,
        title: 'S91',
        artist: 'Karol G',
        cover: 'IMG/s91.jpg',
        audio: 'audio/s91.mp3',
        favorite: false
    },
    {
        id: 60,
        title: 'Contigo',
        artist: 'Karol G,Tiësto ',
        cover: 'IMG/contigo.jpg',
        audio: 'audio/contigo.mp3',
        favorite: false
    },
    {
        id: 61,
        title: 'Tá OK',
        artist: 'DENNIS, MC Kevin o Chris, Maluma, Karol G',
        cover: 'IMG/taok.jpg',
        audio: 'audio/taok.mp3',
        favorite: false
    },
    {
        id: 62,
        title: '200 Copas',
        artist: 'Karol G,',
        cover: 'IMG/200copas.jpg',
        audio: 'audio/200copas.mp3',
        favorite: false
    },
    {
        id: 63,
        title: 'Qlona',
        artist: 'Karol G',
        cover: 'IMG/qlona.jpg',
        audio: 'audio/qlona.mp3',
        favorite: false

    },
    {
        id: 64,
        title: 'OKI DOKI',
        artist: 'Karol G',
        cover: 'IMG/okidoki.jpg',
        audio: 'audio/okidoki.mp3',
        favorite: false
    },
    {
        id: 65,
        title:'Money',
        artist:'Lisa',
        cover: 'IMG/money.jpg',
        audio: 'audio/money.mp3',
        favorite: false
    },
    {
        id: 66,
        title:'MOONLIT FLOOR',
        artist:'Lisa',
        cover: 'IMG/kiss.jpg',
        audio: 'audio/kiss.mp3',
        favorite: false
    },
    {
        id: 67,
        title:'FXCK UP THE WORLD',
        artist:'Lisa',
        cover: 'IMG/up.jpg',
        audio: 'audio/up.mp3',
        favorite: false

    },
    {
        id: 68,
        title:'New Woman',
        artist:'Lisa feat. Rosalía',
        cover: 'IMG/new.jpg',
        audio: 'audio/new.mp3',
        favorite: false
    },
    {
        id: 69,
        title:'Rapunzel',
        artist:'Lisa',
        cover: 'IMG/rapunzel.jpg',
        audio: 'audio/rapunzel.mp3',
        favorite: false
    },


    {
        id: 70,
        title:'Ahora Me Llama',
        artist:'Karol G,Bad Bunny',
        cover: 'IMG/mellama.jpg',
        audio: 'audio/mellama.mp3',
        favorite: true

    },
    {
        id:71,
        title: 'Location',
        artist:'KAROL G, Anuel AA, J. Balvin',
        cover:'IMG/location.jpg',
        audio:'audio/location.mp3',
        favorite: false
    },
    {
        id:72,
        title: 'GABRIELA',
        artist:'KATSEYE',
        cover:'IMG/gabriela.jpg',
        audio:'audio/gabriela.mp3',
        favorite: false
    },
    {
        id:73,
        title: 'EL MAKINON',
        artist:'KAROL G, Mariah Angeliq',
        cover:'IMG/makinon.jpg',
        audio:'audio/makinon.mp3',
        favorite: false
    },
    {
        id:74,
        title: '10 Mill Vidas',
        artist:'Jesse & Joy',
        cover:'IMG/10milvidas.jpg',
        audio:'audio/10milvidas.mp3',
        favorite: false
    },
    {
        id:75,
        title: 'Hold On',
        artist:'Adele',
        cover:'IMG/HoldOn.jpg',
        audio:'audio/Adele - Hold On (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:76,
        title: 'I Drink Wine',
        artist:'Adele',
        cover:'IMG/IDrinkWin.jpg',
        audio:'audio/Adele - I Drink Wine (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:77,
        title: 'BLove Is A Game',
        artist:'Adele',
        cover:'IMG/Love Is A Game.jpg',
        audio:'audio/Adele - Love Is A Game (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:78,
        title: 'My Little Love',
        artist:'Adele',
        cover:'IMG/My Little Love.jpg',
        audio:'audio/Adele - My Little Love (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:79,
        title: 'Oh My God',
        artist:'Adele',
        cover:'IMG/Oh My God.jpg',
        audio:'audio/Adele - Oh My God (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:80,
        title: 'Strangers By Nature',
        artist:'Adele',
        cover:'IMG/Strangers By Nature.jpg',
        audio:'audio/Adele - Strangers By Nature (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:81,
        title: 'To Be Loved',
        artist:'Adele',
        cover:'IMG/To Be Loved.jpg',
        audio:'audio/Adele - To Be Loved (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:82,
        title: 'Rolling in the Deep',
        artist:'Adele',
        cover:'IMG/Rolling in the Deep.jpg',
        audio:'audio/Adele-Rolling in the Deep.mp3',
        favorite: false
    },
    {
        id:83,
        title: 'All Night Parking',
        artist:'Adele',
        cover:'IMG/allnightparking.jpg',
        audio:'audio/allnightparking.mp3',
        favorite: false
    },
];

