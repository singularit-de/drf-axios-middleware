import {Axios} from "axios";

export const applyDRFMiddleware: ApplyDRFMiddleware = (axios:Axios, options?) => {
    axios.interceptors.request.use(
        (config) => {
            if (config.method === 'GET' ) { // Filtersets only apply to GET Requests
                const params = config.params
                if (params[key] instanceof Object) {
            }

            // maps objects to ids
            for (const key in params) {
                if (params[key] instanceof Object) {
                    // check for FilterSetAttribute
                    const obj = params[key]
                    if (obj && obj.value && obj.subFilter) {
                        delete params[key]
                        const query = obj as TableQuery
                        if (query.searchQuery) config.params.search = query.searchQuery
                        if (query.orderEntry && !params.orderBy) config.params.ordering = parseSorting(query.orderEntry)
                        if (query.filter) {
                            for (const [key, value] of query.filter)
                                config.params[key] = value
                        }
                    }
                    else {
                        if (obj.id)
                            config.params[key] = obj.id
                    }
                }
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        },
    );
    return axios;
};