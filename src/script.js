

let shop = document.getElementById('shop')
let count = document.getElementById('quant')

// console.log(shop)

// let shopItemsData = [
//     {
//         id: "jfhgbvnscs",
//         name: "Casual Shirt",
//         price: 45,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//         img: "images/img-1.jpg",
//     },
//     {
//         id: "ioytrhndcv",
//         name: "Office Shirt",
//         price: 100,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//         img: "images/img-2.jpg",
//     },
//     {
//         id: "wuefbncxbsn",
//         name: "T Shirt",
//         price: 25,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//         img: "images/img-3.jpg",
//     },
//     {
//         id: "thyfhcbcv",
//         name: "Mens Suit",
//         price: 300,
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//         img: "images/img-4.jpg",
//     },
// ]

// **initially basket was like, just changed when using local storage
//  let basket = []

let basket = JSON.parse(localStorage.getItem("data")) || []; // purpose of making is to store the id and quantity whenever we click on plus icon of items

let generatShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x    // using array destructring 
        let search = basket.find((x)=> x.id === id) || []
        return `
    
        <div class="item" id=product-id-${id}>
        <img src="${img}" class="w-10/12 mx-auto cursor-pointer" alt="" id="item-image">
        <p class="text-center font-bold mt-3 text-2xl" id="item-p-1">${name}</p>
        <p class="text-center" id="item-p-2">${desc}</p>
        <div>
    
            <div class="bottom_card">
                <div class="price font-bold text-2xl" id="item-price"> $ ${price}</div>
                <div class="buttons">
                    <div onclick = "decrement(${id})" class=" btn btn-minus " ><img src="/icons8-minus-24.png" /></div>

                    <div id = ${id} class="quantity" >${search.item === undefined ? 0 : search.item}</div>

                    <div onclick="increment(${id})" class=" btn btn-plus" ><img src="/icons8-plus-24.png" /></div>
                </div>
            </div>
        </div>
    </div>
    `;
    })
        .join(""));
    // return shop.innerHTML = "jii"
};


generatShop()

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
    // console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;

    }
    // console.log(basket)
    update(selectedItem.id)

    basket = basket.filter((x)=>x.item !== 0)

    localStorage.setItem("data", JSON.stringify(basket))

}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };



// ** we have moved the calculation function to cart.js because we need it after adding items. basically in cart

let calculation =()=>{
   let cartQuantity = document.getElementById('cartAmount')

   cartQuantity.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y, 0)
    
};

// everytime anyhting run, this is goint to called
calculation()