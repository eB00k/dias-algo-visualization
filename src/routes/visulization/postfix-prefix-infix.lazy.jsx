import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import SelectOption from "@/components/ui/select/SelectOption";
import { expressionConverterOptions } from "@/lib/store/config";
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

  const isOperand = (char) => {
    // Check if character is an operand (alphabetical character or digit)
    return /^[a-zA-Z0-9]$/.test(char);
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
      } else if (conversionType === "postfix-to-infix") {
        setOutput(convertPostfixToInfix(infixExpression));
      } else if (conversionType === "prefix-to-infix") {
        setOutput(convertPrefixToInfix(infixExpression));
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

  const convertPostfixToInfix = (postfixExp) => {
    const stack = [];

    for (let i = 0; i < postfixExp.length; i++) {
      const char = postfixExp[i];

      // If operand, push to stack
      if (isOperand(char)) {
        stack.push(char);
      } else {
        // If operator, pop two operands from stack, form an infix expression, and push back to stack
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        stack.push(`(${operand1}${char}${operand2})`);
      }
    }

    // The final infix expression will be at the top of the stack
    return stack.pop();
  };

  const convertPrefixToInfix = (prefixExp) => {
    const stack = [];

    for (let i = prefixExp.length - 1; i >= 0; i--) {
      const char = prefixExp[i];

      // If operand, push to stack
      if (isOperand(char)) {
        stack.push(char);
      } else {
        // If operator, pop two operands from stack, form an infix expression, and push back to stack
        const operand1 = stack.pop();
        const operand2 = stack.pop();
        stack.push(`(${operand1}${char}${operand2})`);
      }
    }

    // The final infix expression will be at the top of the stack
    return stack.pop();
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
      <div>
        <h1 className="p-2 text-slate-500 font-bold">
          Infix to Postfix/Prefix & Postfix/Prefix to Infix
        </h1>
        <div className="flex flex-col justify-center py-8 w-full md:max-w-[500px]">
          <div className="flex gap-4 flex-col">
            <label htmlFor="convert-from" className="text-secondary-foreground">
              Input Expression:
            </label>
            <Input
              id="convert-from"
              type="text"
              value={infixExpression}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-secondary"
            />
            <div className="flex gap-4 items-center">
              <span>to</span>
              <SelectOption
                options={expressionConverterOptions}
                defaultValue={conversionType}
                setValue={setConversionType}
                className="w-full"
              ></SelectOption>
            </div>
            <label htmlFor="convert-to" className="text-secondary-foreground">
              Result:
            </label>
            <div className="flex gap-2">
              <Input
                id="convert-to"
                type="text"
                value={output}
                className="w-full bg-secondary"
              />
              <Button
                variant={"destructive"}
                onClick={handleCopyOutput}
                disabled={!output}
              >
                <Copy />
              </Button>
            </div>
            <div>
              {error && <div className="text-red-500 p-4">{error}</div>}
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="w-full " onClick={handleConvert}>
              Convert
            </Button>
            <Button className="w-full" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
