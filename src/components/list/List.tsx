import type { ToDo } from '../../App';
import type { Dispatch, SetStateAction } from 'react';
import st from './list.module.css';

interface Props { 
    arrToDo: ToDo[]; 
    setArrToDo: Dispatch<SetStateAction<ToDo[]>>; 
    keyShowToDO: string;
    setToDoLength: Dispatch<SetStateAction<number>>;
};

const List = ({ arrToDo, setArrToDo, keyShowToDO, setToDoLength }: Props) => {

    const handleChooseToDo = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
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
        setToDoLength(arrToDo.filter(todo => !todo.done).length);
        console.log(arrToDo);
            
    };

    const filterArrToDo = (todo: ToDo, k: string): ToDo | boolean | undefined => {
        if(k === 'all') {
            return todo;
        } else if(k === 'active') {
            return todo.done === false;
        } else if(k === 'completed') {
            return todo.done === true;
        } 
    };

    return ( 
        <>
            <ul>
                { arrToDo.filter((todo) => filterArrToDo(todo, keyShowToDO)).map(toDo => 
                    <li className={`${toDo.done ? st.doneTodo : ''} ${st.listLi}`} data-id={toDo.id} key={toDo.id} onClick={handleChooseToDo}>
                        {toDo.done ? <s>{toDo.content}</s> : toDo.content}
                    </li>
                )}
            </ul>
        </> 
    );
};
 
export default List;