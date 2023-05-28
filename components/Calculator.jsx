import Button from './Button';
import Result from './Result';
import { evaluate } from 'mathjs';
import '../style-sheets/calculator.css';
import { useState } from 'react';

const Calculator = () => {

    const [formula, setFormula] = useState('');
    const [input, setInput] = useState('0');
    const [veri, setVeri] = useState(0);

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['AC', '/', '-', '+', '*', '='];

    const borrar = () => {
        setFormula('');
        setInput('0');
    };

    const calcular = () => {
        setInput(evaluate(formula));
        setFormula(evaluate(formula));
        setVeri(1);
        console.log(formula.length);
    };

    const addNum = (val) => {
        if (!formula.length || formula == '\u00A0') {
            setFormula(val);
            setInput(val);
        } else {
            if (val == '0' && (formula == '0' || input=='0')) {
                setFormula(formula);
            } else {
                const last = formula.charAt(formula.length - 1);
                const whatOperator = last == '*' || operators.includes(last);

                setInput(whatOperator ? val : input + val);
                setFormula(formula + val);
            }
        }
    };

    const agregarOpe = (val) => {
        if (formula.length) {
          setInput(`${val}`);
          const beforeLastChat = formula.charAt(formula.length - 2);
    
          const beforeLastChatIsOperator =
            operators.includes(beforeLastChat) || beforeLastChat === "*";
    
          const lastChat = formula.charAt(formula.length - 1);
          
          const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
          
          if (
            (lastChatIsOperator && val !== "-") ||
            beforeLastChatIsOperator && lastChatIsOperator
          ) {
            if (beforeLastChatIsOperator) {
              const updatedValue = `${formula.substring(
                0,
                formula.length - 2
              )}${val}`;
              setFormula(updatedValue);
            } else {
              setFormula(`${formula.substring(0, formula.length - 1)}${val}`);
            }
          } else {
            setFormula(`${formula}${val}`);
          }
        } else if (veri == 1) {
            setInput(`${val}`);
            setFormula(`${formula}${val}`);
            setVeri(0);
        }
      };
    

    const dec = () => {
        const last = formula.charAt(formula.length - 1);
        if (!formula.length || formula == '\u00A0') {
            setInput('0.');
            setFormula('0.');
        } else {
            if (last == '*' || operators.includes(last)) {
                setInput('0.')
                setFormula(formula + ' 0.');
            } else {
                setInput(last == '.' || input.includes('.') ? input : input + '.')
                const format = last == '.' || input.includes('.') ? formula : formula + '.';
                setFormula(format);
            }
        }
    }

    const agregar = (val) => {
        const number = numbers.find((num) => num == val);
        const operator = operators.find((ope) => ope == val);

        switch(val) {
            case '=':
                calcular();
                break;
            case 'AC':
                borrar();
                break;
            case number:
                addNum(val);
                break;
            case '.':
                dec();
                break;
            case operator:
                agregarOpe(val);
                break;
            default:
                break;
        }
        console.log(val);
    };

    return(
        <div id='calculator' style={{display: 'block'}}>
            <Result input='Hola' form={formula} in={input} />
            <div id='buttons'>
                <Button id='clear' func={borrar}>AC</Button>
                <Button type='sign' id='divide' func={agregar}>/</Button>
                <Button type='sign' id='multiply' func={agregar}>*</Button>
                <Button type='number' id='seven' func={agregar}>7</Button>
                <Button type='number' id='eight' func={agregar}>8</Button>
                <Button type='number' id='nine' func={agregar}>9</Button>
                <Button type='sign' id='subtract' func={agregar}>-</Button>
                <Button type='number' id='four' func={agregar}>4</Button>
                <Button type='number' id='five' func={agregar}>5</Button>
                <Button type='number' id='six' func={agregar}>6</Button>
                <Button type='sign' id='add' func={agregar}>+</Button>
                <Button type='number' id='one' func={agregar}>1</Button>
                <Button type='number' id='two' func={agregar}>2</Button>
                <Button type='number' id='three' func={agregar}>3</Button>
                <Button type='sign' id='equals' func={agregar}>=</Button>
                <Button type='number' id='zero' func={agregar}>0</Button>
                <Button type='number' id='decimal' func={agregar}>.</Button>
            </div>
        </div>
    )
};

export default Calculator;