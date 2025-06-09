// main.js - Handles tab switching, theme toggle, scroll reveal, and micro-interactions

document.addEventListener('DOMContentLoaded', function () {
  // Tab switching
  const tabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.tab-section');
  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      sections.forEach(sec => sec.classList.add('hidden'));
      const target = document.getElementById('tab-' + this.dataset.tab);
      if (target) {
        target.classList.remove('hidden');
        // Animate section in
        setTimeout(() => target.classList.add('visible'), 10);
        sections.forEach(sec => {
          if (sec !== target) sec.classList.remove('visible');
        });
      }
    });
  });

  // Light/Dark theme toggle
  const themeBtn = document.getElementById('theme-toggle');
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

  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal animation
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

  // GSAP for extra animation (if available)
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
});

// --- Blog Data & Routing ---
// Sample blog data for each niche (can be extended or loaded from localStorage)
const BLOGS_KEY = 'qa_blogs';
const NICHES = ['travel', 'finance', 'investments', 'netherlands'];

const defaultBlogs = {
  travel: [
    {
      id: 't1',
      title: 'Backpacking Europe: Top Tips',
      author: 'Alice',
      date: '2025-06-01',
      tags: ['Travel', 'Europe', 'Budget'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      content: 'Discover the best ways to travel Europe on a budget, with must-see destinations and travel hacks.'
    },
    {
      id: 't2',
      title: 'Hidden Gems in Asia',
      author: 'Bob',
      date: '2025-05-20',
      tags: ['Asia', 'Adventure'],
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      content: 'Explore off-the-beaten-path locations in Asia for a unique and unforgettable adventure.'
    },
    {
      id: 't3',
      title: 'Solo Travel Safety',
      author: 'Clara',
      date: '2025-04-15',
      tags: ['Solo', 'Safety'],
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80',
      content: 'Tips and tricks for staying safe while traveling alone around the world.'
    }
  ],
  finance: [
    {
      id: 'f1',
      title: 'Budgeting for Millennials',
      author: 'David',
      date: '2025-06-02',
      tags: ['Finance', 'Budget'],
      image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80',
      content: 'Learn how to manage your finances and save more with these practical budgeting tips.'
    },
    {
      id: 'f2',
      title: 'Credit Card Myths Busted',
      author: 'Eva',
      date: '2025-05-18',
      tags: ['Credit', 'Myths'],
      image: 'https://images.unsplash.com/photo-1508385082359-f48b1c9b1b8a?auto=format&fit=crop&w=600&q=80',
      content: 'Debunking common misconceptions about credit cards and how to use them wisely.'
    },
    {
      id: 'f3',
      title: 'Investing 101',
      author: 'Frank',
      date: '2025-04-10',
      tags: ['Investing', 'Basics'],
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      content: 'A beginner’s guide to investing and growing your wealth.'
    }
  ],
  investments: [
    {
      id: 'i1',
      title: 'Stocks vs. Real Estate',
      author: 'Grace',
      date: '2025-06-03',
      tags: ['Stocks', 'Real Estate'],
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      content: 'A deep dive into the pros and cons of investing in stocks versus real estate in 2025.'
    },
    {
      id: 'i2',
      title: 'Crypto in 2025',
      author: 'Henry',
      date: '2025-05-25',
      tags: ['Crypto', '2025'],
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
      content: 'What to expect from the cryptocurrency market in the coming year and how to invest smartly.'
    },
    {
      id: 'i3',
      title: 'Diversifying Your Portfolio',
      author: 'Ivy',
      date: '2025-04-12',
      tags: ['Portfolio', 'Diversification'],
      image: 'https://images.unsplash.com/photo-1508385082359-f48b1c9b1b8a?auto=format&fit=crop&w=600&q=80',
      content: 'How to diversify your investments for maximum safety and growth.'
    }
  ],
  netherlands: [
    {
      id: 'n1',
      title: 'Living in Amsterdam',
      author: 'Jack',
      date: '2025-06-04',
      tags: ['Netherlands', 'Amsterdam'],
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
      content: 'Tips for expats and students on making the most of life in the Netherlands.'
    },
    {
      id: 'n2',
      title: 'Dutch Culture 101',
      author: 'Kim',
      date: '2025-05-22',
      tags: ['Culture', 'Dutch'],
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80',
      content: 'An introduction to Dutch traditions, food, and lifestyle for newcomers.'
    },
    {
      id: 'n3',
      title: 'Finding Housing in NL',
      author: 'Liam',
      date: '2025-04-18',
      tags: ['Housing', 'Netherlands'],
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      content: 'How to find affordable and safe housing in the Netherlands.'
    }
  ]
};

// Utility: Load and save blogs to localStorage
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

// Render blogs for a given niche
function renderBlogs(niche) {
  const blogs = loadBlogs()[niche] || [];
  const section = document.getElementById('tab-' + niche);
  if (!section) return;
  const blogList = document.createElement('div');
  blogList.className = 'grid md:grid-cols-2 gap-6 mb-8';
  blogList.innerHTML = blogs.map(blog => `
    <div class="glass-card group relative overflow-hidden blog-card" data-niche="${niche}" data-id="${blog.id}">
      <img src="${blog.image}" alt="${blog.title}" class="rounded-xl w-full h-48 object-cover mb-3 group-hover:scale-105 transition-transform duration-300" />
      <span class="gradient-badge absolute top-4 left-4">${blog.tags[0]}</span>
      <h3 class="font-bold text-xl mb-2">${blog.title}</h3>
      <p class="mb-1 text-sm opacity-80">By ${blog.author} &middot; ${blog.date}</p>
      <p class="mb-3">${blog.content.slice(0, 80)}...</p>
      <div class="flex gap-4">
        <button class="icon-btn" title="Like"><i class="far fa-heart"></i></button>
        <button class="icon-btn" title="Comment"><i class="far fa-comment"></i></button>
        <button class="icon-btn" title="Share"><i class="fas fa-share"></i></button>
        <button class="btn-glass read-more-btn ml-auto" data-niche="${niche}" data-id="${blog.id}">Read More</button>
      </div>
    </div>
  `).join('');
  // Replace old blog list if exists
  const oldList = section.querySelector('.blog-list');
  if (oldList) oldList.remove();
  blogList.classList.add('blog-list');
  section.insertBefore(blogList, section.children[1]);
}

// Blog detail modal/page
function showBlogDetail(niche, id) {
  const blogs = loadBlogs()[niche] || [];
  const blog = blogs.find(b => b.id === id);
  if (!blog) return;
  // Modal overlay
  let modal = document.getElementById('blog-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'blog-detail-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60';
    modal.innerHTML = `
      <div class="glass-card max-w-2xl w-full relative animate-fadeInUp">
        <button class="icon-btn absolute top-4 right-4 close-modal" title="Close"><i class="fas fa-times"></i></button>
        <img src="${blog.image}" alt="${blog.title}" class="rounded-xl w-full h-56 object-cover mb-4" />
        <h2 class="text-2xl font-bold mb-2">${blog.title}</h2>
        <p class="mb-1 text-sm opacity-80">By ${blog.author} &middot; ${blog.date}</p>
        <div class="flex flex-wrap gap-2 mb-2">${blog.tags.map(t => `<span class="gradient-badge">${t}</span>`).join('')}</div>
        <div class="mb-4">${blog.content}</div>
        <div class="flex gap-4">
          <button class="icon-btn" title="Like"><i class="far fa-heart"></i></button>
          <button class="icon-btn" title="Comment"><i class="far fa-comment"></i></button>
          <button class="icon-btn" title="Share"><i class="fas fa-share"></i></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
  }
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
        <input type="text" name="title" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" required />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Content</label>
        <textarea name="content" rows="5" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" required></textarea>
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Author</label>
        <input type="text" name="author" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" required />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Image URL (optional)</label>
        <input type="url" name="image" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
      </div>
      <div class="mb-3">
        <label class="block mb-1 font-semibold">Tags (comma separated)</label>
        <input type="text" name="tags" class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
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
    const newBlog = {
      id: niche[0] + Date.now(),
      title, content, author, image, tags: tags.length ? tags : [niche.charAt(0).toUpperCase() + niche.slice(1)],
      date: new Date().toISOString().slice(0, 10)
    };
    blogs[niche].unshift(newBlog);
    saveBlogs(blogs);
    modal.remove();
    renderBlogs(niche);
  };
}

// Add Blog button for each tab
NICHES.forEach(niche => {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-blog-btn') && e.target.dataset.niche === niche) {
      showAddBlogModal(niche);
    }
    if (e.target.classList.contains('read-more-btn') && e.target.dataset.niche === niche) {
      showBlogDetail(niche, e.target.dataset.id);
    }
    if (e.target.closest('.blog-card') && e.target.classList.contains('blog-card')) {
      const card = e.target;
      showBlogDetail(card.dataset.niche, card.dataset.id);
    }
  });
});

// Render blogs on load for all tabs
NICHES.forEach(renderBlogs);

// Add Blog button UI injection
NICHES.forEach(niche => {
  const section = document.getElementById('tab-' + niche);
  if (section) {
    let addBtn = section.querySelector('.add-blog-btn');
    if (!addBtn) {
      addBtn = document.createElement('button');
      addBtn.className = 'btn-glass add-blog-btn mb-6';
      addBtn.textContent = 'Add Blog';
      addBtn.dataset.niche = niche;
      section.insertBefore(addBtn, section.firstChild.nextSibling);
    }
  }
});
