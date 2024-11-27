document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const highlightButton = document.getElementById('highlight-button');
    const popupModal = document.getElementById('popup-modal');
    const closeButton = document.getElementById('close-button');

    // Check if the user has visited before
    if (!localStorage.getItem('hasVisited')) {
        popupModal.classList.remove('hidden');
    }

    // Handle close button
    closeButton.addEventListener('click', () => {
        popupModal.classList.add('hidden');
    });

    // Create a 5x5 grid (25 boxes) with a dark theme
    for (let i = 0; i < 25; i++) {
        const box = document.createElement('div');
        box.className =
            'box bg-gray-700 border border-gray-600 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg shadow flex items-center justify-center transition-transform transform hover:scale-105';
        gridContainer.appendChild(box);
    }

    // Define corner indices
    const cornerIndices = [0, 4, 20, 24];

    // Highlight boxes when the button is clicked
    highlightButton.addEventListener('click', () => {
        // Remove previous highlights
        document.querySelectorAll('.highlighted').forEach((box) => {
            box.classList.remove('highlighted', 'scale-110');
            box.style.boxShadow = ''; // Reset shadow
            const img = box.querySelector('img');
            if (img) img.remove(); // Remove existing star images
        });

        let highlightedIndices = [];

        while (highlightedIndices.length < 4) {
            let randomIndex;

            // Increase the chance of avoiding corner indices
            if (Math.random() < 0.7) {
                // 70% chance to avoid corners
                do {
                    randomIndex = Math.floor(Math.random() * 25);
                } while (cornerIndices.includes(randomIndex));
            } else {
                randomIndex = Math.floor(Math.random() * 25);
            }

            if (isValidIndex(randomIndex, highlightedIndices)) {
                highlightedIndices.push(randomIndex);

                const box = gridContainer.children[randomIndex];
                box.classList.add('highlighted', 'scale-110');
                box.style.boxShadow = '0px 10px 15px 1px yellow'; // Add green glowing shadow

                // Add the star image
                const img = document.createElement('img');
                img.src = 'star.png';
                img.alt = 'Star';
                img.className = 'w-full h-full rounded-sm object-cover'; // Adjust the size as needed
                box.appendChild(img);
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
