window.addEventListener('load', () => {

    const intro = document.getElementById("intro");
    const musicIcon = document.getElementById("musicIcon");
    const noMusicText = document.getElementById("noMusicText");
    const content = document.getElementById("content");
    const bgm = document.getElementById("bgm");
    const soundToggle = document.getElementById("soundToggle");
    const msgEl = document.getElementById('message');


    const messages = [
        "Chúc mấy bạn nữ luôn khỏe mạnh và hạnh phúc 🌸",
        "Cảm ơn vì những kỉ niệm đã đi cùng nhau 💖",
        "Chúc mí bạn luôn giữ nụ cười trên môi, ngày càng xinh đẹp hơn nà 💕",
        "Mong sao tình bạn của chúng ta vẫn mãi bền lâu 🌷",
        "Chả biết chúc gì nựa=)) 🌼",
        "20/10 là ngày đặc biệt, hãy tận hưởng nhó 💫"
    ];
    let i = 0;
    msgEl.style.transition = "opacity 0.8s ease";
    msgEl.style.opacity = 1;

    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

//Chỉnh ở đây(nhớ là để theo tên nào giống tên đó là đc ví dụ như Anh(1), Anh(2) nếu từ đầu đã đặt tên anh thì anh(1), anh(2))
    const falling = [];
    for (let k = 1; k <= 12; k++) falling.push(`style/img/Anh (${k}).png`);
    const activePositions = [];

    function createFallingImage() {
        let left;
        const safe = 8;           
        const minDistance = 10;   
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        el.src = falling[Math.floor(Math.random() * falling.length)];
        el.style.left = left + 'vw';

        let min = 80, max = 120;
        if (window.innerWidth <= 480) { min = 40; max = 70; }
        else if (window.innerWidth <= 768) { min = 60; max = 90; }
        el.style.width = (min + Math.random() * (max - min)) + 'px';

        const duration = 8 + Math.random() * 4;
        el.style.animationDuration = duration + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, (duration + 2) * 1000);
    }

    setInterval(createFallingImage, 1100);

    let playing = false;

    async function startWebsite() {
        try {
            bgm.currentTime = 68;
            await bgm.play();
            playing = true;
            soundToggle.textContent = "🔈";
        } catch (err) {
            console.log("Tự động phát bị chặn hoặc lỗi:", err);
            playing = false;
            soundToggle.textContent = "🔇";
        }

        intro.style.opacity = "0";
        setTimeout(() => {
            intro.style.display = "none";
            content.classList.remove("hidden");
            soundToggle.classList.remove("hidden");
        }, 600);
    }

    musicIcon.addEventListener("click", startWebsite);
    noMusicText.addEventListener("click", startWebsite);

    document.body.addEventListener('click', function onceStart() {
        if (intro && intro.style.display !== "none") {
            startWebsite();
        }
        document.body.removeEventListener('click', onceStart);
    });

    soundToggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (!playing) {
                bgm.currentTime = 68;
                await bgm.play();
                soundToggle.textContent = "🔈";
                playing = true;
            } else {
                bgm.pause();
                soundToggle.textContent = "🔇";
                playing = false;
            }
        } catch (err) {
            console.log("Không thể phát", err);
        }
    });
});
