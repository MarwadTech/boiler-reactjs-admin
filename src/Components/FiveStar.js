import StarRatings from "react-star-ratings"
import { colorCode } from "../Assets/Index"

export const StarRat = ({ rat, starDimension, starSpacing, starRatedColor }) => {
    return (
        <StarRatings rating={parseFloat(rat)} starRatedColor={starRatedColor || colorCode} numberOfStars={5} starDimension={starDimension || "20px"} starSpacing={starSpacing || "2px"} starHoverColor="orange" halfRating={true} />
    )
}

