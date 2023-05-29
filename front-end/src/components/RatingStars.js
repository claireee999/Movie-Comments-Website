import React, { useEffect } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function RatingStars(props) {

    const handleClick = (value) => {
        if (props.edit) {
            props.setRating(value);
        }
    };

    return (
        <span>
            {[1, 2, 3, 4, 5].map((value) => {
                if (value <= props.rating) {
                    return <StarIcon key={value} onClick={() => handleClick(value)} />;
                } else {
                    return <StarBorderIcon key={value} onClick={() => handleClick(value)} />;
                }
            })}
        </span>
    );
}

export default RatingStars;
