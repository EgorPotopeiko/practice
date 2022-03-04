import { Col, Drawer, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import MaskedInput from 'antd-mask-input';
import "./cartOrder.less"
import { SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import { RootStateOrAny, useSelector } from 'react-redux';

const { Title, Text } = Typography;

interface Props {
    visible: any,
    setVisible: any
}

const CartOrder: React.FC<Props> = ({ visible, setVisible }) => {
    const total = useSelector((state: RootStateOrAny) => state.cartReducer.orderTotal);
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    const onClose = () => {
        setVisible(false)
    };
    return (
        <Drawer
            title="Create a order"
            width={610}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Formik initialValues={{ town: '', street: '', house: '', flat: '', entrance: '', level: '', number: '', name: '', comment: '' }} validateOnBlur onSubmit={(values) => console.log(values)}>
                {() => (
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item>
                                    <Title level={4}>Выбрано {cartItems.length} товара(-ов)</Title>
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
                            label="Город"
                            rules={[{ required: true, message: 'Введите город' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="street"
                            label="Улица"
                            rules={[{ required: true, message: 'Введите улицу' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="house"
                                    label="Дом"
                                    rules={[{ required: true, message: 'Введите номер дома' }]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="flat"
                                    label="Квартира"
                                    rules={[{ required: true, message: 'Введите номер квартиры' }]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="entrance"
                                    label="Подъезд"
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="level"
                                    label="Этаж"
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="number"
                            label="Телефон"
                            rules={[{ required: true, message: 'Введите свой номер телефона' }]}
                        >
                            <MaskedInput mask="+375 (11)-111-11-11" name="telephone" placeholder="+375 (__)-___-__-__" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="ФИО"
                            rules={[{ required: true, message: 'Введите ФИО' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="comment"
                            label="Комментарий к заказу">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="submit">
                            <SubmitButton>Оформить заказ</SubmitButton>
                        </Form.Item>
                    </Form>
                )}
            </Formik>
        </Drawer>
    );
}

export default CartOrder;