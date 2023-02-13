// library
import Axios, {
    AxiosInstance,
    AxiosRequestConfig,
    CancelTokenSource,
  } from "axios";
  // custom
  import { store } from "../redux/store";
  import axiosRetry from "axios-retry";
  import { toast } from "react-toastify";
  import { getRefreshToken } from "redux/slices/auth";
  
  
  const abortController = new AbortController()
  
  export const cancelApi = () =>{
      abortController.abort()
  }
  
  
  const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
  };
  
  export abstract class BaseService {
    constructor(alternativeBaseUrl?: string) {
      this.axiosRequestConfig = {
        baseURL: alternativeBaseUrl
          ? alternativeBaseUrl
          : (process.env.REACT_APP_BASE_URL as string),
      };
      this.axiosInstance = Axios.create(this.axiosRequestConfig);
      axiosRetry(this.axiosInstance, {
        retries: 2,
        retryDelay,
        retryCondition: axiosRetry.isRetryableError,
      });
    }
  
    baseUrl: string = "";
  
    private static token: string | null = null;
    protected axiosInstance: AxiosInstance;
    protected axiosRequestConfigDefault: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      headers: { "Content-Type": "application/json" },
    };
  
    private _axiosRequestConfig: AxiosRequestConfig =
      this.axiosRequestConfigDefault;
  
    get axiosRequestConfig() {
      return this._axiosRequestConfig;
    }
  
    set axiosRequestConfig(config: any) {
      if (config.headers) {
        config.headers = {
          ...this._axiosRequestConfig.headers,
          ...config.headers,
        };
      }
      this._axiosRequestConfig = { ...this._axiosRequestConfig, ...config };
    }
  
    get axiosInstanceWithoutToken(): AxiosInstance {
      let axiosInstanceWithoutToken: AxiosInstance = this.axiosInstance;
  
      axiosInstanceWithoutToken.interceptors.response.use(
        function (response: any) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        function (error: any) {
          toast.error(error.message);
          return Promise.reject(error);
        }
      );
  
      return axiosInstanceWithoutToken;
    }
  
    get axiosInstanceWithToken(): AxiosInstance {
      let axiosInstanceWithToken: AxiosInstance;
  
      axiosInstanceWithToken = Axios.create();
  
      axiosInstanceWithToken.interceptors.request.use((config) => {
        const {
          token: { access_token },
        } = store.getState().auth;
        config.baseURL = process.env.REACT_APP_BASE_URL;
        config.headers = {
          "Content-Type": "application/json",
          "X-VERSION": process.env.REACT_APP_VERSION,
          Authorization: "Bearer " + access_token,
        };
        return config;
      });
  
      axiosInstanceWithToken.interceptors.response.use(
        function (response: any) {
          return response;
        },
        async function (error: any) {
          const originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = store.getState().auth.token.refresh_token; /// fetching Refresh
            const axiosForRefresh = Axios.create({
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic d2ViOg==",
              },
            });
            const params = new URLSearchParams();
            params.append("grant_type", "refresh_token");
            params.append("refresh_token", refreshToken ?? "");
  
            const res = await axiosForRefresh.post(
              `
            ${process.env.REACT_APP_AUTH_URL}/realms/smartbss/protocol/openid-connect/token`,
              params
            );
  
            store.dispatch(getRefreshToken(res.data)); //// dispatch to redux
            axiosInstanceWithToken.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.access_token;
            console.log(res.data.access_token, "tokenRefresh");
            return axiosInstanceWithToken(originalRequest);
          } else {
            toast.error(error.message);
          }
          return Promise.reject(error);
        }
      );
      return axiosInstanceWithToken;
    }
  
    get axiosInstanceWithTokenForLogin(): AxiosInstance {
      let token = BaseService.token;
      let axiosInstanceWithToken: AxiosInstance;
      token = "Basic d2ViOg==";
      if (token) {
        this.axiosRequestConfig = {
          headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        axiosInstanceWithToken = Axios.create({
          ...this.axiosRequestConfig,
        });
      } else {
        axiosInstanceWithToken = this.axiosInstance;
      }
  
      axiosInstanceWithToken.interceptors.response.use(
        function (response: any) {
          return response;
        },
        async function (error: any) {
          toast.error(error.message);
          return Promise.reject(error);
        }
      );
  
      return axiosInstanceWithToken;
    }
  
    private static setToken(token: string) {
      BaseService.token = token;
    }
  
    static removeToken() {
      BaseService.token = null;
    }
  
    static msgRequestCanceled = "request-canceled";
    static cancelTokenSource(): CancelTokenSource {
      return Axios.CancelToken.source();
    }
  }
  