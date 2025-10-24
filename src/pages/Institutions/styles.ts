import styled from 'styled-components';
import type { ThemeProps } from '../../styles/themes';

export const InstitutionGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const InstitutionCard = styled.div<ThemeProps>`
  background-color: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 10px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const InstitutionLogo = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  margin-bottom:; 1rem;
`;

export const InstitutionName = styled.h3<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.primary};
`;
export const InstitutionDescription = styled.p<ThemeProps>`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

// export const InstitutionsLogo = styled.img``
// export const InstitutionsLogo = styled.img``
// export const InstitutionsLogo = styled.img``
