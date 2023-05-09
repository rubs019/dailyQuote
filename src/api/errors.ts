export enum errorStatus {
    PARTIAL_CONTENTS = 206,
    NO_CONTENTS = 204,
    INTERNAL_SERVER_ERROR = 500,
    NOT_FOUND = 404
}

export enum errorMsg {
    PARTIAL_CONTENTS = 'partials_content',
    NO_CONTENTS = 'contents_not_found',
    INTERNAL_SERVER_ERROR = 'internal_error',
    NOT_FOUND = 'not_found'
}

export enum customErrorMsg {
    CONTENTS_NOT_FOUND = 'Contents wasn\'t found'
}
