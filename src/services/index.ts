import axios from "axios";

export default class ProductsDB {

    getAllProducts = async () => {
        const res = await axios.get(`http://localhost:3000/db/generated.json`);
        return res.data.map(this._transformProduct);
    };

    getProduct = async (id: string) => {
        const even = (element: any) => element.id === id;
        const res = await axios.get(`http://localhost:3000/db/generated.json`);
        const data = res.data.map(this._transformProduct);
        const findProduct = data.find(even);
        return findProduct;
    };

    _transformProduct = (product: any) => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            cost: product.cost,
            available: product.available,
            date: product.added_date,
            maker: product.maker,
            category: product.category,
            subcategory: product.subcategory
        };
    };
}
