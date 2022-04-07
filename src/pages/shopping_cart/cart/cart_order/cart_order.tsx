/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Button, Col, Divider, Drawer, Form, Input, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import './cart_order.less';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { customAlphabet } from 'nanoid';
import Modal from 'antd/lib/modal/Modal';
import { selectCart } from '../../../../store/cart/selectors';
import { selectUser } from '../../../../store/login/selectors';
import history from '../../../../history';
import { USER_PATH } from '../../../../routing/names';
import { GetClearCartAction } from '../../../../store/cart/actions';
import { RemoveAllFilters } from '../../../../store/filters/actions';
import { GetPage } from '../../../../store/products/actions';

interface Props {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type TMenuState = {
    total: number,
    length: number,
    loading: boolean,
    orderVisible: boolean,
    successVisible: boolean,
    delivery: string
}

const { AUTH } = USER_PATH;

const { Title, Text } = Typography;

const nanoid = customAlphabet('1234567890', 10);

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const [filter, setFilter] = useState<TMenuState>({
        total: 0,
        length: 0,
        loading: false,
        orderVisible: false,
        successVisible: false,
        delivery: 'курьером'
    });
    const createFilter = (type: keyof TMenuState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }
    const cartItems = useSelector(selectCart);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: '',
            delivery: filter.delivery,
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
            count: filter.length,
            payment: filter.total
        },
        enableReinitialize: false,
        onSubmit: (values, { setSubmitting }) => {
            createFilter("loading")(true)
            setSubmitting(true)
            setTimeout(() => {
                values.id = nanoid()
                values.delivery = filter.delivery
                values.count = filter.length
                values.payment = filter.total
                const newOrder = values
                const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!)
                localStorage.setItem(`orders ${authUser.name}`, JSON.stringify([...orders, { ...newOrder }]))
                createFilter("loading")(false)
                setSubmitting(false)
                setVisible(false)
                createFilter("orderVisible")(true)
            }, 3000)
        }

    });

    const { handleSubmit, handleChange, isSubmitting, values, resetForm } = formik;

    const onClose = () => {
        setVisible(false);
        createFilter("orderVisible")(false)
    };

    const onChange = (e: RadioChangeEvent) => { createFilter("delivery")(e.target.value) };

    const finishOrder = () => {
        createFilter("loading")(true)
        setTimeout(() => {
            values.status = "оплачен"
            const newOrder = values
            const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!)
            orders.pop()
            localStorage.setItem(`orders ${authUser.name}`, JSON.stringify([...orders, { ...newOrder }]))
            dispatch(GetClearCartAction())
            dispatch(RemoveAllFilters())
            dispatch(GetPage(1, 6));
            createFilter("loading")(false)
            createFilter("orderVisible")(false)
            createFilter("successVisible")(true)
        }, 3000)
    }

    const backToMain = () => {
        createFilter("successVisible")(false)
        resetForm({});
        history.push(AUTH)
    }

    const backToOrder = () => {
        const orders = JSON.parse(localStorage.getItem(`orders ${authUser.name}`)!);
        orders.pop();
        localStorage.setItem(`orders ${authUser.name}`, JSON.stringify(orders));
        createFilter("orderVisible")(false)
        setVisible(true)
    }

    useEffect(() => {
        let ttl = 0;
        let len = 0;
        cartItems.forEach((el: any) => {
            ttl += +el.total;
            len += +el.amount;
        });
        createFilter("total")(+ttl.toFixed(2))
        createFilter("length")(len)
    }, [cartItems]);
    return (
        <>
            <Drawer
                title="Заявка на заказ"
                width={950}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <div className='create__modal'>
                    <Form onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={18}><Form.Item><Title level={3}>Выбрано {filter.length} товара(-ов)</Title></Form.Item></Col>
                            <Col span={6}><Form.Item><Text>{filter.total} руб</Text></Form.Item></Col>
                        </Row>
                        <Text>Способ доставки</Text>
                        <Radio.Group
                            defaultValue="курьером"
                            onChange={onChange}
                            value={filter.delivery}>
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
                        <Row gutter={0}>
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
                            <MaskedInput
                                mask="+375 (11)-111-11-11"
                                name="number"
                                placeholder="+375 (__)-___-__-__"
                                value={values.number}
                                onChange={handleChange} />
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
                            loading={filter.loading}
                        >Оформить заказ</Button>
                    </Form>
                </div>
            </Drawer>
            <Drawer
                title="Заказ"
                width={950}
                visible={filter.orderVisible}
                closable={false}
                bodyStyle={{ paddingBottom: 80 }}>
                <div className='order__modal'>
                    <Form>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item><Title level={4}>Заказ №{values.id}</Title></Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item><Text>{values.payment} руб</Text></Form.Item>
                            </Col>
                        </Row>
                        <Divider />
                        <Form.Item><Text><b>Способ доставки:</b> {values.delivery}</Text></Form.Item>
                        <Form.Item><Text><b>По адресу:</b> {values.town}, {values.street}, {values.house}</Text></Form.Item>
                        <Form.Item><Text><b>Получатель:</b> {values.name}</Text></Form.Item>
                        <Form.Item><Text>{values.number}</Text></Form.Item>
                        <Button type='primary' loading={filter.loading} onClick={() => finishOrder()}>Оплатить</Button>
                        <Button type='link' onClick={() => backToOrder()}>Вернуться к заказу</Button>
                    </Form>
                </div>
            </Drawer>
            <Modal title="Ваш заказ успешно создан" onCancel={backToMain} visible={filter.successVisible} footer={null}>
                <div className='success__modal'>
                    <Form>
                        <Form.Item><Text>Номер вашего заказа: <b><i>{values.id}</i></b></Text></Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
}

export default CartOrder;