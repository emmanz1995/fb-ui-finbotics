import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { InstitutionGrid } from './styles';
import Layout from '../../components/template';
import {
  ContentContainer,
  Title,
  Subtitle,
  HeaderContent,
} from '../../styles/common';
import institutionsMock from '../../connector/institutions/institutions-data.json';
import { InstitutionCard } from '../../components/molecules/card';

interface InstitutionProps {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
  max_access_valid_for_days: string;
}

const Institutions: FC = () => {
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);
  const [institutionId, setInstitutionId] = useState('');
  // this is to capture index for current institutions card
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setInstitutions(institutionsMock);
  }, []);

  const grabInstitutionId = (
    bankId: string,
    cardIndex: number,
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setInstitutionId(bankId);
    const institutionName = institutions.find(
      institution => institution.id === bankId
    )?.name;
    setMessage(`You have selected the ${institutionName}`);
    setCurrentIndex(cardIndex);
  };

  const handleConnectToInstitution = (
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/access/connect-bank`;

    const input = document.createElement('input');
    input.value = institutionId;
    input.type = 'hidden';
    input.name = 'institutionId';

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          <Title>Connect Your Bank</Title>
          <Subtitle>
            Select your bank to securely connect your accounts. We use
            bank-level security to keep your information safe.
          </Subtitle>
          {message && <p>{message}</p>}
        </HeaderContent>
        <InstitutionGrid>
          {institutions.map((institution: InstitutionProps, index: number) => (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              grabInstitutionId={grabInstitutionId}
              handleConnectToInstitution={handleConnectToInstitution}
              institutionId={institutionId}
              cardIndex={index}
              currentIndex={currentIndex}
            />
          ))}
        </InstitutionGrid>
      </ContentContainer>
    </Layout>
  );
};

export default Institutions;
