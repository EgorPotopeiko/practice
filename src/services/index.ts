import axios from "axios";

export default class ProductsDB {
    api = axios.create({
        baseURL: "http://localhost:3000/"
    });

    getAllProducts = async () => {
        const res = await axios.get(`db/products.json`)
        return res.data.map(this._transformProduct);
    }

    getProduct = async (id: number) => {
        await axios.get(`db/products.json`)
            .then(function (response) {
                return response.data[id]
            })
    }
    _transformProduct = (product: any) => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
        };
    };
}
