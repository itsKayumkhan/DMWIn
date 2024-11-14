document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const highlightButton = document.getElementById('highlight-button');
    const popupModal = document.getElementById('popup-modal');
    const closeButton = document.getElementById('close-button');

    // Paths to images
    const starImagePath = './star.png'; // Replace with actual path
    const bombImagePath = './bomb.png'; // Replace with actual path

    // Check if the user has visited before
    if (!localStorage.getItem('hasVisited')) {
        popupModal.classList.remove('hidden');
    }

    // Handle close button
    closeButton.addEventListener('click', () => {
        popupModal.classList.add('hidden');
        localStorage.setItem('hasVisited', true); // Mark as visited
    });

    // Create a 5x5 grid (25 boxes) with a light theme
    for (let i = 0; i < 25; i++) {
        const box = document.createElement('div');
        box.className = 'box bg-gray-200 border border-gray-300 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg shadow transition-transform transform hover:scale-105 relative';

        // Default to bomb image initially
        const img = document.createElement('img');
        img.src = bombImagePath;
        img.className = 'w-full h-full object-cover';
        box.appendChild(img);

        gridContainer.appendChild(box);
    }

    // Define corner indices to reduce likelihood of selection
    const cornerIndices = [0, 4, 20, 24];

    // Highlight boxes when the button is clicked
    highlightButton.addEventListener('click', () => {
        // Remove previous highlights
        document.querySelectorAll('.highlighted').forEach(box => {
            box.classList.remove('highlighted');
            box.querySelector('img').src = bombImagePath; // Reset to bomb image
        });

        let highlightedIndices = [];

        while (highlightedIndices.length < 4) {
            let randomIndex;

            // Increase the chance of avoiding corner indices
            if (Math.random() < 0.7) {  // 70% chance to avoid corners
                do {
                    randomIndex = Math.floor(Math.random() * 25);
                } while (cornerIndices.includes(randomIndex));
            } else {
                randomIndex = Math.floor(Math.random() * 25);
            }

            if (isValidIndex(randomIndex, highlightedIndices)) {
                highlightedIndices.push(randomIndex);
                const selectedBox = gridContainer.children[randomIndex];

                // Add highlight effect and change to star image
                selectedBox.classList.add('highlighted');
                selectedBox.querySelector('img').src = starImagePath;
            }
        }
    });

    function isValidIndex(index, highlightedIndices) {
        const row = Math.floor(index / 5);
        const col = index % 5;

        for (let i of highlightedIndices) {
            const existingRow = Math.floor(i / 5);
            const existingCol = i % 5;

            // Check if the new index is adjacent (including diagonals) to any existing highlighted box
            if (Math.abs(row - existingRow) <= 1 && Math.abs(col - existingCol) <= 1) {
                return false;
            }
        }

        return true;
    }
});
