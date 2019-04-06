import React from 'react';

const Loading = () =>
    <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'inline-block',
        marginTop: '3px',
        zIndex: 2000
    }}>Loading...</div>;

export default Loading;