import Picture from "../images/mrqayum.jpg"
import Hearts from "../images/hearts.gif"
import "./ErrorView.css"

function ErrorView() {
    return (
        <div>
            <h1>This page does not exist! :)</h1>
            <img className="mrq" src={Picture}></img>
            <img className="hearts" src={Hearts}></img>
        </div>
    )
}

export default ErrorView