import React from 'react';
import { AppstoreAddOutlined, CalendarOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import './admin_forms.less';
import AdminProjects from './admin_projects/admin_projects';
import { Tabs } from 'antd';
import AdminCalendar from './admin_calendar/admin_calendar';
import AdminInternet from './admin_internet/admin_internet';
import AdminCoordinators from './admin_coordinators/admin_coordinators';

const { TabPane } = Tabs;

const AdminForms: React.FC = () => {
    return (
        <div className='admin__forms'>
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
        </div >
    );
}

export default AdminForms;