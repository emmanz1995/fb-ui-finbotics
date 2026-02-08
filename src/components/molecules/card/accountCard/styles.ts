// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProps } from '../../../../styles/themes';

export const AccountCard = styled.div<ThemeProps>`
  background-color: white;
  border-radius: ${props => props.theme.radii?.lg};
  box-shadow: ${props => props.theme.shadows?.md};
  padding: 1.5rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows?.lg};
  }
`;
export const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;
export const AccountInfo = styled.div``;
export const AccountName = styled.h3<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.colors?.text?.primary};
  margin-bottom: 0.25rem;
`;
export const AccountNumber = styled.p<ThemeProps>`
  font-size: 0.875rem;
  color: ${props => props.theme.colors?.text?.secondary};
`;
export const AccountIcon = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors?.primary}1a;
  color: ${props => props.theme.colors?.primary};
`;
export const BalanceSection = styled.div`
  margin-top: 1rem;
`;
export const BalanceLabel = styled.p<ThemeProps>`
  font-size: 0.875rem;
  color: ${props => props.theme.colors?.text?.secondary};
  margin-bottom: 0.25rem;
`;
export const BalanceAmount = styled.h4<ThemeProps>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.text?.primary};
`;
export const Currency = styled.span<ThemeProps>`
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.theme.colors?.text?.secondary};
  margin-right: 0.25rem;
`;
export const AccountFooter = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme?.colors?.border};
`;
export const AccountOwner = styled.a<ThemeProps>`
  font-size: 0.875rem;
  color: ${props => props.theme.colors?.text?.secondary};
`;
