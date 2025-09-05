import type { ToDo } from '../../App';
import { type Dispatch, type SetStateAction } from 'react';
import st from './list.module.css';
import IconDone from './iconDone/IconDone';
import FormEdit from './formEdit.tsx/FormEdit';

interface Props { 
    arrToDo: ToDo[]; 
    setArrToDo: Dispatch<SetStateAction<ToDo[]>>; 
    keyShowToDO: string;
};

const List = ({ arrToDo, setArrToDo, keyShowToDO }: Props) => {

    const handleChooseToDo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.currentTarget.classList.toggle('doneTodo');
        const currentElement = e.currentTarget.dataset.id;
        
        if(!currentElement) return;

        const newArrToDo: ToDo[] = arrToDo.map(todo => {
            if( todo.id === +currentElement) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        setArrToDo(newArrToDo);
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

    const handleEdinAndCloseToDo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>, showEdit: boolean): void => {
        const currentElement = e.currentTarget.dataset.id;

        if(!currentElement) return;

        const newArrToDo = arrToDo.map(todo => {
            if(todo.id === +currentElement) {
                return { ...todo, showEdit: showEdit };
            }
            return todo;
        });

        setArrToDo(newArrToDo);
    };

    return ( 
        <ul>
            { arrToDo.filter((todo) => filterArrToDo(todo, keyShowToDO)).map(toDo => 
                <li className={`${st.listLi} ${toDo.showEdit ? st.listLiFocus : ''}`} key={toDo.id}>
                    <div data-id={toDo.id} className={`${st.listLi__content} ${toDo.done ? st.doneTodo : ''} ${!toDo.showEdit ? st.showEdit : st.hiddenEdit}`} onClick={handleChooseToDo}>
                        <IconDone done={toDo.done} />
                        <p className={st.listLi__content__text}>{toDo.done ? <s>{toDo.content}</s> : toDo.content}</p>
                    </div>
                    <div data-id={toDo.id} className={`${st.listLi__iconEdit} ${!toDo.showEdit ? st.showEdit : st.hiddenEdit}`} onClick={(e) => handleEdinAndCloseToDo(e, true)}>
                        <svg className={st.iconEdit} width="20" height="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 508.016 508.016" xmlSpace="preserve">
                            <path d="M487.19,99.922l-79.6-79.7c-38.2-38.2-83.4-12.9-96.3,0l-259.6,260c-1.9,1.9-3.2,4.2-3.8,6.8l-47.5,203.7 c-1.1,4.8,0.3,9.7,3.8,13.2c3.9,3.9,9.3,4.6,13.2,3.8l203.4-47.7c2.6-0.6,4.9-1.9,6.8-3.8l259.6-260 C499.99,183.422,526.79,139.622,487.19,99.922z M281.49,90.022l58,58.1l-181.3,181.6c-3.5-13.4-10.6-26.4-21.2-36.9 c-10.5-10.6-23.4-17.8-36.8-21.2L281.49,90.022z M32.99,475.122l11-46.9c14.5,9,26.9,21.4,35.9,35.9L32.99,475.122z M209.39,433.822l-101,23.6c-13-24.5-33.3-44.9-57.8-57.8l23.6-101.2c14.3-3.1,30.7,2.3,42.8,14.4c13.2,13.2,18.5,31.6,13.5,46.8 c-1.7,5.1-0.4,10.6,3.4,14.4s9.3,5.1,14.4,3.4c15.1-5,33.5,0.2,46.7,13.5C207.09,403.022,212.49,419.422,209.39,433.822z M236.19,407.822c-3.5-13.4-10.6-26.3-21.2-36.9c-10.6-10.6-23.4-17.7-36.9-21.2l181.4-181.7l58,58.1L236.19,407.822z M467.19,176.322l-29.8,29.9l-136-136.2l29.8-29.9c7.5-7.5,33.4-23.1,56.4,0l79.6,79.7 C492.19,144.822,474.69,168.822,467.19,176.322z"></path>
                        </svg>
                    </div>
                    <FormEdit todo={toDo} arrToDo={arrToDo} setArrToDo={setArrToDo} handleEdinAndCloseToDo={handleEdinAndCloseToDo}/>
                </li>
            )}
        </ul> 
    );
};
 
export default List;