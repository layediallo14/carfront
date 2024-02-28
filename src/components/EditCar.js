import React, { useState } from "react";
import  Dialog  from "@mui/material/Dialog";
import  DialogActions  from "@mui/material/DialogActions";
import  DialogContent  from "@mui/material/DialogContent";
import  DialogTitle  from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditCar(props){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
    });
    // open the modal form
    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            year: props.data.row.year,
            fuel: props.data.row.fuel,
            price: props.data.row.price,
        });
        setOpen(true);
    };
    // close the modal form
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setCar({ ...car, [event.target.name]:event.target.value });
    };
    // update car and close modal form
    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    };
    
    return(
     <div>
        <IconButton onClick={handleClickOpen}>
                <EditIcon color="primary" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifier le car</DialogTitle>
            <DialogContent>
            <Stack mt={2} mb="1">
                <TextField
                    label="Brand"
                    name="brand"
                    autoFocus
                    variant="standard"
                    value={car.brand}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Model"
                    name="model"
                    autoFocus
                    variant="standard"
                    value={car.model}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Color"
                    name="color"
                    autoFocus
                    variant="standard"
                    value={car.color}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Year"
                    name="year"
                    autoFocus
                    variant="standard"
                    value={car.year}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Price"
                    name="price"
                    autoFocus
                    variant="standard"
                    value={car.price}
                    onChange={handleChange}
                />
                 </Stack>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default EditCar;