document.addEventListener('DOMContentLoaded', () => {
    // 1. Gateway Security Modal Logic (FORCED RECOVERY)
    const securityModal = document.getElementById('security-modal');
    const modalAuthorizeBtn = document.getElementById('btn-authorize');

    if (modalAuthorizeBtn && securityModal) {
        modalAuthorizeBtn.addEventListener('click', () => {
            securityModal.classList.add('fade-out');
            // Complete removal after transition
            setTimeout(() => {
                securityModal.style.display = 'none';
            }, 600);
        });
    }

    // 2. Core Catalog Elements
    const cards = document.querySelectorAll('.product-card');
    const addButtons = document.querySelectorAll('.add-btn');
    const cartCountEl = document.getElementById('cart-count');
    const cartTrigger = document.getElementById('cart-trigger');
    const toastContainer = document.getElementById('toast-container');

    // 3. Persistent Cart Initialization
    let cart = JSON.parse(localStorage.getItem('defense_cart')) || [];
    if (cartCountEl) cartCountEl.textContent = cart.length;

    // 4. Anti-Gravity Framework Initialization
    if (cards.length > 0) {
        cards.forEach(card => {
            const randomDelay = Math.random() * 3;
            card.style.animationDelay = `${randomDelay}s`;
        });
    }

    // 5. Dynamic Cart & Toast Synchronization
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const manufacturer = card.querySelector('.manufacturer').textContent;
            const priceText = card.querySelector('.price').textContent;
            const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''));

            const item = {
                id: Date.now(),
                name: name,
                manufacturer: manufacturer,
                priceText: priceText,
                priceValue: priceValue
            };

            // State Update
            cart.push(item);
            localStorage.setItem('defense_cart', JSON.stringify(cart));
            
            // UI Update
            if (cartCountEl) cartCountEl.textContent = cart.length;
            showTacticalToast(name);
        });
    });

    function showTacticalToast(itemName) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div style="font-weight: 900; margin-bottom: 8px; color: #00f2ff; letter-spacing: 2px;">[보안 인가 완료]</div>
            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">${itemName}이(가) 장바구니에 담겼습니다.</div>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(80px)';
            setTimeout(() => toast.remove(), 600);
        }, 3000);
    }

    // 6. Checkout & Routing Sequence
    if (cartTrigger) {
        cartTrigger.addEventListener('click', () => {
            alert("보안 통신 인가 확인 중... 기밀 결제 터널로 진입합니다.");
            window.location.href = "checkout.html";
        });
    }

    // 7. Dynamic Cart Renderer (for cart.html)
    const cartBody = document.getElementById('dynamic-cart-body');
    const totalPriceEl = document.getElementById('cart-total-price');

    if (cartBody) {
        cartBody.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartBody.innerHTML = '<p style="text-align:center; opacity:0.5; padding: 20px;">장바구니가 비어 있습니다.</p>';
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'receipt-item';
                itemDiv.innerHTML = `
                    <div>
                        <div style="font-weight: 600;">${item.name}</div>
                        <div style="font-size: 0.7rem; opacity: 0.4;">${item.manufacturer} / QTY: 1</div>
                    </div>
                    <div class="neon-cyan">${item.priceText}</div>
                `;
                cartBody.appendChild(itemDiv);
                total += item.priceValue;
            });
        }

        if (totalPriceEl) {
            totalPriceEl.textContent = '$' + total.toLocaleString();
        }
    }

    // 8. Order Confirmation
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("장바구니가 비어 있어 발주를 진행할 수 없습니다.");
                return;
            }
            alert("[최종 발주 승인] 국방부 조달청으로 데이터 전송을 시작합니다.");
            localStorage.removeItem('defense_cart');
            window.location.href = "success.html";
        });
    }
});
