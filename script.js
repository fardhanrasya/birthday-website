// Password for access (you can change this)
const SECRET_PASSWORD = "rasyad2024";

// DOM Elements
const passwordPage = document.getElementById("password-page");
const birthdayPage = document.getElementById("birthday-page");
const passwordInput = document.getElementById("password-input");
const enterBtn = document.getElementById("enter-btn");
const errorMessage = document.getElementById("error-message");
const backgroundMusic = document.getElementById("background-music");
const confettiContainer = document.getElementById("confetti-container");
const balloonsContainer = document.getElementById("balloons-container");

// State variables
let musicStarted = false;
let poemAnimationStarted = false;
let galleryAnimationStarted = false;

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  initializePasswordSystem();
  initializeCakeCandles();
  initializeScrollAnimations();

  // Prevent direct access to birthday page
  if (sessionStorage.getItem("rasyad-birthday-access") !== "granted") {
    showPasswordPage();
  } else {
    showBirthdayPage();
  }
});

// Password System
function initializePasswordSystem() {
  enterBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });

  // Clear error message when typing
  passwordInput.addEventListener("input", function () {
    hideErrorMessage();
  });
}

function checkPassword() {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === SECRET_PASSWORD) {
    // Correct password
    sessionStorage.setItem("rasyad-birthday-access", "granted");
    showSuccessTransition();
  } else {
    // Wrong password
    showErrorMessage();
    shakePasswordContainer();
    passwordInput.value = "";
  }
}

function showErrorMessage() {
  errorMessage.classList.remove("error-hidden");
  errorMessage.classList.add("error-visible");
}

function hideErrorMessage() {
  errorMessage.classList.remove("error-visible");
  errorMessage.classList.add("error-hidden");
}

function shakePasswordContainer() {
  const container = document.querySelector(".password-container");
  container.classList.add("shake");
  setTimeout(() => {
    container.classList.remove("shake");
  }, 500);
}

function showSuccessTransition() {
  // Create confetti and balloons
  createConfetti();
  createBalloons();

  // Transition to birthday page after animation
  setTimeout(() => {
    showBirthdayPage();
  }, 1000);
}

function showPasswordPage() {
  passwordPage.classList.add("active");
  birthdayPage.classList.remove("active");
}

function showBirthdayPage() {
  passwordPage.classList.remove("active");
  birthdayPage.classList.add("active");

  // Start background music
  if (!musicStarted) {
    setTimeout(() => {
      startBackgroundMusic();
    }, 500);
    musicStarted = true;
  }

  // Start poem animation
  setTimeout(() => {
    startPoemAnimation();
  }, 1500);
}

// Background Music
function startBackgroundMusic() {
  backgroundMusic.play().catch((error) => {
    console.log("Auto-play prevented:", error);
    // Show a play button if autoplay is blocked
    showPlayMusicButton();
  });
}

function showPlayMusicButton() {
  const playButton = document.createElement("button");
  playButton.textContent = "🎵 Putar Musik";
  playButton.className = "neon-btn";
  playButton.style.position = "fixed";
  playButton.style.top = "20px";
  playButton.style.right = "20px";
  playButton.style.zIndex = "1001";
  playButton.style.padding = "0.5rem 1rem";
  playButton.style.fontSize = "0.9rem";

  playButton.addEventListener("click", () => {
    backgroundMusic.play();
    playButton.remove();
  });

  document.body.appendChild(playButton);
}

// Confetti Animation
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    confettiContainer.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// Balloons Animation
function createBalloons() {
  for (let i = 0; i < 4; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = i * 25 + 10 + "%";
    balloon.style.animationDelay = i * 0.5 + "s";
    balloonsContainer.appendChild(balloon);

    // Remove balloon after animation
    setTimeout(() => {
      balloon.remove();
    }, 5000);
  }
}

// Cake Candles Interaction
function initializeCakeCandles() {
  const candles = document.querySelectorAll(".candle");
  let blownCandles = 0;

  candles.forEach((candle) => {
    candle.addEventListener("click", function () {
      if (!this.classList.contains("blown-out")) {
        this.classList.add("blown-out");
        blownCandles++;

        // Play blow sound effect (if you want to add one)
        playBlowSound();

        // Check if all candles are blown out
        if (blownCandles === candles.length) {
          setTimeout(() => {
            showCakeMessage();
          }, 500);
        }
      }
    });
  });
}

function playBlowSound() {
  // Create a simple blow sound effect
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    100,
    audioContext.currentTime + 0.3
  );

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

