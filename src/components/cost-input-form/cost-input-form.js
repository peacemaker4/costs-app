import React, {Component} from 'react';
// import CostCard from '../cost-card';
import CostCardsContainer from '../cost-cards-container.js';

export default class CostInputForm extends Component {

    // state = {
    //     costCards: []
    // };

    onFormSubmit=(e)=>{
        e.preventDefault()

        const costForm=document.forms['addCost']
        const costName=costForm.elements['costName'].value
        const costCategory=costForm.elements['categoryInput'].value
        const costSum=costForm.elements['costsInput'].value

        if(!costName || !costCategory || !costSum){
            alert("Заполните все поля!")
            return;
        }
        if(isNaN(costSum)){
           alert("Правильно заполните сумму!")
           return; 
        }

        const newCard = {id:0,costName, costCategory, costSum}
        CostCardsContainer.addCostToStorage(newCard)

        costForm.reset();
    }

  render(){
    return (
    <div>
        <div className="card">
        <div className="card-body">
            <form name="addCost" onSubmit={this.onFormSubmit}>
                <input type="text" name="costName" id="costName" className="form-control mt-3" placeholder="Введите расход"/>
                    <select className="custom-select form-control mt-3 border border-warning" name="categoryInput" id="categoryInput">
                        <option defaultValue value="Другое">Категория</option>
                        <option>Еда</option>
                        <option>Продукты</option>
                        <option>Одежда</option>
                        <option>Здоровье</option>
                        <option>Досуг</option>
                        <option>Техника</option>
                        <option>Дом</option>
                        <option>Другое</option>
                    </select>
                <input type="text" name="costsInput" id="costsInput" className="form-control mt-3 border border-success" placeholder="Сумма расходов"/>
                <button type="submit" className="btn btn-success mt-3" id="addPostsBtn">Добавить</button>
            </form>
        </div>
    </div>
    <CostCardsContainer />
   </div>
    );
  }
  
};
