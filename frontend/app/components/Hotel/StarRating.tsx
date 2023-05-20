import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import {yellow} from "@mui/material/colors";

const StarRating = ({ count }: {count: number}) => {
    const stars = Array.from({ length: count }, (_, index) => (
        <StarIcon key={index} style={{color: yellow[800]}} />
    ));

    return <div>{stars}</div>;
};

export default StarRating;