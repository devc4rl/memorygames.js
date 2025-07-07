const emojis = ["🐶", "🚀", "🎉", "🤔", "📚", "👻", "🏠", "🚫", "👑", "🤝", "🍕", "🌟"];

const game = document.querySelector(".game");
let openCards = [];
let lockBoard = false;


const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);


shuffledEmojis.forEach((emoji) => {
    const box = document.createElement("div");
    box.classList.add("item");
    box.innerHTML = `<span class="emoji">${emoji}</span>`;
    box.addEventListener("click", handleClick);
    game.appendChild(box);
});

function handleClick() {
    if (lockBoard || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    openCards.push(this);

    if (openCards.length === 2) {
        lockBoard = true;
        const [card1, card2] = openCards;

        const emoji1 = card1.querySelector("span").textContent;
        const emoji2 = card2.querySelector("span").textContent;

        if (emoji1 === emoji2) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            openCards = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                openCards = [];
                lockBoard = false;
            }, 800);
        }
    }
}
