import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 10)

export const createOrder = (order: any) => {
    return {
        type: "CREATE_ORDER",
        order: { id: nanoid(), ...order },
    }
}
