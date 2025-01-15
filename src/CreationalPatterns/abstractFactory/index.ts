interface IProductCategory {
    categoryName: string;
    categoryCapacity: number;
    getTotalPrice: () => number;
    getFreeCount: () => number;
    addProduct(product: IProduct): void;
    deleteProduct(productToDelete: IProduct | string): void;
    products: Product[];
}

interface IProduct {
    name: string;
    price: number;
    quantity: number;

}

class Product implements IProduct {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class ProductCategory implements IProductCategory {
    categoryName: string;
    categoryCapacity: number;
    private _products: Product[];

    constructor( categoryName: string, categoryCapacity: number) {
        this.categoryCapacity = categoryCapacity;
        this.categoryName = categoryName;
        this._products = [];
    }

    public addProduct(product: Product) {
        if (this._products.length < this.categoryCapacity){
            this._products.push(product);
            console.log('Product added');
        } else {
            console.log('Capacity is full')
        }
    }

    public deleteProduct(productToDelete: Product | string) {
        if (typeof productToDelete === "string") {
            this._products.filter(product => product.name !== productToDelete);
            console.log(`Deleted product ${productToDelete}`);
        } else {
            this._products.filter(product => product !== productToDelete);
            console.log(`Deleted product ${productToDelete.name}`);
        }
    }

    get products(): Product[] {
        return this._products;
    }

    getTotalPrice() {
        return this._products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    getFreeCount() {
        return (this.categoryCapacity - this._products.reduce((total, product) => total + product.quantity, 0));
    }
}


// Абстрактная фабрика
interface IProductFactory {
    createProduct(name: string, price: number, quantity: number): IProduct;
    createCategory(categoryName: string, categoryCapacity: number): IProductCategory;
}

class ProductFactory implements IProductFactory {
    createCategory(categoryName: string, categoryCapacity: number): IProductCategory {
        return new ProductCategory(categoryName, categoryCapacity);
    }

    createProduct(name: string, price: number, quantity: number): IProduct {
        return new Product(name, price, quantity);
    }
}

class PremiumFactory implements IProductFactory {
    createCategory(categoryName: string, categoryCapacity: number): IProductCategory {
        return new ProductCategory(categoryName, categoryCapacity);
    }

    createProduct(name: string, price: number, quantity: number): IProduct {
        return new Product(name, price * 1.2, quantity);
    }
}

const productFactory = new ProductFactory();
const premiumFactory = new PremiumFactory();

const test1Category = productFactory.createCategory('milkstaff', 240);
const test2Category = premiumFactory.createCategory('meetstaff', 240);

const milk = productFactory.createProduct('milk', 41, 11);
const cheese = productFactory.createProduct('cheese', 232, 31);
const soft =  premiumFactory.createProduct('soft', 14, 4);

test1Category.addProduct(milk);
test1Category.addProduct(cheese);
test2Category.addProduct(soft);
console.log(test1Category.getFreeCount());
console.log(test1Category.getTotalPrice());
test1Category.deleteProduct(milk);
console.log(test1Category.getFreeCount());
console.log(test1Category.getTotalPrice());
console.log(test2Category.products);

