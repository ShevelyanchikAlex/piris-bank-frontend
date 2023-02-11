import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";

class UserService {
    static async getAllUsers(page = 0, size = 10) {
        return await axios.get(`${API_URL}`,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async updateUser(user) {
        return await axios.patch(`${API_URL}`, user);
    }

    static async getUserById(id) {
        return await axios.get(`${API_URL}/${id}`, {}
        );
    };

    static async getCountOfUsers() {
        return await axios.get(`${API_URL}/count`, {}
        );
    };

    static async createUser(user) {
        return await axios.post(`${API_URL}`, user);
    };

    static async deleteUser(id) {
        return await axios.delete(`${API_URL}/${id}`);
    };
}

export default UserService;