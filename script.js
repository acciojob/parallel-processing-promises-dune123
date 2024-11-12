//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${url}`);
    });
}

function loadImages() {
    output.innerHTML = ''; // Clear any previous content

    const promises = images.map(image => loadImage(image.url));

    Promise.allSettled(promises).then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                // Append the loaded image element to the output div
                output.appendChild(result.value);
            } else {
                // Log error message for failed image
                console.error(result.reason);
            }
        });
    });
}

btn.addEventListener('click', loadImages);
