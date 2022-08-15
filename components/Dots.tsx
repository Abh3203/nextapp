import whiteCircle from '../public/Images/whiteCircle.svg'
type Props = {
  id : string
  fun : Function
  player : number
  img : string
}

const Dots = (props: Props) => {


  return (
    <span
    id={props.id}
    style={{
        height: "50px",
        width: "50px",
        backgroundImage : props.img ? `url(${props.img})` : `url(${"/Images/whiteCircle.svg"})`,
        backgroundSize : "cover",
        borderRadius: "50%",
        display: "inline-block",
        margin : "7px 7px 0"
    }} onClick={(e) => {
      props.fun(e)
      // setbg(props.player === 1 ? p1 : p2)
    }
    }></span>   
  )
}

export default Dots