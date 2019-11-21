import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name:'',
            Phone:'',
            CheckInTime:'',
            CheckOutTime:'',
            HostName:'',
            Address:''
        }
    }
    
    handleClick = () => {
        
    }
    render() {
        return (
            <div className="form-background">
                <p className="Form-heading">Check In Form</p>
            <div className="mainform">
                
                <input type = "text" className="text-input" placeholder="Name" value={this.state.Name} onChange={(e)=>this.setState({Name:e.value})}></input>
                <input type = "text" className="text-input" placeholder="Phone"value={this.state.Name} onChange={(e)=>this.setState({Phone:e.value})} ></input>
                {/* <input type = "text" className="text-input" placeholder="Check in time"value={this.state.Name} onChange={(e)=>this.setState({CheckInTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="checkout time"value={this.state.Name} onChange={(e)=>this.setState({CheckOutTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="Host name"value={this.state.Name} onChange={(e)=>this.setState({HostName:e.value})}></input> */}
                <input type = "email" className="text-input" placeholder="Email"value={this.state.Name} onChange={(e)=>this.setState({Address:e.value})}></input>
                <button onClick={this.handleClick}>Check In</button>                
            </div>
            </div>
        )
    }
}
