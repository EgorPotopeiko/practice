/* eslint-disable array-callback-return */
import { Button, Col, Divider, Drawer, Form, Input, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import "./cartOrder.less";
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createOrder, removeOrder } from '../../../../store/orders/actions';
import { clearCart } from '../../../../store/cart/actions';
import history from '../../../../history';
import { USER_PATH } from '../../../../routing/names';
import { customAlphabet } from "nanoid"
import Modal from 'antd/lib/modal/Modal';

interface Props {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const { Title, Text } = Typography;

const { AUTH } = USER_PATH;

const nanoid = customAlphabet('1234567890', 10)

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    const [delivery, setDelivery] = useState('курьером');
    const orders = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    const authUser = useSelector((state: RootStateOrAny) => state.userReducer.user);
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
            user: `${authUser.firstName} ${authUser.lastName}`,
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
                const newOrder = values;
                dispatch(createOrder(newOrder))
                const orders = JSON.parse(localStorage.getItem("orders")!)
                localStorage.setItem("orders", JSON.stringify([...orders, { ...newOrder }]))
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
            const newOrder = values;
            dispatch(removeOrder(values.id))
            dispatch(createOrder(newOrder))
            dispatch(clearCart([]))
            setLoading(false)
            setOrderVisible(false)
            setSuccessVisible(true)
        }, 3000)
    }

    const backToMain = () => {
        setSuccessVisible(false)
        history.push(AUTH)
        resetForm({})
    }

    const backToOrder = () => {
        dispatch(removeOrder(values.id))
        setOrderVisible(false)
        setVisible(true)
    }

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders])

    useEffect(() => {
        let ttl = 0;
        let len = 0;
        cartItems.forEach((el: any) => {
            ttl += +el.total;
            len += +el.amount;
        });
        setTotal(ttl);
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
                    <Row gutter={16} style={{ marginBottom: "24px" }}>
                        <Col span={6}>
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
                        <Col span={6}>
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
                        <Col span={6}>
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
                        <Col span={6}>
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