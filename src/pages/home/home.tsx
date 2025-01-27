import { Alert } from '@metrostar/comet-uswds';
import { getDisplayName } from '@src/utils/auth';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const Home = (): React.ReactElement => {
  const { isSignedIn, currentUserData } = useAuth();
  const getWelcomeMessage = (): string => {
    if (currentUserData) {
      return `Welcome ${getDisplayName(currentUserData)}`;
    }
    return 'Welcome Guest';
  };

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <title>{getWelcomeMessage()}</title>
          <h1>{getWelcomeMessage()}</h1>
        </div>
      </div>
      {!isSignedIn && (
        <div className="grid-row">
          <div className="grid-col">
            <Alert id="sign-in-alert" type="info">
              You are not currently signed in. Please Sign In to access the
              Dashboard.
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};
