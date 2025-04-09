const questions = [
    { question: "Mana yang lebih berat, 1 kg kapas atau 1 kg besi?", options: ["Kapas", "Besi", "Sama saja", "Tergantung"], correct: 2 },
    { question: "Jika seekor ayam bertelur di atas atap miring, ke mana telur jatuh?", options: ["Ke kanan", "Ke kiri", "Tidak jatuh", "Ayam tidak bertelur"], correct: 0 },
    { question: "Apa warna kotak hitam di pesawat terbang?", options: ["Hitam", "Oranye", "Putih", "Abu-abu"], correct: 0 },
    { question: "Jika ada 5 burung di pohon dan 2 terbang pergi, berapa burung yang tersisa?", options: ["3", "5", "0", "7"], correct: 1 },
    { question: "Apa yang terjadi jika kamu membelah nol dengan nol?", options: ["Tak terhingga", "Satu", "Nol", "Error"], correct: 0 }
];

let currentQuestionIndex = 0;
let answered = false;
let score = 0;
let totalQuestions = questions.length;
let questionOrder = [...Array(questions.length).keys()];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (questionOrder.length === 0) {
        showResult();
        return;
    }
    currentQuestionIndex = questionOrder.pop();
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn", "btn-option", "btn-outline-primary");
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").disabled = true;
    answered = false;
}

function checkAnswer(selectedIndex, button) {
    if (answered) return;
    answered = true;
    
    const questionData = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const buttons = document.querySelectorAll(".btn-option");
    
    if (selectedIndex === questionData.correct) {
        feedback.textContent = "Jawaban Benar!";
        feedback.classList.add("text-success");
        feedback.classList.remove("text-danger");
        button.classList.add("btn-success");
        score++;
    } else {
        feedback.textContent = "Jawaban Salah!";
        feedback.classList.add("text-danger");
        feedback.classList.remove("text-success");
        button.classList.add("btn-danger");
    }
    
    buttons.forEach(btn => btn.disabled = true);
    document.getElementById("next-btn").disabled = false;
}

document.getElementById("next-btn").addEventListener("click", loadQuestion);

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = `Skor Anda: ${score} dari ${totalQuestions}`;
}

function restartQuiz() {
    score = 0;
    questionOrder = [...Array(questions.length).keys()];
    shuffle(questionOrder);
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    loadQuestion();
}

window.onload = () => {
    shuffle(questionOrder);
    loadQuestion();
};