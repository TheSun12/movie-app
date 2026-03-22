import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlatform } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28FavoriteOutline, Icon28ListOutline } from '@vkontakte/icons';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const platform = usePlatform();

    const getActiveTab = () => {
        if (location.pathname === '/') return 'home';
        if (location.pathname === '/favorites') return 'favorites';
        if (location.pathname === '/compare') return 'compare';
        return 'home';
    };

    const [activeTab, setActiveTab] = React.useState(getActiveTab());

    React.useEffect(() => {
        setActiveTab(getActiveTab());
    }, [location]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === 'home') navigate('/');
        if (tab === 'favorites') navigate('/favorites');
        if (tab === 'compare') navigate('/compare');
    };

    const tabs = [
        { id: 'home', label: 'Главная', icon: Icon28HomeOutline },
        { id: 'favorites', label: 'Избранное', icon: Icon28FavoriteOutline },
        { id: 'compare', label: 'Сравнение', icon: Icon28ListOutline },
    ];

    const styles = {
        view: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        },
        panel: {
            backgroundColor: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column' as const,
        },
        header: {
            backgroundColor: '#0077FF',
            color: '#fff',
            padding: '14px 16px',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center' as const,
            position: 'sticky' as const,
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        content: {
            flex: 1,
            paddingBottom: '65px',
        },
        tabbar: {
            position: 'fixed' as const,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '8px 0 12px',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
            borderTop: '1px solid #e0e0e0',
            zIndex: 100,
        },
        tabItem: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '4px 0',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
        },
        tabIcon: {
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
        },
        tabText: {
            fontSize: '11px',
            fontWeight: 500,
        },
    };

    return (
        <div style={styles.view}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    MovieApp
                </div>
                <div style={styles.content}>
                    {children}
                </div>
                <div style={styles.tabbar}>
                    {tabs.map(tab => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id}
                                style={{
                                    ...styles.tabItem,
                                    color: isActive ? '#0077FF' : '#999'
                                }}
                                onClick={() => handleTabChange(tab.id)}>
                                <div style={styles.tabIcon}>
                                    <IconComponent width={24} height={24} fill={isActive ? '#0077FF' : '#999'}/>
                                </div>
                                <span style={styles.tabText}>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};