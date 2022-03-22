import { TProduct } from './../models/product';
/* eslint-disable array-callback-return */
/* eslint-disable no-self-assign */
import ProductsDB from ".";

const database = new ProductsDB()

export default class FilteredDB {
    getFilteredProducts = async (filters?: any) => {
        const { available, search, maker, priceRange, sort } = filters
        const data = database.getAllProducts()
        return data.then(res => {
            let newData = res.filter((item: TProduct) => item.available === available)
            newData = newData.filter((item: TProduct) => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            if (maker.length === 0) {
                newData = newData
            }
            else {
                newData = newData.filter((item: TProduct) => maker.includes(item.maker))
            }
            newData = newData.filter((item: TProduct) => item.cost >= priceRange[0] && item.cost <= priceRange[1])
            if (sort === "date") newData = newData.sort(function (a: TProduct, b: TProduct) { return new Date(b.added_date).valueOf() - new Date(a.added_date).valueOf() })
            if (sort === "alphabet") newData = newData.sort(function (a: TProduct, b: TProduct) { if (a.title < b.title) { return -1 } })
            if (sort === "high_price") newData = newData.sort(function (a: TProduct, b: TProduct) { return b.cost - a.cost })
            if (sort === "low_price") newData = newData.sort(function (a: TProduct, b: TProduct) { return a.cost - b.cost })
            return newData
        })
    }
}