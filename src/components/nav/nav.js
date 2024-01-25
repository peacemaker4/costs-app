import React, {Component} from 'react';
import CurrencyapiService from '../../services/currencyapi-service';
import CurrencySelect from '../currency-select'
import NotificationCheck from '../notification-check';

import './nav.css';

export default class Nav extends Component {
  apiServ = new CurrencyapiService();
  
  convertOperation=(e)=>{
    e.preventDefault()

    const fromSelect=document.getElementById('currencyFromSelect')
    const toSelect=document.getElementById('currencyToSelect')
    const inputSum=document.getElementById('currencyInput')
    const currencyResult=document.getElementById('currencyOutput')

    if(!inputSum.value){
      alert("Введите сумму для конвертации")
      return;
    }
    if(fromSelect.value===toSelect.value){
      currencyResult.value=inputSum.value;
    }
    else{
      const curr= this.apiServ.getCurrencyPair(fromSelect.value,toSelect.value);
      curr.then(x=>{
        currencyResult.value=(inputSum.value*x).toFixed(2);
      })
    }
  }

  render(){
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#/">
        <span className="green-text">Costs</span>
        <i className="fas fa-wallet  green-text"></i>
      </a>
       {/* <form className="form-inline my-2 my-lg-0">
          <span className="mr-sm-2">From
          </span>
          <CurrencySelect selectId="currencyFromSelect"/>
          
          <input className="form-control mr-sm-2" type="text" id="currencyInput" placeholder="Sum"/>
          <span className="mr-sm-2">To</span>
          <CurrencySelect selectId="currencyToSelect"/>
          
          <span className="mr-sm-2">=
          </span>
          <input className="form-control mr-sm-2" type="text" id="currencyOutput" placeholder="Result" readOnly/>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.convertOperation}>Convert</button>
        </form> */}
          
      </nav>
    );
  }
  
};
