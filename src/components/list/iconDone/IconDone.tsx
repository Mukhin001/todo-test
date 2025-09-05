import st from './iconDone.module.css';

interface Props {
    done: boolean;
};

const IconDone = ({ done }: Props) => {
    return ( 
        <div className={st.circleToDo}>
            {done &&
                <svg width="20" height="20" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m192 400c-4.2 0-8.3-1.7-11.3-4.7l-96-96c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l83.9 83.9 212.8-243.1c5.8-6.6 15.9-7.3 22.6-1.5s7.3 15.9 1.5 22.6l-224 256c-2.9 3.3-7.1 5.3-11.5 5.5-.2-.1-.4-.1-.6-.1z" fill="rgb(52, 184, 52)"></path>
                </svg>
            }
        </div>
     );
};
 
export default IconDone;