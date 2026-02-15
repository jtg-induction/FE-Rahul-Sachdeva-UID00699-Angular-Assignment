import { ApiPaginatedData } from './api-paginated-data.model';
import { ApiResponse } from './api-response.model';

export type ApiPaginatedResponse<T> = ApiResponse<ApiPaginatedData<T>>;
