import React from 'react';
import  { Component, useState, useEffect,useRef } from 'react';
import { Container, Row, Col } from "shards-react";
import {searchPlayer} from './query';
import { ListGroup, ListGroupItem, } from "shards-react";
import { Progress } from "shards-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
  } from "shards-react";

import { FormInput } from "shards-react";

const allStyles = {
    compareDiv:{
        width:"50%",
        height:"100%",
        border:"1px solid red"
        
    },
    inputFieldLeft:{
        width:"30%",
        position:"relative",
        left:200,
        
    },
    inputFieldRight:{
        width:"30%",
        position:"relative",
        left:400,
        float:"left",
        
    },

    suggestion:{
        width:"100%",
        height:"100%",
    }
}

const Compare =(props) =>{

    let {client} = props;

    const [player1,setPlayer1] = useState("");
    const [player2,setPlayer2] = useState("");
    const [suggestPlayer1,setSuggestPlayer1] = useState();
    const [suggestPlayer2,setSuggestPlayer2] = useState();
    const [playerDetail1,setPlayerDetail1] = useState();
    const [playerDetail2,setPlayerDetail2] = useState();
    const [displayCompareDiv,setDisplayCompareDiv] = useState("none");
    

    
    

    const handleChange = (value,player) =>{
        console.log("value",value,"player",player);
        if(player=="p1")
        setPlayer1(value)
        else
        setPlayer2(value);

      
        client.query({
            query:searchPlayer,
            variables:{playerName:value}
          }).then((response)=>{
             
             let data = response.data.searchPlayer;
             console.log("dats",data);
             if(player=="p1")
             setSuggestPlayer1(data);
             else
             setSuggestPlayer2(data);
          })
        
    }

    const hideSuggestion = (player,value) =>{
     if(player=="p1")
     {
         setPlayer1(value.playerName);
         setSuggestPlayer1();
         setPlayerDetail1(value);
     }
     else
     {
        setPlayer2(value.playerName);
        setSuggestPlayer2();
        setPlayerDetail2(value);
     }
    }


    const compare = () =>{
       console.log(playerDetail1,playerDetail2);
       setDisplayCompareDiv("");
    }

    console.log("compare",displayCompareDiv);



return (
    <div>

    <Row>
   
          <Col>
          <FormInput id="player1" value={player1}  onChange={(e)=>handleChange(e.target.value,"p1",)} placeholder="Player 1" />
          <div style={{display:typeof suggestPlayer1!="undefined" && suggestPlayer1.length!=0 ? "":"none"}}>
          <div style={allStyles.suggestion}>
          <ListGroup>
           {typeof suggestPlayer1!="undefined" && suggestPlayer1.length!=0 ? suggestPlayer1.map((item)=>{
               return(
           <ListGroupItem onClick={(e)=>hideSuggestion("p1",item)}>{item.playerName}</ListGroupItem> 
               )
           }):null}
        </ListGroup>
          </div>
          </div>
          </Col>
          <Col>
          <FormInput id="player2" value={player2} onChange={(e)=>handleChange(e.target.value,"p2")} placeholder="Player 2" />
          <div style={{display:typeof suggestPlayer2!="undefined" && suggestPlayer2.length!=0 ? "":"none"}}>
          <div style={allStyles.suggestion}>
          <ListGroup>
           {typeof suggestPlayer2!="undefined" && suggestPlayer2.length!=0 ? suggestPlayer2.map((item)=>{
               return(
           <ListGroupItem onClick={(e)=>hideSuggestion("p2",item)}>{item.playerName}</ListGroupItem> 
               )
           }):null}
        </ListGroup>
          </div>
          </div>
          </Col>   
        </Row>

        <Row>
            <Col>
            <br/>
            <center><Button onClick={(e)=>compare()}>Compare</Button></center>
            </Col>
        </Row>

        <br/><br/>

        <div style={{display:displayCompareDiv}}>
            { typeof playerDetail1!=undefined && typeof playerDetail2!="undefined" ?
        <Row>
            <Col>
            <Card style={{ maxWidth: "1000px" }}>
        
             <CardBody>
            <Row>
                <Col>
                <Card style={{ maxWidth: "450px" }}>
        
                <CardImg style={{width:450,height:250}} src={playerDetail1.image}/>
                <CardBody>
                <CardTitle>{playerDetail1.playerName}</CardTitle>
                 <span>Runs:</span>
                 <Progress theme={playerDetail1.runs>playerDetail2.runs? "success":"danger"} value={playerDetail1.runs}>{playerDetail1.runs}</Progress>

                 <span>Wickets:</span>
                 <Progress theme={playerDetail1.runs>playerDetail2.wickets? "success":"danger"} value={playerDetail1.wickets}>{playerDetail1.wickets}</Progress>

                 
                 <span>Matches:</span>
                 <Progress theme={playerDetail1.matches>playerDetail2.matches? "success":"danger"} value={playerDetail1.matches}>{playerDetail1.matches}</Progress>


                 <span>Century:</span>
                 <Progress theme={playerDetail1.century>playerDetail2.century? "success":"danger"} value={playerDetail1.century}>{playerDetail1.century}</Progress>
             
          </CardBody>
          </Card>

                </Col>
                <Col>
                <Card style={{ maxWidth: "450px" }}>
        
                <CardImg style={{width:450,height:250}} src={playerDetail2.image} />
                <CardBody>
        <CardTitle>{playerDetail2.playerName}</CardTitle>
                 <span>Runs:</span>
                 <Progress theme={playerDetail2.runs>playerDetail1.runs? "success":"danger"} value={playerDetail2.runs}>{playerDetail2.runs}</Progress>

                 <span>Wickets:</span>
                 <Progress theme={playerDetail2.wickets>playerDetail1.wickets? "success":"danger"} value={playerDetail2.wickets}>{playerDetail2.wickets}</Progress>


                 <span>Matches:</span>
                 <Progress theme={playerDetail2.matches>playerDetail1.matches? "success":"danger"} value={playerDetail2.matches}>{playerDetail2.matches}</Progress>

                 <span>century:</span>
                 <Progress theme={playerDetail2.century>playerDetail1.century? "success":"danger"} value={playerDetail2.century}>{playerDetail2.century}</Progress>

                 

             
          </CardBody>
          </Card>
                </Col>
            </Row>
               
           
            </CardBody>
     
             </Card>
            </Col>
            
        </Row>:null}
        </div>
       



    </div>
)
}


export default Compare;