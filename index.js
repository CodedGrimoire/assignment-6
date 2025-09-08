
let currentPlants = [];
let cart = [];

const plantsDetailsById = id => `https://openapi.programming-hero.com/api/plant/${id}`;

async function fetchCategories() {
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const { categories } = await res.json();
  return categories;
}


const grid = document.querySelector('.cards-grid');

function renderCategories(categories) {
  const catList = document.querySelector('.cat-list');
 
  catList.innerHTML =
    `<button class="cat-btn active" data-id="all">All Trees</button>` +
    categories.map(c =>
      `<button class="cat-btn" data-id="${c.id}">${c.category_name}</button>`
    ).join('');

  
  catList.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;

    catList.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadPlants(btn.dataset.id);
  });
}





const allPlants = "https://openapi.programming-hero.com/api/plants";
const plantByCategoryWithID = id => `https://openapi.programming-hero.com/api/category/${id}`;

async function loadPlants(categoryId = "all") {
   grid.innerHTML = `<div class="spinner">
    <span class="loading loading-dots loading-xl"></span>
  </div>`;
  const url = categoryId === "all" ? allPlants : plantByCategoryWithID(categoryId);
  const res = await fetch(url);
  const data = await res.json();
  currentPlants = data.plants || [];

const gridOfCards = document.querySelector('.cards-grid');
  grid.innerHTML = "";

 
  currentPlants.forEach(p => {
    const card = document.createElement("div");
    card.className = "tree-card";
    card.dataset.id = p.id;

    
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.style.background = `url('${p.image}') center/cover no-repeat`;

   
    const info = document.createElement("div");
    info.className = "tree-info";
    const title = document.createElement("h1");
    title.textContent = p.name;
    const desc = document.createElement("p");
    desc.textContent = p.description;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = p.category;
    info.append(title, desc, tag);

   
    const foot = document.createElement("div");
    foot.className = "card-foot";
    const addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.dataset.id = p.id;
    addBtn.dataset.name = p.name;
    addBtn.dataset.price = p.price;
    addBtn.textContent = "Add to Cart";
    
const price = document.createElement("span");
price.className = "price";
price.textContent = `$${p.price}`;

const meta = document.createElement("div");
meta.className = "meta";
meta.append(tag, price);

info.append(title, desc, meta);


foot.append(addBtn);

card.append(thumb, info, foot);
gridOfCards.appendChild(card);
  });
}
let total = 0;
function handleAddToCartClick(addBtn) {
  addToCart({
    id: Number(addBtn.dataset.id),
    name: addBtn.dataset.name,
    price: Number(addBtn.dataset.price)
  });
   alert(`${addBtn.dataset.name} added to cart! `);
}
const modal = document.getElementById('plant_modal');
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.id === 'pm_close') modal.close();
});


function addToCart(plant){
  cart.push(plant);
const li = document.createElement("li");
const nameEl = document.createElement("span");
nameEl.textContent = plant.name;

const priceEl = document.createElement("span");
priceEl.textContent = `$${plant.price} `;

const removeBtn = document.createElement("button");
removeBtn.className = "remove-btn";
removeBtn.title = "Remove";
removeBtn.textContent = "✖";

priceEl.appendChild(removeBtn);
li.append(nameEl, priceEl);
const cartList = document.querySelector('.cart-list');
const totalEl = document.querySelector('.cart-total strong');
  cartList.appendChild(li);
  total = total+plant.price;
  totalEl.textContent = `$${total}`;
  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();

   
    cart = cart.filter(p => p.id !== plant.id);
    total = total-plant.price;
   
    totalEl.textContent = `$${total}`;
  });

}async function loadCategories() {
  const categories = await fetchCategories();
  renderCategories(categories);
}
loadCategories();
loadPlants();
function renderPlantModal(plant) {
    const pmContent = document.getElementById('pm_content');
  pmContent.innerHTML = ""; 

  const img = document.createElement("img");
  img.src = plant.image;
  img.alt = plant.name;
  img.className = "pm-img";

  const title = document.createElement("h1");
  title.className = "pm-title";
  title.textContent = plant.name;

  const desc = document.createElement("p");
  desc.className = "pm-desc";
  desc.textContent = plant.description;

  const meta = document.createElement("div");
  meta.className = "pm-meta";

  const badge = document.createElement("span");
  badge.className = "pm-badge";
  badge.textContent = plant.category;

  const price = document.createElement("span");
  price.className = "pm-price";
  price.textContent = `$${plant.price}`;

  meta.append(badge, price);

  const addBtn = document.createElement("button");
  addBtn.id = "pm_add";
  addBtn.className = "pm-add";
  addBtn.textContent = "Add to Cart";

  addBtn.onclick = () => {
    addToCart({ id: plant.id, name: plant.name, price: plant.price });
    modal.close();
  };

  pmContent.append(img, title, desc, meta, addBtn);
}
function handleCardClick(card) {
  const id = Number(card.dataset.id);
  let plant = null;

  for (let p of currentPlants) {
    if (Number(p.id) === id) {
      plant = p;
      break;
    }
  }

  if (!plant) return;

  renderPlantModal(plant);
  modal.showModal();
}


grid.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  if (addBtn) {
    handleAddToCartClick(addBtn);
    return;
  }

  const card = e.target.closest(".tree-card");
  if (card) {
    handleCardClick(card);
  }
});