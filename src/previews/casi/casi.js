import React, { useEffect, useState } from 'react';

export default function Casi() {
  const limit = 5;

  const [answer, setAnswer] = useState(0);
  const [input, setInput] = useState('0');
  const [memory, setMemory] = useState(false);
  const [queue, setQueue] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const body = (memory || '') + symbol + input;
    const length = body.length;
    setFeedback(length > limit ? body.slice(length - limit, length) : body);
  }, [memory, symbol, input]);

  const digit = (value) => {
    setWaitingForInput(false);

    if (input === '0') setInput((Number(input) + value) + '');
    else if (input.length < 1) setInput(input + value + '');
  }

  const op = (operation, sym) => {
    if (memory && queue && waitingForInput === false) {
      setMemory(memory + symbol + getInput().text);
      queue(answer, getInput().number);
    }

    if (queue === false) {
      setMemory(getInput().text);
      setAnswer(getInput().number);
      console.log(answer, getInput().number)
    }

    setInput('0');
    setWaitingForInput(true);
    setQueue(() => operation);
    setSymbol(sym);
  }

  const add = (a, b) => {
    setAnswer(a + b);
  }

  const getInput = () => {
    const num = Number(input);
    return {
      number: num,
      text: input
    };
  }

  return (
    <div className="preview__main preview--casi">
      <div
        id="casi"
        className="preview__body">
        <div className="casi__display">
          <p className="casi__feedback">
            {feedback}
          </p>
          <p className="casi__output">
            <span className="casi__answer">{answer}</span>
          </p>
        </div>
        <div className="casi__buttons">
          <div className="casi__btn" onClick={() => digit(2)}>
            <span>2</span>
          </div>
          <div className="casi__btn" onClick={() => op(add, '+')}>
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
