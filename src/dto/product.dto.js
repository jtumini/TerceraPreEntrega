export default class ProductDTO {
    constructor(product) {
        this.title = product.title || product._title || null
        this.price = product.price || ""
        this.code = product.code || ""
        this.stock = product.stock || ""
    }
}