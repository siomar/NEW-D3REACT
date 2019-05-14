import axios from 'axios';

const api = axios.create({baseURL: "http://dev-algartech.sensedia.com/portalanalytics/v1/analytics/base"});

export default api;