import styled from 'styled-components';
import type { ThemeProps } from '../../styles/themes';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
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

// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``
