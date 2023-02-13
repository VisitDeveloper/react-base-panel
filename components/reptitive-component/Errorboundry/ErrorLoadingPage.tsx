import styled from 'styled-components'


const ErrorLoadingPage = () => {
  return (
    <ErrorLoadingStyledWrapper className='bg-default bg-opacity-30'>
      <h3>
        لطفا صبر بفرمایید  
      </h3>
      <div className="progress-bar-container">
        <span className="progress-bar-thumb" />
      </div>
    </ErrorLoadingStyledWrapper>
  );
};

export default ErrorLoadingPage;


const ErrorLoadingStyledWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    width: 99vw;
    height: 100vh;
    background: #fff;
    h3{
        color:#111111;
    }
    .progress-bar-container {
      width: 50%;
      height: 6px;
      margin-top: 40px;
      background-color: #ccc;
      overflow: hidden;
      border-radius: 20px;
      position: relative;
      .progress-bar-thumb {
        width: 50%;
        height: 100%;
        left: 0;
        position: absolute;
        border-radius: 20px;
        display: block;
        background-color: rgb(62, 156, 62);
        animation: progress-bar-animation 2s infinite linear;
      }

      @keyframes progress-bar-animation {
        0% {
          transform: translateX(-100%);
        }
        50% {
          transform: translateX(50%);
        }
        100% {
          transform: translateX(200%);
        }
      }
      
    }
  
  
`