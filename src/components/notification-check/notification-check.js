import React, {Component} from 'react';

import './notification-check.css'

export default class CurrencySelect extends Component {

    shown=false
    showNotification=()=>{
        if (Notification.permission === "granted") {
            if(!this.shown)
                new Notification("Вы получаете уведомления о расходах!");
            this.shown=true;
          }
          else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                if(!this.shown)
                    new Notification("Вы получаете уведомления о расходах!");
                this.shown=true;
              }
            });
          }
    }
  render(){
      
    return (
        <div>
            <button className="btn btn-info" onClick={this.showNotification}>Apply notification</button>
        </div>
    );
  }
}