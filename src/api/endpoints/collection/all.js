import { FULL_URL } from "../../../config";

async function all(param = -1, previous_page = 0, where = 2, sort = 4) {
    const response = await fetch(
        `${FULL_URL}/collection/all/${param}?previous_page=${previous_page}&where=${where}&sort=${sort}`
    );
    return await response.json();
}

export { all }