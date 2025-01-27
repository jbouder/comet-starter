import { SpacecraftItems } from '@src/types/spacecraft';
import axios from '@src/utils/axios';
import React, { Suspense } from 'react';
import { SearchResultsDetails } from './search-results-details';

export const SearchResults = (): React.ReactElement => {
  const getData = async (): Promise<SpacecraftItems> => {
    const response = await axios.get('/spacecraft');
    return response.data;
  };

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResultsDetails results={getData()} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
