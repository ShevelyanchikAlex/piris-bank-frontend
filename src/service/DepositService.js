import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/deposits";

class DepositService {
    static async getAllDeposits(page = 0, size = 10) {
        return await axios.get(`${API_URL}`,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async getDepositById(id) {
        return await axios.get(`${API_URL}/${id}`, {}
        );
    };

    static async getDepositsCount() {
        return await axios.get(`${API_URL}/count`, {}
        );
    };

    static async createDeposit(deposit) {
        return await axios.post(`${API_URL}`, deposit);
    };

    static async closeDeposit(id) {
        return await axios.put(`${API_URL}/close-deposit/${id}`, {});
    }

    static async closeDay(monthAmount) {
        return await axios.post(`${API_URL}/close-day/${monthAmount}`, {});
    };
}

export default DepositService;