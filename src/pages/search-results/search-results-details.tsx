import { Card, CardBody } from '@metrostar/comet-uswds';
import { Spacecraft, SpacecraftItems } from '@src/types/spacecraft';
import React, { use } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

interface SearchResultsDetailsProps {
  results: Promise<SpacecraftItems>;
}

export const SearchResultsDetails = ({
  results,
}: SearchResultsDetailsProps): React.ReactElement => {
  const [searchParams] = useSearchParams();

  const filterResults = (items: Spacecraft[] | undefined) => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    if (items) {
      return items.filter(
        (result) =>
          result.name.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query) ||
          result.affiliation.toLowerCase().includes(query),
      );
    }
    return [];
  };

  const data = use(results);

  return (
    <div className="grid-row">
      <div className="grid-col">
        {filterResults(data.items).map((item) => (
          <Card key={`result-card-${item.id}`} id={`result-card-${item.id}`}>
            <CardBody>
              <NavLink
                id={`details-link-${item.id}`}
                to={`/details/${item.id}`}
              >
                <strong>{item.name}</strong>
              </NavLink>
              <p>{item.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
