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

    getProductById(id) {
        return this.list_product.find(product => product.id_product === id);
    }

    getStaffById(id) {
        return this.list_staff.find(staff => staff.id_staff === id);
    }
    getBranchById(id) {
        return this.list_branch.find(branch => branch.id_branch === id);
    }

    getStaffByName(name) {
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
    }

    // loadFromLocalStorage() 
    loadFromLocalStorage() {
        let productList = localStorage.getItem('list_product');

        if (productList) {
            let parsedProductList = JSON.parse(productList);
            this.list_product = parsedProductList.map(p => new Product(p.id_product, p.name_product, p.price_product, p.quantity_product, p.image_product, p.description_product));
        }
        else {
            this.list_product = [];
        }
    }

    saveStaffToLocalStorage() {
        localStorage.setItem('list_staff', JSON.stringify(this.list_staff));
    }

    loadStaffFromLocalStorage() {
        let staffList = localStorage.getItem('list_staff');
        if (staffList) {
            let parsedStaffList = JSON.parse(staffList);
            this.list_staff = parsedStaffList.map(s => new Staff(s.id_staff, s.name_staff, s.age_staff, s.gender_staff, s.phone_staff, s.email_staff, s.address_staff));
        }
        else {
            this.list_staff = [];
        }
    }



    


    // QL sản phẩm
    addProduct(newProduct) {
        let product = this.getProductById(newProduct.id_product);
        if (product === undefined) {
            this.list_product.push(newProduct);
        }
        else {
            alert('Sản phẩm đã tồn tại');
        }
    }

    removeProduct(id) {
        id = String(id);
        let index = this.list_product.findIndex(product => product.id_product === id);
        if (index === -1) {
            alert('Không có sản phẩm này!');
        }
        else {
            this.list_product.splice(index, 1);
        }
    }

    updateProduct(id, newProduct) {
        id = String(id);
        let index = this.list_product.findIndex(product => product.id_product === id);
        if (index === -1) {
            alert('Không có sản phẩm này');
        }
        else {
            this.list_product[index] = newProduct;
        }
    }

    getListProductByName(name) {
        let result = [];
        for (let i = 0; i < this.list_product.length; i++) {
            let product = this.list_product[i];
            if (product.name_product.toLowerCase().includes(name.toLowerCase())) {
                result.push(product);
            }
        }
        return result;
    }



    // QL nhân viên
    addStaff(newStaff) {
        let staff = this.getProductById(newStaff.id_staff);
        if (staff === undefined) {
            this.list_staff.push(newStaff);
        }
        else {
            alert('Nhân viên đã tồn tại');
        }
    }

    removeStaff(id) {
        id = String(id);
        let index = this.list_staff.findIndex(staff => staff.id_staff === id);
        if (index === -1) {
            alert('Không có nhân viên này!');
        }
        else {
            this.list_staff.splice(index, 1);
        }
    }

    updateStaff(id, newStaff) {
        id = String(id);
        // Kiểm tra xem sản phẩm có tồn tại không
        let index = this.list_staff.findIndex(staff => staff.id_staff === id);
        if (index === -1) {
            alert('Không có nhân viên này');
        }
        else {
            this.list_staff[index] = newStaff;
        }
    }

    getListStaffByName(name) {
        let result = [];
        for (let i = 0; i < this.list_staff.length; i++) {
            let staff = this.list_staff[i];
            if (staff.name_staff.toLowerCase().includes(name.toLowerCase())) {
                result.push(staff);
            }
        }
        return result;
    }
}