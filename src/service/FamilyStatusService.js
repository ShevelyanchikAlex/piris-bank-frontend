import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/family-statuses";

class FamilyStatusService {
    static async getAllFamilyStatuses(page = 1, size = 10) {
        return await axios.get(API_URL,
            {
                params: {
                    pageIndex: page,
                    size: size,
                }
            }
        );
    };
}

export default FamilyStatusService;