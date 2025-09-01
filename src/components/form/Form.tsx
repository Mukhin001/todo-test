import type { ToDo } from '../../App';
import { type Dispatch, type SetStateAction } from 'react';
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
};

const Form = ({ arrToDo, setArrToDo }: Props) => {

        const handleSubmit = (e: React.FormEvent<AddToDoFormElements>): void => {
            e.preventDefault();
            
            const { elements } = e.currentTarget;
            const postToDo = elements.postToDo.value;

            if(postToDo === '') return;
            
            setArrToDo(prev => [...prev, 
                { id: (arrToDo[arrToDo.length -1]?.id  + 1) || 1 , content: postToDo, done: false}
            ]);
            
            e.currentTarget.reset();
        };

    return ( 
        <>
            <form onSubmit={handleSubmit} className={st.formToDo}>
                <input type="text" id='postToDo' className={st.postToDo} defaultValue='' placeholder='What needs to be done?'/>

                <button type='submit'>submit</button>
            </form>
        </>
    );
};
 
export default Form;