import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import { TODOS_URL } from '../../constants/Url';
import { todos } from '../../Data/Todos';
import { ITodo } from '../../models/ITodo';
import { ListResponse } from '../../models/Response';
import { axiosTodo } from './../../aixos/todoAxios';

export interface ITodoState {
    isLoading?: boolean;
    error?: string;
    todos: ITodo[];
}

const initialState: ITodoState = {
    todos: [],
};

const getTodoAsync = async (): Promise<ListResponse> => {
    try {
        const { data } = await axiosTodo.get<ListResponse>('');
        return data;
    } catch (error: any) {
        return Promise.reject({ message: error.message || 'fect data todo error'});
    }
};

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (a: number | undefined, thunkApi) => {
        try {
            const listResponse: ListResponse = await getTodoAsync();
            thunkApi.dispatch(getTodoSuccess(listResponse.data));
        } catch (err: any) {
            thunkApi.dispatch(getTodoSuccess(todos));
        }
    },
);
export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (todo: ITodo, thunkApi) => {
        try {
            await axiosTodo.post(TODOS_URL, todo);
        } catch (err: any) {
            throw new Error("no api create");
        }
    },
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo: ITodo, thunkApi) => {
        try {
            await axiosTodo.put(`${TODOS_URL}/${todo.id}`, todo);
        } catch (err: any) {
            throw new Error("no api update");
        }
    },
);
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, thunkApi) => {
        try {
            await axiosTodo.delete(TODOS_URL + '/' + id);
        } catch (err: any) {
            throw new Error("no api delete");
        }
    },
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodoRequest: (state) => {
            state.isLoading = true;
        },
        getTodoSuccess: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
        },
        AddTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.unshift(action.payload);
        },
        editTodo: (
            state,
            action: PayloadAction<{ lastTodo: ITodo; newTodo: ITodo }>,
        ) => {
            const index = state.todos.findIndex(
                (t) => t.name === action.payload.lastTodo.name,
            );
            if (index !== -1) state.todos[index] = action.payload.newTodo;
        },
        removeTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = state.todos.filter(
                (t) => t.name !== action.payload.name,
            );
        },

        getTodoError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchTodos.pending, (state, action) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(
    //         fetchTodos.fulfilled,
    //         (state, action: PayloadAction<ITodo[]>) => {
    //             console.log(action);

    //             state.todos = action.payload;
    //         },
    //     );
    //     builder.addCase(fetchTodos.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //     });
    // },
});

export const {
    getTodoError,
    getTodoRequest,
    getTodoSuccess,
    AddTodo,
    removeTodo,
    editTodo,
} = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer;
