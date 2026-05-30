document.addEventListener("DOMContentLoaded", () => {
    // State Tracking
    let currentStage = 0;

    // DOM Element Selections
    const moon = document.getElementById("moon");
    const gfImage = document.getElementById("gf-image");
    const coupleImage = document.getElementById("couple-image");
    const textStage2 = document.getElementById("text-stage2");
    const textStage3 = document.getElementById("text-stage3");
    
    // Audio Selections
    const eidSong = document.getElementById("eid-song");
    const coupleSong = document.getElementById("couple-song");

    // Dynamic Element Containers
    const starsContainer = document.getElementById("stars-container");
    const firefliesContainer = document.getElementById("fireflies-container");
    const heartsContainer = document.getElementById("hearts-container");

    // Interval timers
    let heartTimer = null;
    let extraFireflyTimer = null;

    // Initialize Atmosphere
    generateStars();
    generateFireflies(25);

    // Event Listener for the Magical Moon
    moon.addEventListener("click", () => {
        handleMoonSequence();
    });

    function handleMoonSequence() {
        if (currentStage === 0) {
            // Transition to Stage 1: Reveal Girlfriend image
            revealGFImage();
            currentStage = 1;
        } else if (currentStage === 1) {
            // Transition to Stage 2: Reveal Eid Mubarak typography + Play Audio 1
            revealStage2Text();
            currentStage = 2;
        } else if (currentStage === 2) {
            // Transition to Stage 3: Reveal Couple image + Romantic Text + Play Audio 2 + Spawn Hearts
            revealStage3Romantic();
            currentStage = 3;
        } else if (currentStage === 3) {
            // Transition to Stage 4: Reset all animations and return to Stage 0
            resetToStageZero();
            currentStage = 0;
        }
    }

    /* --- STAGE 1: Reveal Girlfriend Image --- */
    function revealGFImage() {
        gfImage.classList.add("reveal");
    }

    /* --- STAGE 2: Reveal Eid Typography & Audio 1 --- */
    function revealStage2Text() {
        // Play EID Song securely
        playAudio(eidSong);

        // Display with elegant typing effect
        textStage2.classList.add("visible");
        typeWriterEffect(textStage2, "Eid Mubarak Liza 🌙", 100);
    }

    /* --- STAGE 3: Reveal Couple Image, Romantic Text, Audio 2 & Love Effects --- */
    function revealStage3Romantic() {
        // Stop Eid Song, Play Romantic Couple Song
        stopAudio(eidSong);
        playAudio(coupleSong);

        // Reveal Couple Image with glow
        coupleImage.classList.add("reveal");

        // Display romantic sub-text
        textStage3.classList.add("visible");
        typeWriterEffect(textStage3, "Eid Mubarak My Love Liza 😊🌙", 80);

        // Enhance the Moon Glow
        moon.classList.add("enhanced-glow");

        // Start Spawning Floating Hearts
        startHeartSpawner();

        // Spawn More Fireflies for dense magical atmosphere
        generateFireflies(15);
    }

    /* --- STAGE 4 / RESET: Return to initial load state --- */
    function resetToStageZero() {
        // Stop and reset all audios
        stopAudio(eidSong);
        stopAudio(coupleSong);

        // Hide Images (Remove classes)
        gfImage.classList.remove("reveal");
        coupleImage.classList.remove("reveal");

        // Clear and Hide Text
        textStage2.classList.remove("visible");
        textStage3.classList.remove("visible");
        textStage2.innerHTML = "";
        textStage3.innerHTML = "";

        // Reset Moon Glow
        moon.classList.remove("enhanced-glow");

        // Stop and remove hearts
        stopHeartSpawner();

        // Keep normal level of fireflies, remove extras
        firefliesContainer.innerHTML = "";
        generateFireflies(25);
    }

    /* --- HELPER FUNCTIONS --- */

    // Generate Background Stars dynamically
    function generateStars() {
        const starCount = 80;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.className = "star";
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 3;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${delay}s`;

            starsContainer.appendChild(star);
        }
    }

    // Generate Fireflies dynamically
    function generateFireflies(count) {
        for (let i = 0; i < count; i++) {
            const firefly = document.createElement("div");
            firefly.className = "firefly";
            
            const x = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 8 + 8; // Between 8s and 16s

            firefly.style.left = `${x}%`;
            firefly.style.animationDelay = `${delay}s`;
            firefly.style.animationDuration = `${duration}s`;

            firefliesContainer.appendChild(firefly);
        }
    }

    // Typewriter effect generator
    let typingTimeouts = [];
    function typeWriterEffect(element, text, speed) {
        element.innerHTML = "";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                const timeout = setTimeout(type, speed);
                typingTimeouts.push(timeout);
            }
        }
        type();
    }

    // Audio handlers ensuring smooth state transitions
    function playAudio(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
            console.warn("Audio playback initiated, awaiting user interaction standard permissions.", error);
        });
    }

    function stopAudio(audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    // Floating heart spawning logic
    function startHeartSpawner() {
        if (heartTimer) clearInterval(heartTimer);
        
        heartTimer = setInterval(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤";
            
            const startX = Math.random() * 100; // randomized starting horizontal axis
            const size = Math.random() * 15 + 10; // randomized sizes
            const duration = Math.random() * 3 + 4; // float speeds
            
            heart.style.left = `${startX}%`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDuration = `${duration}s`;
            
            heartsContainer.appendChild(heart);
            
            // Clean memory after animation resolves
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
            
        }, 600);
    }

    function stopHeartSpawner() {
        if (heartTimer) {
            clearInterval(heartTimer);
            heartTimer = null;
        }
        heartsContainer.innerHTML = "";
        
        // Clear active typing routines
        typingTimeouts.forEach(timeout => clearTimeout(timeout));
        typingTimeouts = [];
    }
});