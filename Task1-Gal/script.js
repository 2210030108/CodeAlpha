const images = [
    { id: 1, src: './images/img1.png' },
    { id: 2, src: './images/img2.png'},
    { id: 3, src: './images/img3.png' },
    { id: 4, src: './images/img4.png' }
];

let currentIndex = 0;

const galleryImage = document.getElementById('galleryImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function updateImage() {
    galleryImage.src = images[currentIndex].src; // Corrected this line
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateImage();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateImage();
});
