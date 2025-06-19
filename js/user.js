let store = new PhoneStore();
let filterUserList = null;

store.loadFromLocalStorage();

function productList(){
    let list = filterUserList ?? store.getListProduct();
    let html = ``;
    for(let i = 0; i < list.length; i++){
        let product = list[i];
        html += `
        <div class="col-md-4 col-sm-12 mb-2">
            <div class="card h-100">
                <img src="${product.image_product}" class="card-img-top" alt="iphone 16 pro max">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name_product}</h5>
                    <div class="card-text d-inline-block mt-2 mb-2">
                        <p class="card-text fz-3">${product.price_product} <span>VND</span></p>
                    </div>
                    <a href="#" class="btn btn-primary mt-auto float-end">Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("listproduct").innerHTML = html;
}

function popularProductList(){
    let list = filterUserList ?? store.getListProduct();
    let html = ``;
    for(let i = 0; i < 3; i++){
        let product = list[i];
        html += `
        <div class="col-md-4 col-sm-12 mb-2">
            <div class="card h-100">
                <img src="${product.image_product}" class="card-img-top" alt="iphone 16 pro max">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name_product}</h5>
                    <div class="card-text d-inline-block mt-2 mb-2">
                        <p class="card-text fz-3">${product.price_product} <span>VND</span></p>
                    </div>
                    <a href="#" class="btn btn-primary mt-auto float-end">Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("popularProduct").innerHTML = html;
}

popularProductList();
productList();