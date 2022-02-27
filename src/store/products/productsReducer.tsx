import { nanoid } from 'nanoid';
import { Reducer } from 'redux';

const initialState = {
    products: [
        {
            key: nanoid(3),
            id: nanoid(5),
            name: "Мох Павлиний Хвост",
            description: "Мох",
            price: 10,
            category: 'OTHER',
            date: "5/7/2018",
            status: true,
            amount: 30,
            manufacture: "PURINA"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            name: "Барбус вишневый",
            description: "Барбус",
            price: 12,
            category: 'OTHER',
            date: "8/7/2018",
            status: true,
            amount: 10,
            manufacture: "РОГА И КОПЫТА"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            name: "Тетра светлячок",
            description: "Тетра",
            price: 5,
            category: 'BUGS',
            date: "10/3/2018",
            status: true,
            amount: 5,
            manufacture: "PURINA"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            name: 'Хвост',
            description: 'Хвост',
            price: 7,
            category: 'SNAKES',
            date: "3/7/2020",
            status: true,
            amount: 7,
            manufacture: "ZOOPARADISE"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            name: 'Аквариум',
            description: 'Рыбы',
            price: 20,
            category: 'FISH',
            date: "4/23/2019",
            status: false,
            amount: 0,
            manufacture: "ZOOPARADISE"
        },
        {
            key: nanoid(3),
            id: nanoid(5),
            name: 'Муравьиная ферма',
            description: 'Насекомые',
            price: 2,
            category: 'BUGS',
            date: "5/7/2017",
            status: true,
            amount: 15,
            manufacture: "PURINA"
        },
    ]
};

const productsReducer: Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default productsReducer