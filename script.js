const questions = [
    {
        id: 1,
        category: "Struktur Sel",
        q: "Perhatikan gambar sel tumbuhan di atas. Organel berbentuk lonjong berwarna merah dengan lipatan-lipatan di dalamnya serta organel bulat besar berwarna ungu berturut-turut merupakan...",
        gambar: "satu.jpg", 
        o: [
            "Kloroplas dan Vakuola",
            "Mitokondria dan Nukleus (Inti Sel)",
            "Badan Golgi dan Ribosom",
            "Retikulum Endoplasma dan Lisosom"
        ],
        a: 1,
        p: "Organel berwarna merah di pojok kiri atas dan kanan tengah adalah Mitokondria yang berfungsi menghasilkan energi (ATP). Sedangkan bulatan besar ungu di kanan atas adalah Nukleus (inti sel) yang mengontrol seluruh aktivitas sel tumbuhan."
    },
    {
        id: 2,
        category: "Struktur Sel",
        q: "Berdasarkan gambar struktur sel hewan di atas, organel yang ditunjuk oleh nomor 2 dan nomor 8 secara berurutan memiliki fungsi untuk...",
        gambar: "dua.png", 
        o: [
            "Sintesis protein dan respirasi seluler menghasilkan energi",
            "Pencernaan intraseluler dan sekresi zat keluar sel",
            "Tempat pembelahan sel dan pembentukan dinding sel",
            "Sintesis lipid dan pembentukan sel darah merah"
        ],
        a: 0,
        p: "Nomor 2 menunjuk ke Retikulum Endoplasma Kasar (yang ditempeli ribosom bintik-bintik cokelat) untuk sintesis protein. Nomor 8 menunjuk ke Mitokondria (bentuk oval dengan gelombang di dalam) yang berfungsi sebagai respirasi seluler pembentuk energi."
    },
    {
        id: 3,
        category: "Sistem Regulasi",
        q: "Bagian dari struktur sel saraf (neuron) yang berfungsi untuk menerima impuls atau rangsangan dari reseptor maupun sel saraf lain ditunjukkan oleh nomor...",
        gambar: "tiga.png", 
        o: ["Nomor 1 (Dendrit)", "Nomor 2 (Badan Sel)", "Nomor 5 (Nukleus)", "Nomor 7 (Sel Schwann)"],
        a: 0,
        p: "Bagian yang bertugas menerima rangsangan pertama kali adalah Dendrit, ditunjukkan oleh percabangan pendek nomor 1. Impuls kemudian diteruskan ke nomor 2 (Badan Sel) lalu menuju nomor 6 (Akson)."
    },
    {
        id: 4,
        category: "Klasifikasi Makhluk Hidup",
        q: "Perhatikan organisme pada gambar di atas. Berdasarkan struktur tubuh, siklus hidup plasmodium (fase berlendir), dan cara makannya, organisme unik ini dikelompokkan ke dalam kingdom...",
        gambar: "empat.jpg", 
        o: ["Fungi (Jamur Sejati)", "Protista mirip Jamur (Myxomycota)", "Plantae (Tumbuhan Lumut)", "Monera (Bakteri Koloni)"],
        a: 1,
        p: "Gambar tersebut memperlihatkan fase berbuah dari Stemonitis (salah satu jenis jamur lendir). Meskipun namanya jamur lendir, ia bukan termasuk Fungi sejati melainkan masuk ke dalam Kingdom Protista (Protista mirip jamur/Myxomycota) karena struktur seluler dan pergerakannya saat mencari makan."
    },
    {
        id: 5,
        category: "Klasifikasi Makhluk Hidup",
        q: "Hewan pada gambar memiliki tubuh berbentuk simetri radial, tidak memiliki tulang belakang, dan mengandalkan sel penyengat (nematosista) pada tentakelnya untuk melumpuhkan mangsa. Hewan ini termasuk ke dalam filum...",
        gambar: "lima.jpg", 
        o: ["Porifera", "Coelenterata / Cnidaria", "Platyhelminthes", "Arthropoda"],
        a: 1,
        p: "Ubur-ubur merupakan contoh hewan berongga yang termasuk ke dalam filum Coelenterata (atau Cnidaria). Ciri utamanya adalah memiliki tubuh simetri radial dan tentakel yang dilengkapi sel penyengat untuk mempertahankan diri dan berburu."
    }
];

