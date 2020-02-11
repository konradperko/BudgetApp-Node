const KEYS = {
    ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
    ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',
    ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers'
}

const METHODS = {
    DELETE: 'DELETE',
    GET: 'GET',
    OPTIONS: 'OPTIONS',
    POST: 'POST',
    PUT: 'PUT'
}

const HEADERS = [
    'Authorization',
    'Content-Type',
    'Content-Length',
    'X-Requested-With'
]

const HEADERS_SETTINGS = new Map([
    [KEYS.ACCESS_CONTROL_ALLOW_ORIGIN, '*'],
    [KEYS.ACCESS_CONTROL_ALLOW_METHODS, Object.keys(METHODS).join(',')],
    [KEYS.ACCESS_CONTROL_ALLOW_HEADERS, HEADERS.join(',')]
])

const headersSettings = {
    KEYS,
    METHODS,
    HEADERS,
    HEADERS_SETTINGS
}

module.exports = headersSettings