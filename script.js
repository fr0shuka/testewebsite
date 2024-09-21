document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');
    const postsContainer = document.getElementById('posts-container');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert(`Thank you for subscribing with email: ${emailInput.value}`);
        emailInput.value = '';
    });

    // Instagram API configuration
    const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Replace with your actual access token
    const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

    // Fetch Instagram posts
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const posts = data.data.slice(0, 3); // Get the latest 3 posts
            renderPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching Instagram posts:', error);
            renderDummyPosts(); // Fallback to dummy posts if API fails
        });

    function renderPosts(posts) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
        const caption = post.caption ? post.caption.slice(0, 100) + '...' : 'No caption';
        
        postElement.innerHTML = `
            <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
                <img src="${imageUrl}" alt="Instagram post">
            </a>
            <p>${caption}</p>
        `;
        return postElement;
    }

    function renderDummyPosts() {
        const dummyPosts = [
            { id: 1, imageUrl: 'https://picsum.photos/200', caption: 'Enjoying a beautiful day!' },
            { id: 2, imageUrl: 'https://picsum.photos/201', caption: 'New adventures await!' },
            { id: 3, imageUrl: 'https://picsum.photos/202', caption: 'Making memories with friends.' }
        ];
        
        postsContainer.innerHTML = '';
        dummyPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <img src="${post.imageUrl}" alt="Instagram post">
                <p>${post.caption}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }
});