allCategoryURL = "https://openapi.programming-hero.com/api/categories";
allPlantsURL = "https://openapi.programming-hero.com/api/plants";
plantByCategory = "https://openapi.programming-hero.com/api/category/${id}";
plantsDetailsById = "https://openapi.programming-hero.com/api/plant/${id}";

async function loadCategories() {
  const res = await fetch(allCategoryURL);
  const { categories } = await res.json();
  document.querySelector('.cat-list').innerHTML =
    `<button class="cat-btn active">All Trees</button>` +
    categories.map(c => `<button class="cat-btn" data-id="${c.id}">${c.category_name}</button>`).join('');
}

loadCategories();
