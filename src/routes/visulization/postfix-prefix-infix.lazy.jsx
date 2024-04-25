import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/visulization/postfix-prefix-infix")({
  component: InfixToPrefixPostfixConverter,
});

function InfixToPrefixPostfixConverter() {
  const [infixExpression, setInfixExpression] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [conversionType, setConversionType] = useState("prefix");

  const precedence = {
    "^": 3,
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };

  const handleInputChange = (event) => {
    setInfixExpression(event.target.value);
    setError(""); // Clear error message when input changes
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConvert();
    }
  };

  const handleConvert = () => {
    if (check()) {
      if (conversionType === "prefix") {
        setOutput(convertToPrefix(infixExpression));
      } else if (conversionType === "postfix") {
        setOutput(convertToPostfix(infixExpression));
      }
    }
  };

  const check = () => {
    if (infixExpression.trim() === "") {
      setError("Infix expression is empty!");
      return false;
    } else if (/[^a-zA-Z0-9^\/*+\-() ]/.test(infixExpression)) {
      setError(
        "Invalid characters found! Only alphanumeric characters and operators (^, *, /, +, -) are allowed."
      );
      return false;
    }
    // Additional validation can be added here (e.g., balanced parentheses)
    setError("");
    return true;
  };

  const convertToPrefix = (infixExp) => {
    const stack = [];
    const prefix = [];

    for (let i = infixExp.length - 1; i >= 0; i--) {
      const char = infixExp[i];
      if (char === " ") {
        continue;
      } else if (char === "(") {
        while (stack.length && stack[stack.length - 1] !== ")") {
          prefix.push(stack.pop());
        }
        stack.pop(); // Discard the ')'
      } else if (char === ")") {
        stack.push(char);
      } else if (precedence.hasOwnProperty(char)) {
        while (
          stack.length &&
          precedence[stack[stack.length - 1]] > precedence[char]
        ) {
          prefix.push(stack.pop());
        }
        stack.push(char);
      } else {
        prefix.push(char);
      }
    }

    while (stack.length) {
      prefix.push(stack.pop());
    }

    return prefix.reverse().join("");
  };

  const convertToPostfix = (infixExp) => {
    const stack = [];
    const postfix = [];

    for (let i = 0; i < infixExp.length; i++) {
      const char = infixExp[i];
      if (char === " ") {
        continue;
      } else if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          postfix.push(stack.pop());
        }
        stack.pop(); // Discard the '('
      } else if (precedence.hasOwnProperty(char)) {
        while (
          stack.length &&
          precedence[stack[stack.length - 1]] >= precedence[char]
        ) {
          postfix.push(stack.pop());
        }
        stack.push(char);
      } else {
        postfix.push(char);
      }
      console.log(char, postfix, stack);
    }

    while (stack.length) {
      postfix.push(stack.pop());
    }

    return postfix.join("");
  };

  const handleClear = () => {
    setInfixExpression("");
    setOutput("");
    setError("");
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="page">
      <input
        type="text"
        value={infixExpression}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleConvert}>Convert</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleCopyOutput} disabled={!output}>
        Copy Output
      </button>
      <div>{error && <div className="error">{error}</div>}</div>
      <div>
        <select
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value)}
        >
          <option value="prefix">Prefix</option>
          <option value="postfix">Postfix</option>
        </select>
      </div>
      <div>
        <h3>Output:</h3>
        <div>{output}</div>
      </div>
    </div>
  );
}
