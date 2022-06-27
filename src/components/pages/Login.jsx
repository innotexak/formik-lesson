import React from "react";
import * as yup from 'yup'
import axios from "axios";
import { useFormik } from "formik";
import { TextField, Button, Typography, CircularProgress } from "@material-ui/core";
const url ="http://localhost:5000/login"

const loginValidation = yup.object({
    email:yup.string('Enter your email').email("Invalid email").required("Email is required"),
    password:yup.string('Enter your password').min(5,"Must be more than 5 chars").max(8, 'Should not be more than 8 chars').required("Password is required")
    })

  

export default function Login({im}){
    const [isLoading, setIsLoading] = React.useState(false)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },

        validationSchema:loginValidation,

        onSubmit:async (values, action)=>{
          try {
              setIsLoading(true)
            const response = await axios.post(url, values)
            console.log(response);
            if(response.status === 200){
              
            }
              
          } catch (error) {
        
          }


            action.setSubmitting(false)
        },

    })
    return( <>
        <form onSubmit={formik.handleSubmit} style={{width:"500px", height:"auto", margin:"auto"}}>

            <Typography variant="h2">
                Login
            </Typography>

          <div>
          <TextField
                name="email"
                id="email"
                type="email"
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
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                id="password"
                label="Password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
        </div>
            <Button type="submit" variant="contained" color="primary">{formik.isSubmitting ? <CircularProgress/>: "Submit"} </Button>
        </form>
        <div>
            {
                im.map(item=>{
                    return(
                        <div key={item.id}>
                            <h3>{item.title.upperCase()}</h3>
                            <img  src={item.url} alt={item.title}/>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}


