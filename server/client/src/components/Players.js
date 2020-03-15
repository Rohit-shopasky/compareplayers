import React from 'react';
import  { Component, useState, useEffect,useRef } from 'react';
import { Container, Row, Col } from "shards-react";
import StackGrid from "react-stack-grid";
import {getAllPlayers,createPlayer} from './query';
import Compare from './Compare';
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Modal, ModalBody, ModalHeader,FormInput
  } from "shards-react";

  



const Player = (props) =>{

  let {client} = props;
  const [allPlayers,setAllPlayers] = useState([]);
  const [open,setModelOpen] = useState(false);
  const [playerName,setPlayerName] = useState("");
  const [runs,setRuns] = useState("");
  const [wickets,setWickets] = useState("");
  const [catches,setCatches] = useState("");
  const [matches,setMatches] = useState("");
  const [century,setCentury] = useState("");
  const [image,setImage] = useState("");
  const [as,setas] = useState(1);
  
   
   

  useEffect(() => {
    client.query({
      query:getAllPlayers,
      variables:{}
    }).then((response)=>{
       
       let data = response.data.getAllPlayers;
       setAllPlayers(data);
    })
  }, [])

  const allStyles = {
      playersDiv:{
        width:"100%",
        height:"100%",
        border:"1px solid gray",
      }
  }

  const closePopup = () =>{  
  setModelOpen(!open);
  }

  const handleChange = (fieldName,value) =>{

    if(fieldName=="playerName")
    setPlayerName(value);
    if(fieldName=="runs")
    setRuns(value);
    if(fieldName=="wickets")
    setWickets(value);

    if(fieldName=="catches")
    setCatches(value);

    if(fieldName=="matches")
   setMatches(value)


   if(fieldName=="century")
   setCentury(value);

   if(fieldName=="image")
   setImage(value);
  
  }

  const savePlayer = () =>{
    console.log(playerName,runs,wickets,catches,matches,century,image);

    if(playerName!="")
    {
    client.mutate({
      mutation:createPlayer,
      variables:{playerName:playerName,runs:Number(runs),matches:Number(matches),wickets:Number(wickets),catches:Number(catches),century:Number(century),image:image},
      
    }).then((response)=>{
      //console.log("response",response);
      let data = response.data.createPlayer;
      console.log("data",data);
      if(data.status==true)
      {
        let allData = allPlayers;
        allData.push({_id:"",playerName:playerName,runs:Number(runs),matches:Number(matches),wickets:Number(wickets),catches:Number(catches),century:Number(century),image:image})

        console.log("allData",allData);
    
        setAllPlayers(allData);
        setas(as+1);
        closePopup();
      }

    })
  }
  else{
  alert("Player name is required");
  }

  }



  
    return(

        <div>
          <Container className="dr-example-container">
            <Row>
              <Col>
              <br/>
            <center><h4>Player Comparision</h4></center>
            <br/>
            
            <Compare client={client} />
            <br/>
            <center><h4>All Players</h4></center>
            <Button style={{float:"right"}} onClick={closePopup}>Add new Player +</Button>
            <br/><br/><br/>
         
            <StackGrid
              columnWidth={300}
             >

             {as>=1 &&  allPlayers.map((item,i)=>{
               return(
              <div key={i}>
                <Card style={{ maxWidth: "300px" }}>
        
             <CardImg style={{width:300,height:200}} src={item.image} />
             <CardBody>
            <CardTitle>{item.playerName}</CardTitle>
               <p>Runs: {item.runs} ; Wickets: {item.wickets} ; Catches: {item.catches} ; Matches: {item.matches} ; Century: {item.century}</p>
       
            </CardBody>
     
            </Card>
    </div>)
             })}   
            </StackGrid>
            </Col>
            </Row>
            </Container>



          <Modal open={open} toggle={closePopup}>
          <ModalHeader>Add New Player</ModalHeader>
          <ModalBody>

            <Row>
              <Col>
              <FormInput value={playerName} onChange={(e)=>handleChange("playerName",e.target.value)} placeholder="Player Name"/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
              <FormInput value={runs} onChange={(e)=>handleChange("runs",e.target.value)} type="number" placeholder="runs"/>
              </Col>
              <Col>
              <FormInput value={wickets} onChange={(e)=>handleChange("wickets",e.target.value)}  type="number" placeholder="wickets"/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
              <FormInput value={catches} onChange={(e)=>handleChange("catches",e.target.value)}  type="number" placeholder="catches"/>
              </Col>
              <Col>
              <FormInput value={matches} onChange={(e)=>handleChange("matches",e.target.value)}  type="number" placeholder="matches"/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
              <FormInput value={century} type="number" onChange={(e)=>handleChange("century",e.target.value)}  placeholder="century"/>
              </Col>
              <Col>
              <FormInput value={image} type="text" onChange={(e)=>handleChange("image",e.target.value)}  placeholder="Player Image url"/>
              </Col>
            </Row>
            <br/>
            <center><Button onClick={savePlayer}>Save Player</Button></center>
          </ModalBody>
        </Modal>
        </div>
    )
}




export default Player;