const CORS_BYPASS_SERVER = `http://46.175.148.75:5000`
const ANIXART_API_URL = `https://api.anixart.tv`
const FULL_URL = `${CORS_BYPASS_SERVER}/${ANIXART_API_URL}`
const USER_AGENT = 'AnixartApp'

const RCODE = {
    LOADING: -1,
    OK: 0,
    SOMETHING: 1,
}

export { CORS_BYPASS_SERVER, ANIXART_API_URL, USER_AGENT, FULL_URL, RCODE };