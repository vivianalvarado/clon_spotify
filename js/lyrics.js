/**
 * AUDIORA - Sistema de Letras
 */

// ==================== 1. DATOS DE LETRAS (AGREGA ESTO AL INICIO) ====================
const lyricsData = {
    // Ejemplo: ID 1 - Amandote
    1:{
        title: "Amandote",
        artist: "Anna Carina",
        synced: true,
        lines: [
            { time: 0, text: "♪ Amandote - Anna Carina ♪" },

            { time: 2.5, text: "Ah-ah, ah-ah" },
            { time: 5.0, text: "Ah-uh-oh" },

            { time: 8.5, text: "Es tan extraño amanecer en esa habitación" },
            { time: 13.8, text: "Jugar con fuego nunca ha sido mi fascinación" },
            { time: 19.2, text: "Me siento Ícaro volando muy cerca del sol" },
            { time: 24.6, text: "Estoy cayendo en este peligroso amor" },

            { time: 30.0, text: "Tú nunca puedes decirme nada" },
            { time: 33.5, text: "Tu silencio lentamente me mata" },
            { time: 37.5, text: "Si no estás aquí, mi cielo está gris" },
            { time: 42.0, text: "No quiero estar ningún día lejos de ti" },

            { time: 47.5, text: "Que estoy amándote" },
            { time: 50.5, text: "Y amarte duele, no lo puedes entender" },
            { time: 55.5, text: "Que estoy ahogándome" },
            { time: 58.8, text: "De verte cerca y sentirte ajeno a la vez" },
            { time: 64.5, text: "Qué peligroso amor" },

            { time: 69.5, text: "Cuando estás cerca se me corta la respiración" },
            { time: 75.0, text: "Cuando te alejas sin razón, es más la confusión" },
            { time: 80.8, text: "De qué me sirve amarte con locura y con pasión" },
            { time: 86.5, text: "Si no me dejas entrar en tu corazón" },

            { time: 92.0, text: "Porque nunca puedes decirme nada (ay, ay, ay, ay)" },
            { time: 97.5, text: "Tu silencio lentamente me mata" },
            { time: 101.8, text: "No me hagas sufrir, tengo que admitir" },
            { time: 106.5, text: "Que estoy ardiendo locamente por ti" },

            { time: 112.0, text: "Que estoy amándote" },
            { time: 115.0, text: "Y amarte duele, no lo puedes entender" },
            { time: 120.0, text: "Que estoy ahogándome" },
            { time: 123.5, text: "De verte cerca y sentirte ajena a la vez" },
            { time: 129.0, text: "Qué peligroso amor" },
            { time: 133.0, text: "Qué peligroso amor" },

            { time: 137.5, text: "Ah-ah, ah-uh-ah" },
            { time: 140.5, text: "Ay, amor" },
            { time: 143.0, text: "Tu silencio me mata" },

            { time: 147.5, text: "Que estoy amándote" },
            { time: 150.5, text: "Y amarte duele, no lo puedes entender" },
            { time: 155.5, text: "Estoy ahogándome" },
            { time: 159.0, text: "De verte cerca y sentirte ajena a la vez" },

            { time: 164.5, text: "Pierdo la calma" },
            { time: 167.0, text: "Duele en el alma" },
            { time: 170.0, text: "Pensar que algún día" },
            { time: 173.5, text: "Te podría perder" },

            { time: 178.5, text: "Amándote (amándote)" },
            { time: 182.0, text: "Y amarte duele, no lo puedes entender" },
            { time: 187.0, text: "Estoy ahogándome (amándote)" },
            { time: 191.0, text: "Y amarte duele como una espina" },

            { time: 196.0, text: "Espina que me hiere en el alma" },
            { time: 200.0, text: "Ah-ah-ah" },
            { time: 203.0, text: "Espina que me hiere en el alma" },
            { time: 207.0, text: "Espina que me hiere en el alma" }
        ]
    },

    2:{
        title: "Amarrame",
        artist: "Mon Laferte",
        synced: true,
        lines: [
            { time: 0, text: "♪ Amárrame - Mon Laferte ♪" },

            { time: 3, text: "Ay, quiéreme de a poco" },
            { time: 7, text: "Pero que no me dé cuenta y que nadie sepa" },
            { time: 12, text: "Ven y cuídame" },
            { time: 15.5, text: "Pero que parezca que me estás haciendo daño" },

            { time: 20, text: "Amárrame" },
            { time: 23, text: "Ay, finge que no te gustó" },
            { time: 27, text: "Dame una mirada y luego vuélvete lejana" },
            { time: 32, text: "Y, sin querer, búscame y déjame" },

            { time: 36.5, text: "Llámame, pero no me hables, bésame y ahógame" },
            { time: 42, text: "Amárrame" },

            { time: 45, text: "Cúrame" },
            { time: 48, text: "Y enférmame de a poco, poco a poco" },
            { time: 53, text: "Cúrame" },
            { time: 56, text: "Y transfórmame en un loco, poco a poco" },
            { time: 61, text: "Amárrame" },

            { time: 66, text: "Ay, quiero ver tu perversión" },
            { time: 70, text: "Hasta dónde llegas, hasta dónde me has llevado" },
            { time: 75, text: "Ignórame" },
            { time: 78, text: "Ven y pierde la razón" },

            { time: 82, text: "Quiero que me ruegues y me mires a los ojos" },
            { time: 87, text: "Dame la espalda, desenfócame" },
            { time: 91, text: "Tómame del pelo y repíteme mi nombre" },
            { time: 96, text: "Y ámame, pero sin querer" },

            { time: 100, text: "Deja que te lleve, que mañana acaba todo" },
            { time: 105, text: "Amárrame" },

            { time: 109, text: "Cúrame" },
            { time: 112, text: "Y enférmame de a poco, poco a poco" },
            { time: 117, text: "Cúrame" },
            { time: 120, text: "Y transfórmame en un loco, poco a poco" },
            { time: 125, text: "Amárrame" },

            { time: 130, text: "Cúrame (ven y pierde la razón)" },
            { time: 135, text: "Y enférmame de a poco, poco a poco" },
            { time: 140, text: "Cúrame (ay, déjame)" },
            { time: 144, text: "Y transfórmame en un loco, poco a poco" },
            { time: 149, text: "Amárrame" }
        ]
    },

    3:{
        title: "Amor con hielo",
        artist: "MORAT",
        synced: true,
        lines: [
            { time: 0, text: "♪ Amor con hielo - MORAT ♪" },

            { time: 3.0, text: "Tú sigues siendo la prueba" },
            { time: 6.5, text: "De que hay victorias que se pagan con dolor" },
            { time: 10.5, text: "Que en el amor y en la guerra" },
            { time: 13.5, text: "Todo vale" },
            { time: 16.0, text: "Mm" },

            { time: 18.0, text: "Saltaste tú de primera" },
            { time: 21.5, text: "Dejando un barco que al final nunca se hundió" },
            { time: 26.0, text: "Yo me quedé las sirenas" },
            { time: 29.0, text: "Tú te ahogaste" },
            { time: 32.0, text: "(¡Hey!)" },

            { time: 35.0, text: "Yo ya me olvidé del nombre de tu perro" },
            { time: 39.5, text: "Y de esa despedida en la estación" },
            { time: 44.0, text: "Y aunque mi dolor jure que aquí te espero" },
            { time: 48.5, text: "Otra boca un beso me robó" },

            { time: 53.0, text: "Y eso que tú tanto dices que te debo" },
            { time: 57.0, text: "Se lo llevó" },

            { time: 60.0, text: "No vengas a cobrarme porque no te debo" },
            { time: 64.5, text: "No te debo nada, uh-oh (hey)" },
            { time: 69.0, text: "Ya entendí que no te quiero" },
            { time: 73.0, text: "No te quiero nada, uh-oh (hey)" },
            { time: 77.5, text: "Y aunque te extrañé" },
            { time: 80.5, text: "Ya ha pasado tanto tiempo, que te olvidé" },
            { time: 85.0, text: "Porque quien pegó primero" },
            { time: 89.0, text: "No es siempre el que gana, uh-oh (hey)" },
            { time: 94.0, text: "Yo intenté salvar todo este amor con hielo, y se murió" },

            { time: 100.0, text: "Lo hiciste sin que doliera" },
            { time: 104.0, text: "Así de buena eres rompiendo un corazón" },
            { time: 108.5, text: "Y corazón que se quiebra" },
            { time: 112.0, text: "Que lo cambien" },
            { time: 115.0, text: "Uh (¡hey!)" },

            { time: 118.0, text: "Yo ya me olvidé del nombre de tu perro" },
            { time: 122.5, text: "Y de esa despedida en la estación" },
            { time: 127.0, text: "Y aunque mi dolor jure que aquí te espero" },
            { time: 131.5, text: "Otra boca un beso me robó" },

            { time: 136.0, text: "Y eso que tú tanto dices que te debo" },
            { time: 140.0, text: "Se lo llevó" },

            { time: 143.0, text: "No vengas a cobrarme porque no te debo" },
            { time: 147.5, text: "No te debo nada, uh-oh (hey)" },
            { time: 152.0, text: "Ya entendí que no te quiero" },
            { time: 156.0, text: "No te quiero nada, uh-oh (hey)" },
            { time: 160.5, text: "Y aunque te extrañé" },
            { time: 163.5, text: "Ya ha pasado tanto tiempo, que te olvidé" },
            { time: 168.0, text: "Porque quien pegó primero" },
            { time: 172.0, text: "No es siempre el que gana, uh-oh (hey)" },
            { time: 177.0, text: "Yo intenté salvar todo este amor con hielo, y se murió" },

            { time: 183.0, text: "No vengas a cobrarme porque no te debo" },
            { time: 187.5, text: "No te debo nada, uh-oh (yo no te debo nada)" },
            { time: 192.0, text: "Ya entendí que no te quiero" },
            { time: 196.0, text: "No te quiero nada, uh-oh (te quiese, y tú no estabas)" },
            { time: 200.5, text: "Y aunque te extrañé (no)" },
            { time: 204.0, text: "Ya ha pasado tanto tiempo, que te olvidé (ya te olvidé)" },
            { time: 208.5, text: "Porque quien pegó primero (no)" },
            { time: 212.0, text: "No es siempre el que gana, uh-oh (no, hey)" },

            { time: 217.0, text: "Tan bien escondido quedó tu recuerdo, que se perdió" },
            { time: 222.0, text: "Y aunque yo guardé todo tu amor con hielo, ya se murió" }
        ]
    },

    4:{
        title: "Butter",
        artist: "BTS",
        synced: true,
        lines: [
            { time: 0, text: "♪ Butter - BTS ♪" },

            { time: 2.5, text: "Smooth like butter, like a criminal undercover" },
            { time: 6.0, text: "Gon' pop like trouble breaking into your heart like that, ooh" },
            { time: 10.0, text: "Cool shade, stunner, yeah, I owe it all to my mother, uh" },
            { time: 14.0, text: "Hot like summer, yeah, I'm making you sweat like that (break it down)" },

            { time: 18.5, text: "Ooh, when I look in the mirror" },
            { time: 21.5, text: "I'll melt your heart into two" },
            { time: 24.5, text: "I got that superstar glow, so" },
            { time: 27.5, text: "Ooh (do the boogie, like)" },

            { time: 30.0, text: "A side step, right-left, to my beat" },
            { time: 33.0, text: "High like the moon, rock with me, baby" },
            { time: 36.0, text: "Know that I got that heat" },
            { time: 38.5, text: "Let me show you 'cause talk is cheap" },
            { time: 41.5, text: "Side step, right-left, to my beat" },
            { time: 44.5, text: "Get it, let it roll" },

            { time: 47.0, text: "Smooth like butter, pull you in like no other" },
            { time: 50.5, text: "Don't need no Usher to remind me you got it bad" },
            { time: 54.5, text: "Ain't no other that can sweep you up like a robber" },
            { time: 58.5, text: "Straight up, I (got ya) making you fall like that (break it down)" },

            { time: 63.0, text: "Ooh, when I look in the mirror" },
            { time: 66.0, text: "I'll melt your heart into two" },
            { time: 69.0, text: "I got that superstar glow, so" },
            { time: 72.0, text: "Ooh (do the boogie, like)" },

            { time: 74.5, text: "Side step, right-left, to my beat" },
            { time: 77.5, text: "High like the moon, rock with me, baby" },
            { time: 80.5, text: "Know that I got that heat" },
            { time: 83.0, text: "Let me show you 'cause talk is cheap" },
            { time: 86.0, text: "A side step, right-left, to my beat" },
            { time: 89.0, text: "Get it, let it roll" },

            { time: 91.5, text: "Get it, let it roll" },
            { time: 93.5, text: "Get it, let it roll" },
            { time: 95.5, text: "Get it, let it roll" },

            { time: 98.0, text: "Ice on my wrist, I'm the nice guy" },
            { time: 101.0, text: "Got the right body and the right mind" },
            { time: 104.0, text: "Rolling up the party, got the right vibe" },
            { time: 107.0, text: "Smooth like (butter), hate us (love us)" },

            { time: 110.0, text: "Fresh boy, pull up and we lay low" },
            { time: 113.0, text: "All the players get moving when the bass low" },
            { time: 116.0, text: "Got ARMY right behind us when we say so" },
            { time: 119.0, text: "Let's go" },

            { time: 121.0, text: "Side step, right-left, to my beat (right-left, to my beat)" },
            { time: 124.5, text: "High like the moon, rock with me, baby" },
            { time: 127.5, text: "You know that I got that heat" },
            { time: 130.0, text: "Let me show you 'cause talk is cheap (you know that talk is cheap)" },
            { time: 134.0, text: "Side step, right-left, to my beat" },
            { time: 137.0, text: "Get it, let it roll" },

            { time: 140.0, text: "Smooth like (butter), cool shade (stunner)" },
            { time: 143.5, text: "And you know we don't stop" },
            { time: 146.0, text: "Hot like (summer), ain't no (bummer)" },
            { time: 149.0, text: "You'll be like, \"Oh, my God\"" },

            { time: 152.0, text: "We gon' make you rock, and you say (yeah)" },
            { time: 155.5, text: "We gon' make you bounce, and you say (yeah)" },
            { time: 159.0, text: "Hotter, sweeter, cooler, butter" },
            { time: 163.0, text: "Get it, let it roll" }
        ]
    },

    5:{
        title: "Consejo de amor",
        artist: "MORAT ft. TINI",
        synced: true,
        lines: [
            { time: 0, text: "♪ Consejo de amor - MORAT ft. TINI ♪" },

            { time: 3.0, text: "Si me toca escoger entre volverte a ver" },
            { time: 6.5, text: "O aceptar que te fuiste" },
            { time: 9.5, text: "Yo prefiero fingir que, por ti, estoy feliz" },
            { time: 13.0, text: "Aunque no me escogiste" },

            { time: 16.5, text: "Si me toca romper todo mi corazón" },
            { time: 20.0, text: "Para atarte a mi vida" },
            { time: 23.5, text: "Ya tendré que entender que en las guerras de amor" },
            { time: 27.5, text: "Siempre hay balas perdidas" },

            { time: 31.0, text: "No me obligues a disimular" },
            { time: 34.0, text: "Que quizá no te vi, si te veo" },
            { time: 37.5, text: "Porque sabes que lo prometí" },
            { time: 41.0, text: "Aunque, si yo fuera tú, no me creo" },

            { time: 44.5, text: "Si me toca borrar cada marca" },
            { time: 48.0, text: "Que a ti te dejaron sus besos" },
            { time: 51.5, text: "Yo prefiero escribirles encima" },
            { time: 55.0, text: "Con los que faltan de los nuestros" },

            { time: 58.5, text: "Pude haber sido yo" },
            { time: 61.0, text: "La que tiene tu corazón guardado" },
            { time: 64.5, text: "Pero alguien sin piedad me lo robó" },
            { time: 68.5, text: "Cuando por fin pensé haberlo atrapado, fue que se escapó" },

            { time: 73.0, text: "Pude haber sido yo" },
            { time: 75.5, text: "La que a tu lado siempre se despierte" },
            { time: 79.0, text: "Pero el futuro nunca nos llegó" },
            { time: 83.0, text: "Me prometí que nunca iba a perderte y no sé qué pasó" },

            { time: 87.5, text: "Pude haber sido yo" },
            { time: 90.5, text: "Si tú tan solo me hubieras pedido" },
            { time: 94.0, text: "Un consejo de amor (ooh)" },
            { time: 98.0, text: "Si tú tan solo me hubieras pedido" },
            { time: 102.0, text: "Un consejo de amor (ooh)" },

            { time: 106.5, text: "Si me toca esperarte, lo haré" },
            { time: 110.0, text: "Y no desvaneceré con las horas (no desvaneceré)" },
            { time: 114.5, text: "Y aunque llegue alguien más" },
            { time: 117.5, text: "Y no te puedo hablar, es igual que estar sola" },

            { time: 121.5, text: "Sé que me cuesta ver que al final" },
            { time: 125.0, text: "Voy a ser yo quien termine herida" },
            { time: 128.5, text: "Pero debo entender que en las guerras de amor" },
            { time: 132.5, text: "Siempre hay balas perdidas" },

            { time: 136.0, text: "Pude haber sido yo" },
            { time: 138.5, text: "La que tiene tu corazón guardado" },
            { time: 142.0, text: "Pero alguien sin piedad me lo robó" },
            { time: 146.0, text: "Cuando por fin pensé haberlo atrapado, fue que se escapó" },

            { time: 150.5, text: "Puedo haber sido yo" },
            { time: 153.0, text: "La que a tu lado siempre se despierte" },
            { time: 156.5, text: "Pero el futuro nunca nos llegó" },
            { time: 160.5, text: "Me prometí que nunca iba a perderte y no sé qué pasó" },

            { time: 165.0, text: "Puedo haber sido yo" },
            { time: 168.0, text: "Si tú tan solo me hubieras pedido" },
            { time: 171.5, text: "Un consejo de amor (ooh)" },
            { time: 175.5, text: "Si tú tan solo me hubieras pedido" },
            { time: 179.5, text: "Un consejo de amor (ooh)" },

            { time: 184.0, text: "Puedo haber sido yo" },
            { time: 187.0, text: "Pero dejaste un loco enamorado" },
            { time: 190.5, text: "Buscando un beso tuyo en la estación" },
            { time: 194.5, text: "Y no hay peor desgracia que extrañar lo que nunca pasó" },

            { time: 199.0, text: "Puedo haber sido yo" },
            { time: 201.5, text: "La que a tu lado siempre se despierte" },
            { time: 205.0, text: "Pero el futuro nunca nos llegó (nunca llegó)" },
            { time: 209.0, text: "Me prometí que nunca iba a perderte y no sé qué pasó" },

            { time: 213.5, text: "Puedo haber sido yo (puedo haber sido yo)" },
            { time: 217.0, text: "Si tú tan solo me hubieras pedido" },
            { time: 220.5, text: "Un consejo de amor (ooh)" },
            { time: 224.5, text: "Si tú tan solo me hubieras pedido" },
            { time: 228.5, text: "Un consejo de amor (ooh)" },

            { time: 233.0, text: "Si tú tan solo me hubieras pedido" },
            { time: 237.0, text: "Un consejo de amor" }
        ]
    },

    6:{
        title: "Cuando nadie ve",
        artist: "MORAT",
        synced: true,
        lines: [
            { time: 0, text: "♪ Cuando nadie ve - MORAT ♪" },

            { time: 3.0, text: "Soñé un verano que se hiciera eterno" },
            { time: 7.0, text: "Desde el momento en que vi tu mirada" },
            { time: 11.0, text: "Me derretiste con esa mirada" },
            { time: 15.0, text: "Pero el verano se volvió un invierno" },

            { time: 19.5, text: "Cuando vi que otros brazos te esperaban" },
            { time: 23.5, text: "Me congelé mientras yo te esperaba" },

            { time: 28.0, text: "Y ahora entiendo cual es mi papel" },
            { time: 32.5, text: "Nos queremos cuando nadie ve" },
            { time: 37.0, text: "Las balas perdidas de este amor" },
            { time: 41.0, text: "Prefiero no verlas en mi piel" },

            { time: 45.5, text: "Si me preguntan por ti" },
            { time: 49.0, text: "Diré que es mentira" },
            { time: 52.5, text: "Que toda una vida he soñado contigo" },
            { time: 57.0, text: "Yo sueño contigo" },

            { time: 60.5, text: "Si me preguntan por ti" },
            { time: 64.0, text: "Diré que no es cierto" },
            { time: 67.5, text: "Que duele por dentro que no estés conmigo" },
            { time: 72.0, text: "Te quiero conmigo" },

            { time: 76.0, text: "Te miro, me miras" },
            { time: 79.0, text: "Y el mundo no gira" },
            { time: 82.0, text: "Todo parece mentira" },
            { time: 85.5, text: "Tú sigues, yo sigo" },
            { time: 88.5, text: "Es nuestro castigo" },
            { time: 91.5, text: "Fingir que somos amigos" },

            { time: 95.0, text: "Y cuando no haya testigos" },
            { time: 99.0, text: "Mi vida entera te daré" },
            { time: 103.5, text: "Cuando nadie ve" },
            { time: 107.0, text: "Cuando nadie ve" },

            { time: 111.0, text: "Y ahora entiendo cual es mi papel" },
            { time: 115.5, text: "Nos queremos cuando nadie ve" },
            { time: 120.0, text: "Las balas perdidas de este amor" },
            { time: 124.0, text: "Prefiero no verlas en mi piel" },

            { time: 128.5, text: "Si me preguntan por ti" },
            { time: 132.0, text: "Diré que es mentira" },
            { time: 135.5, text: "Que toda una vida he soñado contigo" },
            { time: 140.0, text: "Yo sueño contigo" },

            { time: 143.5, text: "Si me preguntan por ti" },
            { time: 147.0, text: "Diré que no es cierto" },
            { time: 150.5, text: "Que duele por dentro que no estés conmigo" },
            { time: 155.0, text: "Te quiero conmigo" },

            { time: 159.0, text: "Te miro, me miras" },
            { time: 162.0, text: "Y el mundo no gira" },
            { time: 165.0, text: "Todo parece mentira" },
            { time: 168.5, text: "Tu sigues, yo sigo" },
            { time: 171.5, text: "Es nuestro castigo" },
            { time: 174.5, text: "Fingir que somos amigos" },

            { time: 178.0, text: "Y cuando no haya testigos" },
            { time: 182.0, text: "Mi vida entera te daré" },
            { time: 186.5, text: "Cuando nadie ve" },
            { time: 190.0, text: "Cuando nadie ve" },

            { time: 194.0, text: "Si me preguntan por ti" },
            { time: 197.5, text: "Diré que es mentira" },
            { time: 201.0, text: "Que toda una vida he soñado contigo" },
            { time: 205.5, text: "Yo sueño contigo" },

            { time: 209.0, text: "Si me preguntan por ti" },
            { time: 212.5, text: "Diré que no es cierto" },
            { time: 216.0, text: "Que duele por dentro que no estés conmigo" },
            { time: 220.5, text: "Te quiero conmigo" },

            { time: 224.5, text: "Te miro, me miras" },
            { time: 227.5, text: "Y el mundo no gira" },
            { time: 230.5, text: "Todo parece mentira" },
            { time: 234.0, text: "Tú sigues, yo sigo" },
            { time: 237.0, text: "Es nuestro castigo" },
            { time: 240.0, text: "Fingir que somos amigos" },

            { time: 243.5, text: "Y cuando no haya testigos" },
            { time: 247.5, text: "Mi vida entera te daré" },
            { time: 252.0, text: "Cuando nadie ve" }
        ]
    },

    7:{
        title: "Dynamite",
        artist: "BTS",
        synced: true,
        lines: [
            { time: 0, text: "♪ Dynamite - BTS ♪" },

            { time: 2.0, text: "So watch me bring the fire (everyone knows this song, right?)" },
            { time: 5.0, text: "And set the night alight (let's go, hey!)" },
            { time: 8.0, text: "Shoes on, get up in the morn'" },
            { time: 10.5, text: "Cup of milk, let's rock and roll (uh-huh, whoo)" },
            { time: 13.0, text: "King Kong, kick the drum" },
            { time: 15.0, text: "Rolling on like a rolling stone (whoa-whoa-whoa-oh)" },
            { time: 18.0, text: "Sing-song when I'm walking home" },
            { time: 20.0, text: "Jump up to the top, LeBron (okay, okay)" },
            { time: 22.5, text: "Ding-dong, call me on my phone" },
            { time: 24.5, text: "Ice tea, and a game of ping-pong (let's go, hey, ay)" },

            { time: 27.0, text: "This is getting heavy, can you hear the bass boom? I'm ready (whoo-hoo)" },
            { time: 31.5, text: "Life is sweet as honey, yeah, this beat cha-ching like money, huh" },
            { time: 36.0, text: "Disco overload, I'm into that, I'm good to go" },
            { time: 39.5, text: "I'm diamond, you know I glow up" },
            { time: 42.5, text: "Everybody, let's go" },

            { time: 44.5, text: "'Cause I, I, I'm in the stars tonight" },
            { time: 48.0, text: "So watch me bring the fire, and set the night alight (hey, set the night alight)" },
            { time: 52.5, text: "Shining through the city with a little funk and soul" },
            { time: 56.5, text: "So I'ma light it up like dynamite, whoa-oh-oh (whoo)" },

            { time: 61.0, text: "Bring a friend, join the crowd, whoever wanna come along (oh)" },
            { time: 64.5, text: "Word up, talk the talk, just move like we off the wall (wall)" },
            { time: 68.0, text: "Day or night, the sky's alight, so we dance to the break of dawn (hey)" },
            { time: 72.0, text: "Ladies and gentlemen, I got the medicine" },
            { time: 75.5, text: "So you should keep ya eyes on the ball, huh (oh-ay)" },

            { time: 79.0, text: "This is getting heavy, can you hear the bass boom? I'm ready (whoo-hoo)" },
            { time: 83.5, text: "Life is sweet as honey, yeah, this beat cha-ching like money, huh" },
            { time: 88.0, text: "Disco overload, I'm into that, I'm good to go (whoa-whoa-oh)" },
            { time: 92.0, text: "I'm diamond, you know I glow up" },
            { time: 95.0, text: "Oh, let's go" },

            { time: 96.5, text: "'Cause I, I, I'm in the stars tonight (whoo)" },
            { time: 100.0, text: "So watch me bring the fire, and set the night alight (hey, set the night alight)" },
            { time: 104.5, text: "Shining through the city with a little funk and soul" },
            { time: 108.5, text: "So I'ma light it up like dynamite, whoa-oh-oh (whoo)" },

            { time: 113.0, text: "Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite" },
            { time: 117.0, text: "Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite" },
            { time: 121.0, text: "Shining through the city with a little funk and soul (ay, whoo)" },
            { time: 125.0, text: "So I'ma light it up like dynamite, whoa-oh-oh (let's go)" },

            { time: 129.5, text: "Dyn-na-na-na, na-na, na-na, ay (clap, clap)" },
            { time: 132.0, text: "Dyn-na-na-na, na-na, na-na, ay (come on)" },
            { time: 134.5, text: "Dyn-na-na-na, na-na, na-na, yeah" },
            { time: 137.0, text: "Light it up like dynamite (let me hear you)" },
            { time: 139.5, text: "Dyn-na-na-na, na-na, na-na, yeah" },
            { time: 142.0, text: "Dyn-na-na-na, na-na, na-na, yeah" },
            { time: 144.5, text: "Dyn-na-na-na, na-na, na-na, ay (okay)" },
            { time: 147.0, text: "Light it up like dynamite" },

            { time: 149.5, text: "'Cause I, I, I'm in the stars tonight (yeah)" },
            { time: 153.0, text: "So watch me bring the fire, and set the night alight (come on, hey)" },
            { time: 157.5, text: "Shining through the city with a little funk and soul" },
            { time: 161.5, text: "So I'ma light it up like dynamite (let's go)" },

            { time: 165.5, text: "So watch me bring the fire, and set the night alight (oh)" },
            { time: 169.5, text: "Shining through the city with a little funk and soul" },
            { time: 173.5, text: "So I'ma light it up like dynamite, whoa-oh-oh (light it up like dynamite)" },

            { time: 178.0, text: "Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite (life is dynamite)" },
            { time: 182.0, text: "Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite (oh)" },
            { time: 186.0, text: "Shining through the city with a little funk and soul" },
            { time: 190.0, text: "So I'ma light it up like dynamite, whoa-oh-oh (whoo)" }
        ]
    },

    8:{
        title: "En guerra",
        artist: "Sebastián Yatra ft. Camilo",
        synced: true,
        lines: [
            { time: 0, text: "♪ En guerra - Sebastián Yatra ft. Camilo ♪" },

            { time: 3.0, text: "Hay una tormenta" },
            { time: 6.0, text: "Que no se nota desde afuera" },
            { time: 9.5, text: "Sé que por dentro estás en guerra" },
            { time: 13.5, text: "Aunque en las fotos no se ve" },

            { time: 17.5, text: "Si hay una manera" },
            { time: 20.5, text: "De apagar todos tus miedos" },
            { time: 24.5, text: "Voy a buscarla, aunque me duela" },
            { time: 28.5, text: "Borrando la tristeza" },

            { time: 32.5, text: "¿Qué le pasará a tu espejo?" },
            { time: 36.0, text: "Que no ve lo que yo veo" },
            { time: 39.5, text: "¿Para qué quieres cambiar?" },
            { time: 43.0, text: "Si eres todo lo que quiero" },

            { time: 46.5, text: "Ay, ¿qué le pasará a tu espejo?" },
            { time: 50.0, text: "Que no ve lo que yo veo" },
            { time: 53.5, text: "¿Para qué quieres cambiar?" },
            { time: 57.0, text: "Yo quiero ser como tú" },

            { time: 60.5, text: "Que haces brillar las estrellas" },
            { time: 64.5, text: "Con esa risa que a ti te da pena" },
            { time: 68.5, text: "Pero es tan perfecta que quiero quedarme con ella" },

            { time: 74.0, text: "Y ser como tú" },
            { time: 77.0, text: "Que haces girar el planeta" },
            { time: 81.0, text: "Cuando me besas con esa inocencia" },
            { time: 85.0, text: "Y no te das cuenta, mi mundo lo llenas de luz" },
            { time: 90.0, text: "Por ser como tú" },
            { time: 93.5, text: "Ser como tú" },
            { time: 96.5, text: "Ser como tú" },

            { time: 100.0, text: "Ese nudo en mi garganta, se cura cuando te levantas" },
            { time: 105.0, text: "Cuando me digas que sí, nos vamos corriendo de aquí" },
            { time: 109.5, text: "Que yo te presto mis alas, que son a prueba de balas" },
            { time: 114.0, text: "Cuando me digas que sí, nos vamos corriendo de aquí" },

            { time: 118.5, text: "¿Qué le pasará a tu espejo?" },
            { time: 122.0, text: "Que no ve lo que yo veo" },
            { time: 125.5, text: "¿Para qué quieres cambiar?" },
            { time: 129.0, text: "Si eres todo lo que quiero" },

            { time: 132.5, text: "Ay, ¿qué le pasará a tu espejo?" },
            { time: 136.0, text: "Que no ve lo que yo veo" },
            { time: 139.5, text: "¿Para qué quieres cambiar?" },
            { time: 143.0, text: "Yo quiero ser como tú" },

            { time: 146.5, text: "Que haces brillar las estrellas" },
            { time: 150.5, text: "Con esa risa que a ti te da pena" },
            { time: 154.5, text: "Pero es tan perfecta que quiero quedarme con ella" },

            { time: 160.0, text: "Y ser como tú" },
            { time: 163.0, text: "Que haces girar el planeta (Quiero ser como tú)" },
            { time: 167.0, text: "Cuando me besas con esa inocencia" },
            { time: 171.0, text: "Y no te das cuenta, mi mundo lo llenas de luz" },
            { time: 176.0, text: "Por ser como tú (We-eh-eh)" },
            { time: 179.5, text: "Ser como tú (Yeh-lerey lere-lere)" },
            { time: 182.5, text: "Ser como tú (Uuh)" },
            { time: 185.5, text: "(Por ser como)" },

            { time: 188.0, text: "No hay un corazón que te ame más que yo" },
            { time: 192.5, text: "Doy gracias a Dios que estamos los dos" },
            { time: 197.0, text: "Y amarte en la guerra, bajo las estrellas de amor" },

            { time: 202.0, text: "Yo quiero ser como tú" },
            { time: 205.5, text: "Yo quiero ser como tú" },
            { time: 209.0, text: "Yo quiero ser como tú" },
            { time: 212.5, text: "Yo quiero ser como tú, uh, uh, uh" },
            { time: 217.0, text: "Yo quiero ser como tú" }
        ]
    },

    9:{
        title: "Forever Young",
        artist: "BLACKPINK",
        synced: true,
        lines: [
            { time: 0, text: "♪ Forever Young - BLACKPINK ♪" },

            { time: 2.5, text: "떠나지 마 just stay" },
            { time: 5.5, text: "지금 이 시간을 멈춘 채" },
            { time: 9.0, text: "너와 eh 함께라면 난" },
            { time: 12.5, text: "I could die in this moment" },

            { time: 16.0, text: "Forever young" },
            { time: 18.5, text: "Forever young" },
            { time: 21.0, text: "(BLACKPINK is the revolution)" },
            { time: 23.5, text: "Forever young" },
            { time: 26.0, text: "Forever young" },

            { time: 29.0, text: "너의 눈에 비친 나의 모습이" },
            { time: 32.5, text: "늘 처음 만난 그 날만 같길 (그 날만 같길) yeah (yeah)" },

            { time: 37.0, text: "소리 없이 타오르는 불꽃같이" },
            { time: 40.5, text: "마지막처럼 내 입 맞추길 (입 맞추길) yeah (yeah)" },

            { time: 45.0, text: "달빛 아래 내 마음은 설레" },
            { time: 48.0, text: "은하수로 춤추러 갈래 let's go" },
            { time: 51.0, text: "지금 let go" },

            { time: 53.5, text: "오늘이 가도 후회 없게" },
            { time: 57.0, text: "시간이 우리 둘을 떼어 놓을 수 없게" },
            { time: 61.0, text: "순간이 영원할 수 있게" },

            { time: 64.5, text: "넌 내 마음에 불을 질러줘" },
            { time: 68.0, text: "후회 없는 젊음이 타오르게" },
            { time: 72.0, text: "지금처럼 너와 함께라면 tonight" },
            { time: 76.0, text: "I could die in this moment" },

            { time: 79.5, text: "Forever young" },
            { time: 82.0, text: "Forever young" },
            { time: 84.5, text: "(BLACKPINK is the revolution)" },
            { time: 87.0, text: "Forever young" },
            { time: 89.5, text: "Forever young" },
            { time: 92.0, text: "(BLACKPINK is the revolution)" },

            { time: 94.5, text: "매일매일 밤, 밤 (hey)" },
            { time: 97.5, text: "이 노래를 불러 불러 (ho)" },
            { time: 100.5, text: "Know we got that bomb, bomb (hey)" },
            { time: 103.5, text: "Come again, come again" },

            { time: 106.0, text: "Forever young boy, so we ride or die" },
            { time: 109.5, text: "끝이 없을 것처럼 달려 너와 나" },
            { time: 113.0, text: "붉은 sunset 아래 너는 지금 내 옆에" },
            { time: 116.5, text: "Pinked out or murdered out like it ain't no thing" },

            { time: 120.0, text: "다 필요 없어, 주인공은 우리" },
            { time: 123.0, text: "Say life's a bitch? But mine's a movie" },
            { time: 126.0, text: "내 diamond처럼 we'll shine together" },
            { time: 129.0, text: "Whenever, wherever, forever, ever, ever" },

            { time: 132.0, text: "짜릿하게 더 위험하게" },
            { time: 135.0, text: "세상 저 끝까지 가볼래 let's go" },
            { time: 138.0, text: "지금 let go" },

            { time: 140.5, text: "오늘이 가도 후회 없게" },
            { time: 144.0, text: "시간이 우리 둘을 떼어 놓을 수 없게" },
            { time: 148.0, text: "순간이 영원할 수 있게" },

            { time: 151.5, text: "넌 내 마음에 불을 질러줘" },
            { time: 155.0, text: "후회 없는 젊음이 타오르게" },
            { time: 159.0, text: "세상 무엇도 두렵지 않아 tonight" },
            { time: 163.0, text: "I could die in this moment" },

            { time: 166.5, text: "Forever young (young, young)" },
            { time: 170.0, text: "BLACKPINK is the revolution (revolution, revolution)" },

            { time: 173.5, text: "달이 뜨고 별이 뜨면 춤추는 body" },
            { time: 177.0, text: "끝이 없이 달려보자 we like to party" },
            { time: 180.5, text: "달이 뜨고 별이 뜨면 춤추는 body" },
            { time: 184.0, text: "끝이 없이 달려보자 we like to party" },

            { time: 187.5, text: "Girls wanna have some fun" },
            { time: 189.5, text: "We go dumb, dumb, dumb" },
            { time: 191.5, text: "Yeah, girls wanna have some fun" },
            { time: 193.5, text: "What you want, want, want?" },

            { time: 195.5, text: "Girls wanna have some fun" },
            { time: 197.5, text: "We go dumb, dumb, dumb" },
            { time: 199.5, text: "Yeah, girls wanna have some fun" },
            { time: 201.5, text: "We ain't done, done, done (let's go)" },

            { time: 204.0, text: "Whatta-bum-bum, whatta-bum-bum" },
            { time: 206.0, text: "Whatta-bum-bum, whatta-bum-bum (hey!)" },
            { time: 208.0, text: "Whatta-bum-bum, whatta-bum-bum" },
            { time: 210.0, text: "Whatta-bum-bum, whatta-bum-bum (ho!)" },

            { time: 212.0, text: "Whatta-bum-bum, whatta-bum-bum" },
            { time: 214.0, text: "Whatta-bum-bum, whatta-bum-bum (hey!)" },
            { time: 216.0, text: "Whatta-bum-bum, whatta-bum-bum" },
            { time: 218.0, text: "Whatta-bum-bum, whatta-bum-bum" }
        ]
    },
    
    10:{
        title: "How You Like That",
        artist: "BLACKPINK",
        synced: true,
        lines: [
            { time: 0, text: "♪ How You Like That - BLACKPINK ♪" },

            { time: 2.0, text: "BLACKPINK in your area" },
            { time: 4.5, text: "보란 듯이 무너졌어" },
            { time: 7.0, text: "바닥을 뚫고 저 지하까지" },
            { time: 10.0, text: "옷 끝자락 잡겠다고" },
            { time: 12.5, text: "저 높이 두 손을 뻗어 봐도" },

            { time: 15.5, text: "다시 캄캄한 이곳에 light up the sky" },
            { time: 19.0, text: "네 두 눈을 보며, I'll kiss you bye" },
            { time: 22.5, text: "실컷 비웃어라 꼴 좋으니까" },
            { time: 26.0, text: "이제 너희, 하나, 둘, 셋" },

            { time: 29.0, text: "Ha, how you like that? (Ooh)" },
            { time: 32.0, text: "You gon' like that, that-that-that-that, that-that-that-that" },
            { time: 35.5, text: "How you like that? (Bada-bing, bada-boom-boom-boom)" },
            { time: 38.5, text: "How you like that, that-that-that-that, that-that-that-that?" },

            { time: 42.0, text: "Now look at you, now look at me (uh)" },
            { time: 44.5, text: "Look at you, now look at me (uh)" },
            { time: 47.0, text: "Look at you, now look at me, how you like that?" },
            { time: 50.5, text: "Now look at you, now look at me (uh)" },
            { time: 53.0, text: "Look at you, now look at me (uh)" },
            { time: 55.5, text: "Look at you, now look at me, how you like that?" },

            { time: 59.0, text: "Your girl need it all and that's a hunnid" },
            { time: 62.0, text: "백 개 중에 백, 내 몫을 원해" },
            { time: 65.0, text: "Karma come and get some" },
            { time: 67.5, text: "딱하지만 어쩔 수 없잖아" },

            { time: 70.0, text: "What's up? I'm right back (right back)" },
            { time: 72.5, text: "방아쇠를 cock back (cock back)" },
            { time: 75.0, text: "Plain Jane get hijacked, don't like me?" },
            { time: 78.0, text: "Then tell me how you like that, like that?" },

            { time: 81.0, text: "더 캄캄한 이곳에 shine like the stars" },
            { time: 84.5, text: "그 미소를 띠며, I'll kiss you goodbye" },
            { time: 88.0, text: "실컷 비웃어라 꼴 좋으니까" },
            { time: 91.5, text: "이제 너희, 하나, 둘, 셋" },

            { time: 94.5, text: "Ha, how you like that? (Ooh)" },
            { time: 97.5, text: "You gon' like that, that-that-that-that, that-that-that-that" },
            { time: 101.0, text: "How you like that? (Bada-bing, bada-boom-boom-boom)" },
            { time: 104.0, text: "How you like that, that-that-that-that, that-that-that-that?" },

            { time: 107.5, text: "Now look at you, now look at me (uh)" },
            { time: 110.0, text: "Look at you, now look at me (uh)" },
            { time: 112.5, text: "Look at you, now look at me, how you like that?" },
            { time: 116.0, text: "Now look at you, now look at me (uh)" },
            { time: 118.5, text: "Look at you, now look at me (uh)" },
            { time: 121.0, text: "Look at you, now look at me, how you like that?" },

            { time: 124.5, text: "날개 잃은 채로 추락했던 날" },
            { time: 128.0, text: "어두운 나날 속에 갇혀 있던 날" },
            { time: 131.5, text: "그때쯤에 넌 날 끝내야 했어" },

            { time: 135.0, text: "Look up in the sky, it's a bird, it's a plane" },
            { time: 138.5, text: "Yeah-eh-eh-eh" },
            { time: 141.0, text: "Bring out your boss, bitch" },
            { time: 143.5, text: "Yeah-eh-eh-eh" },
            { time: 146.0, text: "BLACKPINK!" },

            { time: 148.5, text: "뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두 (how you like that?)" },
            { time: 152.0, text: "뚜뚜뚜뚜두두, 뚜뚜뚜, 뚜두두두 (you gon' like that)" },
            { time: 155.5, text: "뚜뚜뚜뚜두두, 뚜뚜뚜뚜두두 (how you like that?)" },
            { time: 159.0, text: "뚜뚜뚜뚜두두, 뚜뚜뚜, 뚜두두두" }
        ]
    }

};


