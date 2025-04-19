import React, { useState } from 'react';
import { addHex, subtractHex, multiplyHex, divideHex, isValidHex } from '../../calculator/calculator';
import './calcui.css';

const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const operations = ['+', '-', '*', '/'];

export default function Calculator() {
    const [input, setInput] = useState('');
    const [op, setOp] = useState(null);
    const [second, setSecond] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleDigit = (digit) => {
        if (result) {
          setInput(digit);
          setResult(null);
          setSecond('');
          setOp(null);
          return;
        }
      
        if (!op) {
          if (input.length < 2) setInput(prev => prev + digit);
        } else {
          if (second.length < 2) setSecond(prev => prev + digit);
        }
      };

    const handleOp = (operation) => {
    if (input && isValidHex(input)) {
        setOp(operation);
    } else if (result && isValidHex(result)) {
        // Use result as input for next chain
        setInput(result);
        setOp(operation);
        setSecond('');
        setResult(null);
        setError('');
    } else {
        setError('Invalid first input');
    }
    };

    const handleClear = () => {
    setInput('');
    setSecond('');
    setOp(null);
    setResult(null);
    setError('');
    };

    const handleEqual = () => {
    try {
        const firstValue = isValidHex(input) ? input : result;
    
        if (!isValidHex(firstValue) || !isValidHex(second)) {
        setError('Invalid inputs');
        return;
        }
    
        let res = '';
        switch (op) {
        case '+':
            res = addHex(firstValue, second); break;
        case '-':
            res = subtractHex(firstValue, second); break;
        case '*':
            res = multiplyHex(firstValue, second); break;
        case '/':
            res = divideHex(firstValue, second); break;
        default:
            throw new Error('No operation selected');
        }
    
        setResult(res);
        setInput('');
        setSecond('');
        setOp(null);
        setError('');
        } catch (err) {
            setError(err.message);
        }
    };    

    return (
        <div className='calculator'>
            <div className='display' data-testid='display'>
                {error || result || second || input || '0'}
            </div>
            <div className='buttons'>
                {hexDigits.map(d => (
                    <button onClick={() => handleDigit(d)} key={d}>{d}</button>
                ))}
                {operations.map(o => (
                    <button key={o} onClick={() => handleOp(o)}>{o}</button>
                ))}
                <button onClick={handleEqual}>=</button>
                <button onClick={handleClear}>Reset</button>
            </div>
        </div>
    )

}