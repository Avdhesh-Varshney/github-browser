import { RepositoryData } from '@/types';
import React from 'react';

const Left = ({data}: {data: RepositoryData}) => {
  return (
    <div>
      {data.id}
    </div>
  )
}

export default Left;
