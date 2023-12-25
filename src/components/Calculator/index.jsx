import "./Calculator.css";
import { Buttons } from "../Buttons";
import { Display } from "../Display";
import { useState } from "react";
import { Historic } from "../Historic";

export const Calculator = () => {
	const numberOperation = [
		/*LINHA 1 e 2*/
		{ symbol: "%", funcBtn: true },
		{ symbol: "CE", funcBtn: true },
		{ symbol: "C", funcBtn: true },
		{ symbol: "⌫", funcBtn: true },
		{ symbol: "1/x", funcBtn: true },
		{ symbol: "x˟", funcBtn: true },
		{ symbol: "√", funcBtn: true },
		{ symbol: "/", funcBtn: true },

		/*LINHA 3 e 4*/
		{ symbol: 7, numBtn: true },
		{ symbol: 8, numBtn: true },
		{ symbol: 9, numBtn: true },
		{ symbol: "*", funcBtn: true },
		{ symbol: 4, numBtn: true },
		{ symbol: 5, numBtn: true },
		{ symbol: 6, numBtn: true },
		{ symbol: "-", funcBtn: true },

		/*LINHA 5 e 6*/
		{ symbol: 1, numBtn: true },
		{ symbol: 2, numBtn: true },
		{ symbol: 3, numBtn: true },
		{ symbol: "+", funcBtn: true },
		{ symbol: "+/-", numBtn: true },
		{ symbol: 0, numBtn: true },
		{ symbol: ".", numBtn: true },
		{ symbol: "=", equalBtn: true },
	];

	const [valueDisplay, setValueDisplay] = useState("0");
	const [histValues, setHistValues] = useState([]);

	const mostraNumeroNoDisplay = (n) => {
		setValueDisplay(n);
	};

	const gravaHistorico = (op, arr) => {
		const arrConvertido1 = parseFloat(arr[0]);
		const arrConvertido2 = parseFloat(arr[1]);
		setHistValues([...histValues, `${arrConvertido1} ${op} ${arrConvertido2}`]);
	};

	return (
		<div className="calc__container">
			<h1>Calculadora</h1>
			<div className="calc">
				<Display value={valueDisplay} />
				<div className="btn__container">
					{numberOperation.map((btn) => (
						<Buttons
							key={btn.symbol}
							funcBtn={btn.funcBtn}
							numBtn={btn.numBtn}
							equalBtn={btn.equalBtn}
							retornaNumero={mostraNumeroNoDisplay}
							gravaHist={gravaHistorico}
						>
							{btn.symbol}
						</Buttons>
					))}
				</div>
				{histValues.map((hist) => (
					<Historic key={hist} historico={hist} />
				))}
			</div>
		</div>
	);
};
