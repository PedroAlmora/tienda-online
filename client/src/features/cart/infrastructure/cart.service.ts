import axios from "axios";

function getCodesFromLocalStorage(): string[] {
    const storedCart = localStorage.getItem('productsCart');
    if (storedCart) {
        try {
            const parsedCart = JSON.parse(storedCart);
            return parsedCart.map((item: { code: string }) => item.code);
        } catch (error) {
            console.error('Error parsing productsCart from localStorage:', error);
            return [];
        }
    }
    return [];
}

export async function getProductCart() {
    const codes = getCodesFromLocalStorage();

    if (codes.length === 0) {
        console.warn('No codes found in localStorage');
        return [];
    }

    try {
        const response = await axios.get(`http://localhost:3000/products/cartProduct`, {
            withCredentials: true,
            params: {
                codes: codes
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product by codes:', error);
        throw error;
    }
}
