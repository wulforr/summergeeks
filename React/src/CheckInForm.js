import React, { Component } from 'react'
import axios from 'axios'

export default class CheckInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name:'',
            Phone:'',
            CheckInTime:'',
            CheckOutTime:'',
            HostName:'',
            Address:'',
            hosts: [{_id:123,name:"shaurya",city:"Noida"}]
        }
    }
    componentDidMount(){
        axios.get('localhost:5000/allhosts')
        .then(res => this.setState({hosts:res.data}))
        .catch(err => console.log(err))
    }
    handleClick = () => {
        
    }
    render() {
        console.log(this.state.hosts)
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
                <div className="dropdown">

                <label>Select your host </label>
                <select>
                    <option value={-1}>Select</option>
                    {this.state.hosts.map(ele => {
                        return(<option value={ele._id} key={ele._id}>{ele.name}({ele.city})</option>)
                    })  }
                </select>
                </div>
                             
            </div>
            <button onClick={this.handleClick}>Check In</button>   
            </div>
        )
    }
}
