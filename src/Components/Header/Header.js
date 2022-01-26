import React, { Component } from "react";
console.log('Header');

export default class Header extends Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
  }
  
  
  change = () => {
     this.type = document.querySelector('#type').value;
     console.log(this.type);
     return this.type
  }


render(){
  

  return (


    <header className="header">
      <h1 className="title-game">Гра в П'ятнашки</h1>
      <nav className="menu">
        <div className="type-game">
          <select className="type-game__select" id="type" onChange={this.change}>
            <option value="8">8 (3x3)</option>
            <option value="15">15 (4x4)</option>
          </select>
          <h3>Перемішування</h3>
          <select className="type-game__select" id="mix">
            <option value="перемішувати самостійно">Самостійно</option>
            <option value="випадкове перемішування">Автоматично</option>
          </select>
          <h3>Збирати</h3>
          <select className="type-game__select" id="collect">
            <option value="Самостійне збирання">Самостійно</option>
            <option value="Комп'ютер збирає">Автоматично</option>
          </select>
        </div>
        <div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>
    </header>
  )
}
  

}

