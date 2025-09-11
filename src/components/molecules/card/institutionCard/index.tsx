import type { FC } from 'react';
import {
  Card,
  InstitutionLogo,
  InstitutionName,
  InstitutionDescription,
} from './styles';
import Button from '../../../atoms/button';

interface InstitutionProps {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
  max_access_valid_for_days: string;
}

const InstitutionCard: FC<{
  institution: InstitutionProps;
  grabInstitutionId: (
    id: string,
    evt: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleConnectToInstitution: (evt: any) => void;
  institutionId: string;
}> = ({
  institution,
  grabInstitutionId,
  handleConnectToInstitution,
  institutionId,
}) => (
  <Card>
    <InstitutionLogo alt="logo" src={institution?.logo} />
    <InstitutionName>{institution?.name}</InstitutionName>
    <InstitutionDescription>
      {institution.bic} | {institution.countries.join(', ')}
    </InstitutionDescription>
    <Button
      fullWidth="full"
      variant="primary"
      onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
        setTimeout(() => grabInstitutionId(institution.id, evt), 5000);
      }}
    >
      Select Institution
    </Button>

    <Button variant="outline" onClick={handleConnectToInstitution}>
      Institution Connect
    </Button>
  </Card>
);

export default InstitutionCard;
