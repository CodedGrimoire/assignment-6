allCategoryURL = "https://openapi.programming-hero.com/api/categories";
allPlantsURL = "https://openapi.programming-hero.com/api/plants";
plantByCategory = id => `https://openapi.programming-hero.com/api/category/${id}`;
plantsDetailsById = id => `https://openapi.programming-hero.com/api/plant/${id}`;

async function loadCategories() {
  const res = await fetch(allCategoryURL);
  const { categories } = await res.json();
  document.querySelector('.cat-list').innerHTML =
    `<button class="cat-btn active" data-id="all">All Trees</button>` +
    categories.map(c => `<button class="cat-btn" data-id="${c.id}">${c.category_name}</button>`).join('');

  // add click handling
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => loadPlants(btn.dataset.id));
  });
}

async function loadPlants(categoryId = "all") {
  let url = categoryId === "all" ? allPlantsURL : plantByCategory(categoryId);
  const res = await fetch(url);
  const data = await res.json();
  const plants = data.plants || [];

  document.querySelector('.cards-grid').innerHTML = plants.map(p => `
    <article class="tree-card">
      <div class="thumb" style="background:url('${p.image}') center/cover no-repeat"></div>
      <div class="tree-info">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <span class="tag">${p.category}</span>
      </div>
      <div class="card-foot">
        <button class="add-btn">Add to Cart</button>
        <span class="price">$${p.price}</span>
      </div>
    </article>
  `).join('');
}

loadCategories();
loadPlants(); // show all by default
