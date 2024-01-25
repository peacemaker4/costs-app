import React, {Component} from 'react';
import CurrencyapiService from '../../services/currencyapi-service';

export default class CurrencySelect extends Component {
  apiServ = new CurrencyapiService();

  render(){
    const { selectId } = this.props;

    return (
    <select className="custom-select form-control mr-sm-2 border border-success" id={selectId}>
         <option value="KZT">Tenge [KZT]</option>
         <option value="USD">Dollars [USD]</option>
         <option defaultValue value="RUB">Rubles [RUB]</option>
         <option value="EUR">Euro [EUR]</option>
    </select>
    );
  }
  
};