import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/authContext';

function ProtectedRoutes({ children }) {
    const { user } = useUserAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    return  <div>{children}</div>;
}

export default ProtectedRoutes;
