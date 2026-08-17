let confetti;

function startLove() {
    const start = document.getElementById("heart");
    const audio = document.getElementById("heartSound");

    audio.volume = 0.9;
    audio.play();
    heart.classList.add("pulse");

    if (confetti) confetti.clear();

    confetti = new ConfettiGenerator({
        target: "confetti-canvas",
        max: 100,
        size: 1.2,
        animate: true,
        props: ["circle","square","triangle"],
        colors: [
            [255,107,129],
            [255,195,113],
            [255,255,255]
        ]
    });

    confetti.render();

    setTimeout(() => confetti.clear(), 6000);
}