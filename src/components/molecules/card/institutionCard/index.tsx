import type { FC, MouseEvent } from 'react';
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
    cardIndex: number,
    evt: MouseEvent<HTMLButtonElement>
  ) => void;
  handleConnectToInstitution: (evt: MouseEvent<HTMLButtonElement>) => void;
  institutionId?: string;
  cardIndex: number;
  currentIndex: number;
}> = ({
  institution,
  grabInstitutionId,
  handleConnectToInstitution,
  cardIndex,
  currentIndex,
}) => (
  <Card>
    <InstitutionLogo alt="logo" src={institution?.logo} />
    <InstitutionName>{institution?.name}</InstitutionName>
    <InstitutionDescription>
      {institution.bic} | {institution.countries.join(', ')}
    </InstitutionDescription>
    {cardIndex === currentIndex ? (
      <Button
        variant="outline"
        fullWidth="full"
        onClick={handleConnectToInstitution}
      >
        Institution Connect
      </Button>
    ) : (
      <Button
        fullWidth="full"
        variant="primary"
        onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
          grabInstitutionId(institution.id, cardIndex, evt);
        }}
      >
        Select Institution
      </Button>
    )}
  </Card>
);

export default InstitutionCard;
