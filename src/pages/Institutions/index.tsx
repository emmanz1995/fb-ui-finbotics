import { useState, useEffect } from 'react';
import type { FC } from 'react';
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

  useEffect(() => {
    setInstitutions(institutionsMock);
  }, []);

  const grabInstitutionId = (
    bankId: string,
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setInstitutionId(bankId);
  };

  const handleConnectToInstitution = async (evt: any) => {
    evt.preventDefault();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/access/connect-bank`;

    const input = document.createElement('input');
    input.value = institutionId;
    input.type = 'hidden';
    input.name = 'institutionId';

    console.log(institutionId);

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  console.log(institutionId);

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          <Title>Connect Your Bank</Title>
          <Subtitle>
            Select your bank to securely connect your accounts. We use
            bank-level security to keep your information safe.
          </Subtitle>
        </HeaderContent>
        <InstitutionGrid>
          {institutions.map((institution: InstitutionProps) => (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              grabInstitutionId={grabInstitutionId}
              handleConnectToInstitution={handleConnectToInstitution}
              institutionId={institutionId}
            />
          ))}
        </InstitutionGrid>
      </ContentContainer>
    </Layout>
  );
};

export default Institutions;
