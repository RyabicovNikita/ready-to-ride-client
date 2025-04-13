export const mapRequestBody = (data) => {
    if(!data) return undefined
    if(data instanceof Object) return {body: Object.entries(data).reduce((acc, [key, value]) => ({...acc, [key]: value instanceof File ? value : JSON.stringify(value)}))};

}