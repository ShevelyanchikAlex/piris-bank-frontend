import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/accounts";

class AccountService {
    static async getBankFundAccount() {
        return await axios.get(`${API_URL}/bank-fund`, {}
        );
    };
}

export default AccountService;