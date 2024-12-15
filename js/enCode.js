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
const msgDiv = document.getElementById("contact-me-msgdiv");
const messageSpan = document.getElementById("response-message");
const sendMessageBtn = document.getElementById("send-message");

async function submitForm(e) {
    e.preventDefault();

    sendMessageBtn.classList.add("loading")

    const recaptchaResponse = grecaptcha.getResponse();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const subject = document.getElementById("input-subject").value;
    const message = document.getElementById("input-message").value;

    if ((name == null || !name) || (email == null || !email) || (subject == null || !subject) || (message == null || !message)) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");
        sendMessageBtn.classList.remove("loading");
        messageSpan.innerText = "Fill All Forms";
        return;
    }

    if (email.length < 8) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");
        sendMessageBtn.classList.remove("loading");
        messageSpan.innerText = "Email Too Short";
        return;
    }

    if (message.length < 8) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");
        sendMessageBtn.classList.remove("loading");
        messageSpan.innerText = "Message Too Short";
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");
        sendMessageBtn.classList.remove("loading");
        messageSpan.innerText = "Invalid Email.";
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
        sendMessageBtn.classList.remove("loading");
        messageSpan.innerText = "Please complete the captcha";
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
        sendMessageBtn.classList.remove("loading")
        console.log(result);
        if (result.isError == false) {
            grecaptcha.reset();
            msgDiv.classList.add("form-success");
            msgDiv.classList.remove("form-error");
            messageSpan.innerText = "Email Successfully Sended";
        } else {
            msgDiv.classList.remove("form-success");
            msgDiv.classList.add("form-error");
            switch (result.error) {
                case 0:
                    messageSpan.innerText = "Internal Error. Try Again Later";
                    break;
                case 1:
                    messageSpan.innerText = "Invalid reCaptcha. Try Again";
                    break;
                case 2:
                    messageSpan.innerText = "Fill All Forms!";
                    break;
                case 3:
                    messageSpan.innerText = "Email Too Short!";
                    break;
                case 4:
                    messageSpan.innerText = "Message Too Short!";
                    break;
                case 5:
                    messageSpan.innerText = "Error sending Email. Try Again";
                    break;
                case 6:
                    messageSpan.innerText = "Internal Error. Try Again Later";
                    break;
            }
            grecaptcha.reset();
        }
    } catch (error) {
        sendMessageBtn.classList.remove("loading")
        msgDiv.classList.remove("form-success");
        msgDiv.classList.add("form-error");
        messageSpan.innerText = "Error to Send Email. Try Again Later";
    }
}