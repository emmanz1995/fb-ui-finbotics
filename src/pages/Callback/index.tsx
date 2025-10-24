import { useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/template';
import {
  ContentContainer,
  Title,
  Subtitle,
  HeaderContent,
} from '../../styles/common';
import { onBoardConnector } from '../../connector';
import Button from '../../components/atoms/button';

const CallbackPage: FC = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const reference: string | null = new URLSearchParams(location.search).get(
    'ref'
  );

  const errorState: string | null = new URLSearchParams(location.search).get(
    'error'
  );

  const handleIngestAccountDetails = async (
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    const response = await onBoardConnector.onIngestFromRequisition(reference);
    console.log(response);

    if (errorState?.startsWith('UserCancelled')) {
      setMessage('You have cancelled the bank connection process.');
      return;
    }

    if (response.message.includes('successfully')) {
      setMessage(response.message);
    } else setMessage('Failed to ingest account details, sorry!');
  };

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          {message && <Title>{message}</Title>}
          <Title>Ingest your Bank data here</Title>
          <Subtitle>
            You can ingest your account details here this is just the beginning
            of your journey
          </Subtitle>
        </HeaderContent>
        {reference ? (
          <div>
            {errorState ? (
              <>
                <Button variant='primary' onClick={() => navigate('/onboard-institution')}>Go back</Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={handleIngestAccountDetails}>
                  Ingest your Data
                </Button>
              </>
            )}
          </div>
        ) : (
          <p>Your not supposed to be back here, go away!</p>
        )}
        <Link to="/">Go to your Accounts dashboard</Link>
      </ContentContainer>
    </Layout>
  );
};

export default CallbackPage;
