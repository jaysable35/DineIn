import React, { useEffect, useRef, useState } from "react";
import './otp.css';
import { Link } from "react-router-dom";
function Otpform (){
    const emptyotp=['','','',''];
    
    const refs=[useRef(),useRef(),useRef(),useRef()]
    const [inputs,setInputs]=useState(emptyotp);
    useEffect(()=>{
        refs[0].current.focus();
    },[])

    const handleInputChange=(e,index)=>{
        const val=e.target.value;
        if(!Number(val))
            return;
        if(index<inputs.length-1){
            refs[index+1].current.focus();
        }
        const copyInputs=[...inputs];
        copyInputs[index]=val;
        setInputs(copyInputs);
    }

    const handleOnKeyDown =(e,index)=>{
        console.log(e.keyCode,index);
        if(e.keyCode===8){
            const copyInputs=[...inputs];
            copyInputs[index]='';
            setInputs(copyInputs);
            if(index>0){
                refs[index-1].current.focus(); 
            }
        }
    }
    const handlePaste =(e)=>{
        const data=e.clipboardData.getData('text');
        if(!Number(data) || data.length !==inputs.length)
            return;

        const pastCode=Data.split('');
        setInputs(pastCode);
        refs[inputs.length - 1].current.focus;  
    }
    return(
        <>
        <div className='outer-container'>
            <div className='inner-container'>
                <div className="enterotp">
                <div className='Welcome'>Welcome!</div>
                <div className='textmsg'>Please enter the <span className='otp'>One Time Password </span> sent on your Phone</div>
                </div>  
                <div className="input-wrapper">
                    {
                        emptyotp.map((item,i)=>{
                            return <input
                            value={inputs[i]}
                            key={i}
                            ref={refs[i]}
                            type="text"
                            maxLength={1}
                            onPaste={handlePaste}
                            onChange={(e)=>handleInputChange(e,i)}
                            onKeyDown={(e)=>handleOnKeyDown(e,i)}>
                            </input>
                        })
                    }
                </div>              

                <div className='submit'>
                    <Link to="/userprofile">
                    <button >Submit</button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
export default Otpform;