const container = document.querySelector(".container1")

// Array to store cart items
const cart = [];

// Fetch products from the API
fetch("https://dummyjson.com/products")
.then((res) => res.json())
.then((res) => {
  console.log(res);
  console.log(res.products);

  res.products.map((item)=> {
      container.innerHTML += `<div class="card m-5" style="width: 18rem; ">
      <img src="${item.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description.slice(0,30)}...</p>
          <div d-flex gap-3>
          <a href="#" class="btn btn-primary" onclick="showMore(${item.id})">Show More</a>
          <a href="#" class="btn btn-primary" onclick="addToCart(${item.id})">Add To Cart</a>
          </div>
      </div>
      </div> `
  });
 
})
.catch((err)=> {
    console.log(err);
})
  


const showMore = (id) => {
    console.log(id);
    localStorage.setItem("id", id);
    window.location = "singleProduct.html";
};



// Function to handle "Add To Cart" button click
const addToCart = (id) => {
  console.log(id);

  fetch(`https://dummyjson.com/products/${id}`)
  .then((res) => res.json())
  .then((product) => {

    let checkIndex = -1;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        checkIndex = i;
        break;
      }
    }

    if (checkIndex === -1) {
      product.quantity = 1;
      cart.push(product);

      Swal.fire({
        title: "Item Added",
        icon: "success",
        draggable: true
      });
      
    } else {
      cart[checkIndex].quantity += 1;
    }





  //     // Check if the product already exists in the cart
  //   const checkIndex = cart.findIndex((item) => item.id === product.id);
  //   if (checkIndex === -1) {
  //     // If the product is not in the cart, add it with a quantity property
  //     product.quantity = 1; // Adding a new property "quantity" with an initial value of 1
  //     cart.push(product);
  //   } else {
  //     // If the product already exists, increase its quantity
  //     cart[checkIndex].quantity += 1;
  //   }



  // cart.push(product); // Add product to the cart
  console.log("Cart:", cart);
  // alert(`${product.title} has been added to the cart!`);

  // Save cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  })
  .catch((err) => {
  console.error("Error adding product to cart:", err);
  });

}; //Function closing Add To Cart