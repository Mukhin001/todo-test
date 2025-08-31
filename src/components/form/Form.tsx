import type { ToDo } from '../../App';
import type { Dispatch, SetStateAction } from 'react';
import st from './form.module.css';

interface AddToDoFormFields extends HTMLFormControlsCollection {
    postToDo: HTMLInputElement;
};

interface AddToDoFormElements extends HTMLFormElement {
    readonly elements: AddToDoFormFields;
};

interface Props { 
    arrToDo: ToDo[]; 
    setArrToDo: Dispatch<SetStateAction<ToDo[]>>; 
    setToDoLength: Dispatch<SetStateAction<number>>;
};

const Form = ({ arrToDo, setArrToDo, setToDoLength }: Props) => {

        const handleSubmit = (e: React.FormEvent<AddToDoFormElements>): void => {
            e.preventDefault();
            
            const { elements } = e.currentTarget;
            const postToDo = elements.postToDo.value;

            if(postToDo === '') return;
            
            setArrToDo(prev => [...prev, 
                { id: (arrToDo[arrToDo.length -1]?.id  + 1) || 1 , content: postToDo, done: false}
            ]);
            
            setToDoLength(arrToDo.filter(todo => !todo.done).length);
            console.log(arrToDo);
            
            e.currentTarget.reset();
        };

    return ( 
        <>
            <form onSubmit={handleSubmit} className={st.formToDo}>
                <input type="text" id='postToDo' className={st.postToDo} defaultValue='' />

                <button type='submit'>submit</button>
            </form>
        </>
    );
};
 
export default Form;