/* ADD HERO SECTION WORDS WRITING */
const words = [" Web Developer ", " Full Stack Dev ", " Front End Dev ", " Back End Dev ", " Developer ", " Script Writter "];
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

/* SUBMIT EMAIL FORM */
async function submitForm(e) {
    e.preventDefault();

    const recaptchaResponse = grecaptcha.getResponse();

    const formData = {
        name: document.getElementById("input-name").value,
        email: document.getElementById("input-email").value,
        subject: document.getElementById("input-subject").value,
        message: document.getElementById("input-message").value,
        recaptchaToken: recaptchaResponse
    };


    if (!recaptchaResponse) {
        alert("Por favor, complete o reCAPTCHA.");
        return;
    }


    try {
        const response = await fetch("https://misc-api-three.vercel.app/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log(result);
        if (result.isError == false) {
            grecaptcha.reset();
            document.getElementById("response-message").classList.remove("error");
            document.getElementById("response-message").classList.add("success");
            document.getElementById("response-message").innerText = "Email Successfully Sended";
        } else {
            grecaptcha.reset();
        }
    } catch (error) {
        document.getElementById("response-message").classList.remove("success");
        document.getElementById("response-message").classList.add("error");
        document.getElementById("response-message").innerText = "Error to Send Email. Try Again Later";
    }
}