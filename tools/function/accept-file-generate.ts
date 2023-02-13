import {ACCEPT_ENUMS} from 'constants/enum/accept-input.enum'


export const AcceptGenerateToString = (typeAccept : ACCEPT_ENUMS) =>{
    return typeAccept.split(',').map(item => item.split('/')[1]).join(' , ')
}
// show pdf , dox , doc in page
// AcceptGenerateToString(ACCEPT_ENUMS.PDF)


const AcceptToGetFileType = (files : any) =>{
    return Object.entries(files).map(([key, value] : any) => value.type.split('/')[1]).join(',')
}


export const isIncludedType = (typeAccept : ACCEPT_ENUMS , fileSelected : any) : boolean =>{
   return typeAccept.split(',').map(item => item.split('/')[1]).includes(AcceptToGetFileType(fileSelected))
}
// isIncludedType(props.accept , e.target.files)