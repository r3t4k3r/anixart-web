import { FULL_URL } from '../../config'

async function release(releaseId, extendedMode=true) {
    const response = await fetch(`${FULL_URL}/release/${releaseId}?extended_mode=${extendedMode}`);
    return await response.json();
}

export { release }