import { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function LoginCheck({ element, path }) {
    const storedToken = window.localStorage.getItem('loginAppUser');
    return storedToken ? (
        element
    ) : (
        <Navigate to={path} replace />
    );
}
