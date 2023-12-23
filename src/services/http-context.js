export const http_context = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if(response.status === 401){
            
            window.location.href = '/signin';
        }

        return response;
    } catch (error) {
        alert('PROB MISSING COOKIE');
        console.error('HTTP Context Error Thrown: ', error);
        throw error;
    }
};
