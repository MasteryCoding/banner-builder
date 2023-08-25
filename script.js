const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('download');
const colorAInput = document.getElementById('colorA');
const colorBInput = document.getElementById('colorB');
const imageUploadInput = document.getElementById('imageUpload');

// Set default colors
colorAInput.value = '#ff0000'; // You can change this to the desired default color
colorBInput.value = '#0000ff'; // You can change this to the desired default color

let img = new Image();

function renderCanvas() {
    const colorA = colorAInput.value;
    const colorB = colorBInput.value;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image if it's loaded
    if (img.src) {
        const scaleFactor = 300 / img.height;
        const width = img.width * scaleFactor;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - 300) / 2;
        ctx.drawImage(img, x, y, width, 300);
    }

    // Enable download
    downloadButton.href = canvas.toDataURL('image/png');
}

imageUploadInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = renderCanvas; // Render canvas when image is loaded
    };

    reader.readAsDataURL(file);
});

// Add event listeners to update the preview whenever there are changes to the form values
colorAInput.addEventListener('input', renderCanvas);
colorBInput.addEventListener('input', renderCanvas);

// Render the canvas with the default colors on page load
renderCanvas();
