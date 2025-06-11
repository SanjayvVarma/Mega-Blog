import logoutUser from '../utils/logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    return (params) => logoutUser({ dispatch, navigate, token, ...params });
};

export default useLogout;