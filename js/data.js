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
        artist: 'Morat',
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
        artist: 'Morat',
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
        artist: 'Jennie Kim',
        cover: 'IMG/mantra.jpg',
        audio: 'audio/mantra.mp3',
        favorite: false
    },
    {
        id: 17,
        title: 'Mi Buen Amor',
        artist: 'Mon Laferte',
        cover: 'IMG/mibuenamor.jpg',
        audio: 'audio/mibuenamor.mp3',
        favorite: false
    },
    {
        id: 18,
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
        title:'Ahora Me Llama',
        artist:'Karol G,Bad Bunny',
        cover: 'IMG/mellama.jpg',
        audio: 'audio/mellama.mp3',
        favorite: true

    },
    {
        id:28,
        title: 'Location',
        artist:'KAROL G, Anuel AA, J. Balvin',
        cover:'IMG/location.jpg',
        audio:'audio/location.mp3',
        favorite: false
    },
    {
        id:29,
        title: 'GABRIELA',
        artist:'KATSEYE',
        cover:'IMG/gabriela.jpg',
        audio:'audio/gabriela.mp3',
        favorite: false
    },
    {
        id:30,
        title: 'EL MAKINON',
        artist:'KAROL G, Mariah Angeliq',
        cover:'IMG/makinon.jpg',
        audio:'audio/makinon.mp3',
        favorite: false
    },
    {
        id:31,
        title: '10 Mill Vidas',
        artist:'Jesse & Joy',
        cover:'IMG/10milvidas.jpg',
        audio:'audio/10milvidas.mp3',
        favorite: false
    },
    {
        id:32,
        title: 'Hold On',
        artist:'Adele',
        cover:'IMG/HoldOn.jpg',
        audio:'audio/Adele - Hold On (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:33,
        title: 'I Drink Wine',
        artist:'Adele',
        cover:'IMG/IDrinkWin.jpg',
        audio:'audio/Adele - I Drink Wine (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:34,
        title: 'BLove Is A Game',
        artist:'Adele',
        cover:'IMG/Love Is A Game.jpg',
        audio:'audio/Adele - Love Is A Game (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:35,
        title: 'My Little Love',
        artist:'Adele',
        cover:'IMG/My Little Love.jpg',
        audio:'audio/Adele - My Little Love (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:36,
        title: 'Oh My God',
        artist:'Adele',
        cover:'IMG/Oh My God.jpg',
        audio:'audio/Adele - Oh My God (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:37,
        title: 'Strangers By Nature',
        artist:'Adele',
        cover:'IMG/Strangers By Nature.jpg',
        audio:'audio/Adele - Strangers By Nature (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:38,
        title: 'To Be Loved',
        artist:'Adele',
        cover:'IMG/To Be Loved.jpg',
        audio:'audio/Adele - To Be Loved (Official Lyric Video)(MP3_160K).mp3',
        favorite: false
    },
    {
        id:39,
        title: 'Rolling in the Deep',
        artist:'Adele',
        cover:'IMG/Rolling in the Deep.jpg',
        audio:'audio/Adele-Rolling in the Deep.mp3',
        favorite: false
    },
    {
        id:40,
        title: 'All Night Parking',
        artist:'Adele',
        cover:'IMG/allnightparking.jpg',
        audio:'audio/allnightparking.mp3',
        favorite: false
    },
];