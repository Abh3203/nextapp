import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
// import "../index.css";
import p1 from "../public/Images/player1default.svg"
import p2 from "../public/Images/player2default.svg"
type Props = {};

const Start : NextPage = (props: Props) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [noOfGames, setNoOfGames] = useState(0)
  const [imgPath, setImgPath] = useState("")
  const [imgPath2, setImgPath2] = useState("")
  const router = useRouter()
  const validate = ()=>{
      if(player1 === "" || player2 === "" || !noOfGames ){
        alert("Please Enter Valid Input!!")
        return false
      }
      return true
  } 

  const fileInput = (e : any)=> {
    const fileInput = document.getElementById(e.target.className)
    fileInput?.click()
  } 


  const changeHandler= (e : any) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      console.log(e.target.id)
      reader.addEventListener('load', (ev)=>{
        console.log(typeof ev.target?.result)
     try {
        e.target.id === "v1_8" ? 
        localStorage.setItem("img1",JSON.stringify(ev.target?.result))
        : 
        localStorage.setItem("img2",JSON.stringify(ev.target?.result))
      } catch (error) {
           alert(error)
           return
      }       
        e.target.id === "v1_8" ? 
        setImgPath(JSON.stringify(ev.target?.result))
        : 
        setImgPath2(JSON.stringify(ev.target?.result))
     
      })
      // setImgPath(reader.result ? reader.result : "")
  }

  useEffect(()=>{
    localStorage.clear()
    localStorage.setItem("img1", "")
    localStorage.setItem("img2", "")
  }, [])
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="v1_6">
        <div className="row">
          <div className="v1_15">
            <span className="v1_11">Player 01</span>
            <input
              type="text"
              className="v1_12"
              maxLength={10}
              onChange={(e) => setPlayer1(e.target.value)}
              style={{ border: "none", width: "435px" }}
            />
            <div className="v1_14"></div>
            <div className="v1_130">
              <div className="v1_8" onClick={fileInput} style={{
                backgroundImage : imgPath  ? `url(${localStorage.getItem("img1")})` : `url(${"/Images/player1default.svg"})`,
                backgroundSize : "cover"
             }}>
              <input
                  type="file"
                  id="v1_8"
                  onChange={changeHandler}
                  accept="image/*"
                  style={{
                    display : "none"
                  }}
                />

              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="v1_16">
            <span className="v1_18">Player 02</span>
            <input
              type="text"
              className="v1_19"
              maxLength={10}
              onChange={(e) => setPlayer2(e.target.value)}
              style={{ border: "none", width: "435px" }}
            />
            <div className="v1_20"></div>
            <div className="v1_21" onClick={fileInput} style={{
                backgroundImage : imgPath2  ? `url(${localStorage.getItem("img2")})` : `url(${"/Images/player2default.svg"})`,
                backgroundSize : "cover"
             }}>
            <input
                  type="file"
                  id="v1_21"
                  onChange={changeHandler}
                  style={{
                    display : "none"
                  }}
                />
            </div>
          </div>
        </div>

        <div className="row">
        <div className="v1_16">
            <span className="v1_18" style={{
              width : "500px",
              float : "left"
            }}>Number Of Games</span>
            <input
              type="number"
              className="v1_19"
              maxLength={10}
              onChange={(e) => setNoOfGames(parseInt(e.target.value))}
              style={{ border: "none", width: "435px", WebkitAppearance: "none" }}
            />
            <div className="v1_20"></div>
          </div>
            
        </div>

        <div className="row">
          <div className="v1_24"></div>
        </div>

        <div className="row">
          <div className="v1_27">
              <button className="v1_25" onClick={
                () => validate() === true ? router.push({
                  pathname : "/play", 
                  query :{ pl1: player1, pl2: player2, noOfGames : noOfGames }
                }) : ""
                }>
                <span className="v1_26">Start Game</span>
              </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Start;

