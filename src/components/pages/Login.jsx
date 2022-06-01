import React from "react";
import * as yup from 'yup'
import axios from "axios";
import { useFormik } from "formik";
import { TextField, Button, Typography } from "@material-ui/core";
const url ="http://localhost:5000"
const dumyData = {
    email:"akuhinnocent2016@gmail.com",
    password:"innotex"
}
const loginValidation = yup.object({
    email:yup.string('Enter your email').email("Invalid email").required("Email is required"),
    password:yup.string('Enter your password').min(5,"Must be more than 5 chars").max(8, 'Should not be more than 8 chars').required("Password is required")
    })

  

export default function Login(){
    const [isLoading, setIsLoading] = React.useState(false)

    const formik = useFormik({

        initialValues:{
            email:"",
            password:""
        },

        validationSchema:loginValidation,

        onSubmit:async (values, action)=>{
        //     if(values.password === dumyData.password && values.email === dumyData.email){
        //    alert("You are login succesfully")
        //     }else{
        //         alert("Invalid credentials")
        //     }




          try {
              setIsLoading(true)
            const response = await axios.post(url, {values})
            if(response.status === 200){
                setIsLoading(false)
                
            }
              
          } catch (error) {
            setIsLoading(false)
              console.log(error.response?.message || error.message)
          }


            action.setSubmitting(false)
        },

    })
    return(
        <form onSubmit={formik.handleSubmit} style={{width:"500px", height:"auto", margin:"auto"}}>

            <Typography variant="h2">
                Login
            </Typography>

          <div>
          <TextField
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                label="Email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
          </div>

            
        <div>
        <TextField
              
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                id="password"
                label="Password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
        </div>
            <Button type="submit" variant="filled">{isLoading ?"Loading ...": "Submit"} </Button>
        </form>
    )
}


