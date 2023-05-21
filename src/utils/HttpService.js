import axios from 'axios';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { msalInstance } from '..';
import { backend_url } from '../authConfig';
// Assuming you have an MSAL instance configured

const HttpService = () => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const backendOrigin = backend_url

    const getAuthHeaders = async () => {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"]
            });
            const authToken = tokenResponse.idToken;
            return {
                Authorization: `Bearer ${authToken}`
            };
        }
        else {
            return {
                Authorization: `Bearer`
            }
        }
    };

    const handleRequest = async (config) => {
        setLoading(true);
        try {
            const authHeaders = await getAuthHeaders();
            config.headers = authHeaders
            const response = await axios(config);
            setLoading(false);
            if (config.method !== 'get') {
                enqueueSnackbar(`Saved Successfully`, { variant: 'success' })
            }
            return response.data;
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(error?.response?.data || 'Something went wrong', { variant: 'error' });
            throw error;
        }
    };

    const get = async (url, params = {}) => {
        const config = {
            method: 'get',
            url: backendOrigin + url,
            params
        };
        return handleRequest(config);
    };

    const post = async (url, data = {}) => {
        const config = {
            method: 'post',
            url: backendOrigin + url,
            data
        };
        return handleRequest(config);
    };

    const put = async (url, data = {}) => {
        const config = {
            method: 'put',
            url,
            data
        };
        return handleRequest(config);
    };

    return {
        loading,
        get,
        post,
        put
    };
};

export default HttpService;
