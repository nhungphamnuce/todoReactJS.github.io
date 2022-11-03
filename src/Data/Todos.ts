import { ITodo } from "../models/ITodo";

const createData = (todo: ITodo): ITodo => todo;

export const todos = [
    createData({
        name: 'learning mac',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
    createData({
        name: 'learning c++',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Fail',
    }),
    createData({
        name: 'learning opp',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
    createData({
        name: 'learning 1',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Doing',
    }),
    createData({
        name: 'learning 2',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Fail',
    }),
    createData({
        name: 'learning 3',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
    createData({
        name: 'learning 4',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
    createData({
        name: 'learning 5',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Doing',
    }),
    createData({
        name: 'learning 6',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Doing',
    }),
    createData({
        name: 'learning 7',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
    createData({
        name: 'learning 8',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Fail',
    }),
    createData({
        name: 'learning 9',
        start_date: new Date('11/02/2002'),
        end_date: new Date('11/02/2002'),
        status: 'Done',
    }),
];
