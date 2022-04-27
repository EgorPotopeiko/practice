import React from 'react';
import { Formik } from 'formik';
import { Tabs } from 'antd';
import { Form } from 'formik-antd';
import { nanoid } from 'nanoid';
import { AppstoreAddOutlined, CalendarOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import AdminProjects from './admin_projects/admin_projects';
import AdminCalendar from './admin_calendar/admin_calendar';
import AdminInternet from './admin_internet/admin_internet';
import AdminCoordinators from './admin_coordinators/admin_coordinators';
import './admin_forms.less';

const { TabPane } = Tabs;

const AdminForms: React.FC = () => {
    return (
        <div className='admin__forms'>
            <Formik initialValues={{
                name: '',
                requestNumber: '',
                contractNumber: '',
                contractDate: '',
                advancePayment: false,
                igk: '',
                budget: 0,
                sessionId: '',
                goal: '',
                description: '',
                completionDate: '',
                statusId: '',
                contentThematicIds: [],
                contentDirectionId: '',
                contentFormats: [
                    {
                        id: nanoid(),
                        info: '',
                        num: 0,
                        type: ''
                    }
                ],
                channels: [
                    {
                        id: nanoid(),
                        name: '',
                        link: '',
                        planPublicationCount: 0,
                        internetResourceId: ''
                    }
                ],
                kpis: [
                    {
                        id: nanoid(),
                        planCount: 0,
                        typeId: ''
                    }
                ],
                ownerId: '',
                producerIds: [
                    {
                        id: nanoid(),
                        name: ''
                    }
                ],
                coordinatorIds: [
                    {
                        id: nanoid(),
                        name: ''
                    }
                ],
                fileIds: [],
                imageId: ''
            }}
                onSubmit={(values) => console.log(values)}
                validateOnBlur>
                {(formik) => (
                    <Form>
                        <Tabs tabPosition='left'>
                            <TabPane key='projects' tab={<AppstoreAddOutlined />}>
                                <AdminProjects formik={formik} />
                            </TabPane>
                            <TabPane key='calendar' tab={<CalendarOutlined />}>
                                <AdminCalendar formik={formik} />
                            </TabPane>
                            <TabPane key='internet' tab={<GlobalOutlined />}>
                                <AdminInternet formik={formik} />
                            </TabPane>
                            <TabPane key='coordinator' tab={<UserOutlined />}>
                                <AdminCoordinators formik={formik} />
                            </TabPane>
                        </Tabs>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default AdminForms;