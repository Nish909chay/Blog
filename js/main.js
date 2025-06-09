// main.js - Modular JS for navigation, blog CRUD, transitions, and UI effects
// Handles: navigation, blog rendering, add blog, detail view, localStorage, and animations

// --- Blog Data & Routing ---
// Utility: Get page name
function getPage() {
  const path = window.location.pathname.split('/').pop();
  if (!path || path === '' || path === 'index.html') return 'travel';
  if (path.includes('travel')) return 'travel';
  if (path.includes('finance')) return 'finance';
  if (path.includes('investments')) return 'investments';
  if (path.includes('netherlands')) return 'netherlands';
  return '';
}

// Blog Data
const BLOGS_KEY = 'qa_blogs';
const NICHES = ['travel', 'finance', 'investments', 'netherlands'];
const defaultBlogs = {
  travel: [
    { id: 't1', title: 'Backpacking Europe: Top Tips', author: 'Alice', date: '2025-06-01', tags: ['Travel', 'Europe', 'Budget'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.' },
    { id: 't2', title: 'Hidden Gems in Asia', author: 'Bob', date: '2025-05-20', tags: ['Asia', 'Adventure'], image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
    { id: 't3', title: 'Solo Travel Safety', author: 'Clara', date: '2025-04-15', tags: ['Solo', 'Safety'], image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
  ],
  finance: [
    { id: 'f1', title: 'Budgeting for Millennials', author: 'David', date: '2025-06-02', tags: ['Finance', 'Budget'], image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { id: 'f2', title: 'Credit Card Myths Busted', author: 'Eva', date: '2025-05-18', tags: ['Credit', 'Myths'], image: 'https://images.unsplash.com/photo-1508385082359-f48b1c9b1b8a?auto=format&fit=crop&w=600&q=80', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
    { id: 'f3', title: 'Investing 101', author: 'Frank', date: '2025-04-10', tags: ['Investing', 'Basics'], image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' }
  ],
  investments: [
    { id: 'i1', title: 'Stocks vs. Real Estate', author: 'Grace', date: '2025-06-03', tags: ['Stocks', 'Real Estate'], image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', content: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.' },
    { id: 'i2', title: 'Crypto in 2025', author: 'Henry', date: '2025-05-25', tags: ['Crypto', '2025'], image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', content: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.' },
    { id: 'i3', title: 'Diversifying Your Portfolio', author: 'Ivy', date: '2025-04-12', tags: ['Portfolio', 'Diversification'], image: 'https://images.unsplash.com/photo-1508385082359-f48b1c9b1b8a?auto=format&fit=crop&w=600&q=80', content: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.' }
  ],
  netherlands: [
    { id: 'n1', title: 'Living in Amsterdam', author: 'Jack', date: '2025-06-04', tags: ['Netherlands', 'Amsterdam'], image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80', content: 'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus.' },
    { id: 'n2', title: 'Dutch Culture 101', author: 'Kim', date: '2025-05-22', tags: ['Culture', 'Dutch'], image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80', content: 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.' },
    { id: 'n3', title: 'Finding Housing in NL', author: 'Liam', date: '2025-04-18', tags: ['Housing', 'Netherlands'], image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', content: 'Donec sollicitudin molestie malesuada. Proin eget tortor risus.' }
  ]
};
function loadBlogs() {
  const data = localStorage.getItem(BLOGS_KEY);
  if (!data) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(defaultBlogs));
    return JSON.parse(JSON.stringify(defaultBlogs));
  }
  return JSON.parse(data);
}
function saveBlogs(blogs) {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
}
// Render blogs for current page
function renderBlogs() {
  const niche = getPage();
  const blogs = loadBlogs()[niche] || [];
  const section = document.getElementById('tab-' + niche);
  if (!section) return;
  const blogList = document.createElement('div');
  blogList.className = 'grid md:grid-cols-2 gap-6 mb-8';
  blogList.innerHTML = blogs.map(blog => `
    <div class="glass-card group relative overflow-hidden blog-card animate-fadeInUp" data-niche="${niche}" data-id="${blog.id}">
      <img src="${blog.image}" alt="${blog.title}" class="rounded-xl w-full h-48 object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
      <span class="gradient-badge absolute top-4 left-4">${blog.tags[0]}</span>
      <h3 class="font-bold text-xl mb-2">${blog.title}</h3>
      <p class="mb-1 text-sm opacity-80">By ${blog.author} &middot; ${blog.date}</p>
      <p class="mb-3">${blog.content.slice(0, 80)}...</p>
      <div class="flex gap-4">
        <button class="icon-btn" title="Like"><i class="far fa-heart"></i></button>
        <button class="icon-btn" title="Comment"><i class="far fa-comment"></i></button>
        <button class="icon-btn" title="Share"><i class="fas fa-share"></i></button>
        <a href="post-detail.html?niche=${niche}&id=${blog.id}" class="btn-glass read-more-btn ml-auto">Read More</a>
      </div>
    </div>
  `).join('');
  // Replace old blog list if exists
  const oldList = section.querySelector('.blog-list');
  if (oldList) oldList.remove();
  blogList.classList.add('blog-list');
  section.insertBefore(blogList, section.children[1]);
}
// Add Blog Modal
function showAddBlogModal(niche) {
  let modal = document.getElementById('add-blog-modal');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.id = 'add-blog-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60';
  modal.innerHTML = `
    <form class="glass-card max-w-lg w-full p-6 relative animate-fadeInUp add-blog-form">
      <button type="button" class="icon-btn absolute top-4 right-4 close-modal" title="Close"><i class="fas fa-times"></i></button>
      <h2 class="text-xl font-bold mb-4">Add Blog</h2>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Title</label>
        <input type="text" name="title" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" required />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Content</label>
        <textarea name="content" rows="5" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" required></textarea>
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Author</label>
        <input type="text" name="author" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" required />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Image URL (optional)</label>
        <input type="url" name="image" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Tags (comma separated)</label>
        <input type="text" name="tags" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
      </div>
      <button type="submit" class="btn-glass w-full mt-2">Add Blog</button>
    </form>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('visible'), 10);
  modal.querySelector('.close-modal').onclick = () => modal.remove();
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  // Form submit
  modal.querySelector('.add-blog-form').onsubmit = function (e) {
    e.preventDefault();
    const fd = new FormData(this);
    const title = fd.get('title').trim();
    const content = fd.get('content').trim();
    const author = fd.get('author').trim();
    if (!title || !content || !author) {
      alert('Please fill all required fields.');
      return;
    }
    const image = fd.get('image').trim() || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80';
    const tags = fd.get('tags').split(',').map(t => t.trim()).filter(Boolean);
    const blogs = loadBlogs();
    const niche = getPage();
    const newBlog = {
      id: niche[0] + Date.now(),
      title, content, author, image, tags: tags.length ? tags : [niche.charAt(0).toUpperCase() + niche.slice(1)],
      date: new Date().toISOString().slice(0, 10)
    };
    blogs[niche].unshift(newBlog);
    saveBlogs(blogs);
    modal.remove();
    renderBlogs();
  };
}
// Add Blog button UI injection
function injectAddBlogBtn() {
  const niche = getPage();
  const section = document.getElementById('tab-' + niche);
  if (section) {
    let addBtn = section.querySelector('.add-blog-btn');
    if (!addBtn) {
      addBtn = document.createElement('button');
      addBtn.className = 'btn-glass add-blog-btn mb-6';
      addBtn.textContent = 'Add Blog';
      addBtn.onclick = () => showAddBlogModal(niche);
      section.insertBefore(addBtn, section.firstChild.nextSibling);
    }
  }
}
// Blog detail page rendering
function renderBlogDetail() {
  if (!window.location.pathname.includes('post-detail.html')) return;
  const params = new URLSearchParams(window.location.search);
  const niche = params.get('niche');
  const id = params.get('id');
  const blogs = loadBlogs()[niche] || [];
  const blog = blogs.find(b => b.id === id);
  if (!blog) return;
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = `
    <div class="glass-card max-w-2xl mx-auto mt-20 p-8 animate-fadeInUp">
      <img src="${blog.image}" alt="${blog.title}" class="rounded-xl w-full h-56 object-cover mb-4" />
      <h2 class="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">${blog.title}</h2>
      <p class="mb-1 text-sm opacity-80">By ${blog.author} &middot; ${blog.date}</p>
      <div class="flex flex-wrap gap-2 mb-2">${blog.tags.map(t => `<span class="gradient-badge">${t}</span>`).join('')}</div>
      <div class="mb-4">${blog.content}</div>
      <div class="flex gap-4 mb-4">
        <button class="icon-btn" title="Like"><i class="far fa-heart"></i></button>
        <button class="icon-btn" title="Comment"><i class="far fa-comment"></i></button>
        <button class="icon-btn" title="Share"><i class="fas fa-share"></i></button>
      </div>
      <a href="${niche}.html" class="btn-glass">Back to ${niche.charAt(0).toUpperCase() + niche.slice(1)}</a>
    </div>
  `;
}
// On DOMContentLoaded, render blogs and add blog button
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('main')) {
    renderBlogs();
    injectAddBlogBtn();
  }
  renderBlogDetail();
  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      document.body.classList.toggle('light');
      const icon = themeBtn.querySelector('i');
      if (document.body.classList.contains('light')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
  // Set copyright year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  // Scroll reveal
  function revealOnScroll() {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
  // GSAP animations
  if (window.gsap) {
    gsap.utils.toArray('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.07, boxShadow: '0 8px 32px 0 #5ee7df, 0 2px 16px 0 #ff6ec4', duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, boxShadow: '0 4px 24px 0 rgba(94,231,223,0.15), 0 1.5px 8px 0 #b490ca', duration: 0.3 });
      });
    });
    gsap.utils.toArray('.btn-glass').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.08, boxShadow: '0 0 24px 6px #00f2fe', duration: 0.2 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, boxShadow: '0 0 8px 2px #00f2fe', duration: 0.2 });
      });
    });
  }
  // Micro-interactions for icons
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => btn.classList.add('scale-90'));
    btn.addEventListener('mouseup', () => btn.classList.remove('scale-90'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('scale-90'));
  });
  // Animate sections/cards on scroll using IntersectionObserver (for non-GSAP fallback)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }
});
