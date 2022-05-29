import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { colors, makeStyles, Input } from '@mui/material/';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material/';
import { gql, useMutation } from "@apollo/client";
import client from "../apollo-client";
import Button from '@mui/material/Button';
 


function AddFormation(){

    const [ listclassrooms, setListClassrooms ]= useState([]);

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
            console.log(listclassrooms)
          }
          getClassrooms() }, [])


          const CreateeFormation = gql`
  mutation createrFormation($title: String!, $description: String!, $date: String!, $classroom: Int!, $image: String!){
    createFormation(title: $title, description: $description, date: $date, classroomId: $classroom, image: $image) {
      formation{
        id
        title
        image
      }
    }
  }`
    const [AddFormation, { data, loading, error, Success }] = useMutation(CreateeFormation, {client, 
      onCompleted: (data) => {
        window.location.href="/"
      },
    onError: (error) => alert(error.message)});
   console.log("DATA", data, "loading:", loading, "error:", JSON.stringify(error, null, 2), "status:", Success)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [classroom, setClassroom] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [imagePreview, setImagePreview] = useState("");
    const [image, setImage] = useState("");


    //image upload
    const createImage=(file)=> {
      let reader = new FileReader();
      reader.onload = (e) => {
       setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      
      console.log(reader);
    }
    const onChange=(e)=> {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      createImage(files[0]);
    }

  
    return(
        <Grid container  justifyContent="center"
        alignItems="center">
    <div className="card">
       
        <Grid container justifyContent="left"
        alignItems="center"><Grid item xs={8}>
        <h1>Ajouter une formation</h1></Grid>
        <Grid item xs={4}>
        <label htmlFor="contained-button-file">
        {image ?(<img src={image} alt="formationImage" className="imagePreview" />):(<></>)}       
        <input  accept="image/*" id="contained-button-file" name="image" multiple type="file"  onChange={onChange} hidden/>
        <Button className="buttonsave" variant="contained" component="span">
          Upload image
        </Button>
      </label>        </Grid>
          </Grid>

          <form method="post" enctype="multipart/form-data" onSubmit={ (e) => { 
          e.preventDefault(); 
          const imagee = new FormData();
          imagee.append(
            "image", image
          )
          console.log(image)
          AddFormation({ variables: {title: e.target.title.value, description: e.target.description.value, date: e.target.date.value, classroom: parseInt(e.target.classroom.value), image :image}}); 
        }}>
        <TextField className="formtext" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="fullWidth" label="Titre" variant="outlined" />
        <br/><br/>
        <TextField className="formtext" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Description" variant="outlined" />
        <br/><br/>
        <FormControl className="formtext">
        <InputLabel id="demo-simple-select-label">Salle</InputLabel>
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
export default AddFormation