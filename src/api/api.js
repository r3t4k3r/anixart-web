import { interesting } from "./endpoints/discover/interesting";
import { watching } from "./endpoints/discover/watching";
import { all } from './endpoints/collection/all'
import { release } from "./endpoints/release";
const api = {
    discover: {
        'interesting': interesting,
        'watching': watching
    },
    collection: {
        'all': all
    },
    release: {
        'release': release
    }
}
export { api }