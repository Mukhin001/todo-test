import { useState } from 'react';
import './App.css';
import Form from './components/form/Form';
import List from './components/list/List';
import Btn from './components/btn/Btn';

export type ToDo = {
    id: number;
    content: string;
    done: boolean;
};

function App() {
    const [arrToDo, setArrToDo] = useState<ToDo[]>([]);
    const [keyShowToDO, setKeyShowToDO] = useState<string>('all');
    const [toDoLength, setToDoLength] = useState<number>(0);

    return (
        <section className='wrapper-todo'>
            <h1>todos</h1>
            <div className='wrapper-todo__container'>
                <Form arrToDo={arrToDo} setArrToDo={setArrToDo} setToDoLength={setToDoLength} />
                <List arrToDo={arrToDo} setArrToDo={setArrToDo} keyShowToDO={keyShowToDO} setToDoLength={setToDoLength} />
                <Btn arrToDo={arrToDo} setArrToDo={setArrToDo} setKeyShowToDO={setKeyShowToDO} toDoLength={toDoLength} />
            </div>
        </section>
    )
};

export default App
