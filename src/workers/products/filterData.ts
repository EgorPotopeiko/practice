import axios from "axios";
import ProductsDB from "../../services";

const database = new ProductsDB()

export default class FilteredDB {
    getFilteredProducts = async (filters?: any) => {
        const { available } = filters
        const data = database.getAllProducts()
        return data.then(res => {
            let newData = res.filter((item: any) => item.available === available)
            return newData
        })
    }
}