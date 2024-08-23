import axios from "axios";

export async function getProduct() {
    try {
        const response = await axios.get(`http://localhost:3000/products`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function getProductsBySection(section: string) {
    try {
        const response = await axios.get(`http://localhost:3000/products/filter/${section}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product by section:', error);
        throw error;
    }
}

export async function getProductByCodeDetail(code: string) {
    try {
        const response = await axios.get(`http://localhost:3000/products/${code}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product by section:', error);
        throw error;
    }
}

export async function getProductName(name: string) {
    try {
        const response = await axios.get(`http://localhost:3000/products/search?name=${name}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product by section:', error);
        throw error;
    }
}

export async function getProductMarca(marca: string) {
    try {
        const response = await axios.get(`http://localhost:3000/products/search?compatibility=${marca}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching product by section:', error);
        throw error;
    }
}