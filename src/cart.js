let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)

let calculation = () => {
    let cartQuantity = document.getElementById('cartAmount')

    cartQuantity.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

};

// everytime anyhting run, this is goint to called
calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            <div class="cart-item ">
            <img src="${search.img}"  class="cart-images" alt="">
    
            <div class="details ">
    
                <div class="title-price-x">
                    <h4 class="flex gap-x-4">
                        <p>${search.name}</p>
                        <p class="p1">$ ${search.price}</p>
                    </h4>
    
                   <div onclick="removeItems(${id})" class="cursor-pointer"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg"
                   viewBox="0 0 16 16">
                   <path
                       d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
               </svg> </div>
                </div>
    
                    <div class="buttons cart-buttons ">
                    <div onclick = "decrement(${id})" class=" btn btn-minus " ><img src="/icons8-minus-24.png" /></div>

                    <div id = ${id} class="quantity" >${item}</div>

                    <div onclick="increment(${id})" class=" btn btn-plus" ><img src="/icons8-plus-24.png" /></div>
                   </div>
    
                <h3 class="mt-2 ">Total $ ${item * search.price}</h3>
            </div>
        </div>
            `
        }).join("")
    }
    else {
        shoppingCart.innerHTML = ``

        label.innerHTML = `
        <h2 class="label-h2">Cart is Empty </h2>
        <a href="index.html">
        <button class="back-to-home"> Back to Home </button> </a>
        `
    }
}
generateCartItems()

let increment = (id) => {
    let selectedItem = id;

    // ** basket will keep adding the same identical id's without increasing the number. it doesnt make sense so we are making search function to achieve increement in no

    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;

    }

    update(selectedItem.id)
    generateCartItems()
    // console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;

    }
    // console.log(basket)
    update(selectedItem.id)

    basket = basket.filter((x) => x.item !== 0)
    //  to remove whole card when quantity is zero
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()

}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};


let removeItems = (id) => {
    let selectedItem =  id;
    // console.log(selectedItem.id)
    basket = basket.filter((x)=> x.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))

    calculation()
    generateCartItems()

}

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item, id} = x
            let search = shopItemsData.find((y) => y.id === id)

            return item * search.price;
            

        }).reduce((x,y)=> x + y, 0)
        // console.log(amount)
        label.innerHTML = `
        <h2 >Total Bill : $ ${amount} </h2>
        <button class="checkout">Checkout</button>
        <button class="clear-cart" onclick="clearCart()">Clear cart</button>
        `
    }
    else return
}
let clearCart = ()=>{
    basket = []
    generateCartItems();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
   

}
totalAmount()
// clearCart()