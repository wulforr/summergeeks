import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';


class CheckInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name:'',
            Phone:'',
            CheckInTime:'',
            CheckOutTime:'',
            HostName:'',
            Address:'',
            email:'',
            hosts: [{_id:123,name:"shaurya",city:"Noida"}],
            hostdetails: ''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/allhosts')
        .then(res => this.setState({hosts:res.data}))
        .catch(err => console.log(err))
    }
    handleClick = () => {
        console.log(this.state.hostdetails)
        if(this.state.Name ==='' || this.state.Phone === '' || this.state.hostdetails === {} || this.state.email === ''){
        document.getElementsByClassName('errtxt')[0].style.display = 'block';
        document.getElementsByClassName('errtxt')[0].innerText = "All the fields are required please fill all the fields"
        document.getElementsByClassName('errtxt')[0].style.color = 'red'
        }
        else
        {
            axios.post('http://localhost:5000/checkin',{name:this.state.Name, email:this.state.email,phone:this.state.Phone,hostdetails:this.state.hostdetails})
            .then(res => {
                console.log(res,res.status)
                if(res.status ===200)
                {
                document.getElementsByClassName('errtxt')[0].style.display = 'block';
                document.getElementsByClassName('errtxt')[0].innerText = "You have been successfully checkedIn"
                document.getElementsByClassName('errtxt')[0].style.color = 'green'
                setInterval(() => {
                document.getElementsByClassName('errtxt')[0].style.display = 'none';
                }, 2000)
                }
            })
            .catch(err => console.log(err))
        }
    }
    handletoggle = () => {
        this.props.history.push('/checkout')
    }
    selectChange = (e) => {
        console.log(e.target,e.target.value)
        this.setState({
            hostdetails: e.target.value
        })
    }
    render() {
        console.log(this.state)
        return (
            <div className="form-background">
                <p className="Form-heading">Check In Form</p>
            <div className="mainform">
                
                <input type = "text" className="text-input" placeholder="Name" value={this.state.Name} onChange={(e)=>this.setState({Name:e.target.value})}></input>
                <input type = "number" className="text-input" placeholder="Phone"value={this.state.Phone} onChange={(e)=>this.setState({Phone:e.target.value})}></input>
                {/* <input type = "text" className="text-input" placeholder="Check in time"value={this.state.Name} onChange={(e)=>this.setState({CheckInTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="checkout time"value={this.state.Name} onChange={(e)=>this.setState({CheckOutTime:e.value})}></input> */}
                {/* <input type = "text" className="text-input" placeholder="Host name"value={this.state.Name} onChange={(e)=>this.setState({HostName:e.value})}></input> */}
                <input type = "email" className="text-input" placeholder="Email"value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} required></input>
                <div className="dropdown">

                <label>Select your host &nbsp;&nbsp;</label>
                <select onChange={this.selectChange}>
                    <option value={-1}>Select</option>
                    {this.state.hosts.map(ele => {
                        console.log(ele)
                        return(<option value={ele._id} key={ele._id}>{ele.name}({ele.city})</option>)
                    })  }
                </select>
                </div>
                             
            </div>
            <button onClick={this.handleClick} className="submitbtn">Check In</button>   
            <span className="errtxt">All the fields are required please fill all the fields</span>
            <p className="togglebtn" onClick={this.handletoggle}>CheckOut</p>
            </div>
        )
    }
}

export default withRouter(CheckInForm)