let store = new PhoneStore();
let filterUserList = null;

store.loadFromLocalStorage();

function productList(){
    let list = filterUserList ?? store.getListProduct();
    let html = ``;
    for(let i = 0; i < list.length; i++){
        let product = list[i];
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
            <div class="card h-100">
                <img src="${product.image_product}" class="card-img-top mt-2" alt="iphone 16 pro max">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name_product}</h5>
                    <div class="card-text d-inline-block mt-2 mb-2">
                        <p class="card-text fz-3">${product.price_product} VND</p>
                    </div>
                    <a href="#" class="btn btn-primary mt-auto float-end m-2">Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("productUserProduct").innerHTML = html;
}

function popularProductList(){
    let list = filterUserList ?? store.getListProduct();
    let html = ``;
    for(let i = 0; i < 3; i++){
        let product = list[i];
        html += `
        <div class="col-md-4 col-sm-12 mb-2">
            <div class="card h-100">
                <img src="${product.image_product}" class="card-img-top mt-2" alt="iphone 16 pro max">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name_product}</h5>
                    <div class="card-text d-inline-block mt-2 mb-2">
                        <p class="card-text fz-3">${product.price_product} VND</p>
                    </div>
                    <a href="#" class="btn btn-primary mt-auto float-end m-2">Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("popularProduct").innerHTML = html;
}

// Search product



window.onload = function () {
    const page = document.body.getAttribute("data-page");

    if (page === "home") {
        popularProductList();
        productList();
    } else if (page === "product") {
        productList();
    }
};
