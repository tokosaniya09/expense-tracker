import { useEffect, useState } from 'react';
import {v4 as uuidvv4} from 'uuid';
import './App.css'

function App() {
	// const [statement, setStatement] = useState("");
	// const [amount, setAmount] = useState("");
	// const [statementType, setStatemenType] = useState("income");

	const[statements, setStatements] = useState([]);
	const[total, setTotal] = useState(0);
	
	useEffect (() => {
		const newTotal = statements.reduce((sum, {type, amount}) => {
			if (type === 'expense') {
				return sum - parseFloat(amount)
			} else return sum + parseFloat(amount)
		}, 0)
		setTotal(newTotal);
	}, [statements]); 

	const renderTotal = () => {
		if (total > 0) {
			return <h1 className='total-text success'>+{Math.abs(total)}</h1>
		} else if (total < 0) {
			return <h1 className='total-text danger'>-{Math.abs(total)}</h1>
		} else {
			return <h1 className='total-text'>{Math.abs(total)}</h1>
		}
	}

	const [input, setInput] = useState({
		statement: "",
		amount: "",
		statementType: "income"
	});

	const [showError, setShowError] = useState ({
		statement: false,
		amount: false,
	});

	const handleUpdateInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	};

	const handleAddNewStatement = () => {
		const {statement, amount, statementType} = input;
		if (!statement) {
			return setShowError({
				statement: true, 
				amount: false,
			});
		} else if (!amount) {
			return setShowError({
				statement: false,
				amount: true,
			});
		} else {
			setShowError({
				statement: false,
				amount: false,
			});
			setStatements([
				...statements,
				{
					id: uuidvv4(),
					name: statement, 
					amount: parseFloat(amount).toFixed(),
					type: statementType, 
					date: new Date().toString(),
				},
			]);
			setInput({
				statement: "",
				amount: "",
				statementType: "income",
			});
		}
	}

	return (
		<main>
			<div>
				<h1 className="total-text">{total}</h1>
				<div className="input-container">
					<input 
						type="text" 
						placeholder='Income Or Expense' 
						onChange={handleUpdateInput}
						value={input.statement}
						name='statement'
						style={showError.statement ? {borderColor: "rgb(206, 76, 76)"} : null}
					/>
					<input 
						type="number" 
						placeholder='Amount'
						onChange={handleUpdateInput}
						value={input.amount}
						name='amount'
						style={showError.amount ? {borderColor: "rgb(206, 76, 76)"} : null}
					/>
					<select 
						onChange={handleUpdateInput}
						value={input.statementType}
						name='statementType'
					>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
					<button onClick={handleAddNewStatement}>+</button>
				</div>
				<div>
					{statements.map(({name, type, amount, date}, id) => (
						<div className="card" key={id}>
							<div className="card-info">
								<h4>{name}</h4>
								<p>{date}</p>
							</div>
							<p className={`amount-text ${type === "income" ? "success" : "danger"}`}>
								{type === "income" ? "+" : "-"}${amount}
							</p>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

export default App