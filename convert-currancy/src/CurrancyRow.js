import React from 'react'

function CurrancyRow(props) {
    const {
        currencyOptions,
        onChangeCurrency,
        selectedCurrency,
        onChangAmount,
        amount

    } = props
    
     

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangAmount} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map((option, index) =>
                    <option key={index} value={option} >{option}</option>
                )}
                
            </select>
        </div>
    )
}

export default CurrancyRow
