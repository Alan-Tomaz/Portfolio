/* ADD HERO SECTION WORDS WRITING */
const words = ["Desenvolvedor Web ", " Dev Full Stack ", " Dev Front End ", " Dev Back End ", " Desenvolvedor ", " Programador "];
const textElement = document.getElementById("text-change");
let wordIndex = 0; // Índice da palavra atual
let charIndex = 0; // Índice da letra sendo digitada ou apagada
let deleting = false; // Controle para apagar ou digitar

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        // Apaga letras
        textElement.innerText = currentWord.slice(0, charIndex--);
    } else {
        textElement.classList.remove("text-change__space")
        // Digita letras
        textElement.innerText = currentWord.slice(0, charIndex++);
    }

    if (!deleting && charIndex === currentWord.length) {
        // Se a palavra foi totalmente digitada, pausa antes de apagar
        deleting = true;
        setTimeout(typeEffect, 1000);
    } else if (deleting && charIndex === 0) {
        textElement.classList.add("text-change__space")
        // Se foi totalmente apagada, muda para a próxima palavra
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Vai para a próxima palavra
        setTimeout(typeEffect, 500);
    } else {
        // Continua digitação/apagamento com a velocidade ajustada
        setTimeout(typeEffect, deleting ? 50 : 100);
    }
}

// Inicia o loop de digitação assim que a página carregar
typeEffect();