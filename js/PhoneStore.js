class PhoneStore {
    id_store;
    name_store;
    list_product;
    list_staff;

    constructor(id_store, name_store, list_product = [], list_staff = []) {
        this.id_store = id_store;
        this.name_store = name_store;
        this.list_product = list_product;
        this.list_staff = list_staff;
    }

    getProductById(id){
        return this.list_product.find(product => product.id_product === id);
    }

    getStaffById(id){
        return this.list_staff.find(staff => staff.id_staff === id);
    }

    getStaffByName(name){
        return this.list_staff.find(staff => staff.name_staff === name);
    }
    getListProduct() {
        return this.list_product;
    }
    getListStaff() {
        return this.list_staff;
    }

    // savetoLocalStorage
    saveToLocalStorage() {
        localStorage.setItem('list_product', JSON.stringify(this.list_product));
        localStorage.setItem('list_staff', JSON.stringify(this.list_staff));
    }

    // loadFromLocalStorage() 
    loadFromLocalStorage(){
        let productList = localStorage.getItem('list_product');
        let staffList = localStorage.getItem('list_staff');

        if(productList) {
            let parsedProductList = JSON.parse(productList);
            this.list_product = parsedProductList.map(p => new Product(p.id_product, p.name_product, p.price_product, p.quantity_product, p.image_product, p.description_product));
        }

        if(staffList) {
            let parsedStaffList = JSON.parse(staffList);
            this.list_staff = parsedStaffList.map(s => new Staff(s.id_staff, s.name_staff, s.position_staff));
        }
    }


    // QL sản phẩm
    addProduct(newProduct){
        let product = this.getProductById(newProduct.id_product);
        if(product === undefined){
            this.list_product.push(newProduct);
        }
        else {
            alert('Sản phẩm đã tồn tại');
        }
    }

    removeProduct(id) {
        id = String(id);
        let index = this.list_product.findIndex(product => product.id_product === id);
        if(index === -1) {
            alert('Không có sản phẩm này!');
        }
        else {
            this.list_product.splice(index, 1);
        }
    }

    updateProduct(id, newProduct){
        id = String(id);
        // Kiểm tra xem sản phẩm có tồn tại không
        let index = this.list_product.findIndex(product => product.id_product === id);
        if(index === -1){
            alert('Không có sản phẩm này');
        }
        else {
            this.list_product[index] = newProduct;
        }
    }

    getListProductByName(name){
        let result = [];
        for(let i = 0; i < this.list_product.length; i++){
            let product = this.list_product[i];
            if(product.name_product.toLowerCase().includes(name.toLowerCase())){
                result.push(product);
            }
        }
        return result;
    }


    // QL nhân viên

}