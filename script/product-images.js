// Product Images Configuration
document.addEventListener('DOMContentLoaded', () => {
    const productImages = {
        'Vitamin C 1000mg': '../images/health care1.png',
        'Omega-3 Fish Oil': '../images/pharma1.png',
        'Multivitamin Complex': '../images/buttons1.png',
        'Probiotic Blend': '../images/nitril dispo 11.png',
        'Vitamin D3': '../images/para111.png',
        'Magnesium Complex': '../images/doc1.png',
        'Zinc Supplement': '../images/citroc1.png',
        'Coenzyme Q10': '../images/cerelac1.png',
        'Turmeric Curcumin': '../images/baby mol2.png'
    };

    // Update product images
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;
        if (productImages[productName]) {
            const img = card.querySelector('img');
            img.src = productImages[productName];
            img.alt = productName;
        }
    });
}); 