export function resolve(result): any {
    return result.data.data
}

export function reject(error: any): string {
    if (error.response && error.response.data) {
        if (error.response.data.data.details) {
            return error.response.data.data.details[0].message
        }
        if (error.response.data.data.message) {
            return error.response.data.data.message
        }
    }
    return error || 'Unknown error.'
}
