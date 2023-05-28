import '../style-sheets/button.css';

const Button = (props) =>{
    return(
        <>
        <button className={`button ${props.type}`} id={props.id} onClick={() => props.func(props.children)}>
            {props.children}
        </button>
        </>
    )
};

export default Button;