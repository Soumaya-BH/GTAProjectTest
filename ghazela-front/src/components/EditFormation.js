import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { colors, makeStyles, Input } from '@mui/material/';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material/';
import { gql, useMutation } from "@apollo/client";
import client from "../apollo-client";
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";


function EditFormation(){
    const location = useLocation()
    const [ listclassrooms, setListClassrooms ]= useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [classroom, setClassroom] = useState(1);
    const [date, setDate] = useState();
     //importer la liste des salles
     useEffect(()=>{
        async function getClassrooms() {
            const  classrooms  = await client.query({
              query: gql`
              query AllClassrooms{
                allClassroms{
                 id
                 name
               }
               }
              `
            })
            setListClassrooms(classrooms.data.allClassroms)
          }
          async function getFormations() {
            let id = parseInt(location .state);
            const  formations  = await client.query({
              query: gql`
              query byId_Formations($id: Int!){
                byidFormations(id: $id){
                  title
                  description
                  date
                  classroom{
                    id
                    name
                  }
                }
              }
              `
            , variables: { id: id}})

            
            const data = formations.data.byidFormations
            setTitle(data.title)
            setDescription(data.description)
            setDate(data.date)
            setClassroom(data.classroom.id)


          }
          getFormations() ;getClassrooms() }, [])

          const UpdateeFormation = gql`
  mutation updaterFormation($id: ID!, $description: String!, $title: String!, $date: Date!, $classroom: Int!){
    updateFormation(id:$id, title: $title, description: $description,  date:$date, classroomId: $classroom) {
      formation{
        id
        title
        description
      }
    }
  }`
    const [UpdateeeFormation, { data, loading, error, Success }] = useMutation(UpdateeFormation, {client, 
      onCompleted: (data) => {
        window.location.href="/"
      },
    onError: (error) => alert(error.message)});
   console.log("DATA", data, "loading:", loading, "error:", JSON.stringify(error, null, 2), "status:", Success)
   
  
    return(
        <Grid container  justifyContent="center"
        alignItems="center">
    <div className="card">
       
        <Grid container justifyContent="left"
        alignItems="center"><Grid item xs={8}>
        <h1>Modifier une formation</h1></Grid>
        <Grid item xs={4}></Grid>
          </Grid>

          <form onSubmit={ (e) => {
          e.preventDefault(); console.log("id", location.state,"title:", e.target.title.value, "description:", e.target.description.value, "date:", typeof e.target.date.value, "classroom:", parseInt(e.target.classroom.value)); UpdateeeFormation({ variables: {id: parseInt(location.state), title: e.target.title.value, description: e.target.description.value, date: e.target.date.value, classroom: parseInt(e.target.classroom.value)}}); 
        }}>
        <TextField className="formtext" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="fullWidth" label="Titre" variant="outlined" />
        <br/><br/>
        <TextField className="formtext" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Description" variant="outlined" />
        <br/><br/>
        <FormControl className="formtext">
        <InputLabel id="demo-simple-select-label">Salle</InputLabel>
        {console.log(classroom)}
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classroom}
            label="Age"
            name="classroom"
            onChange={(e) => setClassroom(e.target.value)}
        >
             {listclassrooms.map((classroom) => (
                [ <MenuItem value={classroom.id}>{classroom.name}</MenuItem>]
           
            ))}
        </Select>
        </FormControl><br/><br/>
        <input className="formtext" name="date" type="date" id="outlined-basic"
       value={date} onChange={(e) => setDate(e.target.value)}
       ></input>
         <br/><br/><br/>
       <Button type="submit" className="buttonsave" variant="contained">Enregistrer</Button>
       &nbsp;&nbsp;
       <a href="/">
       <Button  className="buttonannuler" variant="contained">Annuler</Button></a>
       
       </form>
    </div>
    </Grid>
    )
}
export default EditFormation