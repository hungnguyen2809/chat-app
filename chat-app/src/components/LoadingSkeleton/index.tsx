import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function LoadingSkeleton() {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5" borderRadius={10}>
      <div>
        <Skeleton count={1} width={'60%'} />
        <Skeleton count={5} />
        <Skeleton count={1} width={'90%'} />
      </div>
    </SkeletonTheme>
  );
}

export default LoadingSkeleton;
