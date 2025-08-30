import { useState } from 'react';
import './App.css';

interface AddToDoFormFields extends HTMLFormControlsCollection {
    postToDo: HTMLInputElement;
};

interface AddToDoFormElements extends HTMLFormElement {
    readonly elements: AddToDoFormFields;
};

type ToDo = {
    id: number;
    content: string;
    done: boolean;
};

function App() {
    const [arrToDo, setArrToDo] = useState<ToDo[]>([]);
    
    function handleSubmit(e: React.FormEvent<AddToDoFormElements>): void {
        e.preventDefault();
        
        const { elements } = e.currentTarget;
        const postToDo = elements.postToDo.value;
        setArrToDo(prev => [...prev, 
            { id: arrToDo.length + 1, content: postToDo, done: false}
        ]);
        console.log(arrToDo);
        
        e.currentTarget.reset();
    };

    function handleChooseToDo(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
        e.currentTarget.classList.toggle('choose-todo');
        const currentLi = e.currentTarget.dataset.id;
        
        if(currentLi) {
            const newArrToDo: ToDo[] = arrToDo.map(todo => {
                if( todo.id === +currentLi) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            });
            setArrToDo(newArrToDo);
        }
    };

    function handleChooseTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const currenBtn = e.currentTarget.dataset.btnchoosetodo;
        console.log(currenBtn);
        
    };

    return (
        <section>
            <h1>TODOS</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" id='postToDo' defaultValue='' />

                <button type='submit'>submit</button>
            </form>

            <ul>
                {arrToDo.map(toDo => <li data-id={toDo.id} key={toDo.id} onClick={handleChooseToDo}>{toDo.content}</li>)}
            </ul>

            <div>
                <p>{arrToDo.length} items</p>
                <button data-btnchoosetodo='all' onClick={handleChooseTodo} className='active-btn-todos'>all</button>
                <button data-btnchoosetodo='active' onClick={handleChooseTodo}>active</button>
                <button data-btnchoosetodo='completed' onClick={handleChooseTodo}>completed</button>
                <button data-btnchoosetodo='clearCompleted' onClick={handleChooseTodo}>clear completed</button>
            </div>
        </section>
    )
};

export default App
