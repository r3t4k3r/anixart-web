import { FULL_URL } from '../../../config'

async function interesting() {
    const response = await fetch(`${FULL_URL}/discover/interesting`);
    return await response.json();
}

export { interesting }