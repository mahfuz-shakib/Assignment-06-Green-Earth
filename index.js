const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");
const cartContainer = document.getElementById("myCarts");
let carts = [];

const sliceDescription = (text) => {
  const shortText = text.split(" ").slice(0, 10).join(" ");
  return text.length > 12 ? shortText + " . . ." : shortText;
};
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
  activeCategory("all-trees");
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
    const shortDescription = sliceDescription(description);
    plantContainer.innerHTML += `
        <div id="${id}" class="plant bg-white flex flex-col justify-between gap-2 shadow rounded-lg pb-3 overflow-hidden">
              <img src="${image}" alt="${name}" class="h-[300px] w-full rounded-t" />
              <h1 class="text-lg font-bold mx-3 border-b-2 border-transparent hover:border-green-700 w-fit " title=" click to see details">${name}</h1>
              <p class="text-sm text-justify mx-3">${shortDescription}</p>
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
          <h1 id="${category.id}" onclick="loadPlantsByCategory(${category.id})" class=" text-xs lg:text-base shadow text-center h-full lg:px-2 py-2.5 lg:py-1 rounded hover:bg-green-500 hover:text-white">${category.category_name}</h1>
        `;
  });
};

const loadPlantsByCategory = (id) => {
  activeCategory(id);
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
    });
};

plantContainer.addEventListener("click", (e) => {
  const parent = e.target.parentNode;
  if (e.target.localName == "h1") {
    loadPlantDetails(parent.id);
  }
  if (e.target.localName == "button") {
    const newCartId = parent.id;
    const name = parent.children[1].innerText;
    const price = parent.children[3].children[1].children[1].innerText;
    let flag = false;
    carts.map((cart, index) => {
      if (cart.id === newCartId) {
        carts[index].count++;
        flag = true;
      }
    });
    if (!flag) {
      const cart = { id: `${newCartId}`, name: `${name}`, price: `${price}`, count: 1 };
      carts.push(cart);
    }
    addToCart(carts);
  }
});

const loadPlantDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      makeModal(data.plants);
    });
};


const addToCart = (carts) => {
  cartContainer.innerHTML = "";
  let totalCost = 0,
    totalCarts = 0;
  carts.forEach((plant) => {
    const { id, name, price, count } = plant;
    totalCarts += count;
    totalCost += price * count;
    cartContainer.innerHTML += `
               <div class="bg-gray-100 flex justify-between items-center rounded p-2">
                <div class="space-y-1">
                  <h1 class="text-[18px] font-semibold">${name}</h1>
                  <p class="text-[18px] text-gray-600">
                    <span class="text-sm font-extrabold mr-0.5">৳</span><span>${price}</span> x <span>${count}</span>
                  </p>
                </div>
                <div onclick="deleteFromCart(${id})" class="p-2 hover:bg-white hover:rounded">
                  <i class="fa-solid fa-xmark text-red-700"></i>
                </div>
              </div>
 `;
  });
  totalCartsAndCost(totalCarts, totalCost);
};

const deleteFromCart = (id) => {
  carts.map((cart, index) => {
    if (cart.id == id) {
      carts[index].count--;
      if (carts[index].count === 0) {
        console.log("delete");
        carts.splice(index, 1); //remove one element at specified index position
      }
    }
  });
  addToCart(carts);
};

const totalCartsAndCost = (totalCarts, totalCost) => {
  const displayCost = document.getElementById("total-cost");
  if (carts.length) {
    console.log(carts.size);
    displayCost.classList.remove("hidden");
    displayCost.innerHTML = `
              <h1 class="text-[18px] font-semibold">Total:</h1>
              <p class="text-[18px] font-semibold">৳ <span id="cost">${totalCost}</span></p>
  `;
  } else displayCost.classList.add("hidden");

  document.getElementById("carts").innerText = totalCarts;
};

const toggleContent = (id) => {
  const categoryBox = document.getElementById("category-section");
  const plantBox = document.getElementById("card-section");
  const cartBox = document.getElementById("cart-section");
  categoryBox.classList.add("hidden");
  plantBox.classList.add("hidden");
  cartBox.classList.add("hidden");
  if (id == 'cart-section') {
    cartBox.classList.remove("hidden");
  }
  else
  {
      categoryBox.classList.remove("hidden");
      plantBox.classList.remove("hidden");
  }

  const treesBtn = document.getElementById("trees-btn");
  const cartBtn = document.getElementById("cart-btn");
  treesBtn.classList.remove("bg-green-300");
  cartBtn.classList.remove("bg-green-300");
  const seletecdBtn = id === "card-section" ? treesBtn : cartBtn;
  seletecdBtn.classList.add("bg-green-300");
};

loadAllPlantsByDefault();
loadCategory();
