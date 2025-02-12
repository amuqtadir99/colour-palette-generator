document.addEventListener("DOMContentLoaded", function () {
    generatePalette();
});

// Function to generate a new color palette
function generatePalette() {
    const paletteContainer = document.getElementById("palette-container");
    paletteContainer.innerHTML = ""; // Clear previous palette
    
    for (let i = 0; i < 5; i++) {
        let { hex, hsl } = generateRandomColor();
        
        let colorCard = document.createElement("div");
        colorCard.classList.add("col-12", "col-sm-2", "color-card");
        colorCard.style.backgroundColor = hex;
        colorCard.innerHTML = `
            <div class="color-info">
                <span class="hex-code">${hex}</span>
                <br>
                <span class="hsl-code">${hsl}</span>
            </div>
        `;
        colorCard.addEventListener("click", () => copyColor(hex, hsl));
        
        paletteContainer.appendChild(colorCard);
    }
}

// Function to generate a random color
function generateRandomColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 50) + 50;
    const l = Math.floor(Math.random() * 40) + 30;
    const hsl = `hsl(${h}, ${s}%, ${l}%)`;
    const hex = hslToHex(h, s, l);
    return { hex, hsl };
}

// Convert HSL to HEX format
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

// Copy color to clipboard
function copyColor(hex, hsl) {
    const textToCopy = `${hex} | ${hsl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied: ${textToCopy}`);
    });
}

// Download palette as text file
function downloadPalette() {
    let colors = [];
    document.querySelectorAll(".color-info").forEach(info => {
        let hex = info.querySelector(".hex-code").innerText;
        let hsl = info.querySelector(".hsl-code").innerText;
        colors.push(`${hex}    |    ${hsl}\n`);
    });
    
    const blob = new Blob([colors.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "palette.txt";
    a.click();
}

// Attach event listeners
document.getElementById("generate-btn").addEventListener("click", generatePalette);
document.getElementById("download-btn").addEventListener("click", downloadPalette);