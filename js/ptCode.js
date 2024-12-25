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

/* SUBMIT EMAIL FORM */
const msgDiv = document.getElementById("contact-me-msgdiv");
const messageSpan = document.getElementById("response-message");
const sendMessageBtn = document.getElementById("send-message");
const loadingTimeout = [];

async function submitForm(e) {
    e.preventDefault();

    loadingTimeout.forEach((timeout) => clearTimeout(timeout));
    sendMessageBtn.classList.add("load")
    loadingTimeout.push(setTimeout(() => {
        sendMessageBtn.classList.add("loading")
    }, 300));

    const recaptchaResponse = grecaptcha.getResponse();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const subject = document.getElementById("input-subject").value;
    const message = document.getElementById("input-message").value;

    if ((name == null || !name) || (email == null || !email) || (subject == null || !subject) || (message == null || !message)) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load");
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Preencha todo o Formulário!";
        return;
    }

    if (email.length < 8) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load");
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Email muito Curto";
        return;
    }

    if (message.length < 8) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load");
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Mensagem muito Curta!";
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load");
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Email Inválido";
        return;
    }

    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        recaptchaToken: recaptchaResponse
    };


    if (!recaptchaResponse) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load");
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Por favor complete o Captcha!";
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

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load")
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        if (result.isError == false) {
            grecaptcha.reset();

            msgDiv.classList.remove("error")
            msgDiv.classList.add("success")
            messageSpan.innerText = "Email Enviado com Sucesso!";
        } else {
            msgDiv.classList.remove("form-success");
            msgDiv.classList.add("form-error");
            switch (result.error) {
                case 0:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Erro Interno. Tente novamente mais tarde";
                    break;
                case 1:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Captcha Inválido. Tente novamente";
                    break;
                case 2:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Preencha todo o Formulário!";
                    break;
                case 3:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Email muito Curto!";
                    break;
                case 4:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Mensagem muito Curta!";
                    break;
                case 5:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Erro enviando email. Tente novamente";
                    break;
                case 6:
                    msgDiv.classList.remove("success")
                    msgDiv.classList.add("error")
                    messageSpan.innerText = "Erro Interno. Tente novamente mais tarde!";
                    break;
            }
            grecaptcha.reset();
        }
    } catch (error) {

        loadingTimeout.forEach((timeout) => clearTimeout(timeout));
        sendMessageBtn.classList.remove("load")
        loadingTimeout.push(setTimeout(() => {
            sendMessageBtn.classList.remove("loading")
        }, 300));


        msgDiv.classList.remove("success")
        msgDiv.classList.add("error")
        messageSpan.innerText = "Erro enviando email. Tente novamente mais tarde!";
    }
}