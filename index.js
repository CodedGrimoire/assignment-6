// ---- API endpoints (your originals) ----
allCategoryURL = "https://openapi.programming-hero.com/api/categories";
allPlantsURL = "https://openapi.programming-hero.com/api/plants";
plantByCategory = id => `https://openapi.programming-hero.com/api/category/${id}`;
plantsDetailsById = id => `https://openapi.programming-hero.com/api/plant/${id}`;

// ---- Globals / DOM refs ----
const catList = document.querySelector('.cat-list');
const grid = document.querySelector('.cards-grid');
const cartList = document.querySelector('.cart-list');
const totalEl = document.querySelector('.cart-total strong');

let currentPlants = [];   // last loaded plants
let cart = [];
let total = 0;

// ---- Categories ----
async function loadCategories() {
  const res = await fetch(allCategoryURL);
  const { categories } = await res.json();

  catList.innerHTML =
    `<button class="cat-btn active" data-id="all">All Trees</button>` +
    categories.map(c => `<button class="cat-btn" data-id="${c.id}">${c.category_name}</button>`).join('');

  // delegated click: toggle active + load plants
  catList.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;

    // active state
    catList.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    loadPlants(btn.dataset.id);
  });
}

// ---- Plants (All or by Category) ----
async function loadPlants(categoryId = "all") {
  const url = categoryId === "all" ? allPlantsURL : plantByCategory(categoryId);
  const res = await fetch(url);
  const data = await res.json();
  currentPlants = data.plants || [];

  // render cards (divs only)
  grid.innerHTML = currentPlants.map(p => `
    <div class="tree-card">
      <div class="thumb" style="background:url('${p.image}') center/cover no-repeat"></div>
      <div class="tree-info">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <span class="tag">${p.category}</span>
      </div>
      <div class="card-foot">
        <button class="add-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
        <span class="price">$${p.price}</span>
      </div>
    </div>
  `).join('');
}

// one-time delegated handler for all future .add-btn
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const name = btn.dataset.name;
  const price = Number(btn.dataset.price);

  addToCart({ id, name, price });
});

// ---- Cart ----
function addToCart(plant){
  cart.push(plant);

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${plant.name}</span>
    <span>
      $${plant.price}
      <button class="remove-btn" aria-label="Remove" style="margin-left:8px;cursor:pointer;">✖</button>
    </span>
  `;
  cartList.appendChild(li);

  increaseTotal(plant.price);
  alert(`${plant.name} added to cart!`);

  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();
    // remove only one instance
    const idx = cart.findIndex(p => p.id === plant.id);
    if (idx !== -1) cart.splice(idx, 1);
    decreaseTotal(plant.price);
  });
}

function increaseTotal(amount){
  total += amount;
  totalEl.textContent = `$${total}`;
}

function decreaseTotal(amount){
  total -= amount;
  if (total < 0) total = 0;
  totalEl.textContent = `$${total}`;
}

// ---- Init ----
loadCategories();
loadPlants(); // default: show all
