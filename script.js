let startTime, timerInterval,moves = 0;

gsap.from(".card", {
  opacity: 0,
  y: 100,
  stagger: 0.05,
  delay:0.5,
  duration: 0.7,
  ease: "back.out(1.7)"
});


// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Time: ${elapsedSeconds}s`;
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flip') || this.classList.contains('matched')) return;

  if (!startTime) startTimer(); // start timer on first move

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.name === card2.dataset.name;

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    resetFlippedCards();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      resetFlippedCards();
      lockBoard = false;
    }, 1000);
  }
}

function resetFlippedCards() {
  flippedCards = [];
}

function checkWin() {
  if (matchedPairs === cards.length / 2) {
    stopTimer();
    setTimeout(() => {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      document.getElementById("time").innerText=`Time taken: ${totalTime} seconds!`;
      document.getElementById("total-moves").innerText = `Total Moves: ${moves}`;
      document.getElementById("game-board").classList.add('hide');
      document.getElementById("result").classList.remove('hide');
    }, 300);
  }
 
}
document.getElementById("restart").addEventListener('click',function(){
  location.reload();
})

cards.forEach(card => card.addEventListener('click', flipCard));

shuffleCards();