// ==================== 2. CLASE LyricsManager (LO QUE YA TENÍAS) ====================
class LyricsManager {
    constructor() {
        this.currentLyrics = null;
        this.isSyncEnabled = false;
        this.lyricsModal = null;
        this.lyricsContent = null;
        this.lyricsText = null;
        this.lyricsTitle = null;
        this.lyricsArtist = null;
        this.syncBtn = null;
        this.closeBtn = null;
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupElements());
        } else {
            this.setupElements();
        }
    }
    
    setupElements() {
        this.lyricsModal = document.getElementById('lyricsModal');
        this.lyricsContent = document.getElementById('lyrics-content');
        this.lyricsText = document.getElementById('lyrics-text');
        this.lyricsTitle = document.getElementById('lyrics-song-title');
        this.lyricsArtist = document.getElementById('lyrics-artist-name');
        this.syncBtn = document.getElementById('lyrics-sync-btn');
        this.closeBtn = document.getElementById('lyrics-close-btn');
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.syncBtn) {
            this.syncBtn.addEventListener('click', () => this.toggleSync());
        }
        
        if (this.lyricsModal) {
            this.lyricsModal.addEventListener('click', (e) => {
                if (e.target === this.lyricsModal) this.close();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }
    
    open(song) {
        if (!this.lyricsModal || !song) return;
        
        if (this.lyricsTitle) this.lyricsTitle.textContent = song.title;
        if (this.lyricsArtist) this.lyricsArtist.textContent = song.artist;
        
        this.currentLyrics = this.findLyrics(song);
        this.render();
        
        this.lyricsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.isSyncEnabled = false;
        if (this.syncBtn) {
            this.syncBtn.classList.remove('active');
            this.syncBtn.title = 'Activar sincronización';
        }
        
        console.log('📝 Letras cargadas:', song.title);
    }
    
    close() {
        if (!this.lyricsModal) return;
        this.lyricsModal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentLyrics = null;
    }
    
    isOpen() {
        return this.lyricsModal?.classList.contains('active');
    }
    
    findLyrics(song) {
        if (typeof lyricsData !== 'undefined') {
            if (lyricsData[song.id]) {
                return lyricsData[song.id];
            }
            
            const songKey = Object.keys(lyricsData).find(key => {
                const data = lyricsData[key];
                return data.title?.toLowerCase() === song.title.toLowerCase() &&
                       data.artist?.toLowerCase() === song.artist.toLowerCase();
            });
            
            if (songKey) {
                return lyricsData[songKey];
            }
        }
        return null;
    }
    
    render() {
        if (!this.lyricsText) return;
        
        if (!this.currentLyrics || !this.currentLyrics.lines || this.currentLyrics.lines.length === 0) {
            this.showNoLyrics();
            return;
        }
        
        this.lyricsText.innerHTML = '';
        
        this.currentLyrics.lines.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'lyric-line';
            lineElement.textContent = line.text || line;
            lineElement.dataset.index = index;
            
            if (line.time) {
                lineElement.dataset.time = line.time;
                lineElement.classList.add('synced');
            }
            
            if (line.time && typeof audioPlayer !== 'undefined') {
                lineElement.addEventListener('click', () => {
                    if (this.isSyncEnabled && audioPlayer) {
                        audioPlayer.currentTime = line.time;
                        audioPlayer.play();
                    }
                });
            }
            
            this.lyricsText.appendChild(lineElement);
        });
    }
    
    showNoLyrics() {
        if (!this.lyricsText) return;
        this.lyricsText.innerHTML = `
            <div class="lyrics-no-data">
                <i class="fa-solid fa-music"></i>
                <h3>No hay letras disponibles</h3>
                <p>Lo sentimos, aún no tenemos la letra de esta canción. ¡Pronto la agregaremos!</p>
            </div>
        `;
    }
    
    toggleSync() {
        if (!this.currentLyrics || !this.currentLyrics.lines) {
            showNotification('Esta canción no tiene letras sincronizadas', true);
            return;
        }
        
        const hasSyncedLines = this.currentLyrics.lines.some(line => line.time !== undefined);
        
        if (!hasSyncedLines) {
            showNotification('Esta letra no está sincronizada', true);
            return;
        }
        
        this.isSyncEnabled = !this.isSyncEnabled;
        
        if (this.syncBtn) {
            this.syncBtn.classList.toggle('active', this.isSyncEnabled);
            this.syncBtn.title = this.isSyncEnabled ? 'Desactivar sincronización' : 'Activar sincronización';
        }
        
        showNotification(
            this.isSyncEnabled ? '✅ Sincronización activada' : '❌ Sincronización desactivada'
        );
        
        if (this.isSyncEnabled) {
            this.updateActiveLine();
        }
    }
    
    updateActiveLine() {
        if (!this.isSyncEnabled || !this.isOpen() || !audioPlayer) return;
        
        const currentTime = audioPlayer.currentTime;
        const lines = this.lyricsText?.querySelectorAll('.lyric-line[data-time]');
        
        if (!lines || lines.length === 0) return;
        
        let activeIndex = -1;
        
        lines.forEach((line, index) => {
            const time = parseFloat(line.dataset.time);
            if (currentTime >= time) {
                activeIndex = index;
            }
        });
        
        lines.forEach(line => line.classList.remove('active'));
        
        if (activeIndex >= 0 && lines[activeIndex]) {
            lines[activeIndex].classList.add('active');
            lines[activeIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        
        requestAnimationFrame(() => this.updateActiveLine());
    }
    
    highlightLine(index) {
        if (!this.isOpen() || !this.lyricsText) return;
        
        const lines = this.lyricsText.querySelectorAll('.lyric-line');
        lines.forEach(line => line.classList.remove('active'));
        
        if (lines[index]) {
            lines[index].classList.add('active');
            lines[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// ==================== 3. INSTANCIA Y FUNCIONES GLOBALES ====================
const lyricsManager = new LyricsManager();

function openLyrics(song) {
    if (lyricsManager) {
        lyricsManager.open(song);
    }
}

function updateLyricsLine() {
    if (lyricsManager && lyricsManager.isSyncEnabled) {
        lyricsManager.updateActiveLine();
    }
}

// Console log para confirmar carga
console.log('📝 lyrics.js cargado - Canciones con letras:', Object.keys(lyricsData || {}).length);