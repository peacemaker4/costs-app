import React, {Component} from 'react';
import NotificationCheck from '../notification-check';
import CostChart from '../cost-chart'

import './costs-report.css'

export default class CostsReport extends Component {

    state={
        chart:null,
        notifiedByCategoryCosts:false,
        notifiedByCategoryAmount:false,
        notifiedByNameCosts:false,
        notifiedByNameAmount:false,
    }
    getListOfAllCosts(){
        let cardsInfoList=[];
            for(let i=0, l=localStorage.length;i<l;i++){
                let key=localStorage.key(i)
                cardsInfoList.push(JSON.parse(localStorage[key]));
            }
            cardsInfoList.sort((a,b)=>{
                return a.id-b.id
            })
        return cardsInfoList;
    }
    generateRandomCode(){
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const codeLength=4
        let result = '';
        for (let i = 0; i < codeLength; i++ ) {
            result += letters.split('')[(Math.floor(Math.random() * letters.length))];
        }
        return result;
    }
    clearAllCosts=()=>{
        const code=this.generateRandomCode()
        const input= prompt(`Вы уверены что хотите очистить историю всех ваших расходов?\nВведите этот код для подтверждения: ${code}`);
        if(input!=null){
            if(input.toLowerCase()==code.toLowerCase()){
                localStorage.clear()
                new Notification('История расходов была удалена!')
                window.location.reload()
            }
            else{
                alert('Вы ввели неправильный код, удаление отменено')
            }
        }
        
    }
    getChartBy=(e)=>{
       e.preventDefault();

       const form=document.forms['chartForm']
       const infoSelectVal=form.elements['infoSelect'].value
       const usingSelectVal=form.elements['usingSelect'].value
       const chartSelectVal=form.elements['chartSelect'].value

       let chartType=chartSelectVal
        let chartData=[]
        const list=this.getListOfAllCosts()
        if(!list.length){
            alert('Нельзя получить отчет, пока вы не сделаете расход')
            return;
        }
        const dataList=[]
        const usedName=[]
        let maxName='';
        let maxVal=0;
       if(infoSelectVal==="Category"){
           
            switch(usingSelectVal){
                case "Costs":
                    dataList.push(['Category', 'Costs'])
                    for(let i of list){
                        if(!usedName.includes(i.costCategory)){
                            const newArr=[]
                            newArr.push(i.costCategory)
                            usedName.push(i.costCategory)
                            let cost=0;
                                for(let j of list){
                                    if(i.costCategory===j.costCategory){
                                        cost+=parseFloat(j.costSum);
                                    }
                                }
                            newArr.push(cost);
                            dataList.push(newArr)

                            if(cost>maxVal){
                                maxVal=cost;
                                maxName=i.costCategory;
                            }
                            
                        }
                    }
                    
                    if(!this.state.notifiedByCategoryCosts){
                        new Notification(`Много тратишь по категории ${maxName}`)
                        this.setState({
                            notifiedByCategoryCosts:true
                        })
                    }
                    break;
                case "Amount":
                    dataList.push(['Category', 'Amount'])
                    for(let i of list){
                        if(!usedName.includes(i.costCategory)){
                            const newArr=[]
                            newArr.push(i.costCategory)
                            usedName.push(i.costCategory)
                            let amount=0;
                                for(let j of list){
                                    if(i.costCategory===j.costCategory){
                                        ++amount;
                                    }
                                }
                            newArr.push(amount);
                            dataList.push(newArr)

                            if(amount>maxVal){
                                maxVal=amount;
                                maxName=i.costCategory;
                            }
                            
                        }
                    }
                    if(!this.state.notifiedByCategoryAmount){
                        new Notification(`Часто тратишься по категории ${maxName}`)
                        this.setState({
                            notifiedByCategoryAmount:true
                        })
                    }
                    break;
            }
            
            chartData=dataList

       }
       else if(infoSelectVal==="Name"){
        switch(usingSelectVal){
            case "Costs":
                dataList.push(['Name', 'Costs'])
                for(let i of list){
                    if(!usedName.includes(i.costName)){
                        const newArr=[]
                        newArr.push(i.costName)
                        usedName.push(i.costName)
                        let cost=0;
                            for(let j of list){
                                if(i.costName===j.costName){
                                    cost+=parseFloat(j.costSum);
                                }
                            }
                        newArr.push(cost);
                        dataList.push(newArr)

                        if(cost>maxVal){
                            maxVal=cost;
                            maxName=i.costName;
                        }
                        
                    }
                }
                if(!this.state.notifiedByNameCosts){
                    new Notification(`Много потратил на (${maxName})`)
                    this.setState({
                        notifiedByNameCosts:true
                    })
                }
                break;
            case "Amount":
                dataList.push(['Name', 'Amount'])
                for(let i of list){
                    if(!usedName.includes(i.costName)){
                        const newArr=[]
                        newArr.push(i.costName)
                        usedName.push(i.costName)
                        let amount=0;
                            for(let j of list){
                                if(i.costName===j.costName){
                                    ++amount;
                                }
                            }
                        newArr.push(amount);
                        dataList.push(newArr)

                        if(amount>maxVal){
                            maxVal=amount;
                            maxName=i.costName;
                        }
                        
                    }
                }
                if(!this.state.notifiedByNameAmount){
                    new Notification(`Часто тратил на (${maxName})`)
                    this.setState({
                        notifiedByNameAmount:true
                    })
                }
                break;
        }
        
        chartData=dataList

       }

        
        const chartOption ={
            title: 'Your costs of all time'
        }
        const viewChart=<CostChart height={400} chartType={chartType} chartData={chartData} chartOptions={chartOption}/>
        this.setState({
            chart:viewChart
        })

        
//   const chartView=document.getElementById("chart-view")
//   chartView.appendChild(viewChart);
    }

    render(){
        // console.log(this.state.chart)

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <NotificationCheck />
                        <form id="chartForm">
                            <span>Chart by:</span>
                            <select className="mt-3 border border-warning" id="infoSelect">
                                <option>Category</option>
                                <option>Name</option>
                            </select>
                            <span>Chart using:</span>
                            <select className="mt-3 border border-warning" id="usingSelect">
                                <option value="Costs">Costs</option>
                                <option value="Amount">Amount</option>
                            </select>
                            <span>Chart type:</span>
                            <select className="mt-3 border border-warning" id="chartSelect">
                                <option value="PieChart">Pie chart</option>
                                <option value="AreaChart">Area chart</option>
                                <option value="BarChart">Bar chart</option>
                            </select>
                        </form>
                        <button className="btn btn-outline-warning mt-3" type="button" onClick={this.getChartBy}>Show report (chart) of all costs</button>
                        <button className="btn btn-outline-danger mt-3 float-right" onClick={this.clearAllCosts}>Clear all costs</button>
                    </div>
                </div>
                <div className="mt-3" id="chart-view">
                    {this.state.chart}
                </div>
            </div>
        );
    }
  
};
