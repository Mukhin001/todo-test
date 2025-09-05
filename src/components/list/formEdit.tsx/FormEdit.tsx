import type { Dispatch, SetStateAction } from 'react';
import type { ToDo } from '../../../App';
import st from './formEdit.module.css';
import IconDone from '../iconDone/IconDone';

interface AddToDoFormFields extends HTMLFormControlsCollection {
    postToDoEdit: HTMLInputElement;
};

interface AddToDoFormElements extends HTMLFormElement {
    readonly elements: AddToDoFormFields;
};

interface Props {
    todo: ToDo;
    arrToDo: ToDo[];
    setArrToDo: Dispatch<SetStateAction<ToDo[]>>; 
    handleEdinAndCloseToDo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, showEdit: boolean): void;
};

const FormEdit = ({ todo, arrToDo, setArrToDo, handleEdinAndCloseToDo }: Props) => {

    const handleSubmit = (e: React.FormEvent<AddToDoFormElements>): void => {
        e.preventDefault();
        
        const { elements } = e.currentTarget;
        const postToDo = elements.postToDoEdit.value;

        const currentElement = e.currentTarget.dataset.idform;

        if(!currentElement) return;
         const newArrToDo = arrToDo.map(todo => {
            if(todo.id === +currentElement) {
                return { ...todo, content: postToDo, showEdit: false };
            }
            return todo;
        });

        setArrToDo(newArrToDo);
    };

    return ( 
         <div className={`${st.editToDO} ${todo.showEdit ? st.showEdit : st.hiddenEdit}`}>
            <form className={st.editToDO__form} onSubmit={handleSubmit} data-idform={todo.id}>
                <div className={st.editToDO__CircleWpap}>
                    <IconDone done={todo.done} />
                    <input autoFocus={todo.showEdit && true} id='postToDoEdit' className={st.editToDO__input} type="text" defaultValue={todo.content}/>
                </div>
                <div>
                        <button type='submit'>ok</button>
                    <button data-id={todo.id} type='reset' onClick={(e) => handleEdinAndCloseToDo(e, false)}>X</button>
                </div>  
            </form>
        </div>
     );
};
 
export default FormEdit;