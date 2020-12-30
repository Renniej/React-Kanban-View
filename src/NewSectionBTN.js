import React, { Component} from 'react'
import styled from "styled-components"





const Container = styled.button`

    padding : 8px;

    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    width  : 220px;

     height: 60px;
  
   

`;

const DivContainer = styled.div`

    padding : 8px;

    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    width  : 220px;
    float: left;
     height: 60px;
  
   

`;

const BtnContainer = styled.ul`

display:inline-block;

`;

class TextInput extends React.Component {

    componentDidMount(){
        this.nameInput.focus();
    }


    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
            this.props.addNewColumn();
      }
    }
  
    render() {
      return <input ref={(input) => { this.nameInput = input; }} placeholder="New section" type="text" onChange={(event)=> this.props.onChange(event)} onKeyDown={this._handleKeyDown} />
    }
}


export default class NewSectionBTN extends Component {
 


    constructor(props) {   
        super(props);    
        this.state = { isAdding : false, sectionName : null};  
        this.onInputChange = this.onInputChange.bind(this);
        this.addNewColumn = this.addNewColumn.bind(this);
    }


    onInputChange = (event) =>{
        console.log(event)
        this.setState({...this.state, sectionName : event.target.value})
    }


    addNewColumn = () => {
        this.props.addNewColumn(this.state.sectionName)
        this.setState({...this.state, isAdding : false, sectionName : null})
    }

    defaultState = () =>{
        return (
            <Container onClick={()=>{this.setState({...this.state, isAdding : true})}} >
                + Add new section  
            </Container>)
    }


    additionState = () =>{

        return(
        
            
            <DivContainer>

           
                <TextInput onChange={this.onInputChange}  addNewColumn={this.addNewColumn}/>
                
                <BtnContainer>
                    <button onClick={this.addNewColumn}>ok</button>
                    <button onClick={() => {this.setState({...this.state, isAdding : false})}}>cancel</button>
                </BtnContainer>
            </DivContainer>
            
                )
    }

    render() {

        if (this.state.isAdding )
                return this.additionState()
        else   
            return this.defaultState()

        
     
    }
}
