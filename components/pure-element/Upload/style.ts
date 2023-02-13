import styled from 'styled-components'


export const FormStyled = styled.form<{ height?: string; width?: string }>(({ height, width }) => `
position: relative;
height:${height ? height : '450px'};
width: ${width ? width : '100%'};
`)

export const UploadStyled = styled.div<{ height?: string; width?: string; isFileAvailable?: boolean }>(({ height, width, isFileAvailable }) => `
    background-color : #ffffff;
    border: 2px dashed ${isFileAvailable ? '#199FB1' : '#BB120E'};
    display: flex; 
    flex-direction : column ;
    justify-content : center; 
    align-items :  center ; 
    height:${height ? height : '600px'};
    width: ${width ? width : '100%'};
    transition : 0.5s ;

    // & :hover{
    //     background-color :#ededed;
    //     transition : 0.5s ;
    // }

`)

export const InputStyled = styled.input`
    display:none; 
`
export const LabelStyled = styled.label`
    cursor:pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 10px;
    display: flex; 
    flex-direction : column ;
    justify-content : center; 
    align-items :  center ; 
    border-radius :10px;
    transition : 0.5s ;

    // & :hover{
    //     background-color :#ededed;
    //     transition : 0.5s ;
    // }
`
export const DragFilePosition = styled.div(() => `
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`)



export const ShowItemNameNewStyle = styled.div<{ width?: string }>(({ width }) => `
    
    width: ${width ? width : '100%'};
    background-color: white;
    border: 1px solid #0D5C75;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap:4px;
    margin-top:1rem;

    .showitem-name{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:#ABABAB;
    }
`)






export const ShowErrorFileUnderButton = styled.div(({ }) => {
    return {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        padding: '10px',
        border: '1px solid #BB120E',
        borderRadius: '10px',
        backgroundColor: 'rgba(187, 18, 14, 0.1)'
    }
})




export const InnerfileUploader = styled.div(() => `
    display:flex;
    flex-direction:column;

    .item-inner{
        display:flex ;
        flex-direction : row ;
        justify-content : space-around;
        align-items: center ;
        .item-btn{
            border-radius :10px;
            background-color:#eee;
            color:#262626;
            padding: 4px 10px;
            width:fit-content;
            text-align:right;
            transition:.5s;
            &:hover {
                background-color: #ccc;
                transition:.5s;
            }
        }
    }
`)

export const SuccessInfoAfterSubmit = styled.div`
display : flex ; 
flex-direction : row; 
justify-content : space-between ;
align-items:center ;
width:100%;
padding : 10px ; 
border : 1px  solid  #0D5C75 ;
border-radius : 10px ; 
background-color: rgba(11, 147, 20, 0.1);
height: 60px !important;
.item-inner { 
    display :flex ;
    flex-direction : row ;
    gap : 5px; 
}
.item-name {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
}
`