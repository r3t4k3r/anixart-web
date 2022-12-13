import { FULL_URL } from "../../../config";

async function watching(param = 0) {
    const response = await fetch(`${FULL_URL}/discover/watching/${param}`);
    return await response.json();
}

export { watching }