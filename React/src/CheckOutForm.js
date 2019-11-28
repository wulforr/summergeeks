import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class CheckOutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp:'',
            visiters: [{_id:123,name:"shaurya",email:"ewq"}],
            VisitorID:'-1'
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/allvisitors')
        .then(res => this.setState({visiters:res.data}))
        .catch(err => console.log(err))
    }
    handleClick = () => {
        if(this.state.VisitorID ==='-1' || this.state.otp === '' )
        document.getElementsByClassName('errtxt')[0].style.display = 'block';
        else
        {
            axios.post('http://localhost:5000/checkout',{id:this.state.VisitorID,otp:this.state.otp})
            .then(res => {console.log(res,res.status)
                if(res.status ===200)
                {
                document.getElementsByClassName('errtxt')[0].style.display = 'block';
                document.getElementsByClassName('errtxt')[0].innerText = "You have been successfully checkedOut"
                document.getElementsByClassName('errtxt')[0].style.color = 'green'
                }
                if(res.status ===202)
                {
                document.getElementsByClassName('errtxt')[0].style.display = 'block';
                document.getElementsByClassName('errtxt')[0].innerText = "Your OTP did not match"
                document.getElementsByClassName('errtxt')[0].style.color = 'red'
                }
            })
            .catch(err => console.log(err))
        }
    }
    selectChange = (e) => {
        this.setState({
            VisitorID: e.target.value
        })
    }
    handletoggle = () => {
        console.log(this.props)
        this.props.history.push('/')
    }
    handleotp = () => {
        console.log('sending')
        if(this.state.VisitorID === '-1')
        {
            document.getElementsByClassName('errtxt')[0].style.display = 'block';
            document.getElementsByClassName('errtxt')[0].innerText = "Please select your name first"
            document.getElementsByClassName('errtxt')[0].style.color = 'red'
        }
        else {
            axios.post('http://localhost:5000/sendotp',{id:this.state.VisitorID})
            .then(data => {
                document.getElementsByClassName('errtxt')[0].style.display = 'block';
                document.getElementsByClassName('errtxt')[0].innerText = "OTP sent"
                document.getElementsByClassName('errtxt')[0].style.color = 'green'
            })
            .catch(err => console.log(err))
            
        }
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
                {/* <input type = "email" className="text-input" placeholder="Email"value={this.state.Name} onChange={(e)=>this.setState({Address:e.value})}></input> */}
                <div className="dropdown">

                <label>Select your Name &nbsp;&nbsp;</label>
                <select onChange={this.selectChange}>
                    <option value={-1}>Select</option>
                    {this.state.visiters.map(ele => {
                        return(<option value={ele._id} key={ele._id}>{ele.name}({ele.email})</option>)
                    })  }
                    {/* <option value='1'>Mark</option> */}
                </select>
                </div>
                <div className="otp">
                <input type = "text" className="text-input1" placeholder="Click on send OTP to get OTP" value={this.state.phone} onChange={(e)=>this.setState({otp:e.target.value})}></input>
                <button onClick={this.handleotp} className="otpbtn">Send OTP</button>
    
                </div>
                
            </div>
            <button onClick={this.handleClick} className="submitbtn">Check Out</button>   
            <span className="errtxt">All the fields are required please fill all the fields</span>
            <p className="togglebtn" onClick={this.handletoggle}>CheckIn</p>
            </div>
        )
    }
}

export default withRouter(CheckOutForm)