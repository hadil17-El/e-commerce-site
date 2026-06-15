
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import "./heartbutton.css"

export default function HeartButton({
    isFavorite,onToggle
}){
 
    return(
        <button
                className={`heart-btn ${isFavorite ? "liked" : ""}`}
                onClick={onToggle}>
                    {isFavorite ? <FaHeart /> : <FiHeart />}
                </button>
    )
}