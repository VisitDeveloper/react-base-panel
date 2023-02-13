// library
import { BiError } from "react-icons/bi";
import styled from 'styled-components'

interface ErrorBoundryProps {
    onRetry : () => void
}

const ErrorBoundryPage = (props : ErrorBoundryProps) => {
  return (
    <ErrorWrapper className="bg-default bg-opacity-30">
      <BiError className="danger-icon" />
      <h3 className="error-message">
         متاسفانه خطایی رخ داده است
      </h3>
      <button className="try-again-button" onClick={() => props.onRetry()}>
         تلاش مجدد
      </button>
    </ErrorWrapper>
  );
};

export default ErrorBoundryPage;



const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    width: 99vw;
    height: 100vh;
    background: #fff;
    .danger-icon {
      font-size: 10rem;
      margin-bottom: 60px;
      color: #f8992c;
    }
    .error-message {
      text-align: center;
      margin-bottom: 35px;
      color:#111111;
    }
    .try-again-button {
        
        background-color: #E21221 ;
        color:#fff;
        border-radius: 10px;
        padding: 10px 20px;
        width:140px;
        max-width: 250px;
        transition: all 0.5s ease;
        text-align:center;
        font-size:16px;
        font-weight: 500;
        border:none;    


      &:hover {
        transition: all 0.5s ease;
        color: #fff;
        background-color: rgb(181, 14, 26);
        font-weight: 500;
      }
    }


`