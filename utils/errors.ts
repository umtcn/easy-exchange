/**
 * Custom Error Classes
 * Typed error handling for API requests
 */

export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public errorType?: string
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export class NetworkError extends Error {
    constructor(message: string = 'Network request failed') {
        super(message);
        this.name = 'NetworkError';
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
