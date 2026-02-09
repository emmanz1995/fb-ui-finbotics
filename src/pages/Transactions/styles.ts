import styled from 'styled-components';
import { ThemeProps } from '../../styles/themes';

export const Header = styled.header``;
export const FiltersSection = styled.section<ThemeProps>`
  width: 100%;
`;
export const FilterFlex = styled.span`
  display: flex;
  align-items: left;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  // display: grid;
  // grid-template-columns: 2fr 1fr;
  // gap: 2rem;
  // justify-content: space-between;
  padding: 15px 0;
`;
export const SmallSelectionWrapper = styled.span`
  display: flex;
  align-items: left;
  justify-content: space-between;
  gap: 20px;
`;
export const TableSection = styled.section``;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
export const Th = styled.th<ThemeProps>`
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors?.border};
  color: ${props => props.theme.colors?.text?.secondary};
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid ${props => props.theme.colors?.border};
`;
export const Tr = styled.tr<ThemeProps>`
  border-bottom: 1px solid ${props => props.theme.colors?.border};
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors?.border};
  }
`;
export const Td = styled.td<ThemeProps>`
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors?.text?.white};
  font-size: 0.875rem;
`;

export const FooterSection = styled.section`
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 15px 0;
`;
