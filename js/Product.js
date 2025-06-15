class Product {
    id_product;
    name_product;
    price_product;
    quantity_product;
    image_product;
    description_product;


    constructor(id_product, name_product, price_product, quantity_product, image_product, description_product) {
        this.id_product = id_product;
        this.name_product = name_product;
        this.price_product = price_product;
        this.quantity_product = quantity_product;
        this.image_product = image_product;
        this.description_product = description_product;
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
}