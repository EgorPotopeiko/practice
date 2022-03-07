import { Button, Col, Drawer, Form, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import "./cartOrder.less"
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFormik } from 'formik';

interface Props {
    visible: any,
    setVisible: any
}

const { Title, Text } = Typography;

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const [total, setTotal] = useState(0);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    const formik = useFormik({
        initialValues: {
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
                console.log(values)
                setLoading(false)
                setSubmitting(false)
                resetForm()
            }, 3000)
        }
    });

    const { handleSubmit, handleChange, isSubmitting, values } = formik;
    const onClose = () => {
        setVisible(false)
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
            title="Create a order"
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
                <Row gutter={16}>
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
                >Submit</Button>
            </Form>
        </Drawer>
    );
}

export default CartOrder;