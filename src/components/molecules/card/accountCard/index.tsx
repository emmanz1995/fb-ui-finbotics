import type { FC } from 'react';
import {
  AccountCard,
  AccountHeader,
  AccountInfo,
  AccountName,
  AccountNumber,
  AccountIcon,
  BalanceSection,
  BalanceLabel,
  BalanceAmount,
  AccountFooter,
  AccountOwner,
  Currency,
} from './styles';
import type { AccountDetailsProps } from '../../../../pages/AccountsDashboard';
import { CreditCardIcon } from 'lucide-react';

const Card: FC<{ detail: AccountDetailsProps }> = ({ detail }) => (
  <AccountCard to={`/dashboard/${detail.id}`}>
    <AccountHeader>
      <AccountInfo>
        <AccountName>{detail.currency} Account</AccountName>
        <AccountNumber>
          {detail.iban && (
            <>
              IBAN:{' '}
              {`${detail.iban?.slice(0, 4)}...${detail.iban?.slice(18, 22)}`}
            </>
          )}
        </AccountNumber>
      </AccountInfo>
      <AccountIcon>
        <CreditCardIcon size={20} />
      </AccountIcon>
    </AccountHeader>
    <BalanceSection>
      <BalanceLabel>Current Balance</BalanceLabel>
      <BalanceAmount>
        <Currency>£</Currency>
        {parseFloat('45543').toFixed(2)}
      </BalanceAmount>
    </BalanceSection>
    <AccountFooter>
      <AccountOwner>{detail.ownerName}</AccountOwner>
    </AccountFooter>
  </AccountCard>
);

export default Card;
