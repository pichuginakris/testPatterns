interface IPrototype {
    clone(): IPrototype;
}

class ProductHere {
    name: string;
    cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }
}

class ProductCategoryHere implements IPrototype {
    categoryName: string;
    private _products: ProductHere[] | undefined;

    constructor(categoryName: string) {
        this.categoryName = categoryName;
        this._products = [];
    }

    public addProducts(product: ProductHere) {
        if (this._products) this._products.push(product);
    }

    get products(): ProductHere[] | null {
        if (this._products) {
            return this._products;
        } else {
            return null;
        }
    }



    clone(): IPrototype {
        const products = this.products;
        const newProduct = new ProductCategoryHere(this.categoryName);
        // Вариант 1 (НЕ ПОДХОДИТ):
        // Здесь вы просто копируете ссылки на существующие объекты ProductHere в новый объект категории newProduct.
        //     Это создаёт поверхностную копию (shallow copy), где обе категории (this и newProduct) будут ссылаться на одни и те же объекты продуктов.
        //     Если вы измените продукт в одной категории, он изменится и в другой, так как оба объекта работают с одним экземпляром продукта.
        // if (products) products.map((product) => newProduct.addProducts(product));

        // Вариант 2 (ПОДХОДИТ):
        // Почему этот вариант подходит:
        //
        //     Здесь вы создаёте новые объекты ProductHere для каждого продукта, копируя их свойства (имя и стоимость) из оригинала.
        //     Это приводит к глубокому копированию (deep copy), где новая категория получает независимые экземпляры продуктов.
        //     Изменения в продуктах в новой категории не повлияют на оригинальные продукты в исходной категории.
        if (products) products.map(product => newProduct.addProducts(new ProductHere(product.name, product.cost)));
        return newProduct;
    }
}

const milk2 = new ProductHere('milk', 41);
const milkCategory = new ProductCategoryHere('milkCategory');
milkCategory.addProducts(milk2);
console.log(milkCategory);
console.log(milkCategory.products);
console.log('Copy here____________');

const copyCategoryMilk = milkCategory.clone();
milk2.cost = 88765;
console.log(copyCategoryMilk);
console.log((copyCategoryMilk as ProductCategoryHere).products);
