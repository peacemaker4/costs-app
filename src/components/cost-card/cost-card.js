import React, {Component} from 'react';

import './cost-card.css'

export default class CostCard extends Component {

  render(){
    const {costId,costName, costCategory, costSum, deleteCostCard}=this.props;
    // console.log(costName,costCategory, costSum)
    return (
        <div className="card">
            <div className="card-body">
                <h4>{costName}</h4>
                <span>Категория: </span>
                <span className={`underline-light-text ${costCategory}`}>{costCategory}</span>
                <p className="green-text">Сумма: -{costSum}</p>
                <button className="btn btn-outline-danger ml-auto" onClick={()=>deleteCostCard(costId)}>Убрать расход</button>
            </div>
        </div> 
    );
  }
  
};