import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 

const patientAPI = createApi({
    reducerPath: 'patientAPI', 
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api/' : '/api/'),
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token; // Tokeni Redux state'ten al
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Patient', 'Stock', 'Order', 'Worker', 'Leave', "PatientFile"],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: 'token/',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: 'token/',
                method: 'POST',
                body: { refresh: refreshToken },
            }),
        }),

        // --------- PATİENTS -------------

        getPatients: builder.query({
            query: ({ page = 1 , filters, orderValue }) => ({
                url: 'patientcard/',
                params: {
                    page,
                    default_filter: filters,
                    ordering: orderValue
                },
            }),
            providesTags: () => {
                return [{ type: 'Patient', id: 'LIST' }]
                // return result.results.map(({ id }) => ({ type: 'Patient', id }))
            },
        }),
        getPatientId: builder.query({
             query: (selectedPatientId) => `patientcard/${selectedPatientId}`,
             providesTags: (result, error, id) => [{ type: 'Patient', id }],
        }),
        createPatient: builder.mutation({
            query: ({newPatient}) => ({
                url: 'patientcard/',
                method: 'POST',
                body: newPatient
            }),
            invalidatesTags: [{ type: 'Patient', id: 'LIST' }],
        }),
        getPatientFile: builder.query({
            query: ({ page = 1 }) => `patient-files/?page=${page}`,
            providesTags: (result) => {
                if (!result || !result.data) {
                  return [{ type: 'PatientFile', id: 'LIST' }];
                }
                return result.data.map(({ id }) => ({ type: 'PatientFile', id }));
              },
        }),
        getFileSize: builder.query({
            query: (fileUrl) => ({
              url: fileUrl,
              method: 'HEAD',
            }),
            transformResponse: (response, meta) => {
              const size = meta.response.headers.get("content-length"); // Byte cinsinden boyut
              return size ? (size / 1024).toFixed(1) : null; // KB'ye çevir
            },
        }),
        createPatientFile: builder.mutation({
            query: (newFile) => ({
                url: 'patient-files/',
                method: 'POST',
                body: newFile
            }),
            invalidatesTags: [{ type: 'PatientFile', id: 'LIST' }],
        }),
        updatePatient: builder.mutation({
            query: ({ newPatient, patientID }) => ({
                url: `patientcard/${patientID}/`,
                method: 'PATCH',
                body: newPatient
            }),
            invalidatesTags: (result) => {
                return [
                    { type: 'Patient', id: 'LIST' },
                    { type: 'Patient', id: result.id }
                ];
            }
        }),
        deletePatient: builder.mutation({
            query: (patientId) => ({
                url: `patientcard/${patientId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => {
                return [
                    { type: 'Patient', id: 'LIST' },
                    { type: 'Patient', id: result.id }
                ];
            }
        }),
        createPtientPhoto: builder.mutation({
            query: (newPhoto)=> ({
                url: "patient-photo/",
                method: "POST",
                body: newPhoto
            })
        }),
        createPatientPoll: builder.mutation({
            query: ({newPoll, patientID}) => ({
                url: "poll/",
                method: "POST",
                body: newPoll
            }),
            providesTags: ({patientID}) => [{ type: 'Patient', id: patientID }],
        }),

        // --------- Doctor Note -------------

        createDoctorNote: builder.mutation({
            query: (newNote)=> ({
                url: "patientnote/",
                method: "POST",
                body: newNote
            })
        }),
        updateDoctorNote: builder.mutation({
            query: ({newNote, noteID})=> ({
                url: `patientnote/${noteID}/`,
                method: "PATCH",
                body: newNote
            }),
            invalidatesTags: ({ patientId }) => {
                return [{ type: 'Patient', id: patientId }]
            },
        }),        
 
        // --------- STOCK ORDER -------------
        
        getStockOrders: builder.query({
            query: ({page = 1, filters, orderValue}) => ({
                url: 'order/',
                params: {
                    page,
                    default_filter: filters,
                    ordering: orderValue
                },
            }),
            providesTags: (result) => {
                if (!result || !result.data) {
                  return [{ type: 'Order', id: 'LIST' }];
                }
                return result.data.map(({ id }) => ({ type: 'Order', id }));
              },
        }),
        getStockOrdersByID: builder.query({
            query: (ID) =>`order/${ID}/`,
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),
        createStockOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'order/',
                method: 'POST',
                body: newOrder
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        updateStockOrder: builder.mutation({
            query: ({ newOrder, orderID }) => ({
                url: `order/${orderID}/`,
                method: 'PATCH',
                body: newOrder
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        
        // --------- STOCK -------------
        
        getAllStocks: builder.query({
            query: ({ page = 1, stock_warehouse="", type, filters="", orderValue="" } = {}) => {
                const params = new URLSearchParams({ page, default_filter: filters, ordering: orderValue })    
                switch (type) {
                    case "total":
                        return {
                            url: 'stock-total-summary/',
                            params: params.toString()
                        }     
                    case "warehouse":
                        params.append("stock_warehouse", stock_warehouse);
                        return {
                            url: 'stock-warehouse-summary/',
                            params: params.toString()
                        }        
                    case "skt":
                        return {
                            url: 'stock-summary/',
                            params: params.toString()
                        }        
                    default:
                        params.append("stock_warehouse", stock_warehouse);
                        return {
                            url: 'stock/',
                            params: params.toString()
                        }
                }
            }
        }),
        createStock: builder.mutation({
            query: (newStock) => ({
                url: 'stock/',
                method: 'POST',
                body: newStock
            })
        }),
        updateStock: builder.mutation({
            query: ({newStock, stockID}) => ({
                url: `stock/${stockID}/`,
                method: 'PATCH',
                body: newStock
            })
        }),  
        createStockUse: builder.mutation({
            query: ({newStock}) => ({
                url: `used-stock/`,
                method: 'POST',
                body: newStock
            }),
            invalidatesTags: (result, error, id) =>  result ? [{ type: 'Patient', id: result.patient_used }] : [],
        }),   

        // --------- WAREHOUSE -------------

        getWarehouse: builder.query({
            query: () => `warehouse`
        }),

        // --------- KPI -------------

        getAllWorker: builder.query({
            query: ({ page = 1, filters, orderValue }) => ({
                url: 'worker/',
                params: {
                    page,
                    default_filter: filters,
                    ordering: orderValue
                },
            }),
            providesTags: () => [{ type: 'Worker', id: 'LIST' }],
        }),        
        getWorkerById: builder.query({
            query: ( workerID ) => `worker/${workerID}/`,
            providesTags: (result, error, id) => [{ type: 'Worker', id }],
        }),  
        getAllWorkerLeaves: builder.query({
            query: ({ page = 1, filters, orderValue }) => ({
                url: 'leave/',
                params: {
                    page,
                    default_filter: filters,
                    ordering: orderValue
                },
            }),
            providesTags: () => [{ type: 'Leave', id: 'LIST' }],
        }),      
        createWorker: builder.mutation({
            query: (newWorker) => ({
                url: 'worker/',
                method: 'POST',
                body: newWorker
            }),
            invalidatesTags: [{ type: 'Worker', id: 'LIST' }],
        }),
        updateWorker: builder.mutation({
            query: ({newWorker, workerID}) => ({
                url: `worker/${workerID}/`,
                method: 'PATCH',
                body: newWorker
            }),
            invalidatesTags: ({workerID}) => [{ type: 'Worker', id: workerID }],
        }),
        createWorkerFile: builder.mutation({
            query: (files) => ({
                url: `worker-file/`,
                method: 'POST',
                body: files,
            })
        }),
        createWorkerLeaves: builder.mutation({
            query: (newLeave) => ({
                url: "leave/",
                method: "POST",
                body: newLeave
            }),
            invalidatesTags: [{ type: 'Worker', id: 'LIST' }],
        }),
        createWorkerHours: builder.mutation({
            query: (newHours) => ({
                url: "working-hours/",
                method: "POST",
                body: newHours
            }),
            invalidatesTags: [{ type: 'Worker', id: 'LIST' }],
        }),
        createWorkerTask: builder.mutation({
            query: (newTask)=> ({
                url: "task-assignment/",
                method: "POST",
                body: newTask
            }),
            invalidatesTags: (result) => {
                return [
                    { type: 'Worker', id: result.person }
                ];
            }
        }),
        createTaskCheck: builder.mutation({
            query: (newCheck) => ({
                url: "task-check/",
                method: "POST",
                body: newCheck
            }),
            invalidatesTags: (result, error) => {                
                return [{ type: 'Worker', id: result.person }]
            }
        }),

    }),      
    keepUnusedDataFor: 30,
    refetchOnMountOrArgChange: 5
});

export const {  useGetPatientsQuery, 
                useGetPatientIdQuery,
                useCreatePatientMutation,
                useUpdatePatientMutation,
                useDeletePatientMutation,
                useGetStockOrdersQuery,
                useGetStockOrdersByIDQuery,
                useCreateStockOrderMutation,
                useGetAllStocksQuery,
                useCreateStockMutation,
                useCreateWorkerMutation,
                useGetAllWorkerQuery,
                useGetWorkerByIdQuery,
                useCreateWorkerFileMutation,
                useCreateWorkerLeavesMutation,
                useCreateWorkerHoursMutation,
                useCreateWorkerTaskMutation,
                useCreateDoctorNoteMutation,
                useCreatePtientPhotoMutation,
                useGetWarehouseQuery,
                useUpdateStockOrderMutation,
                useCreatePatientFileMutation,
                useGetPatientFileQuery,
                useGetFileSizeQuery,
                useCreateTaskCheckMutation,
                useUpdateStockMutation,
                useGetAllWorkerLeavesQuery,
                useCreateStockUseMutation,
                useLoginMutation,
                useRefreshTokenMutation,
                useUpdateDoctorNoteMutation,
                useUpdateWorkerMutation,
                useCreatePatientPollMutation
                
           } = patientAPI; 
export default patientAPI;
