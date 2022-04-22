import React from 'react';
import { AppstoreAddOutlined, CalendarOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import './admin_forms.less';
import AdminProjects from './admin_projects/admin_projects';
import { Tabs } from 'antd';
import AdminCalendar from './admin_calendar/admin_calendar';
import AdminInternet from './admin_internet/admin_internet';
import AdminCoordinators from './admin_coordinators/admin_coordinators';
import { Formik } from 'formik';
import { SubmitButton, Form } from 'formik-antd';

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
                contentFormats: [],
                channels: [],
                kpis: [],
                ownerId: '',
                producerIds: [],
                coordinatorIds: [],
                fileIds: [],
                imageId: ''
            }}
                onSubmit={(values) => console.log(values)}>
                {({ values }) => (
                    <Form>
                        <Tabs tabPosition='left'>
                            <TabPane key='projects' tab={<AppstoreAddOutlined />}>
                                <AdminProjects />
                            </TabPane>
                            <TabPane key='calendar' tab={<CalendarOutlined />}>
                                <AdminCalendar />
                            </TabPane>
                            <TabPane key='internet' tab={<GlobalOutlined />}>
                                <AdminInternet />
                            </TabPane>
                            <TabPane key='coordinator' tab={<UserOutlined />}>
                                <AdminCoordinators />
                            </TabPane>
                        </Tabs>
                        <SubmitButton>Submit</SubmitButton>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default AdminForms;