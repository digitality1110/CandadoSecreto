const correctCombination = [1, 1, 3];
let currentCombination = [0, 0, 0];

function changeDigit(index, delta) {
    currentCombination[index] += delta;
    
    if (currentCombination[index] > 9) {
        currentCombination[index] = 0;
    } else if (currentCombination[index] < 0) {
        currentCombination[index] = 9;
    }
    
    document.getElementById(`digit-${index}`).textContent = currentCombination[index];
}

function checkCombination() {
    const statusElement = document.getElementById('status');
    const lockContainer = document.getElementById('lockContainer');
    
    const isCorrect = currentCombination.every((val, i) => val === correctCombination[i]);
    
    if (isCorrect) {
        statusElement.textContent = "¡Nuestro amor está abierto! ❤️";
        statusElement.style.color = "#4ade80";
        lockContainer.classList.add('unlocked');
        
        setTimeout(() => {
            triggerSurprise();
        }, 1000);
        
    } else {
        statusElement.textContent = "Intenta de nuevo, mi amor.";
        statusElement.style.color = "#fb7185";
        
        lockContainer.style.transform = "translateX(10px)";
        setTimeout(() => lockContainer.style.transform = "translateX(-10px)", 100);
        setTimeout(() => lockContainer.style.transform = "translateX(0)", 200);
    }
}

function triggerSurprise() {
    const surpriseContainer = document.getElementById('surpriseContainer');
    surpriseContainer.style.display = 'flex';
    setTimeout(() => {
        surpriseContainer.style.opacity = '1';
    }, 50);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 75;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 200;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#fb7185' : '#f43f5e';
        }
        update() {
            this.y -= this.speedY;
            if (this.y < -50) {
                this.y = canvas.height + 50;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}