import { FC } from 'react';
import styled from 'styled-components';

import Button from '../Button';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const ModalContent = styled.div`
  width: 600px;
  max-height: 80vh;
  padding: 20px 25px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Makes the content scrollable */
`;

const ModalTitle = styled.h6`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.themeColor};
  margin-top: 26px;
  margin-bottom: 20px;
`;

const ModalSubtitle = styled.p`
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: clamp(18px, calc(18px + 28 * ((100vw - 600px) / 1320)), 48px);
`;

interface ModalWrapperProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  buttonTitle: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  title,
  subtitle,
  icon,
  buttonTitle,
  onClick,
  children,
}) => {
  return (
    <ModalContainer>
      <ModalContent>
        {icon}
        <ModalTitle>{title}</ModalTitle>
        <ModalSubtitle>{subtitle}</ModalSubtitle>
        {children}
        <Button text={buttonTitle} onClick={onClick} bold big />
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalWrapper;
