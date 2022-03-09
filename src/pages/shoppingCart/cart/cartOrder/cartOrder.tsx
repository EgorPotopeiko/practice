import { Button, Col, Divider, Drawer, Form, Input, Radio, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import "./cartOrder.less"
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../../store/orders/actions';

interface Props {
    visible: any,
    setVisible: any
}

const { Title, Text } = Typography;

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    const [delivery, setDelivery] = useState('courier');
    const formik = useFormik({
        initialValues: {
            delivery: delivery,
            town: '',
            street: '',
            house: '',
            flat: '',
            entrance: '',
            level: '',
            number: '',
            name: '',
            comment: '',
            count: length,
            payment: total
        },
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setLoading(true)
            setSubmitting(true)
            setTimeout(() => {
                dispatch(createOrder(values))
                setLoading(false)
                setSubmitting(false)
                setVisible(false)
                resetForm({})
            }, 3000)
        }

    });

    const { handleSubmit, handleChange, isSubmitting, values } = formik;

    const onClose = () => {
        setVisible(false)
    };

    const onChange = (e: any) => {
        setDelivery(e.target.value);
    };

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
                <Radio.Group defaultValue="courier" onChange={onChange} value={delivery}>
                    <Radio value="courier">Курьером</Radio>
                    <Radio value="mail">Почтой</Radio>
                    <Radio value="self">Самовывоз</Radio>
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
                        value={values.town || ''}
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
    );
}

export default CartOrder;