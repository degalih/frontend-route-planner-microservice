import {apiClient} from "@/services/api-client";

export const financeService = {
    async importRecord(data: any) {
        return apiClient.post<void>('api/expenses/import', data)
    }
}