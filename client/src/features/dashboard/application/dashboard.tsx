import { Layout } from 'antd';
import DashboardHeader from './dashboard-header';
import { Outlet } from 'react-router-dom';
import DashboardFooter from './dashboard-footer';
import { useEffect, useRef } from 'react';

const Dashboard: React.FC = () => {
    const footerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const footerElement = document.getElementById('footer') as HTMLDivElement | null;
        if (footerElement) {
            footerRef.current = footerElement;
        }
    }, []);
    
    return(
        <Layout style={{ overflow: 'hidden' }}>
            <DashboardHeader footerRef={footerRef} />
            <Outlet/>
            <DashboardFooter />
        </Layout>
    )
}

export default Dashboard;