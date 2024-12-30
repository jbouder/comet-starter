import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import { Spacecraft } from '@src/types/spacecraft';
import axios from '@src/utils/axios';
import { AxiosError } from 'axios';
import React, { useEffect, useState, useTransition } from 'react';
import ErrorNotification from '../../components/error-notification/error-notification';
import useAuth from '../../hooks/use-auth';
import { DashboardBarChart } from './dashboard-bar-chart/dashboard-bar-chart';
import { DashboardPieChart } from './dashboard-pie-chart/dashboard-pie-chart';
import { DashboardTable } from './dashboard-table/dashboard-table';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const [items, setItems] = useState<Spacecraft[] | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSignedIn) {
      startTransition(() => {
        axios
          .get('/spacecraft')
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            setItems(data.items);
          })
          .catch((error: AxiosError) => {
            setError(error);
          });
      });
    }
  }, [isSignedIn]);

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>Dashboard</h1>
        </div>
      </div>
      {error && (
        <div className="grid-row padding-bottom-2">
          <div className="grid-col">
            <ErrorNotification error={error.message} />
          </div>
        </div>
      )}
      <div className="grid-row">
        <div className="tablet:grid-col-6">
          <Card id="pie-chart-card">
            <CardBody>
              <h2>Spacecraft Affiliation</h2>
              <DashboardPieChart items={items} />
            </CardBody>
          </Card>
        </div>
        <div className="tablet:grid-col-6">
          <Card id="pie-bar-card">
            <CardBody>
              <h2>Spacecraft Appearances</h2>
              <DashboardBarChart items={items} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {isPending ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." />
          ) : (
            <DashboardTable items={items} />
          )}
        </div>
      </div>
    </div>
  );
};
