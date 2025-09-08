const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");

const activeCategory = (id) => {
  const categories = categoryContainer.children;
  for (let category of categories) {
    category.classList.remove("bg-green-700", "text-white");
    category.classList.add("hover:bg-green-500", "hover:text-white");
  }
  document.getElementById(id).classList.add("bg-green-700", "text-white");
  document.getElementById(id).classList.remove("hover:bg-green-500", "hover:text-white");
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    plantContainer.classList.add("hidden");
  } else {
    plantContainer.classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const makeModal = (plant) => {
  const modal = document.getElementById("modal");
  const { name, image, description, category, price } = plant;
  modal.innerHTML = `
      <div class="space-y-3">
        <h1 class="text-xl font-bold">${name}</h1>
        <img src="${image}" alt="${name}" class="img h-64 w-full rounded" />
      </div>
      <p class="text-sm"><span class="font-bold">Category: </span> ${category}</p>
      <p class="text-sm"><span class="font-bold">Price: </span>৳${price}</span></p>
      <p class="text-sm text-justify "> <span class="font-bold">Description: </span> ${description}</p>
  `;
  plant_details_modal.showModal();
};

const loadAllPlantsByDefault = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
    });
  // .catch(error=>alert("Error: ",error));
};

const showAllPlants = (plants) => {
  plantContainer.innerHTML = "";
  plants.forEach((plant) => {
    const { id, name, image, description, category, price } = plant;
    plantContainer.innerHTML += `
        <div id="${id}" class="plant bg-white flex flex-col justify-between gap-2.5 shadow rounded-lg pb-3 overflow-hidden">
              <img src="${image}" alt="${name}" class="img h-[300px] w-full rounded-t" />
              <h1 class="font-bold mx-3 border-b-2 border-transparent hover:border-green-700 w-fit " title=" click to see details">${name}</h1>
              <p class="text-sm text-justify mx-3">${description}</p>
              <div class="flex justify-between items-center px-3 my-1">
                <p class="bg-[#CFF0DC] text-sm px-3 py-1 rounded-3xl text-gray-600">${category}</p>
                <p><span class="text-sm font-extrabold mr-0.5 text-gray-600">৳</span><span class="text-green-800">${price}</span></p>
              </div>
              <button class="btn mx-3 bg-green-500 text-white rounded-3xl hover:bg-green-600 hover:text-black">Add to Cart</button>
            
         </div>
        `;
  });
  manageSpinner(false);
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

plantContainer.addEventListener("click", (e) => {
  // console.log(e);
  // console.log(e.target);
  const parent = e.target.parentNode;
  console.log(parent.id);
  if (e.target.localName == "h1") {
    loadPlantDetails(parent.id);
  }
  if (e.target.localName == "button") {
    addToCart(parent.id);
  }
  // console.log(e.target);
});

const loadPlantDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      makeModal(data.plants);
    });
};

loadAllPlantsByDefault();
loadCategory();
