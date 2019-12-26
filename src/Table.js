import React from 'react';
import data from './data.json'
import Row from './Row'

class Table extends React.Component{
  constructor(){
    super()
    this.state = {
      data: [],
      headers: [],
    };
    this.sortByAlphabet = this.sortByAlphabet.bind(this);
    this.sortByDeviation = this.sortByDeviation.bind(this)
  };

  componentDidMount() {
    this.setState({
      headers: data.fa.fa_data.axis.r,
      data: data.fa.fa_data.r
    })
  };
  sortByDeviation(){
    this.setState((state)=>({
      data: state.data.sort((a,b) => b.fDeltaPlan - a.fDeltaPlan)
    })
    )
  };
  sortByAlphabet(i){
    this.setState((state)=>({
      data: state.data.sort((a, b) => a.axis.r[i].sName_RU.localeCompare(b.axis.r[i].sName_RU))
    })
    )
  };

  renderHeader(){
    return (
      <div className="tableHeader">
      {this.state.headers.map((header, i)=>
        <div className="headerCell" onClick={this.sortByAlphabet.bind(this,i)} key={i}>
          {header.sAxisName}
        </div>
      )}
      <div className="headerCell">Валюта</div>
      <div className="headerCell" onClick={this.sortByDeviation}>Отклонение от плана, п.п</div>

    }

      </div>
    )
  }


  render(){
    return(
      <div className="table">
      {this.renderHeader()}
      {this.state.data.map((row) => <Row data={row.axis.r} deviation={row.fDeltaPlan}/>)}
      </div>
    )
  }
}



export default Table
