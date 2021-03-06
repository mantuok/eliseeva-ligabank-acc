import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NumberFormat from 'react-number-format';
import {ActionCreator} from '../../store/action';
import {
  LoanMeta,
} from '../../const';
import {
  getRubleSuffix,
  getYearSuffix,
  getSeparatedNumber
} from '../../utils/common';

const Application = () => {
  const dispatch = useDispatch();
  const costAmount = useSelector((state) => state.costAmount);
  const loan = useSelector((state) => state.activeLoan);
  const loanType = loan.type;
  const loanTerm = useSelector((state) => state.loanTerm);
  const initialPayment = useSelector((state) => state.initialPayment);
  const previousApplicationNumber = useSelector((state) => state.applicationNumber);
  const currentApplicationNumber = previousApplicationNumber + 1;

  const handleApplicationSubmit = () => {
    dispatch(ActionCreator.setApplicationNumber(currentApplicationNumber));
    dispatch(ActionCreator.createApplication(false));
    dispatch(ActionCreator.openApplicationSentPopup());
    document.body.style.overflow = 'hidden';
  }

  return (
    <section className="calculation__application application" id="application">
      <h3 className="application__heading">Шаг 3. Оформление заявки</h3>
      <ul className="application__loan-data loan-data">
        <li className="loan-data__item">
          <span className="loan-data__name">Номер заявки</span>
          <span className="loan-data__value">{`№ ` + currentApplicationNumber}</span>
        </li>
        <li className="loan-data__item">
          <span className="loan-data__name">Цель кредита</span>
          <span className="loan-data__value">{loan.name}</span>
        </li>
        <li className="loan-data__item">
          <span className="loan-data__name">{LoanMeta[loanType].COST_AMOUNT_LABEL}</span>
          <span className="loan-data__value">{getSeparatedNumber(costAmount) + getRubleSuffix(costAmount)}</span>
        </li>
        <li className="loan-data__item">
          <span className="loan-data__name">Первоначальный взнос</span>
          <span className="loan-data__value">{getSeparatedNumber(initialPayment) + getRubleSuffix(initialPayment)}</span>
        </li>
        <li className="loan-data__item">
          <span className="loan-data__name">Срок кредитования</span>
          <span className="loan-data__value">{loanTerm + getYearSuffix(loanTerm)}</span>
        </li>
      </ul>
      <form className="application__client-data client-data" action="" onSubmit={handleApplicationSubmit}>
        <label className="client-data__label visually-hidden" htmlFor="client-name">Фамилия Имя Отчество</label>
        <input className="client-data__value client-data__value--name" name="client-name" id="client-name" placeholder="ФИО" required />
        <label className="client-data__label visually-hidden" htmlFor="client-tel">Телефон</label>
        <NumberFormat 
          className="client-data__value client-data__value--tel" 
          name="client-tel"  
          placeholder="Телефон" 
          id="client-tel"
          format="+7 ###-###-####"
          pattern="[+]{1}[0-9]{1} [0-9]{3}-[0-9]{3}-[0-9]{4}"
          mask="_"
          required
        />
        <label className="client-data__label visually-hidden" htmlFor="client-email">E-mail</label>
        <input className="client-data__value client-data__value--email" name="client-email" id="client-email" placeholder="E-mail" required />
        <button className="application__submit">Отправить</button>
      </form>
    </section>
  )
}

export default Application;