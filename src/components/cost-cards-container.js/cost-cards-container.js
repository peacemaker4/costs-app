import React, {Component} from 'react';
import CostCard from '../cost-card';

import './cost-cards-container.css'

export default class CostCardsContainer extends Component {

    state={
        filter:'All'
    }

    static getNewTaskIdx=()=>{
        let maxVal=0;
        for(let i=0, l=localStorage.length;i<l;i++){
          let key=localStorage.key(i);
            let val=parseInt((JSON.parse(localStorage[key])).id);
            if(val>maxVal){
              maxVal=val;
            }
        }
        if(maxVal===0){
          return 1;
        }
        return maxVal+1;
    }
    static addCostToStorage(card){
        card.id=this.getNewTaskIdx()
        localStorage.setItem(card.id, JSON.stringify(card))

        window.location.reload()
        // console.log(localStorage)
    }
    static notifyAboutCost(cost){
        const list=this.getAllCosts()
        for(let i in list){
            console.log(i)
        }
    }

    deleteCostFromStorage(id){
        if(localStorage.getItem(id)){
            const costItem= JSON.parse(localStorage.getItem(id))
            localStorage.removeItem(id);
            window.location.reload()
            new Notification(`Расход (${costItem.costName}) был удален!`);
            return;
        }
    }
    filterCards=(e)=>{
        const val=e.target.value
        this.setState({
            filter:val
        })
    }
    filterListByCategory(list, cat){
        const arr=[]
        for(let i of list){
            if(i.costCategory===cat){
                arr.push(i)
            }
        }
        return arr;
    }
    getAllCosts=()=>{
        const list=[]
        for(let i=0, l=localStorage.length;i<l;i++){
            let key=localStorage.key(i)
            list.push(JSON.parse(localStorage[key]));
        }
        list.sort((a,b)=>{
            return b.id-a.id
        })
        return list;
    }
    renderAllCostCards=()=>{
        let cardsInfoList=[];
        cardsInfoList=this.getAllCosts();

        const filter=this.state.filter;
        if(filter!=='All')
            cardsInfoList=this.filterListByCategory(cardsInfoList,filter)
        
        if(!cardsInfoList.length){
            return <h4 className="mt-3 text-center">Данный список пуст</h4>
        }
        let renderItems = []; 
        for (let i of cardsInfoList) {   
            renderItems.push(<CostCard key={i.id} costId={i.id} costName={i.costName}  costCategory={i.costCategory} costSum={i.costSum} deleteCostCard={(id)=>this.deleteCostFromStorage(id)}/>)
        }
        return renderItems;
    }
    hideCards=()=>{
        const container=document.getElementById("cost-cards-container")
        const hideBtn=document.getElementById("hide-button")
        if(!container.classList.contains("hidden")){
            container.classList.add("hidden")
            hideBtn.classList.remove("btn-outline-dark")
            hideBtn.classList.add("btn-outline-light")
            hideBtn.textContent="Show"
        }
        else if(container.classList.contains("hidden")){
            container.classList.remove("hidden")
            hideBtn.classList.add("btn-outline-dark")
            hideBtn.classList.remove("btn-outline-light")
            hideBtn.textContent="Hide"
        }
    }

    render(){
        // localStorage.clear()
    
        return (
            <div>
                <button className="btn btn-outline-dark btn-lg btn-block" id="hide-button" onClick={this.hideCards}>Hide</button>
                <div id="cost-cards-container">
                    <select className="form-control mt-3 border border-info" onChange={this.filterCards} name="categoryFind" id="categoryFind">
                        <option defaultValue value="All">Все</option>
                        <option>Еда</option>
                        <option>Продукты</option>
                        <option>Одежда</option>
                        <option>Здоровье</option>
                        <option>Досуг</option>
                        <option>Техника</option>
                        <option>Дом</option>
                        <option>Другое</option>
                    </select>
                    <div className="container mt-3" >
                        {this.renderAllCostCards()}
                    </div> 
                </div>
                
            </div>
            
        );
    }
  
};
