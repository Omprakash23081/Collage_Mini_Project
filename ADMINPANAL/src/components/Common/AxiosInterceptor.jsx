import { useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { AppContext } from '../../AppContext';

const AxiosInterceptor = () => {
    const { setLoading } = useContext(AppContext);
    const requestCount = useRef(0);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const reqInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (debounceTimeout.current) {
                    clearTimeout(debounceTimeout.current);
                    debounceTimeout.current = null;
                }
                requestCount.current++;
                setLoading(true);
                return config;
            },
            (error) => {
                requestCount.current--;
                if (requestCount.current <= 0) {
                    requestCount.current = 0;
                    debounceTimeout.current = setTimeout(() => {
                        setLoading(false);
                    }, 100);
                }
                return Promise.reject(error);
            }
        );

        const resInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                requestCount.current--;
                if (requestCount.current <= 0) {
                    requestCount.current = 0;
                    debounceTimeout.current = setTimeout(() => {
                        setLoading(false);
                    }, 100);
                }
                return response;
            },
            (error) => {
                requestCount.current--;
                if (requestCount.current <= 0) {
                    requestCount.current = 0;
                    debounceTimeout.current = setTimeout(() => {
                        setLoading(false);
                    }, 100);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(resInterceptor);
        };
    }, [setLoading]);

    return null;
};

export default AxiosInterceptor;