function showCakeMessage() {
  const message = document.createElement("div");
  message.textContent = "HAPPY BIRTHDAY! 🎉";
  message.style.position = "fixed";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.background = "rgba(255, 215, 0, 0.9)";
  message.style.color = "#000";
  message.style.padding = "1rem 2rem";
  message.style.borderRadius = "25px";
  message.style.fontSize = "1.2rem";
  message.style.fontWeight = "bold";
  message.style.zIndex = "1002";
  message.style.animation = "fadeInOut 3s ease-in-out forwards";

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Poem Typewriter Animation
function startPoemAnimation() {
  if (poemAnimationStarted) return;
  poemAnimationStarted = true;

  const poemLines = document.querySelectorAll(".poem-line");

  // Sort lines by their data-line attribute to ensure correct order
  const sortedLines = Array.from(poemLines).sort((a, b) => {
    return (
      parseInt(a.getAttribute("data-line")) -
      parseInt(b.getAttribute("data-line"))
    );
  });

  // Animate lines sequentially - each starts after the previous one finishes
  animatePoemLineSequentially(sortedLines, 0);
}

function animatePoemLineSequentially(lines, index) {
  if (index >= lines.length) {
    // All poem lines are done, now show the gallery
    setTimeout(() => {
      showGalleryAndClosingSections();
    }, 500); // Small delay after last line finishes
    return;
  }

  const currentLine = lines[index];
  currentLine.classList.add("visible");

  // Start typewriter effect and wait for it to complete
  typewriterEffect(currentLine, () => {
    // This callback runs when the current line finishes typing
    setTimeout(() => {
      // Start the next line after a delay
      animatePoemLineSequentially(lines, index + 1);
    }, 800); // Delay between lines
  });
}

function typewriterEffect(element, onComplete) {
  const text = element.textContent;
  element.textContent = "";

  let charIndex = 0;
  const typeInterval = setInterval(() => {
    element.textContent += text[charIndex];
    charIndex++;

    if (charIndex >= text.length) {
      clearInterval(typeInterval);
      // Call the completion callback if provided
      if (onComplete && typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 80); // Increased delay from 50ms to 80ms for slower typing
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("photo")) {
          entry.target.classList.add("visible");
        }
        // Removed automatic gallery animation trigger - now controlled by poem completion
      }
    });
  }, observerOptions);

  // Observe gallery photos
  const photos = document.querySelectorAll(".photo");

  photos.forEach((photo) => observer.observe(photo));
}

function triggerGalleryAnimation() {
  if (galleryAnimationStarted) return;
  galleryAnimationStarted = true;
  animateGallery();
}

function showGalleryAndClosingSections() {
  // Show gallery section first
  const gallerySection = document.querySelector(".gallery-section");
  gallerySection.classList.add("visible");

  // Start gallery animation
  triggerGalleryAnimation();

  // Show closing section after a delay
  setTimeout(() => {
    const closingSection = document.querySelector(".closing-section");
    closingSection.classList.add("visible");
  }, 800); // Delay before showing closing message
}

function animateGallery() {
  const photos = document.querySelectorAll(".photo");

  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.classList.add("visible");
    }, index * 200);
  });
}

// Additional CSS for fade in/out animation
const additionalStyles = `
@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    20%, 80% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
}
`;

// Add the additional styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Prevent right-click and common shortcuts to maintain the surprise
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  // Disable F12, Ctrl+Shift+I, Ctrl+U
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.key === "u")
  ) {
    e.preventDefault();
  }
});

// Add sparkle effect on mouse movement
document.addEventListener("mousemove", function (e) {
  // Only add sparkles on birthday page
  if (birthdayPage.classList.contains("active")) {
    createMouseSparkle(e.clientX, e.clientY);
  }
});

function createMouseSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.style.position = "fixed";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.width = "4px";
  sparkle.style.height = "4px";
  sparkle.style.background = "#ffd700";
  sparkle.style.borderRadius = "50%";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "999";
  sparkle.style.animation = "sparkle 1s ease-out forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Auto-scroll to next section when cake animation is complete
function initializeAutoScroll() {
  const sections = document.querySelectorAll("section");
  let currentSection = 0;

  // You can add auto-scroll functionality here if needed
}

// Reset access (for testing purposes - you can remove this)
function resetAccess() {
  sessionStorage.removeItem("rasyad-birthday-access");
  location.reload();
}

// Make reset function available globally (for testing)
window.resetAccess = resetAccess;
