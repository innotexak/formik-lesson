import React from "react";
import axios from 'axios'
import { Container } from "@material-ui/core";

export default function Home({data}){


   
    return(
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
    )
}