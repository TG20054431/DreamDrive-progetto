document.addEventListener('DOMContentLoaded', function() {
    const filters = {
        nationality: document.getElementById('nationalityFilter'),
        brand: document.getElementById('brandFilter'),
        engine: document.getElementById('engineFilter')
    };

    const cards = document.querySelectorAll('.card');

    // Add data attributes to cards
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        
        // Set data attributes based on car properties
        if (title.includes('porsche')) {
            card.dataset.nationality = 'german';
            card.dataset.brand = 'porsche';
            card.dataset.engine = 'boxer';
        } else if (title.includes('ferrari')) {
            card.dataset.nationality = 'italian';
            card.dataset.brand = 'ferrari';
            card.dataset.engine = 'v8';
        } else if (title.includes('lamborghini')) {
            card.dataset.nationality = 'italian';
            card.dataset.brand = 'lamborghini';
            card.dataset.engine = 'v12';
        } else if (title.includes('mustang')) {
            card.dataset.nationality = 'american';
            card.dataset.brand = 'ford';
            card.dataset.engine = 'v8';
        } else if (title.includes('mercedes')) {
            card.dataset.nationality = 'german';
            card.dataset.brand = 'mercedes';
            card.dataset.engine = 'v8';
        } else if (title.includes('aston')) {
            card.dataset.nationality = 'british';
            card.dataset.brand = 'aston';
            card.dataset.engine = 'v12';
        }
    });

    // Filter function
    function filterCards() {
        const selectedNationality = filters.nationality.value;
        const selectedBrand = filters.brand.value;
        const selectedEngine = filters.engine.value;

        cards.forEach(card => {
            const matchNationality = selectedNationality === 'all' || card.dataset.nationality === selectedNationality;
            const matchBrand = selectedBrand === 'all' || card.dataset.brand === selectedBrand;
            const matchEngine = selectedEngine === 'all' || card.dataset.engine === selectedEngine;

            card.closest('.col').style.display = (matchNationality && matchBrand && matchEngine) ? '' : 'none';
        });
    }

    // Add click event listener to search button
    document.getElementById('searchButton').addEventListener('click', filterCards);

    // Remove the automatic filtering on select change
    Object.values(filters).forEach(filter => {
        filter.removeEventListener('change', filterCards);
    });
});
