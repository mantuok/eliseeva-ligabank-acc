import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {Range, getTrackBackground} from 'react-range';
import {ActionCreator} from '../../store/action';
import {
  LoanMeta,
  SliderStyle
} from '../../const';

const InitialPayment = () => {
  const dispatch = useDispatch();
  const loan = useSelector((state) => state.activeLoan);
  const InitialPayment = useSelector((state) => state.initialPayment);
  const costAmount = useSelector((state) => state.costAmount);
  const loanType = loan.type;

  const PERCENTS = 100;

  const getInitialValue = () => {
    console.log(costAmount)
    return costAmount * loan.initialPaymentMin
  };

  const [inputData, setInputData] = useState({
    amount: costAmount * loan.initialPaymentMin,
    percent: [loan.initialPaymentMin],
    isValid: true 
  });

  useEffect(() => {
    setInputData({
      ...inputData,
      amount: (costAmount * loan.initialPaymentMin) / PERCENTS
    })
  }, [costAmount]);

  useEffect(() => {
    setInputData({
      ...inputData,
      percent: [((inputData.amount / costAmount) * PERCENTS)]
    })
  }, [inputData.amount]);

  useEffect(() => {
    setInputData({
      ...inputData,
      amount: (costAmount * inputData.percent) / PERCENTS
    })
  }, [inputData.percent]);

  const handleCostAmountChange = (evt) => {
    setInputData({
      ...inputData,
      amount: parseInt(evt.target.value)
    })
  }

  return (
    <div className="form__initial-payment initial-payment">
    <label className="initial-payment__label" htmlFor="initial-payment">{LoanMeta[loanType].INITIAL_PAYMENT_LABEL}</label>
    <div className="initial-payment__input-wrapper">
      <input 
        className="initial-payment__input" 
        type="number" 
        name="initial-payment" 
        id="cost-amount"
        // placeholder={getInvalidPlaceholder()}
        value={inputData.amount}
        onChange={handleCostAmountChange}
        // onBlur={handleCostAmountBlur}
      />
      <Range
        step={LoanMeta[loanType].INITIAL_PAYMENT_STEP}
        min={loan.initialPaymentMin}
        max={loan.initialPaymentMax}
        values={inputData.percent}
        onChange={(values) => setInputData({...inputData, percent: values})}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '1px',
              width: '100%',
              backgroundColor: '#C1C2CA'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: '#2C36F2',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '-28px',
                color: '#707C87',
                fontWeight: '400',
                fontSize: '14px',
                fontFamily: 'inherit',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF'
              }}
            >
              {inputData.percent[0].toFixed(1)}
            </div>
          </div>
        )}
      />  
    </div>
  </div>
  )
};

export default InitialPayment;