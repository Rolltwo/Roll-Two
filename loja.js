document.addEventListener('DOMContentLoaded', () => {
    // Filtro de categorias
    const categoryButtons = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            products.forEach(product => {
                if (category === 'todos' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Carrinho de compras
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    let cartItems = [];

    // Função para atualizar o carrinho
    window.updateCart = function(item) {
        cartItems.push(item);
        updateCartCount();
        
        // Animação do carrinho
        cartBtn.classList.add('pulse');
        setTimeout(() => {
            cartBtn.classList.remove('pulse');
        }, 300);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));
            const productImage = productCard.querySelector('img').src;
            
            const cartItem = {
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            };
            
            updateCart(cartItem);
            
            // Feedback visual
            button.textContent = 'Adicionado!';
            setTimeout(() => {
                button.textContent = 'Adicionar ao Carrinho';
            }, 2000);
        });
    });

    function updateCartCount() {
        let totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Adiciona animação de pulse ao carrinho
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Abrir detalhes do produto ao clicar
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            // Evita abrir os detalhes se clicar no botão de adicionar ao carrinho
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }

            const productName = product.querySelector('h3').textContent;
            let productImages;

            // Verifica se é uma camisa e configura as imagens de acordo
            if (productName.includes('Camiseta')) {
                if (productName.includes('Modelo 1')) {
                    productImages = {
                        '#000000': 'camisaRT-preta.png',  // Imagem da camisa preta modelo 1
                        '#FFFFFF': 'camisaRT-branca1.png' // Imagem da camisa branca modelo 1
                    };
                } else if (productName.includes('Modelo 2')) {
                    productImages = {
                        '#000000': 'camisaRT-preta2.png',  // Imagem da camisa preta modelo 2
                        '#FFFFFF': 'camisaRT-branca2.png' // Imagem da camisa branca modelo 2
                    };
                }
            }

            const productData = {
                name: productName,
                price: parseFloat(product.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.')),
                description: product.querySelector('p').textContent,
                images: [product.querySelector('img').src],
                sizes: ['P', 'M', 'G', 'GG'],
                colors: ['#000000', '#FFFFFF'],
                colorImages: productImages // Adiciona as imagens para cada cor
            };

            openProductDetails(productData);
        });
    });
}); 