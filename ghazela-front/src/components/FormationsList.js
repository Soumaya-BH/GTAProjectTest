import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import client from "../apollo-client"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { gql, useMutation } from "@apollo/client";


const FormationsList = () => {

    const [ listformations, setListFormations ]= useState([]);
   
    //importer la liste des formations
    useEffect(()=>{
    async function getFormations() {
        const  formations  = await client.query({
          query: gql`
          query all_Formations{
            allFormations{
              id
              title
              description
              date
              classroom {
                id
                name
              }
              image
            }
          }
          `
        })
        setListFormations(formations.data.allFormations)
      }
      getFormations() }, [])

      //supprimer une formation
      const delete_formation = gql`
      mutation DeleteFormation($id: ID!){
        deleteFormation(id: $id){
          formation{
            id
          }
        }
      }`
      client.cache.reset();
      const [deleteFormation, { data, loading, error }] = useMutation(delete_formation, {client, 
        onCompleted: (data) => {
          window.location.reload();
        },});
      const onDelete = (id) => { var yes = window.confirm("Êtes-vous sûr de vouloir supprimer cette formation?");
        if (yes === true){
          deleteFormation({variables: { id: id }});} }
    
  return (
    <>
    <div>
      <Grid  container
  justifyContent="center"
  alignItems="center">
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead >
          <TableRow className="tableheader">
            <TableCell align="center"></TableCell>
            <TableCell align="center">Formation</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Salle</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {listformations.map((formation) => (
            <TableRow
              key={formation.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"><img  className="imageFormation" src={"http://127.0.0.1:8000/media/"+formation.image} alt="FormationImage"/></TableCell>
              <TableCell align="center">{formation.title}</TableCell>
              <TableCell align="center">{formation.description}</TableCell>
              <TableCell align="center">{formation.date}</TableCell>
              <TableCell align="center">{formation.classroom.name}</TableCell>
              <TableCell align="center"><button className="trashbutton" onClick={() => onDelete(parseInt(formation.id))} ><FontAwesomeIcon color="#931B1B" icon={faTrash} /></button> <Link to={"edit/"+formation.id} state={formation.id}>  <FontAwesomeIcon className="trashbutton" color="#217016" icon={faEdit} /></Link></TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </div>
    </>
  )
  

};



export default FormationsList;


