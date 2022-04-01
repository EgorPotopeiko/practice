/* eslint-disable array-callback-return */
import { Button, Col, Divider, Drawer, Form, Input, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import "./СartOrder.less";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { customAlphabet } from "nanoid"
import Modal from 'antd/lib/modal/Modal';
import { selectCart } from '../../../../store/cart/selectors';
import { selectUser } from '../../../../store/login/selectors';
import { CartActionTypes } from '../../../../store/cart/action-types';
import history from '../../../../history';
import { USER_PATH } from '../../../../routing/names'
import { FiltersActionTypes } from '../../../../store/filters/action-types';
import { ProductsActionTypes } from '../../../../store/products/action-types';

interface Props {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const { AUTH } = USER_PATH

const { Title, Text } = Typography;

const nanoid = customAlphabet('1234567890', 10)

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const [total, setTotal] = useState(0);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const cartItems = useSelector(selectCart);
    const [delivery, setDelivery] = useState('курьером');
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: '',
            delivery: delivery,
            town: '',
            street: '',
            house: '',
            flat: '',
            entrance: '',
            level: '',
            number: '',
            name: '',
            status: 'оформлен',
            email: authUser.email,
            user: `${authUser.name}`,
            comment: '',
            count: length,
            payment: total
        },
        enableReinitialize: false,
        onSubmit: (values, { setSubmitting }) => {
            setLoading(true)
            setSubmitting(true)
            setTimeout(() => {
                values.id = nanoid()
                values.delivery = delivery
                values.count = length
                values.payment = total
                const newOrder = values
                const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!)
                localStorage.setItem(`orders ${authUser.name}`, JSON.stringify([...orders, { ...newOrder }]))
                setLoading(false)
                setSubmitting(false)
                setVisible(false)
                setOrderVisible(true)
            }, 3000)
        }

    });

    const { handleSubmit, handleChange, isSubmitting, values, resetForm } = formik;

    const onClose = () => {
        setVisible(false)
        setOrderVisible(false)
    };

    const onChange = (e: RadioChangeEvent) => {
        setDelivery(e.target.value);
    };

    const finishOrder = () => {
        setLoading(true)
        setTimeout(() => {
            values.status = "оплачен"
            const newOrder = values
            const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!)
            orders.pop()
            localStorage.setItem(`orders ${authUser.name}`, JSON.stringify([...orders, { ...newOrder }]))
            dispatch({
                type: CartActionTypes.CLEAR_CART,
                empty: []
            })
            dispatch({
                type: FiltersActionTypes.REMOVE_ALL_FILTERS
            })
            dispatch({
                type: ProductsActionTypes.SET_PAGE,
                page: 1,
                pageSize: 6
            })
            setLoading(false)
            setOrderVisible(false)
            setSuccessVisible(true)
        }, 3000)
    }

    const backToMain = () => {
        setSuccessVisible(false)
        resetForm({})
        history.push(AUTH)
    }

    const backToOrder = () => {
        const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!)
        orders.pop()
        localStorage.setItem(`orders ${authUser.name}`, JSON.stringify(orders))
        setOrderVisible(false)
        setVisible(true)
    }

    useEffect(() => {
        let ttl = 0;
        let len = 0;
        cartItems.forEach((el: any) => {
            ttl += +el.total;
            len += +el.amount;
        });
        setTotal(+ttl.toFixed(2));
        setLength(len)
    }, [cartItems]);
    return (
        <>
            <Drawer
                title="Заявка на заказ"
                width={610}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item>
                                <Title level={4}>Выбрано {length} товара(-ов)</Title>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                <Text>{total} руб</Text>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Text>Способ доставки</Text>
                    <Radio.Group defaultValue="курьером" onChange={onChange} value={delivery}>
                        <Radio value="курьером">Курьером</Radio>
                        <Radio value="почтой">Почтой</Radio>
                        <Radio value="самовывоз">Самовывоз</Radio>
                    </Radio.Group>
                    <Divider />
                    <Form.Item
                        name="town"
                        hasFeedback
                        initialValue={values.town}
                        rules={[{ required: true, message: 'Введите город' }]}
                    >
                        <Input
                            name="town"
                            placeholder="Город"
                            value={values.town}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="street"
                        hasFeedback
                        initialValue={values.street}
                        rules={[{ required: true, message: 'Введите улицу' }]}
                    >
                        <Input
                            name="street"
                            placeholder="Улица"
                            value={values.street}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Row gutter={0} style={{ marginBottom: "24px" }}>
                        <Col span={5}>
                            <Form.Item
                                name="house"
                                hasFeedback
                                initialValue={values.house}
                                rules={[{ required: true, message: 'Введите номер дома' }]}
                            >
                                <Input
                                    name="house"
                                    type="number"
                                    placeholder="Дом"
                                    value={values.house}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="flat"
                                hasFeedback
                                initialValue={values.flat}
                                rules={[{ required: true, message: 'Введите номер квартиры' }]}
                            >
                                <Input
                                    name="flat"
                                    type="number"
                                    placeholder="Квартира"
                                    value={values.flat}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="entrance"
                                hasFeedback
                                initialValue={values.entrance}
                            >
                                <Input
                                    name="entrance"
                                    type="number"
                                    placeholder="Подъезд"
                                    value={values.entrance}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="level"
                                hasFeedback
                                initialValue={values.level}
                            >
                                <Input
                                    name="level"
                                    type="number"
                                    placeholder="Этаж"
                                    value={values.level}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="number"
                        hasFeedback
                        initialValue={values.number}
                        rules={[{ required: true, message: 'Введите номер телефона' }]}
                    >
                        <MaskedInput mask="+375 (11)-111-11-11" name="number" placeholder="+375 (__)-___-__-__" value={values.number} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        hasFeedback
                        initialValue={values.name}
                        rules={[{ required: true, message: 'Введите ФИО' }]}
                    >
                        <Input
                            name="name"
                            placeholder="ФИО"
                            value={values.name}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        hasFeedback
                        initialValue={values.comment}
                    >
                        <Input.TextArea
                            name="comment"
                            placeholder="Комментарий к заказу"
                            value={values.comment}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                        loading={loading}
                    >Оформить заказ</Button>
                </Form>
            </Drawer>
            <Drawer
                title="Заказ"
                width={610}
                visible={orderVisible}
                closable={false}
                bodyStyle={{ paddingBottom: 80 }}>
                <Form>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item>
                                <Title level={4}>Заказ №{values.id}</Title>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                <Text>{values.payment} руб</Text>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Form.Item>
                        <Text><b>Способ доставки:</b> {values.delivery}</Text>
                    </Form.Item>
                    <Form.Item>
                        <Text><b>По адресу:</b> {values.town}, {values.street}, {values.house}</Text>
                    </Form.Item>
                    <Form.Item>
                        <Text><b>Получатель:</b> {values.name}</Text>
                    </Form.Item>
                    <Form.Item>
                        <Text>{values.number}</Text>
                    </Form.Item>
                    <Button type='primary' loading={loading} onClick={() => finishOrder()}>Оплатить</Button>
                    <Button type='link' onClick={() => backToOrder()}>Вернуться к заказу</Button>
                </Form>
            </Drawer>
            <Modal title="Ваш заказ успешно создан" onCancel={backToMain} visible={successVisible} footer={null}>
                <Form>
                    <Form.Item>
                        <Text>Номер вашего заказа: <b><i>{values.id}</i></b></Text>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
}

export default CartOrder;