const songs = [
    {
        id: 1,
        title: 'Amandote',
        artist: 'Juanes',
        artistImage: 'img/artistas/amandote.jpg',
        cover: 'img/amandote.jpg',
        audio: 'audio/amandote.mp3',
        favorite: false,
        album: 'Amandote'
    },
    {
        id: 2,
        title: 'Amarrame',
        artist: 'Mon Laferte',
        artistImage: 'img/artistas/amarrame.jpg',
        cover: 'img/amarrame.jpg',
        audio: 'audio/amarrame.mp3',
        favorite: false,
        album: 'Amarrame'
    },
    {
        id: 3,
        title: 'Amor Con Hielo',
        artist: 'Morat',
        artistImage: 'img/artistas/amorconhielo.jpg',
        cover: 'img/amorconhielo.jpg',
        audio: 'audio/amorconhielo.mp3',
        favorite: false,
        album: 'Amor Con Hielo'
    },
    {
        id: 4,
        title: 'Butter',
        artist: 'BTS',
        artistImage: 'img/artistas/butter.jpg',
        cover: 'img/butter.jpg',
        audio: 'audio/butter.mp3',
        favorite: false,
        album: 'Butter'
    },
    {
        id: 5,
        title: 'Consejos de Amor',
        artist: 'TINI ft. Morat',
        artistImage: 'img/artistas/consejosdeamor.jpg',
        cover: 'img/consejosdeamor.jpg',
        audio: 'audio/consejosdeamor.mp3',
        favorite: false,
        album: 'Cupido'
    },
    {
        id: 6,
        title: 'Cuando Nadie Ve',
        artist: 'Morat',
        artistImage: 'img/artistas/cuandonadieve.jpg',
        cover: 'img/cuandonadieve.jpg',
        audio: 'audio/cuandonadieve.mp3',
        favorite: false,
        album: 'Balas Perdidas'
    },
    {
        id: 7,
        title: 'Dynamite',
        artist: 'BTS',
        artistImage: 'img/artistas/dynamite.jpg',
        cover: 'img/dynamite.jpg',
        audio: 'audio/dynamite.mp3',
        favorite: false,
        album: 'BE'
    },
    {
        id: 8,
        title: 'En Guerra',
        artist: 'Sebastian Yatra ft. Camilo',
        artistImage: 'img/artistas/enguerra.jpg',
        cover: 'img/enguerra.jpg',
        audio: 'audio/enguerra.mp3',
        favorite: false,
        album: 'Fantasia'
    },
    {
        id: 9,
        title: 'Forever Young',
        artist: 'BLACKPINK',
        artistImage: 'img/artistas/foreveryoung.jpg',
        cover: 'img/foreveryoung.jpg',
        audio: 'audio/foreveryoung.mp3',
        favorite: false,
        album: 'Square Up'
    },
    {
        id: 10,
        title: 'How You Like That',
        artist: 'BLACKPINK',
        artistImage: 'img/artistas/howyoulikethat.jpg',
        cover: 'img/howyoulikethat.jpg',
        audio: 'audio/howyoulikethat.mp3',
        favorite: false,
        album: 'The Album'
    },
    {
        id: 11,
        title: 'Idol',
        artist: 'BTS',
        artistImage: 'img/artistas/idol.jpg',
        cover: 'img/idol.jpg',
        audio: 'audio/idol.mp3',
        favorite: false,
        album: 'Love Yourself: Answer'
    },
    {
        id: 12,
        title: 'Kill This Love',
        artist: 'BLACKPINK',
        artistImage: 'img/artistas/killthislove.jpg',
        cover: 'img/killthislove.jpg',
        audio: 'audio/killthislove.mp3',
        favorite: false,
        album: 'Kill This Love'
    },
    {
        id: 13,
        title: 'La Correcta',
        artist: 'Nabález ft. Morat',
        artistImage: 'img/artistas/lacorrecta.jpg',
        cover: 'img/lacorrecta.jpg',
        audio: 'audio/lacorrecta.mp3',
        favorite: false,
        album: 'La Correcta'
    },
    {
        id: 14,
        title: 'Lalisa',
        artist: 'Lisa',
        artistImage: 'img/artistas/lalisa.jpg',
        cover: 'img/lalisa.jpg',
        audio: 'audio/lalisa.mp3',
        favorite: false,
        album: 'Lalisa'
    },
    {
        id: 15,
        title: 'Lovesick Girls',
        artist: 'BLACKPINK',
        artistImage: 'img/artistas/lovesickgirls.jpg',
        cover: 'img/lovesickgirls.jpg',
        audio: 'audio/lovesickgirls.mp3',
        favorite: false,
        album: 'The Album'
    },
    {
        id: 16,
        title: 'Mantra',
        artist: 'Jennie',
        artistImage: 'img/artistas/mantra.jpg',
        cover: 'img/mantra.jpg',
        audio: 'audio/mantra.mp3',
        favorite: false,
        album: 'Mantra'
    },
    {
        id: 17,
        title: 'Mi Buen Amor',
        artist: 'Mon Laferte',
        artistImage: 'img/artistas/mibuenamor.jpg',
        cover: 'img/mibuenamor.jpg',
        audio: 'audio/mibuenamor.mp3',
        favorite: false,
        album: 'La Trenza'
    },
    {
        id: 18,
        title: 'On The Ground',
        artist: 'Rosé',
        artistImage: 'img/artistas/ontheground.jpg',
        cover: 'img/ontheground.jpg',
        audio: 'audio/ontheground.mp3',
        favorite: false,
        album: 'R'
    },
    {
        id: 19,
        title: 'Pink Venom',
        artist: 'BLACKPINK',
        artistImage: 'img/artistas/pinkvenom.jpg',
        cover: 'img/pinkvenom.jpg',
        audio: 'audio/pinkvenom.mp3',
        favorite: false,
        album: 'Born Pink'
    },
    {
        id: 20,
        title: 'Presiento',
        artist: 'Morat ft. Aitana',
        artistImage: 'img/artistas/presiento.jpg',
        cover: 'img/presiento.jpg',
        audio: 'audio/presiento.mp3',
        favorite: false,
        album: 'Balas Perdidas'
    },
    {
        id: 21,
        title: 'Rockstar',
        artist: 'Lisa',
        artistImage: 'img/artistas/rockstar.jpg',
        cover: 'img/rockstar.jpg',
        audio: 'audio/rockstar.mp3',
        favorite: false,
        album: 'Rockstar'
    },
    {
        id: 22,
        title: 'Seven',
        artist: 'Jungkook',
        artistImage: 'img/artistas/seven.jpg',
        cover: 'img/seven.jpg',
        audio: 'audio/seven.mp3',
        favorite: false,
        album: 'Golden'
    },
    {
        id: 23,
        title: 'Solo',
        artist: 'Jennie',
        artistImage: 'img/artistas/solo.jpg',
        cover: 'img/solo.jpg',
        audio: 'audio/solo.mp3',
        favorite: false,
        album: 'Solo'
    },
    {
        id: 24,
        title: 'Sour Candy',
        artist: 'Lady Gaga ft. BLACKPINK',
        artistImage: 'img/artistas/sourcandy.jpg',
        cover: 'img/sourcandy.jpg',
        audio: 'audio/sourcandy.mp3',
        favorite: false,
        album: 'Chromatica'
    },
    {
        id: 25,
        title: 'Tu Falta de Querer',
        artist: 'Mon Laferte',
        artistImage: 'img/artistas/tufaltadequerer.jpg',
        cover: 'img/tufaltadequerer.jpg',
        audio: 'audio/tufaltadequerer.mp3',
        favorite: false,
        album: 'Mon Laferte Vol. 1'
    },
    {
        id: 26,
        title: 'Vas a Querer Volver',
        artist: 'Maite Perroni',
        artistImage: 'img/artistas/vasaquerervolver.jpg',
        cover: 'img/vasaquerervolver.jpg',
        audio: 'audio/vasaquerervolver.mp3',
        favorite: false,
        album: 'Eclipse de Luna'
    }
];

console.log('✅ data.js cargado correctamente');
console.log('📀 Canciones disponibles:', songs.length);