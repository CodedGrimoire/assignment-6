allCategoryURL = "https://openapi.programming-hero.com/api/categories";
allPlantsURL = "https://openapi.programming-hero.com/api/plants";
plantByCategory = id => `https://openapi.programming-hero.com/api/category/${id}`;
plantsDetailsById = id => `https://openapi.programming-hero.com/api/plant/${id}`;

const catList = document.querySelector('.cat-list');
const grid = document.querySelector('.cards-grid');
const cartList = document.querySelector('.cart-list');
const totalEl = document.querySelector('.cart-total strong');
const modal = document.getElementById('plant_modal');
const pmContent = document.getElementById('pm_content');

let currentPlants = [];
let cart = [];
let total = 0;

async function loadCategories() {
  const res = await fetch(allCategoryURL);
  const { categories } = await res.json();
  catList.innerHTML =
    `<button class="cat-btn active" data-id="all">All Trees</button>` +
    categories.map(c => `<button class="cat-btn" data-id="${c.id}">${c.category_name}</button>`).join('');
  catList.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    catList.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadPlants(btn.dataset.id);
  });
}

async function loadPlants(categoryId = "all") {
  const url = categoryId === "all" ? allPlantsURL : plantByCategory(categoryId);
  const res = await fetch(url);
  const data = await res.json();
  currentPlants = data.plants || [];
  grid.innerHTML = currentPlants.map(p => `
    <div class="tree-card" data-id="${p.id}">
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

grid.addEventListener('click', (e) => {
  const add = e.target.closest('.add-btn');
  if (add) {
    addToCart({
      id: Number(add.dataset.id),
      name: add.dataset.name,
      price: Number(add.dataset.price)
    });
    return;
  }
  const card = e.target.closest('.tree-card');
  if (!card) return;
  const id = Number(card.dataset.id);
  const plant = currentPlants.find(p => Number(p.id) === id);
  if (!plant) return;
  pmContent.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class="pm-img">
    <h3 class="pm-title">${plant.name}</h3>
    <p class="pm-desc">${plant.description}</p>
    <div class="pm-meta">
      <span class="pm-badge">${plant.category}</span>
      <span class="pm-price">$${plant.price}</span>
    </div>
    <button id="pm_add" class="pm-add">Add to Cart</button>
  `;
  modal.showModal();
  document.getElementById('pm_add').onclick = () => {
    addToCart({ id: plant.id, name: plant.name, price: plant.price });
    modal.close();
  };
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.id === 'pm_close') modal.close();
});

function addToCart(plant){
  cart.push(plant);
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${plant.name}</span>
    <span>$${plant.price} <button class="remove-btn" aria-label="Remove" style="margin-left:8px;cursor:pointer;">✖</button></span>
  `;
  cartList.appendChild(li);
  total += plant.price;
  totalEl.textContent = `$${total}`;
  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();
    const i = cart.findIndex(p => p.id === plant.id);
    if (i !== -1) cart.splice(i, 1);
    total -= plant.price;
    if (total < 0) total = 0;
    totalEl.textContent = `$${total}`;
  });
}

loadCategories();
loadPlants();
