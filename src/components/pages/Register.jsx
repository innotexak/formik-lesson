
import React, {useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import PhoneInput from 'react-phone-input-2'
import axios from 'axios'

import {Container, makeStyles, Typography, TextField, Button, CardMedia, Avatar} from '@material-ui/core'
import { ThumbUpAltOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme=>({
    addBtn:{
        backgroundColor:"#110940",
        color:"white",
        position:"fixed",
        bottom:"30px",
        right:"20px",
    },
    modalClass:{
        width:500,
        height:"100vh",
        backgroundColor:"white",
        margin:"auto",
        position:"absolute",
        top:"50%",
        bottom:"50%",
        left:0,
        right:0,
        borderRadius:"20px",
        [theme.breakpoints.down("sm")]:{
            width:"100vw",
            height:"100vh"
        }
    },
    form:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        height:"100%",
    },
    item:{
        width:"100%",
        marginTop:theme.spacing(2),
    },
  
    input:{
        width:"100%",
        backgroundColor:"white !important",
    },
    btn:{
        margin:theme.spacing(2),
    },

    close:{
        position:"absolute",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"white",
        top:-13,
        right:-13,
        width:45,
        cursor:"pointer",
        height:45,
        borderRadius:"50%",
        background:theme.palette.error.light
    },
    center:{
        textAlign:'center',
    },
    center2:{
        textAlign:'center',
        display:"flex",
        alignItem:"center",
        justifyContent:"center",
        padding:theme.spacing(1),
        fontSize:"20px",

    },

    flex:{
        width:"100%",
        margin:"10px auto",
        display:"flex",
        justifyContent:"space-between",
        [theme.breakpoints.down("sm")]:{
            marginTop:"0px"
        }
    },

    anchor:{
        color:'darkblue',
        textDecoration:"underline",
        cursor:'pointer',
        "&:hover":{
            color:"blue",
            textDecoration:"none"
        }
    }
    
}))
export default function Signup({reg, setReg, setLogin}){
    const [value, setValue] = useState('')
    const [data, setData] = useState([])



    React.useEffect(()=>{
        const fetch  = async ()=>{
         try {
            const  response =  await axios.get("https://jsonplaceholder.typicode.com/photos")
            if(response.status === 200){
                setData(response.data)
            }
         } catch (error) {
            console.log(error);
         }
        }

    fetch()
    },[])
   const handleClick = ()=>{
        setLogin(true)
        setReg(false)
    }
    const loginValidation = yup.object({
        email:yup.string('Enter your email').email("Invalid email").required("Email is required"),
        firstName:yup.string('Enter your first name').required("First Name  is required"),
        lastName:yup.string('Enter your last name').required("Last Name  is required"),
        password:yup.string('Enter your password').min(5,"Must be more than 5 chars").max(8, 'Should not be more than 8 chars').required("Password is required"),
        confirmPassword: yup.string('Confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            confirmPassword:"",
            firstName:"",
            lastName:"",
        },  
        validationSchema:loginValidation,

        onSubmit:async (values, action)=>{
  console.log(values);
      

       try {
        const response = await axios.post("https://jsonplaceholder.typicode.come/photos", values) 
        console.log(response.data)
       } catch (error) {
        
       }
           
        },

    })

  const classes = useStyles()
    return(<>
 
        <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Avatar className={classes.center}/>
            <Typography variant="h4" className={classes.center}>
                Signup 
            </Typography>
            <Typography variant="span" className={classes.center2}>
                Let's go there!<ThumbUpAltOutlined/>
            </Typography>
            <strong onClick={()=>setReg(false)}className={classes.close}>X</strong>
           
            <   div className={classes.item} >
                    <TextField 
                        type="email"
                        placeholder="Email" 
                        variant="outlined" 
                        label="Email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        className={classes.input}
                        />
                                
                </div>
                <div className={classes.item} >
                    <TextField 
                        type="text"
                        placeholder="First Name" 
                        variant="outlined" 
                        label="First Name"
                        name="firstName"
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        className={classes.input}
                        />
                                
                </div>
                <div className={classes.item} >
                    <TextField 
                        type="text"
                        placeholder="Last Name" 
                        variant="outlined" 
                        label="Last Name"
                        name="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        className={classes.input}
                        />
                                
                </div>
               
                <   div className={classes.item} >
                    {/* <TextField 
                        type="number"
                        placeholder="Phone Number" 
                        variant="outlined" 
                        label="Phone Number"
                        name="phone"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        className={classes.input}
                        />         */}
                    
                            {/* <PhoneInput
                                placeholder="Enter phone number"
                                value={value}
                                defaultCountry="NG"
                                onChange={setValue}
                                className={classes.input}
                                /> */}
                                
                        </div>
                <   div className={classes.item} >
                    <TextField 
                        type="password"
                        placeholder="password" 
                        variant="outlined" 
                        label="Password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        className={classes.input}
                        />        
                </div>
                <div className={classes.item} >
                    <TextField 
                        type="password"
                        placeholder="Confirm password" 
                        variant="outlined" 
                        label="Confirm password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        className={classes.input}
                        />
                </div>
              <div>
                    <Button variant="contained" color="primary" type="submit">{formik.isSubmitting ? "Loading":"Signup"}</Button>   
                </div>
            </form>

            <Container>
                {data.length <= 0? "": 
                
                data.slice(0,2).map((item)=>{
                    return(
                        <div key={item.id}>
                                <img src={item.url} alt={item.title} />
                        </div>
                    )
                })
            }
            </Container>
            </>
 )
}