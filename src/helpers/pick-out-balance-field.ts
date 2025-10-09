import _ from 'lodash';
import { BalanceProps } from '../pages/AccountsDashboard';

export const pickBalanceFields = (output: BalanceProps) =>
  _.pickBy({
    id: output.id,
    amount: output.amount,
    currency: output.currency,
    type: output.type,
    metadata: output.metadata,
    accountDetailsId: output.accountDetailsId,
  });
