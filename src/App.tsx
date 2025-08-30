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

type Btns = {
    name: string;
    classActive: boolean;
};

const arrBtnsInitial: Btns[] = [
    { name: 'all', classActive: true },
    { name: 'active', classActive: false },
    { name: 'completed', classActive: false },
    { name: 'clearCompleted', classActive: false },
];

function App() {
    const [arrToDo, setArrToDo] = useState<ToDo[]>([]);
    const [arrBtns, setArrBtns] = useState<Btns[]>(arrBtnsInitial);
    const [keyShowToDO, setKeyShowToDO] = useState<string>('all');
    
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

    function handleChooseTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const currenBtn = e.currentTarget.dataset.btnchoosetodo;
        
        if(currenBtn) {
            setKeyShowToDO(currenBtn);

            const newArrBtns: Btns[] = arrBtns.map(btn => {
                if(btn.name === currenBtn) {
                    return { ...btn, classActive: true }
                } else {
                    return { ...btn, classActive: false }
                }
            });

            setArrBtns(newArrBtns);
        }
    };

    function filterArrToDo(todo: ToDo, k: string) {
        if(k === 'all') {
            return todo;
        } else if(k === 'active') {
            return todo.done === false;
        } else if(k === 'completed') {
            return todo.done === true;
        } 
    };

    return (
        <section>
            <h1>TODOS</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" id='postToDo' defaultValue='' />

                <button type='submit'>submit</button>
            </form>

            <ul>
                { arrToDo.filter((todo) => filterArrToDo(todo, keyShowToDO)).map(toDo => 
                    (toDo.done) ? 
                        <li className='choose-todo' data-id={toDo.id} key={toDo.id} onClick={handleChooseToDo}>{toDo.content}</li>
                    :
                        <li data-id={toDo.id} key={toDo.id} onClick={handleChooseToDo}>{toDo.content}</li>
                )}
            </ul>

            <div>
                <p>{arrToDo.length} items</p>
              
                {arrBtns.map(btn => 
                    (btn.classActive) ?
                        <button key={btn.name} data-btnchoosetodo={btn.name} onClick={handleChooseTodos} className='active-btn-todos'>{btn.name}</button>
                    :
                        <button key={btn.name} data-btnchoosetodo={btn.name} onClick={handleChooseTodos}>{btn.name}</button>
                )}
            </div>
        </section>
    )
};

export default App
