import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collectionService } from 'apis/collection/services'

export const fetchCollection = createAsyncThunk("collection/fetchCollection", collectionService)

export const collectionSlice = createSlice(({
    name: 'collection',
    initialState: {
        list: [],
        loading: true,
        error: false,
        fetch: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCollection.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchCollection.fulfilled, (state, action) => {
                if (action.payload.data.length && action.payload.statusCode === 200) {
                    state.list = action.payload.data
                    state.loading = false
                    state.fetch = true
                }
            })
            .addCase(fetchCollection.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
    }
}))

export default collectionSlice