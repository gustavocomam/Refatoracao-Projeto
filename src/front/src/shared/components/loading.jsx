import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 425px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: var(--primary);
`;

function LoadingComponent({ text }) {
  return (
    <LoadingContainerStyles>
      <ClipLoader loading={true} size={80} color={"var(--primary)"} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainerStyles>
  );
}

export default LoadingComponent;
