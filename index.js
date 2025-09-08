const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");

const activeCategory = (id) => {
  const categories = categoryContainer.children;
  for (let category of categories) {
    category.classList.remove("bg-green-700","text-white");
    category.classList.add("hover:bg-green-500","hover:text-white");
  }
  document.getElementById(id).classList.add("bg-green-700","text-white");
  document.getElementById(id).classList.remove("hover:bg-green-500","hover:text-white");
};

const loadAllPlantsByDefault = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
    });
};

const showAllPlants = (plants) => {
  plantContainer.innerHTML = "";
  plants.forEach((plant) => {
    const { id, name, image, description, category, price } = plant;
    plantContainer.innerHTML += `
        <div id="${id}" class="bg-white flex flex-col justify-between gap-2.5 shadow rounded-lg overflow-hidden p-3">
              <img src="${image}" alt="${name}" class="h-[275px] w-full rounded" />
              <h1 class="font-bold">${name}</h1>
              <p class="text-sm text-justify">${description}</p>
              <div class="flex justify-between items-center">
                <p class="bg-[#CFF0DC] text-sm px-3 py-1 rounded-3xl">${category}</p>
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${price}</span></p>
              </div>
              <button class="btn w-full bg-green-600 text-white rounded-3xl hover:bg-green-500 hover:text-black">Add to Cart</button>
         </div>
        `;
  });
};

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategories(categories);
    });
  // .catch(error=>alert("Failed to fetch data: ",error));
};
``;
const showCategories = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
            <li id="${category.id}" onclick="loadPlantsByCategory(${category.id})" class="px-2 py-1 rounded hover:bg-green-500 hover:text-white">${category.category_name}</li>
        `;
  });
};

const loadPlantsByCategory = (id) => {
  activeCategory(id);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
    });
};

loadAllPlantsByDefault();
loadCategory();
