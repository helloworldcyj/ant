import axios from 'axios';

const getUid = (method, path, payload) => `${method}-${path}-${JSON.stringify(payload)}`;

class Xhr {
    constructor() {
        this.cacheMap = {};
        this.retryMap = {};
        this.maxRetry = 5;
    }

    setMaxRetry(maxRetry) {
        this.maxRetry = maxRetry;
    }

    get(path, payload) {
        return this.handleRequest('GET', path, payload);
    }

    // post(path, payload) {
    //     return this.handleRequest('POST', path, payload);
    // }
    // ...etc
    handleRequest(method, path, payload) {
        const uid = getUid(method, path, payload);
        if (this.cacheMap[uid]) {
            return this.cacheMap[uid];
        }
        let request;
        switch (method) {
            case 'GET':
                request = axios.get(path, payload).then(this.handleSuccess(uid), this.handleError(uid, method, path, payload));
                break;
            // case 'POST':
            // ...etc
        }
        this.cacheMap[uid] = request;
        return request;
    }

    handleSuccess(uid) {
        return (data) => {
            if (this.retryMap[uid]) {
                delete this.retryMap[uid];
            }
            delete this.cacheMap[uid];
            return data;
        }
    }

    handleError(uid, method, path, payload) {
        if (this.retryMap[uid]) {
            if (this.retryMap[uid] === this.maxRetry) {
                return e => {
                    // 如果需要 这里可以上报错误;        
                    return e;
                };
            }
            this.retryMap[uid] += 1;
        } else {
            this.retryMap[uid] = 1;
        }
        return (error) => {
            // 如果需要 这里可以上报错误;
            switch (method) {
                case 'GET':
                    return this.get(path, payload);
                // case 'POST'
                // ...etc
            }
        }
    }
}


export default new Xhr();
