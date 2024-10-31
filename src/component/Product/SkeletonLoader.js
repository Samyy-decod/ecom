// SkeletonLoader.js
import React from 'react';
import { Skeleton, Typography } from '@mui/material';

const SkeletonLoader = () => {
    return (
        <div className="products">
            <div className="productCard">
                {/* Skeleton for product image */}
                <Skeleton variant="rectangular" width="100%" height={200} />

                {/* Skeleton for product name */}
                <Skeleton variant="text" width="60%" sx={{ marginTop: 1 }} />

                {/* Skeleton for product ratings */}
                <Skeleton variant="text" width="40%" sx={{ marginTop: 1 }} />

                {/* Skeleton for number of reviews */}
                <Skeleton variant="text" width="20%" sx={{ marginTop: 0.5 }} />

                {/* Skeleton for price */}
                <Skeleton variant="text" width="30%" sx={{ marginTop: 1 }} />
            </div>
        </div>
    );
};

export default SkeletonLoader;
