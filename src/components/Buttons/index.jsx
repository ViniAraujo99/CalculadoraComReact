import "./Button.css";

let displayString = ["0", "0"];
let current = 0;
let operation = null;

export const Buttons = ({
	children,
	funcBtn = false,
	numBtn = false,
	equalBtn = false,
	retornaNumero,
	gravaHist,
}) => {
	let classesName = "calc__button ";
	classesName += funcBtn ? "funcBtn" : "";
	classesName += numBtn ? "numBtn" : "";
	classesName += equalBtn ? "equalBtn" : "";

	const clearDisplay = (func) => {
		//Limpa o display conforme a função (⌫ -> limpa o último dígito | CE -> Limpa todo o indíce atual | CE -> Limpa todos os indices)
		switch (func) {
			case "⌫":
				if (displayString[current].length > 1) {
					displayString[current] = displayString[current].substring(
						0,
						displayString[current].length - 1
					);
					retornaNumero(parseFloat(displayString[current]));
				} else {
					displayString[current] = "0";
					retornaNumero(parseFloat(displayString[current]));
				}
				break;

			case "CE":
				displayString[current] = "0";
				retornaNumero(parseFloat(displayString[current]));
				break;

			//Limpa e retorna para o indíce [0]
			case "C":
				displayString = ["0", "0"];
				current = 0;
				retornaNumero(parseFloat(displayString));
				break;

			default:
				retornaNumero("");
				break;
		}
	};

	const resolveOperation = (op, arr) => {
		//Converte o array
		const arrConvertido1 = parseFloat(arr[0]);
		const arrConvertido2 = parseFloat(arr[1]);

		//Resolve a operação
		switch (op) {
			case "/":
				if (arrConvertido2 === 0) {
					alert("Impossível dividir por 0");
					return 0;
				}
				return arrConvertido1 / arrConvertido2;

			case "*":
				return arrConvertido1 * arrConvertido2;

			case "-":
				return arrConvertido1 - arrConvertido2;

			case "+":
				return arrConvertido1 + arrConvertido2;

			default:
				alert(
					"Informe um cálculo válido. Tente selecionar os valores antes de tentar calcular o resultado"
				);
				return arrConvertido1;
		}
	};

	const treatOperation = (op) => {
		//Adiciona o - na frente do número, mas somente se o tamanho da string for 1, caso contrário o número é maior e adicionar o - quebraria, em contra partida tem a função +/- que inverte o sinal do número
		if (
			op === "-" &&
			displayString[current].length === 1 &&
			!displayString[current].includes("-")
		) {
			displayString[current] = op.concat(displayString[current]);
			retornaNumero(parseFloat(displayString[current]));
			return;
		}

		//Verifica se current é = 0 e se a op é '=', se for retorna, caso contrário dará erro ao tentar tratar os valores
		//Se clicou na operação 1x salva a operação, limpa o display e altera o current (qual indice do array está alterando)
		if (current === 0) {
			operation = op;
			clearDisplay("");
			current = 1;
			return;
		}

		//Se a operação foi '=' o próximo número que seguir digitando será o indice [0]
		const equal = op === "=";

		//Salva a última operação apertada
		const currentOperation = operation;

		//Retorna o resultado baseado na última operação e nos valores preenchidos no array
		const finalValue = resolveOperation(
			currentOperation,
			displayString
		).toString();

		//Mostra o valor no display
		displayString[0] = finalValue;
		retornaNumero(parseFloat(displayString[0]));

		//Limpar o indice [1] para '0'
		displayString[current] = "0";

		//Se equal for verdade o próximo número que seguir digitando será o indice [0], se não (se apertou outra operação na sequência) altera o segundo valor para resolver a operação.
		equal ? (current = 0) : (current = 1);
	};

	const addNumber = (n) => {
		//Verifica se o display já possui um '.', se possuir, não pode adicionar outro.
		if (n === "." && displayString[current].includes(".")) {
			return;
		}

		//Trata as operações que precisam de apenas um número:
		switch (n) {
			case "+/-":
				if (displayString[current].length === 1) {
					alert("Digite um valor primeiro");
					return;
				}
				displayString[current] = (displayString[current] * -1).toString();
				break;

			case "%":
				displayString[current] = (displayString[current] / 100).toString();
				break;

			case "1/x":
				displayString[current] = (1 / displayString[current]).toString();
				break;

			case "x˟":
				const response = prompt("Digite o expoente:");
				displayString[current] = Math.pow(displayString[current], response).toString();
				break;

			case "√":
				displayString[current] = Math.sqrt(displayString[current]).toString();
				break;

			default:
				displayString[current] = displayString[current].concat(`${n}`);
				break;
		}
		console.log(displayString)
		//gravaHist(n, parseFloat(displayString))
		retornaNumero(parseFloat(displayString[current]));
	};

	return (
		<>
			<button
				onClick={() => {
					switch (children) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
						case ".":
						case "+/-":
						case "%":
						case "1/x":
						case "x˟":
						case "√":
							addNumber(children);
							break;

						case "/":
						case "*":
						case "-":
						case "+":
						case "=":
							treatOperation(children);
							break;

						default:
							clearDisplay(children);
							return;
					}
				}}
				className={classesName}
			>
				{children}
			</button>
		</>
	);
};
