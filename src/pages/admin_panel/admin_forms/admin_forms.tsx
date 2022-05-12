/* eslint-disable array-callback-return */
import React, { FC } from 'react';
import { Formik } from 'formik';
import { Tabs } from 'antd';
import { Form } from 'formik-antd';
import { AppstoreAddOutlined, CalendarOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import AdminProjects from './admin_projects/admin_projects';
import AdminCalendar from './admin_calendar/admin_calendar';
import AdminInternet from './admin_internet/admin_internet';
import AdminCoordinators from './admin_coordinators/admin_coordinators';
import projectSchema from './schema';
import ValuesDTO from './admin_values.dto';
import CreateProjectDTO from './create_project.dto';
import { Project } from './models';
import './admin_forms.less';

const { TabPane } = Tabs;

const AdminForms: FC = () => {
    const onSubmit = (values: Project) => {
        const finishedValues = new CreateProjectDTO(values);
        console.log(finishedValues)
    }
    return (
        <div className='admin__forms'>
            <Formik initialValues={new ValuesDTO()}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={projectSchema}
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
                )
                }
            </Formik>
        </div >
    );
}

export default AdminForms;