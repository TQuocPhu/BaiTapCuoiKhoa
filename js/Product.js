
// Product
class Product {
    id_product;
    name_product;
    price_product;
    quantity_product;
    image_product;
    description_product;
    list_branch = [];


    constructor(id_product, name_product, price_product, quantity_product, image_product, description_product, list_branch = []) {
        this.id_product = id_product;
        this.name_product = name_product;
        this.price_product = price_product;
        this.quantity_product = quantity_product;
        this.image_product = image_product;
        this.description_product = description_product;
        // this.list_branch = list_branch; // Thêm mảng thương hiệu
        this.list_branch = Array.isArray(list_branch) ? list_branch : [];
    }
    getIdProduct() {
        return this.id_product;
    }
    getNameProduct() {
        return this.name_product;
    }
    getPriceProduct() {
        return this.price_product;
    }
    getQuantityProduct() {
        return this.quantity_product;
    }
    getImageProduct() {
        return this.image_product;
    }
    getDescriptionProduct() {
        return this.description_product;
    }


    getInfo() {
        return `${this.id_product} - ${this.name_product} - ${this.price} - ${this.quantity}`;
    }
    getListBranch() {
        return this.list_branch;
    }

    getBranchById(id) {
        return this.list_branch.find(branch => branch.id_branch === id);
    }
    // QL Branch

    saveBranchToLocalStorage() {
        localStorage.setItem('list_branch', JSON.stringify(this.list_branch));
    }

    loadBranchFromLocalStorage() {
        let branchList = localStorage.getItem('list_branch');
        if (branchList) {
            let parsedBranchList = JSON.parse(branchList);
            this.list_branch = parsedBranchList.map(b => new Branch(b.id_branch, b.name_branch));
        }
        else {
            this.list_branch = [];
        }
    }
    addBranch(newBranch) {
        let branch = this.getBranchById(newBranch.id_branch);
        if (branch === undefined) {
            this.list_branch.push(newBranch);
        }
        else {
            alert('Chi nhánh đã tồn tại');
        }
    }
    removeBranch(id) {
        id = String(id);
        let index = this.list_branch.findIndex(branch => branch.id_branch === id);
        if (index === -1) {
            alert('Không có chi nhánh này!');
        }
        else {
            this.list_branch.splice(index, 1);
        }
    }
    updateBranch(id, newBranch) {
        id = String(id);
        let index = this.list_branch.findIndex(branch => branch.id_branch === id);
        if (index === -1) {
            alert('Không có chi nhánh này');
        }
        else {
            this.list_branch[index] = newBranch;
        }
    }

    getListBranchByName(name) {
        let result = [];
        for (let i = 0; i < this.list_branch.length; i++) {
            let branch = this.list_branch[i];
            if (branch.name_branch.toLowerCase().includes(name.toLowerCase())) {
                result.push(branch);
            }
        }
        return result;
    }

    // Filter the branch
    filterBranchByName(name) {
        let result = this.list_branch.filter(branch =>
            branch.name_branch.toLowerCase().includes(name.toLowerCase())
        );
        return result;
    }


}


