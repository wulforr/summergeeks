import React, { Component } from 'react'
import axios from 'axios'

export default class CheckOutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiters: [{_id:123,name:"shaurya",email:"ewq"}],
            VisitorID:'-1'
        }
    }
    componentDidMount(){
        axios.get('localhost:5000/allvisitors')
        .then(res => this.setState({visiters:res.data}))
        .catch(err => console.log(err))
    }
    handleClick = () => {
        if(this.state.VisitorID === '-1')
        console.log('err')
    }
    selectChange = (e) => {
        this.setState({
            VisitorID: e.target.value
        })
    }
    render() {
        console.log(this.state)
        return (
            <div className="form-background">
                <p className="Form-heading">Check Out Form</p>
            <div className="mainform">
                
                {/* <input type = "text" className="text-input" placeholder="Name" value={this.state.Name} onChange={(e)=>this.setState({Name:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="Phone"value={this.state.Name} onChange={(e)=>this.setState({Phone:e.value})} ></input> */}
                {/* <input type = "text" className="text-input" placeholder="Check in time"value={this.state.Name} onChange={(e)=>this.setState({CheckInTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="checkout time"value={this.state.Name} onChange={(e)=>this.setState({CheckOutTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="Host name"value={this.state.Name} onChange={(e)=>this.setState({HostName:e.value})}></input> */}
                {/* <input type = "email" className="text-input" placeholder="Email"value={this.state.Name} onChange={(e)=>this.setState({Address:e.value})}></input> */}
                <div className="dropdown">

                <label>Select your Name </label>
                <select onChange={this.selectChange}>
                    <option value={-1}>Select</option>
                    {this.state.visiters.map(ele => {
                        return(<option value={ele._id} key={ele._id}>{ele.name}({ele.email})</option>)
                    })  }
                    {/* <option value='1'>Mark</option> */}
                </select>
                </div>
                             
            </div>
            <button onClick={this.handleClick}>Check Out</button>   
            </div>
        )
    }
}
