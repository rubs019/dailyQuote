export enum httpStatus {
    SUCCESS = 200,
    NO_CONTENTS = 204,
    PARTIAL_CONTENTS = 206,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export const RangeError: number[] = [
    httpStatus.PARTIAL_CONTENTS,
    httpStatus.INTERNAL_SERVER_ERROR,
    httpStatus.NO_CONTENTS,
    httpStatus.NOT_FOUND
]

export enum httpMsg {
    PARTIAL_CONTENTS = 'partials_content',
    NO_CONTENTS = 'contents_not_found',
    INTERNAL_SERVER_ERROR = 'internal_error',
    PAGE_NOT_FOUND = 'page_not_found'
}

export enum customHttpMsg {
    CONTENTS_NOT_FOUND = 'Content wasn"t found'
}

export enum dataEnvironment {
    cache = 'cache',
    ddb = 'ddb'
}
