import React from 'react'
import Avatar from '@material-ui/core/Avatar';

export default function getAvatar(name, imageURL){
    if(name === undefined){
        return(
            <div>
            <Avatar></Avatar>
            </div> 
        )
    }
    const initials = name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
    console.log(initials)
        return(
            <div>
                <Avatar alt={initials} src={imageURL} className="large">{initials}</Avatar>
            </div>   
        ) 
}