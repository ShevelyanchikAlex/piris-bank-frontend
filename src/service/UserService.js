import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";

class UserService {
    static async getAllUsers(page = 1, size = 10) {
        return await axios.get(`${API_URL}`,
            {
                params: {
                    pageIndex: page,
                    size: size,
                }
            }
        );
    };

    static async updateUser(requestUser) {
        return await axios.patch(`${API_URL}`, requestUser);
    }

    static async getUserById(id) {
        return await axios.get(`${API_URL}/${id}`, {}
        );
    };

    static async getCount() {
        return await axios.get(`${API_URL}/count`, {}
        );
    };

    static async createUser(requestUser) {
        return await axios.post(`${API_URL}`, requestUser);
    };

    static async deleteUser(id) {
        return await axios.delete(`${API_URL}/${id}`);
    };
}

export default UserService;