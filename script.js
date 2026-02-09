document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;

        outline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // 2. Parallax Effect
    const layers = document.querySelectorAll('.parallax-layer');
    const paymentBg = document.querySelector('.payment-bg-layer');

    window.addEventListener('mousemove', (e) => {
        const xVal = (e.clientX - window.innerWidth / 2) / 30;
        const yVal = (e.clientY - window.innerHeight / 2) / 30;

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.4;
            layer.dataset.mx = xVal * speed;
            layer.dataset.my = yVal * speed;
            updateLayerTransform(layer);
        });

        if (paymentBg) {
            paymentBg.dataset.mx = xVal * 0.8;
            paymentBg.dataset.my = yVal * 0.8;
            updateLayerTransform(paymentBg);
        }
    });

    // --- 2.1 Scroll Parallax (For Mobile & Desktop) ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.15;
            layer.dataset.sx = 0;
            layer.dataset.sy = scrolled * speed;
            updateLayerTransform(layer);
        });

        if (paymentBg) {
            const rect = document.getElementById('crypto-payment').getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (visible) {
                const relativeScroll = (window.innerHeight - rect.top) * 0.1;
                paymentBg.dataset.sx = 0;
                paymentBg.dataset.sy = relativeScroll;
                updateLayerTransform(paymentBg);
            }
        }
    });

    function updateLayerTransform(layer) {
        const mx = parseFloat(layer.dataset.mx || 0);
        const my = parseFloat(layer.dataset.my || 0);
        const sx = parseFloat(layer.dataset.sx || 0);
        const sy = parseFloat(layer.dataset.sy || 0);

        // Combine mouse and scroll movement
        // For hero layers we substract scroll for classic parallax feel
        if (layer.classList.contains('parallax-layer') && !layer.classList.contains('payment-bg-layer')) {
            layer.style.transform = `translate3d(${mx}px, ${my - sy}px, 0)`;
        } else {
            layer.style.transform = `translate3d(${mx}px, ${my + sy}px, 0)`;
        }
    }

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass').forEach(card => {
        observer.observe(card);
    });

    // --- Product Parallax Effect (Vape & Xanga) ---
    document.querySelectorAll('.product-card').forEach(card => {
        const productImg = card.querySelector('.product-img-parallax');
        if (productImg) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;

                productImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            });

            card.addEventListener('mouseleave', () => {
                productImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }
    });

    // --- 5. Multi-Language System ---
    const translations = {
        'en': {
            'nav-products': 'Products',
            'nav-payments': 'Payments',
            'nav-contact': 'Contact',
            'btn-order': 'Order Now',
            'hero-title-1': 'DMT SHOP',
            'hero-title-2': 'PREMIUM',
            'hero-subtitle': 'Experience the ultimate expansion of consciousness with our natural products, designed for a safe and transformative experience.',
            'hero-shipping': 'Worldwide Shipping',
            'hero-btn': 'View Product',
            'products-title': '<img src="assets/dmtlogo.jpg" class="title-logo" alt="logo"> DMT <span class="highlight">PRODUCTS</span> <img src="assets/dmtlogo.jpg" class="title-logo" alt="logo">',
            'products-subtitle': 'Premium DMT shop for deep cosmic exploration.',
            'prod-1-title': 'DMT Crystals 1GR',
            'prod-1-desc': 'Pure N,N-DMT crystals of the highest concentration. Perfect for visionary clarity and deep transcendence.',
            'prod-2-title': 'DMT Xanga Herbs 1GR',
            'prod-2-desc': 'A sacred blend of herbs and DMT for a smoother, more grounded transition into hyperspace.',
            'prod-3-title': 'DMT Vape Distillate 1GR',
            'prod-3-desc': 'Premium liquid distillate for vaporizers. High-potency extract for precise and portable experiences.',
            'btn-buy': 'Buy Now',
            'specs-title': 'Technical <span class="highlight">Specifications</span>',
            'spec-prod-label': 'Product:',
            'spec-cap-label': 'Capacity:',
            'spec-cap-val': '1 Gram DMT',
            'spec-mat-label': 'Material:',
            'spec-mat-val': 'Medical-grade Aluminum',
            'spec-charge-label': 'Charging:',
            'spec-charge-val': 'USB-C Fast Charge',
            'reviews-title': 'What Our <span class="highlight">Customers Say</span>',
            'rev-1-text': '"Absolutely incredible device! The vapor quality is amazing and the battery lasts all day. Perfect for my consciousness expansion sessions."',
            'rev-verified': 'Verified Buyer',
            'rev-2-text': '"The build quality is exceptional. I love the precise temperature control and how easy it is to use. Highly recommended!"',
            'rev-3-text': '"Fast shipping, great packaging, and the product exceeded my expectations. Customer service is also top-notch!"',
            'cta-title': 'Ready to Transform Your Psychedelic Experience?',
            'cta-subtitle': 'Join thousands of satisfied customers who have expanded their consciousness.',
            'cta-crypto-title': 'Select a cryptocurrency and make the payment, send us the receipt via Telegram to schedule the shipment that will change the way you see life:',
            'btn-copy': 'Copy',
            'btn-telegram': 'Contact Us on Telegram',
            'crypto-btc-net': 'BTC Network',
            'crypto-eth-net': 'ERC20 Network',
            'crypto-usdt-net': 'TRC20 Network',
            'footer-text': 'Your consciousness expansion journey.',
            'footer-shipping': 'Worldwide Shipping ✈️',
            'footer-rights': 'All Rights Reserved.',
            'cart-title': 'Your Order',
            'cart-total-label': 'Total:',
            'btn-checkout': 'Send Order to Telegram',
            'nav-support': 'Support',
            'footer-links-title': 'Quick Links',
            'footer-payments': 'Payments',
            'footer-contact-title': 'Contact Us',
            'footer-contact-text': 'Official Telegram Channel for orders and inquiries:',
            'footer-desc': 'Deep exploration of consciousness through premium-grade natural products. Your journey to hyperspace begins here.',
            'footer-disclaimer': 'Important: Our products are for research and botanical study only. Safety first.'
        },
        'es': {
            'nav-products': 'Productos',
            'nav-payments': 'Pagos',
            'nav-contact': 'Contacto',
            'btn-order': 'Pedir Ahora',
            'hero-title-1': 'DMT SHOP',
            'hero-title-2': 'PREMIUM',
            'hero-subtitle': 'Experimenta la máxima expansión de la conciencia con nuestros productos naturales diseñado para una experiencia segura y transformadora.',
            'hero-shipping': 'Envíos a todo el mundo',
            'hero-btn': 'Ver Producto',
            'products-title': '<img src="assets/dmtlogo.jpg" class="title-logo" alt="logo"> DMT <span class="highlight">PRODUCTOS</span> <img src="assets/dmtlogo.jpg" class="title-logo" alt="logo">',
            'products-subtitle': 'SHOP de DMT para una profunda exploración cósmica',
            'prod-1-title': 'DMT Cristales 1GR',
            'prod-1-desc': 'Cristales puros de N,N-DMT de la más alta concentración. Perfecto para claridad visionaria y trascendencia profunda.',
            'prod-2-title': 'DMT Xanga Hierbas 1GR',
            'prod-2-desc': 'Una mezcla sagrada de hierbas y DMT para una transición más suave y aterrizada al hiperespacio.',
            'prod-3-title': 'Destilado de DMT Vaporizador 1GR',
            'prod-3-desc': 'Destilado líquido premium para vaporizadores. Extracto de alta potencia para experiencias precisas y portátiles.',
            'btn-buy': 'Comprar Ahora',
            'specs-title': 'Especificaciones <span class="highlight">Técnicas</span>',
            'spec-prod-label': 'Producto:',
            'spec-cap-label': 'Capacidad:',
            'spec-cap-val': '1 Gramo de DMT',
            'spec-mat-label': 'Material:',
            'spec-mat-val': 'Aluminio de Grado Médico',
            'spec-charge-label': 'Carga:',
            'spec-charge-val': 'Carga Rápida USB-C',
            'reviews-title': 'Lo que <span class="highlight">Dicen Nuestros Clientes</span>',
            'rev-1-text': '"¡Dispositivo absolutamente increíble! La calidad del vapor es asombrosa y la batería dura todo el día. Perfecto para mis sesiones."',
            'rev-verified': 'Comprador Verificado',
            'rev-2-text': '"La calidad de construcción es excepcional. Me encanta el control de temperatura y lo fácil que es de usar. ¡Muy recomendado!"',
            'rev-3-text': '"Envío rápido, gran empaque y el producto superó mis expectativas. ¡El servicio al cliente también es de primera!"',
            'cta-title': '¿Listo para Transformar tu Experiencia Psicodélica?',
            'cta-subtitle': 'Únete a miles de clientes satisfechos que han expandido su conciencia.',
            'cta-crypto-title': 'Selecciona la criptomoneda y realiza el pago, envíanos el comprobante por Telegram para agendar el envío que cambiará la forma de ver la vida:',
            'btn-copy': 'Copiar',
            'btn-telegram': 'Contáctanos por Telegram',
            'crypto-btc-net': 'Red BTC',
            'crypto-eth-net': 'Red ERC20',
            'crypto-usdt-net': 'Red TRC20',
            'footer-text': 'Tu viaje de expansión de conciencia.',
            'footer-shipping': 'Envíos a todo el mundo ✈️',
            'footer-rights': 'Todos los derechos reservados.',
            'cart-title': 'Tu Pedido',
            'cart-total-label': 'Total:',
            'btn-checkout': 'Enviar Pedido a Telegram',
            'nav-support': 'Soporte',
            'footer-links-title': 'Enlaces Rápidos',
            'footer-payments': 'Pagos',
            'footer-contact-title': 'Contáctanos',
            'footer-contact-text': 'Canal oficial de Telegram para pedidos y consultas:',
            'footer-desc': 'Exploración profunda de la conciencia a través de productos naturales de grado premium. Tu viaje hacia el hiperespacio comienza aquí.',
            'footer-disclaimer': 'Importante: Nuestros productos son solo para investigación y estudio botánico. La seguridad es lo primero.'
        }
    };


    // --- AOS Initialization (Removed as it was causing errors) ---
    // if (window.AOS) AOS.init({ duration: 800, once: true });

    // --- 0. State & Data (Currencies) ---
    let currentCurrency = localStorage.getItem('dmt_currency') || 'COP';

    const exchangeRates = {
        'COP': 1,
        'USD': 0.00025,
        'EUR': 0.00023,
        'MXN': 0.0043
    };

    const currencySymbols = {
        'COP': '$',
        'USD': '$',
        'EUR': '€',
        'MXN': '$'
    };

    window.changeCurrency = (curr) => {
        currentCurrency = curr;
        localStorage.setItem('dmt_currency', curr);
        updateAllPrices();
        if (typeof renderCart === 'function') renderCart();
    };

    function formatPrice(amountCOP) {
        const rate = exchangeRates[currentCurrency] || 1;
        const converted = amountCOP * rate;
        const symbol = currencySymbols[currentCurrency] || '$';
        return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: currentCurrency === 'COP' ? 0 : 2, maximumFractionDigits: currentCurrency === 'COP' ? 0 : 2 })} ${currentCurrency}`;
    }

    function updateAllPrices() {
        document.querySelectorAll('[data-base-price]').forEach(el => {
            const basePrice = parseFloat(el.getAttribute('data-base-price'));
            el.innerHTML = formatPrice(basePrice);
        });
        const selector = document.getElementById('curr-switcher');
        if (selector) selector.value = currentCurrency;
    }

    // --- DATA STRUCTURES (Define early for safe setLanguage calls) ---
    const products = {
        1: { name: { es: 'DMT Cristales 1GR', en: 'DMT Crystals 1GR' }, price: { cop: 100000, usd: 30 } },
        2: { name: { es: 'DMT Xanga Hierbas 1GR', en: 'DMT Xanga Herbs 1GR' }, price: { cop: 100000, usd: 30 } },
        3: { name: { es: 'Destilado de DMT Vaporizador 1GR', en: 'DMT Vape Distillate 1GR' }, price: { cop: 150000, usd: 45 } }
    };

    let cart = JSON.parse(localStorage.getItem('dmt_cart')) || [];

    function saveCart() {
        localStorage.setItem('dmt_cart', JSON.stringify(cart));
    }

    const langSwitcher = document.getElementById('lang-switcher');

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        if (langSwitcher) langSwitcher.value = lang;
        document.documentElement.lang = lang;

        // Update global state and refresh cart
        initialLang = lang;
        if (typeof renderCart === 'function') renderCart();

        // Save preference
        localStorage.setItem('dmt_lang', lang);
    }

    // 5. Multi-Language System Initialization
    const userLang = navigator.language || navigator.userLanguage;
    const browserLang = userLang.startsWith('es') ? 'es' : 'en';
    let initialLang = localStorage.getItem('dmt_lang') || browserLang;

    // Apply initial language immediately
    setLanguage(initialLang);
    updateAllPrices();

    const currSwitcher = document.getElementById('curr-switcher');
    if (currSwitcher) {
        currSwitcher.addEventListener('change', (e) => {
            changeCurrency(e.target.value);
        });
    }

    // IP-based detection override (only if no saved preference)
    if (!localStorage.getItem('dmt_lang')) {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const spanishSpeakingCountries = [
                    'ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'EC', 'GT',
                    'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA',
                    'UY', 'GQ', 'PR'
                ];
                const detectedLang = spanishSpeakingCountries.includes(data.country_code) ? 'es' : 'en';
                if (detectedLang !== initialLang) {
                    setLanguage(detectedLang);
                }
            })
            .catch(error => {
                console.log('IP detection failed, using fallback');
            });
    }

    langSwitcher.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    window.copyAddr = (btn, type) => {
        const addrs = {
            'BTC': '1KUpRdQi9QYEJiXKcNkKyfE6RKJJeJ4Jyb',
            'ETH': '0xb8d6d8980295b8a921314c9e6dfb4b353bba0ab1',
            'USDT': 'TDxuWCtzC4qY6uHqxuBqgMmUviWyWe5dqt'
        };
        navigator.clipboard.writeText(addrs[type]).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = initialLang === 'es' ? '¡LISTO!' : 'COPIED!';
            btn.classList.add('success');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('success');
            }, 2000);
        });
    };

    window.openOrder = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    window.updateQty = (btn, delta) => {
        const selector = btn.parentElement;
        const valueEl = selector.querySelector('.qty-value');
        let currentQty = parseInt(valueEl.innerText);
        currentQty += delta;
        if (currentQty < 1) currentQty = 1;
        valueEl.innerText = currentQty;
    };

    window.toggleCart = () => {
        const modal = document.getElementById('cart-modal');
        modal.classList.toggle('active');
        if (modal.classList.contains('active')) {
            renderCart();
        }
    };

    window.addToCart = (id) => {
        const productCard = document.querySelectorAll('.product-card')[id - 1];
        const qtyValue = parseInt(productCard.querySelector('.qty-value').innerText);

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += qtyValue;
        } else {
            cart.push({ id, qty: qtyValue });
        }

        saveCart();
        updateCartCount();

        // Efecto visual en el botón
        const btn = productCard.querySelector('.buy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = initialLang === 'es' ? '¡AÑADIDO!' : 'ADDED!';
        setTimeout(() => btn.innerHTML = originalText, 1500);
    };

    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartCount();
        renderCart();
    };



    function updateCartCount() {
        const count = cart.reduce((acc, item) => acc + item.qty, 0);
        document.getElementById('cart-badge').innerText = count;
        document.getElementById('cart-badge').style.display = count > 0 ? 'flex' : 'none';
    }

    function renderCart() {
        const container = document.getElementById('cart-items');
        const totalValueEl = document.getElementById('cart-total-value');
        const currencyLabelEl = document.querySelector('.cart-total .currency');
        if (!container) return;

        container.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = `<p style="text-align:center; padding: 2rem; color: var(--dim-text);">${initialLang === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}</p>`;
            if (totalValueEl) totalValueEl.innerText = formatPrice(0);
            return;
        }

        cart.forEach(item => {
            const product = products[item.id];
            const productName = product.name[initialLang] || product.name.es;
            const subtotal = product.price.cop * item.qty;
            total += subtotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <h4>${productName}</h4>
                    <p>${item.qty} x ${formatPrice(product.price.cop)}</p>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-subtotal">${formatPrice(subtotal)}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            `;
            container.appendChild(itemEl);
        });

        if (totalValueEl) totalValueEl.innerHTML = formatPrice(total);
        if (currencyLabelEl) currencyLabelEl.style.display = 'none'; // formatPrice now includes currency label
    }

    window.checkoutTelegram = () => {
        if (cart.length === 0) {
            alert(initialLang === 'es' ? 'Tu carrito está vacío. ¡Añade algunos productos primero!' : 'Your cart is empty. Add some products first!');
            return;
        }

        const isEnglish = initialLang === 'en';

        let message = isEnglish ? "Hello! I would like to place an order:\n\n" : "¡Hola! Quisiera realizar un pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            const product = products[item.id];
            const productName = product.name[initialLang] || product.name.es;
            const subtotal = product.price.cop * item.qty;
            total += subtotal;
            message += `- ${productName} (x${item.qty}): ${formatPrice(subtotal)}\n`;
        });

        message += `\n*TOTAL: ${formatPrice(total)}*\n\n`;
        message += isEnglish ? "I am waiting to schedule the shipment." : "Quedo atento para agendar el envío.";

        const telegramUrl = `https://t.me/DMTshopvisions?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');

        // Limpiar carrito después de pedir
        cart = [];
        saveCart();
        updateCartCount();
        toggleCart();
    };

    updateCartCount();
});
