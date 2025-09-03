import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { ToDo } from '../../App';
import st from './btn.module.css';

interface Props { 
    arrToDo: ToDo[]; 
    setArrToDo: Dispatch<SetStateAction<ToDo[]>>; 
    setKeyShowToDO: React.Dispatch<React.SetStateAction<string>>;
    toDoLength: number;
};

type Btns = {
    name: string;
    classActive: boolean;
};

const arrBtnsInitial: Btns[] = [
    { name: 'all', classActive: true },
    { name: 'active', classActive: false },
    { name: 'completed', classActive: false },
];

const Btn = ({ arrToDo, setArrToDo, setKeyShowToDO, toDoLength }: Props) => {
    const [arrBtns, setArrBtns] = useState<Btns[]>(arrBtnsInitial);

    const handleChooseTodos = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const currenBtn = e.currentTarget.dataset.btnchoosetodo;

        if(!currenBtn) return;
        
        setKeyShowToDO(currenBtn);

        const newArrBtns: Btns[] = arrBtns.map(btn => {
            return { ...btn, classActive: btn.name === currenBtn }
        });
   
        setArrBtns(newArrBtns);
    };

    const handleClearDoneToDo = (): void => {
        const clearToDo: ToDo[] = arrToDo.filter(todo => !todo.done);
        setArrToDo(clearToDo);
    };

    return ( 
        <div className={st.wrapperBtns}>
            <p>{toDoLength} items left</p>
            
            <div>
                {arrBtns.map(btn =>   
                    <button key={btn.name} data-btnchoosetodo={btn.name} onClick={handleChooseTodos} className={btn.classActive ? st.activeBtnTodo : ''}>{btn.name}</button>     
                )}
            </div>
            
            <div>
                <button onClick={handleClearDoneToDo}>Clear completed</button>     
            </div>
        </div>

     );
};
 
export default Btn;