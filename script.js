document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pagerDots = document.getElementById('pagerDots');
    const pagerInfo = document.getElementById('pagerInfo');
    
    
    const imageUrls = [
        'https://avatars.mds.yandex.net/i?id=22c8f72ec9dbc724d7b0522ad33e2b7828bd5260-4965727-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=04116a2e1fd872055b0d176d06fc139bc0b555ea-12498917-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=4ea90a9b2670b3485fdd30c8c8dbfb695069e89f-5234137-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=f84f6035d73787932790b5b570d4336a91f7c475-4774101-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=9033e1f77b3e8f78899f88fc883742aceb401bfd-5280252-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=3065bf5cf589401058e586cb491f7b90ae38a5e1-8340947-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=5f07434e56b70bf2947b15b06c13245fceab949e-5889206-images-thumbs&n=13',
        'https://avatars.mds.yandex.net/i?id=35227ca45a5552b2625066290fbb06d9875c0933-16879453-images-thumbs&n=13'
    ];
    
    
    const unsplashParams = '?w=800&h=600&fit=crop&crop=center&auto=format';
    
    let currentPage = 0;
    let itemsPerPage = 3;
    
    
    function updateItemsPerPage() {
        itemsPerPage = window.innerWidth <= 768 ? 1 : 3;
        updateGallery();
    }
    
    
    function getTotalPages() {
        return Math.ceil(imageUrls.length / itemsPerPage);
    }
    
    
    function createGalleryItems() {
        gallerySlider.innerHTML = '';
        
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            const img = document.createElement('img');
            img.src = `${url}${unsplashParams}`;
            img.alt = `Изображение ${index + 1}`;
            img.loading = 'lazy';
            
            const imageNumber = document.createElement('div');
            imageNumber.className = 'image-number';
            imageNumber.textContent = index + 1;
            
            imageContainer.appendChild(img);
            imageContainer.appendChild(imageNumber);
            slide.appendChild(imageContainer);
            gallerySlider.appendChild(slide);
        });
    }
    
    
    function createPagerDots() {
        pagerDots.innerHTML = '';
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === currentPage ? 'active' : ''}`;
            dot.dataset.page = i;
            dot.addEventListener('click', () => goToPage(i));
            pagerDots.appendChild(dot);
        }
    }
    
  
    function updatePagerInfo() {
        const totalPages = getTotalPages();
        pagerInfo.textContent = `Страница ${currentPage + 1} из ${totalPages}`;
    }
    
    
    function updateActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
   
    function goToPage(page) {
        const totalPages = getTotalPages();
        if (page < 0 || page >= totalPages) return;
        
        currentPage = page;
        const slideWidth = 100 / itemsPerPage;
        const translateX = -(currentPage * 100);
        
        gallerySlider.style.transform = `translateX(${translateX}%)`;
        
        updateActiveDot();
        updatePagerInfo();
        updateButtons();
    }
    
    
    function updateButtons() {
        const totalPages = getTotalPages();
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
    
  
    function updateGallery() {
        const totalPages = getTotalPages();
        
        
        if (currentPage >= totalPages) {
            currentPage = Math.max(0, totalPages - 1);
        }
        
       
        const slides = document.querySelectorAll('.slide');
        const slideWidth = 100 / itemsPerPage;
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
        });
        
        goToPage(currentPage);
        createPagerDots();
    }
    
    
    function initGallery() {
        createGalleryItems();
        updateItemsPerPage();
        
       
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        
        
        window.addEventListener('resize', updateItemsPerPage);
        
        
        updateGallery();
    }
    
    
    initGallery();
});
