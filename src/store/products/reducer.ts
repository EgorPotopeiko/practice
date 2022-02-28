import { nanoid } from 'nanoid';
import { Reducer } from 'redux';

const initialState = {
    products: [
        {
            key: nanoid(3),
            id: nanoid(5),
            title: "Мох Павлиний Хвост",
            description: "Мох",
            cost: 10,
            category: 'other',
            added_date: "5/7/2018",
            available: true,
            maker: "Purina"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            title: "Барбус вишневый",
            description: "Барбус",
            cost: 12,
            category: 'other',
            added_date: "8/7/2018",
            available: true,
            maker: "Рога и копыта"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            title: "Тетра светлячок",
            description: "Тетра",
            cost: 5,
            category: 'birds',
            added_date: "10/3/2018",
            available: true,
            maker: "Purina"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            title: 'Хвост',
            description: 'Хвост',
            cost: 7,
            category: 'birds',
            added_date: "3/7/2020",
            available: true,
            maker: "ZooParadise"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            title: 'Аквариум',
            description: 'Рыбы',
            cost: 20,
            category: 'fishes',
            added_date: "4/23/2019",
            available: false,
            maker: "ZooParadise"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            title: 'Муравьиная ферма',
            description: 'Насекомые',
            cost: 2,
            category: 'rodents',
            added_date: "5/7/2017",
            available: true,
            maker: "Purina"
        },
    ]
};

const productsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default productsReducer