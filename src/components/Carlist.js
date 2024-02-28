import React, { useEffect, useState } from "react";
import AddCar from "./AddCar.js";
import EditCar from './EditCar.js';
import { SERVER_URL } from '../constants.js';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Cartlist(){
    const [open, setOpen] = useState(false);
    const [cars, setCars] = useState([]); 
    const columns = [
        { field: 'brand', headerName: 'Marque', width: 200 },
        { field: 'model', headerName: 'Modèle', width: 200 },
        { field: 'color', headerName: 'Couleur', width: 200 },
        { field: 'year', headerName: 'Année', width: 150 },
        { field: 'price', headerName: 'Prix', width: 150 },
        {
            field: "_links.car.href",
            headerName:"",
            sortable: false,
            filterable: false,
            renderCell: row => <EditCar data={row} updateCar={updateCar} />
        },
        {
            field: "_links.self.href",
            headerName:"",
            sortable: false,
            filterable: false,
            renderCell: row => (
                <IconButton onClick={() => onDelClick(row.id)}>
                <DeleteIcon color="error" />
                </IconButton>
            ),
        },
    ];
       useEffect(() =>{
        fetchCars();
       },[]);
    const fetchCars= ()=>{
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + "api/cars", {
            headers: {Authorization: token},
        })
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
};   
    const updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwt");
    fetch(link, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: token},
        body: JSON.stringify(car),
    })
    .then(response => {
        if (response.ok) {
            fetchCars();
        } else {
            alert("Something went wrong!");
        }
    })
    .catch(err => console.error(err));
};

    const onDelClick = url => {
        const token = sessionStorage.getItem("jwt");
        if(window.confirm("Etes-vous sur de vouloir supprimer ?")){
            fetch(url, {
                method:"DELETE",
                headers: {Authorization: token},
            })
            .then(response=> {
                if(response.ok){
                    fetchCars();
                setOpen(true);
                } else{
                    alert("Quelque chose s'est mal passé !")
                }
                
            })
            .catch(err => console.error(err));
        };
    };
    const addCar = car => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + "api/cars",{
            method: "POST",
            headers: {"Content-Type": "application/json",Authorization: token},
            body: JSON.stringify(car),
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            } else {
                alert("Something went wrong!");
            }
        })
        .catch(err => console.error(err));
    };
    return(
     <React.Fragment>
        <Stack mt={2} mb="2">
        <AddCar addCar={addCar} />
        </Stack>
        <div style={{ height: 500, width: "100%"}}>
            <DataGrid
                rows={cars}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href} 
            /> 
            <Snackbar
             open={open}
             autoHideDuration={2000}
             onClose={() => setOpen(false)}
             message="Voiture supprimée"
            />
        </div>
     </React.Fragment>
     
     );
    // <div>
    //     <table>
    //         <tbody>
    //             {cars.map((car, index)=>(
    //                 <tr key={index}>
    //                     <td>{car.brand}</td>
    //                     <td>{car.model}</td>
    //                     <td>{car.color}</td>
    //                     <td>{car.year}</td>
    //                     <td>{car.price}</td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // </div>
};
export default Cartlist;