let step = 0;

// تحميل النصوص والخيارات الابتدائية من config.js
window.onload = () => {
    document.getElementById('subtitle').textContent = CONFIG.step1.subtitle;
    document.getElementById('title').textContent = CONFIG.step1.title;
    document.getElementById('hint').textContent = CONFIG.hintText;
    document.getElementById('loveImg').src = CONFIG.imagePath;
};

function nextStep() {
    const subtitle = document.getElementById('subtitle');
    const title = document.getElementById('title');
    const arrowSvg = document.getElementById('arrowSvg');
    const heart = document.getElementById('heart');
    const stage = document.getElementById('stage');
    const canvas = document.getElementById('treeCanvas');
    const hint = document.getElementById('hint');

    if (step === 0) {
        // Shoot Arrow & Change Text
        arrowSvg.style.transform = 'translateY(-100px)';
        
        setTimeout(() => {
            heart.style.transform = 'rotate(-45deg) scale(1.2)';
            subtitle.textContent = CONFIG.step2.subtitle;
            title.textContent = CONFIG.step2.title;
            title.style.fontSize = '3rem';
            title.style.color = CONFIG.step2.titleColor;
            title.style.textShadow = `0 0 20px ${CONFIG.step2.titleColor}`;
            step = 1;
        }, 300);

    } else if (step === 1) {
        // Transition to Blooming Tree
        stage.style.display = 'none';
        canvas.style.display = 'block';
        subtitle.textContent = CONFIG.step3.subtitle;
        title.textContent = CONFIG.step3.title;
        title.style.fontSize = '2rem';
        hint.style.display = 'none';

        drawTreeAnimation();
        step = 2;
    }
}

function drawTreeAnimation() {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw Trunk
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#6d4c41';
    ctx.beginPath();
    ctx.moveTo(160, 320);
    ctx.lineTo(160, 180);
    ctx.stroke();

    // Branches
    drawBranch(ctx, 160, 240, -35, 50);
    drawBranch(ctx, 160, 220, 35, 50);
    drawBranch(ctx, 160, 190, -25, 40);
    drawBranch(ctx, 160, 190, 25, 40);

    // Blooming Hearts
    let heartsCount = 0;
    const totalHearts = 150;

    function bloom() {
        if (heartsCount < totalHearts) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 85;
            const x = 160 + r * Math.cos(angle);
            const y = 130 + r * Math.sin(angle) * 0.8;

            drawMiniHeart(ctx, x, y, Math.random() * 6 + 4, Math.random() > 0.3 ? '#ff2e63' : '#ff9ebb');
            heartsCount++;
            setTimeout(bloom, 20);
        } else {
            // Show Image at the end
            setTimeout(() => {
                const subtitle = document.getElementById('subtitle');
                subtitle.textContent = CONFIG.step4.subtitle;
                document.getElementById('photoBox').classList.add('show');
            }, 500);
        }
    }

    setTimeout(bloom, 300);
}

function drawBranch(ctx, startX, startY, angle, length) {
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#6d4c41';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    const endX = startX + angle;
    const endY = startY - length;
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawMiniHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
    ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
}