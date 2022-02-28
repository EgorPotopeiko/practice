import axios from "axios";

export default class ProductsDB {
    api = axios.create({
        baseURL: "http://localhost:3000/"
    });

    getAllProducts = async () => {
        await axios.get(`db/products.json`)
            .then(function (response) {
                console.log(response.data)
            })
    }

    getProduct = async (id: number) => {
        await axios.get(`db/products.json`)
            .then(function (response) {
                console.log(response.data[id])
            })
    }
}
