import { useEffect, useState } from "react";
import {withRouter, NextRouter} from "next/router";
// import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import Dots from "../components/Dots";
type Props = {
  router: NextRouter
};
type Names = {
  pl1: string;
  pl2: string;
  noOfGames: number;
};
type Player = {
    name: string;
    score: number;
    img: string;
  };
interface WithRouterProps {
    router: NextRouter
  }
const Play = (props: Props) => {
  // const noOfGames = 3;
  console.log(props.router.query)
  const router = useRouter()
  console.log(router.query)
  const PlayerData  = props.router.query as unknown as Names
  const [player, setPlayer] = useState<number>(Math.floor(Math.random() * 2));

  const [winStatement, setWInStatement] = useState<string>("");
  const [gameRunning, setGameRunning] = useState<Boolean>(false);
  const [lastColumns, setLastColumn] = useState<number[]>([]);
  const [lastPlayerWon, setLastPlayerWon] = useState<number>(-1);
  const [gameNumber, setGameNumber] = useState<number>(0);
  const [pl1, setPl1] = useState<string>(PlayerData.pl1)
  const [pl2, setPl2] = useState(PlayerData.pl2)
  const [noOfGames, setNoOfGames] = useState<number>(PlayerData.noOfGames)
  const [counter, setCounter] = useState<number>(0)
  const [player1, setPlayer1] = useState<Player>({
    name: "",
    score: 0,
    img: ""
  });
  const [player2, setPlayer2] = useState<Player>({
    name: "",
    score: 0,
    img: ""
  });
  const [refArray, setRefArray] = useState<string [][]>(Array(8).fill("").map(() => Array(8).fill("")));
  const [dataFetched, setDataFetched] = useState<boolean>(false)


  useEffect(()=>{
    console.log(PlayerData)
    props.router.query.pl1 ? setPl1(props.router.query.pl1?.toString()) : ""
    props.router.query.pl2 ? setPl2(props.router.query.pl2?.toString()) : ""
    props.router.query.noOfGames ? setNoOfGames(parseInt(props.router.query.noOfGames.toString())) : ""

      setNoOfGames(()=> PlayerData.noOfGames)
    
    setPlayer(()=>{
        const value = localStorage.getItem("player");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : player;
      })
    
    setWInStatement(()=>{
        const value = localStorage.getItem("winStatement");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : "";
      })

    setGameRunning(()=>{
        const value = localStorage.getItem("gameRunning");
        console.log(value)
        return value !== null 
          ? JSON.parse(value)
          : false;
      })
    
    setLastColumn(()=>{
        const value = localStorage.getItem("lastColumns");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : [];
      })
    
    setLastPlayerWon(()=>{
        const value = localStorage.getItem("lastPlayerWon");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : -1;
      })
    
    setGameNumber(()=>{
        const value = localStorage.getItem("gameNumber");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : 0;
      })
    
    setCounter(()=>{
        const value = localStorage.getItem("counter");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : 0;
      })
    
    setPlayer1(()=>{
        const value = localStorage.getItem("player1");
        console.log(value)
        return value !== null && JSON.parse(value).img !== ""
          ? JSON.parse(value)
          : {
            name: pl1 ? pl1 : "",
            score: 0,
            img: localStorage.getItem("img1")
              ? localStorage.getItem("img1")
              : "/Images/player1default.svg",
          };
      })

    setPlayer2(()=>{
        const value = localStorage.getItem("player2");
        console.log(value)
        return value !== null && JSON.parse(value).img !== ""
          ? JSON.parse(value)
          : {
            name: pl2 ? pl2 : "",
            score: 0,
            img: localStorage.getItem("img2")
              ? localStorage.getItem("img2")
              : "/Images/player2default.svg",
          };
      })

    setRefArray(()=>{
        const value = localStorage.getItem("refArray");
        console.log(value)
        return value !== null
          ? JSON.parse(value)
          : Array(8).fill("").map(() => Array(8).fill(""));
      })

    setDataFetched(true)

    setNoOfGames(()=>{
      const value = localStorage.getItem("noOfGames")
      return value !== null 
        ? parseInt(JSON.parse(value))
        : noOfGames
    })

  }, [])



  useEffect(()=>{
    console.log(player, player1, player2)
  })
  useEffect(()=>{
    dataFetched ? localStorage.setItem("player", JSON.stringify(player)) : ""
  }, [player])
  
  useEffect(()=>{
    dataFetched ? localStorage.setItem("winStatement", JSON.stringify(winStatement)) : ""
  }, [winStatement])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("gameRunning", JSON.stringify(gameRunning)) : ""
  }, [gameRunning])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("lastColumns", JSON.stringify(lastColumns)) : ""
  }, [lastColumns])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("lastPlayerWon", JSON.stringify(lastPlayerWon)) : ""
  }, [lastPlayerWon])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("gameNumber", JSON.stringify(gameNumber)) : ""
  }, [gameNumber])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("counter", JSON.stringify(counter)) : ""
    if (counter === 64 && gameRunning) {
      console.log("draw")
      if ( noOfGames == gameNumber) {
        checkTourWinner();
        return;
      }
      setWInStatement(
        `Game Draw`
      );
      setGameRunning(false);
    }
  }, [counter])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("player1", JSON.stringify(player1)) : ""
  }, [JSON.stringify(player1)])

  useEffect(()=>{
    dataFetched ? localStorage.setItem("player2", JSON.stringify(player2)) : ""
  }, [JSON.stringify(player2)])
  useEffect(()=>{
    dataFetched ? localStorage.setItem("refArray", JSON.stringify(refArray)) : ""
    console.log("updatimg refarray")
  }, [JSON.stringify(refArray)])

  useEffect(()=>{
    noOfGames ? localStorage.setItem("noOfGames", JSON.stringify(noOfGames)) : ""
  }, [noOfGames])

  // console.log(player1, player2);

  const undoFun = () => {
    console.log(lastColumns);
    if ( lastColumns.length === 0) {
      return;
    }
    const lastCln = lastColumns.shift();
    if (!lastCln) {
      return;
    }
    console.log(lastCln);
    for (let i = 0; i < 8; i++) {
      console.log(refArray[i][lastCln]);
      if (refArray[i][lastCln] !== "") {
        refArray[i][lastCln] = "";
        const playerNum = Math.abs(player - 1)
        setPlayer(playerNum);
        setRefArray(refArray);
        localStorage.setItem("player", JSON.stringify(playerNum))
        localStorage.setItem("refArray", JSON.stringify(refArray))
        break;
      }
    }
    return;
  };

  const startGame = () => {
    if (gameNumber == noOfGames) {
      alert("Tournament Ended");
      return;
    }
    if (!gameNumber) {
      setGameNumber(()=> 1);
      localStorage.setItem("gameNumber", JSON.stringify(gameNumber))
    } else {
      setGameNumber(gameNumber + 1);
    }
    if (lastPlayerWon !== -1) {
      setPlayer(lastPlayerWon === 0 ? 0 : 1);
    }
    setRefArray(
      Array(8)
        .fill("")
        .map(() => Array(8).fill(""))
    );
    setCounter(0)
    setLastColumn([]);
    setWInStatement("");
    setGameRunning(true);
  };

  const chkLine = (a: any, b: any, c: any, d: any): boolean => {
    return a !== "" && a === b && a === c && a === d;
  };

  const chkWinner = (bd: any) => {
    // down
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 8; c++)
        if (chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
          return bd[r][c];

    // right
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 5; c++)
        if (chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
          return bd[r][c];

    // down-right
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++)
        if (
          chkLine(
            bd[r][c],
            bd[r + 1][c + 1],
            bd[r + 2][c + 2],
            bd[r + 3][c + 3]
          )
        )
          return bd[r][c];

    // down-left
    for (let r = 3; r < 8; r++)
      for (let c = 0; c < 5; c++)
        if (
          chkLine(
            bd[r][c],
            bd[r - 1][c + 1],
            bd[r - 2][c + 2],
            bd[r - 3][c + 3]
          )
        )
          return bd[r][c];

    return 0;
  };

  const checkTourWinner = () => {
    if (player1.score > player2.score) {
      setWInStatement(
        `Congratulations ${player1.name}, you won the tournament`
      );
    } else if (player1.score < player2.score) {
      setWInStatement(
        `Congratulations ${player2.name}, you won the tournament`
      );
    } else {
      setWInStatement(`Tournament Draw!!`);
    }
  };

  const handleClick = (e: any) => {
    console.log(player, counter);
    if (!gameRunning) {
      return;
    }
    
    const currentId = e.currentTarget.id;
    const cln = parseInt(currentId[1]);
    setLastColumn([cln, ...lastColumns]);
    console.log(e.currentTarget.id);
    for (let i = 7; i >= 0; i--) {
      if (refArray[i][cln] === "") {
        console.log("Handling..")
        setCounter(counter + 1)
        refArray[i][cln] = player === 0 ? player1.img : player2.img;
        // setRefArray(refArray);
        setPlayer(Math.abs(player - 1));
        // if(chkWinner(refArray)){
        const res = chkWinner(refArray);

        if (res === player1.img) {
          console.log("P1 Win");
          player1.score += 1;
          setPlayer1(player1);
          setGameRunning(false);
          if (noOfGames === gameNumber) {
            checkTourWinner();
            return;
          }
          console.log(player);
          setLastPlayerWon(0);
          setWInStatement(
            `Congratulations ${player1.name}, you won Game ${gameNumber}`
          );
        } else if (res === player2.img) {
          console.log("P2 Win");
          player2.score += 1;
          setPlayer2(player2);
          setGameRunning(false);
          if (noOfGames === gameNumber) {
            checkTourWinner();
            return;
          }
          setLastPlayerWon(1);
          setWInStatement(
            `Congratulations ${player2.name}, you won Game ${gameNumber}`
          );
        }
       
        // }
        break;
      }
    }
    
  };

  return (
    <div>
      <div className="v4_149">
        <div className="v4_171" style={{ display: "inline" }}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div
                  className="v4_177"
                  style={{
                    backgroundColor: "rgba(132,164,251,1)",
                  }}
                >
                  <div style={{ margin: "35px" }}>
                    {Array(8)
                      .fill(0)
                      .map((_, i) => {
                        return Array(8)
                          .fill(0)
                          .map((_, j) => {
                            return (
                              <Dots
                                key={i + "" + j}
                                id={i + "" + j}
                                fun={handleClick}
                                player={player}
                                img={refArray !== null ? refArray[i][j] : ""}
                              />
                            );
                          });
                      })}
                  </div>
                </div>
              </div>
              <div className="col">
                <div>
                  <h2
                    style={{
                      position: "relative",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "24px",
                      lineHeight: "36px",
                      /* identical to box height */ marginTop: "74px",
                      textAlign: "center",
                      color: "#424242",
                    }}
                  >
                    {noOfGames} Games Tournamenet{" "}
                  </h2>
                  <p
                    style={{
                      position: "relative",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "28px",
                      lineHeight: "30px",
                      /* identical to box height */ textAlign: "center",
                      color: "#FF6600",
                      paddingLeft: "15px",
                    }}
                  >
                    {winStatement}
                  </p>
                  <p
                    style={{
                      position: "relative",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "18px",
                      lineHeight: "10px",
                      textAlign: "center",
                      color: "#424242",
                    }}
                  >
                    Playing Game {gameNumber}
                  </p>

                  <div className="playercard">
                    <div className="row">
                      <div className="col">
                        <div
                          className="proilePic"
                          style={{
                            backgroundImage: `url(${player1.img})`,
                            width: player === 0 ? "80px" : "70px",
                            height: player === 0 ? "80px" : "70px",
                            border: player === 0 ? "10px solid #FFA201" : "",
                            borderRadius: "40px",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                      <div className="col">
                        <p className="playernum">Player01</p>
                        <p className="playername">{player1.name}</p>
                      </div>
                      <div className="col">
                        <p className="playernum">Score</p>
                        <p className="playername">{player1.score}</p>
                      </div>
                    </div>
                  </div>

                  <div className="playercard2">
                    <div className="row">
                      <div className="col">
                        <div
                          className="proilePic"
                          style={{
                            backgroundImage: `url(${player2.img})`,
                            width: player === 1 ? "80px" : "70px",
                            height: player === 1 ? "80px" : "70px",
                            border: player === 1 ? "10px solid #FFA201" : "",
                            borderRadius: "40px",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                      <div className="col">
                        <p className="playernum">Player02</p>
                        <p className="playername">{player2.name}</p>
                      </div>
                      <div className="col">
                        <p className="playernum">Score</p>
                        <p className="playername">{player2.score}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lineseg"></div>

                  <button
                    className="bluebtn"
                    onClick={gameRunning ? undoFun : startGame}
                  >
                    <span className="bluespan">
                      {gameRunning ? "Undo Step" : "Start Game"}
                    </span>
                  </button>

                  <button
                    className="endtour"
                    onClick={() => router.push("/") }
                  >
                    <span className="whitespan">End Tournament</span>
                  </button>
                  <div></div>
                </div>
              </div>
            </div>{" "}
            {/* row end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Play);
