import styled from 'styled-components';
import type { ThemeProps } from '../../styles/themes';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  margin-top: 1.5rem;
`;

export const HeaderContent = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AccountDetailsContainer = styled.div<ThemeProps>`
  padding: 1.5rem;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  background-color: white;
`;

export const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
export const AccountInfo = styled.div``;
export const BalanceInfo = styled.div``;
export const BalanceAmount = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountDetailsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const AccountDetail = styled.div<ThemeProps>`
  background-color: ${props => props.theme.colors.background};
  padding: 1.5rem;
  border-radius: ${props => props.theme.radii.lg};
`;

export const SpendingOverviewContainer = styled.div<ThemeProps>`
  box-shadow: ${props => props.theme.shadows.lg};
  background-color: ${props => props.theme.colors.text.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${props => props.theme.radii.lg};
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const SpendingPredicationContainer = styled.div<ThemeProps>`
  box-shadow: ${props => props.theme.shadows.lg};
  background-color: ${props => props.theme.colors.text.white};
  padding: 1.5rem;
  height: 350px;
  border-radius: ${props => props.theme.radii.lg};
  margin-bottom: 1.5rem;
`;
export const RecentTransactionContainer = styled.div<ThemeProps>`
  box-shadow: ${props => props.theme.shadows.lg};
  background-color: ${props => props.theme.colors.text.white};
  padding: 1.5rem;
  height: 500px;
  border-radius: ${props => props.theme.radii.lg};
`;
export const FinancialTipsContainer = styled.div<ThemeProps>`
  box-shadow: ${props => props.theme.shadows.lg};
  background-color: ${props => props.theme.colors.text.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${props => props.theme.radii.lg};
`;
export const HeaderContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;
`;
export const GroupedRows = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
export const FirstColumn = styled.div``;
export const SecondColumn = styled.div``;

export const Pagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const StyledTabs = styled.div``;
export const StyledTabsOption = styled.div``;
export const TransactionContainer = styled.div<ThemeProps>`
  background-color: ${props => props.theme.colors.text.white};
  width: 100%;
`;
export const TransactionDetailsContainer = styled.div<ThemeProps>`
  padding: 10px 0;
  margin: 15px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
`;
// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``
