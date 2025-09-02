
const initialState = ''


//state le stores the current filter text.
//SET_FILTER -> updates the filter string in Redux.
// setFilter(filter)  -> action creator for updating filter

const filterReducer = (state = initialState, action) => { 
    switch(action.type) { 
        case 'SET_FILTER':
            return action.payload
        default: 
            return state
    }
}


//action creator

export const setFilter = (filter) => ({ 
    type: 'SET_FILTER',
    payload: filter
})

export default filterReducer