import { API_BASE_URL, DEFAULT_HEADERS } from './config';
import { ApiResponse } from '@/types';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
    requireAuth?: boolean;
}

export class ApiClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    private async getHeaders(
        customHeaders?: Record<string, string>,
        requireAuth: boolean = false
    ) {
        const headers: Record<string, string> = {
            ...DEFAULT_HEADERS,
            ...customHeaders
        };

        if (requireAuth) {
            throw new Error('Authentication token diperlukan');
            // TO DO: Fokus MVP dulu belum menggunakan AUTH Bearer
            // const session = await getSession();
            // if (!session?.user.token.access_token) {
            // }
            // headers['Authorization'] = `Bearer ${session?.user.token.access_token}`;
        }

        return headers;
    }

    async fetchData<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> {
        const {
            method = 'GET',
            body,
            headers,
            cache = 'no-store',
            next,
            requireAuth = true
        } = options;

        const url = `${this.baseUrl}${endpoint}`;
        const computedHeaders = await this.getHeaders(headers, requireAuth);

        const fetchOptions: RequestInit = {
            method,
            headers: computedHeaders,
            cache,
            next,
            ...(body && { body: JSON.stringify(body) })
        };

        try {
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const errorData: ApiResponse<any> = await response.json();
                return Promise.reject(
                    new Error(errorData.message || 'Fetch data gagal!')
                );
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    get<T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}) {
        return this.fetchData<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(
        endpoint: string,
        body: any,
        options: Omit<FetchOptions, 'method' | 'body'> = {}
    ) {
        return this.fetchData<T>(endpoint, { ...options, method: 'POST', body });
    }

    put<T>(
        endpoint: string,
        body: any,
        options: Omit<FetchOptions, 'method' | 'body'> = {}
    ) {
        return this.fetchData<T>(endpoint, { ...options, method: 'PUT', body });
    }

    delete<T>(
        endpoint: string,
        body: any,
        options: Omit<FetchOptions, 'method'> = {}
    ) {
        return this.fetchData<T>(endpoint, { ...options, method: 'DELETE', body });
    }

    async downloadFile(
        endpoint: string,
        body: any,
        options: Omit<FetchOptions, 'method' | 'body'> = {}
    ): Promise<Blob> {
        const url = `${this.baseUrl}${endpoint}`;
        const computedHeaders = await this.getHeaders(
            options.headers,
            options.requireAuth
        );

        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: computedHeaders,
            body: JSON.stringify(body),
            cache: options.cache || 'no-store',
            next: options.next
        };

        try {
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    return Promise.reject(
                        new Error(
                            errorData.message || 'Terjadi kesalahan saat mengunduh file!'
                        )
                    );
                } catch {
                    return Promise.reject(
                        new Error(`Download gagal dengan status: ${response.status}`)
                    );
                }
            }

            return await response.blob();
        } catch (error) {
            throw error;
        }
    }
}

export const apiClient = new ApiClient();