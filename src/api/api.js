import { interesting } from "./discover/interesting";
import { watching } from "./discover/watching";
import { all } from './collection/all'
const api = {
    discover: {
        'interesting': interesting,
        'watching': watching
    },
    collection: {
        'all': all
    }
}
export { api }