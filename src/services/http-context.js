export const http_context = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (response.status === 401) {
            // Redirect to signin page
            console.log('Not authorized!')
            window.location.href = '/';
            return null;
        }
        if (!response.ok) {
            throw new Error('HTTP Context: Throwing error');
        }
        return response;
    } catch (error) {
        console.error('HTTP Context Error Thrown: ', error);
        throw error;
    }
};