let currentQuestionIndex = 0;
let userAnswers = {}; 
let timerInterval = null;
let totalSeconds = 3600; 

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = {};
    totalSeconds = 3600;

    document.getElementById("home-screen").classList.remove("active");
    document.getElementById("quiz-screen").classList.add("active");

    renderNumberNav();
    loadQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            calculateResults();
        } else {
            totalSeconds--;
            let mins = Math.floor(totalSeconds / 60);
            let secs = totalSeconds % 60;
            document.getElementById("timer").innerText = 
                (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
        }
    }, 1000);
}

function renderNumberNav() {
    const grid = document.getElementById("number-nav-grid");
    grid.innerHTML = "";
    
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    grid.style.gap = "8px";
    grid.style.marginTop = "20px";

    questions.forEach((_, idx) => {
        const numBtn = document.createElement("button");
        numBtn.innerText = idx + 1;
        
        numBtn.style.padding = "10px";
        numBtn.style.border = "1px solid #cbd5e1";
        numBtn.style.borderRadius = "6px";
        numBtn.style.fontWeight = "600";
        numBtn.style.cursor = "pointer";
        
        if (idx === currentQuestionIndex) {
            numBtn.style.backgroundColor = "#2563eb";
            numBtn.style.color = "white";
        } else if (userAnswers[idx] !== undefined) {
            numBtn.style.backgroundColor = "#22c55e";
            numBtn.style.color = "white";
        } else {
            numBtn.style.backgroundColor = "#f8fafc";
            numBtn.style.color = "#333";
        }

        numBtn.onclick = () => {
            currentQuestionIndex = idx;
            loadQuestion();
        };
        grid.appendChild(numBtn);
    });
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById("question-counter").innerText = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
    document.getElementById("question-category").innerText = currentQuestion.category;
    document.getElementById("question-text").innerText = currentQuestion.q;

    const imageContainer = document.getElementById("image-container");
    const questionImage = document.getElementById("question-image");

    if (currentQuestion.gambar && currentQuestion.gambar !== "") {
        imageContainer.classList.remove("hidden");
        questionImage.src = currentQuestion.gambar;
    } else {
        imageContainer.classList.add("hidden");
    }

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    const prefixes = ["A", "B", "C", "D"];
    currentQuestion.o.forEach((optionText, idx) => {
        const item = document.createElement("div");
        item.classList.add("option-item");
        if (userAnswers[currentQuestionIndex] === idx) {
            item.classList.add("selected");
        }
        item.onclick = () => { selectOption(idx); };
        item.innerHTML = `<div class="option-prefix">${prefixes[idx]}</div><div>${optionText}</div>`;
        optionsContainer.appendChild(item);
    });

    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById("btn-next").classList.add("hidden");
        document.getElementById("btn-finish").classList.remove("hidden");
    } else {
        document.getElementById("btn-next").classList.remove("hidden");
        document.getElementById("btn-finish").classList.add("hidden");
    }
    
    renderNumberNav();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    loadQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function confirmFinish() {
    if (confirm("Apakah kamu yakin ingin menyelesaikan kuis ini?")) {
        clearInterval(timerInterval);
        calculateResults();
    }
}

function calculateResults() {
    let correctTotal = 0;
    let wrongTotal = 0;
    
    questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.a) {
            correctTotal++;
        } else {
            wrongTotal++;
        }
    });

    const finalScore = Math.round((correctTotal / questions.length) * 100);
    document.getElementById("final-score").innerText = finalScore;
    document.getElementById("total-correct").innerText = correctTotal;
    document.getElementById("total-wrong").innerText = wrongTotal;

    document.getElementById("quiz-screen").classList.remove("active");
    document.getElementById("result-screen").classList.add("active");
}

function backToHome() {
    document.getElementById("result-screen").classList.remove("active");
    document.getElementById("home-screen").classList.add("active");
}
