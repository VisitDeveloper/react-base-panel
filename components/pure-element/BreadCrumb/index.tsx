import styled from 'styled-components'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { Link as LinkMui, Typography } from '@mui/material'
import { APP_ROUTES } from 'constants/enum/app-route.enum';

interface BreadcrumbSingleProps {
    id?: number;
    label?: string;
    href?: string;
    icon?: JSX.Element;
    onClick?: () => void;
    isLast?: boolean;
}

const StyledBreadcrumbSingleItem = (props: BreadcrumbSingleProps) => {

    return (
        <BredadCrumbStyled to={props?.href!} isLast={props.isLast}>
            {props.icon ? props.icon : null}
            {props.label}
        </BredadCrumbStyled>
    )
}

const BredadCrumbStyled = styled(Link)<{isLast?:boolean}>(({isLast}) => `
max-width: 100%;
font-size: 0.8125rem;
justify-content: space-between;
color: #5a5a5a;
white-space: nowrap;
transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
cursor: pointer;
outline: 0;
text-decoration: none;
border: 0;
padding: 7px;
vertical-align: middle;
box-sizing: border-box;
gap:10px;
display:flex;
align-items:baseline;
min-width:50px;
width:fit-content;
transition :0.5s;
&:hover {
    color : #212121;
    transition :0.5s;
}
&:after {
    content : ${isLast === true  ? "' '" : "'›'"};
}
`)

interface BreadCrumbsProps {
    breadcrumbs?: Array<BreadcrumbSingleProps>;
    withOutArray?: boolean
    separator?: string
}


const BreadCrumbComponent = (props: BreadCrumbsProps) => {
    const { separator = '›', withOutArray = true, breadcrumbs } = props;

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter(Boolean);

    return (
        <BreadStyled>
            <Breadcrumbs separator={separator} aria-label="breadcrumb">{
                withOutArray === true ?
                    <>
                        {pathnames.length !== 0 ? (
                            <StyledBreadcrumbSingleItem
                                href={APP_ROUTES.ROOT}
                                label='Home'
                            />
                        ) : (
                            <StyledBreadcrumbSingleItem
                                label={'Home'}
                            />
                        )}

                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return isLast ? (
                                <StyledBreadcrumbSingleItem
                                    label={name}
                                    isLast={isLast}
                                />
                            ) : (
                                <>
                                    <StyledBreadcrumbSingleItem
                                        key={name}
                                        label={name}
                                        href={routeTo}
                                        isLast={isLast}
                                        onClick={() => navigate(routeTo)}
                                    />
                                </>
                            );
                        })}
                    </>
                    :
                    <>
                        {breadcrumbs?.length !== 0 ? breadcrumbs?.map((item: BreadcrumbSingleProps , index : number) => {
                            const isLast = index === breadcrumbs.length - 1;  
                            return (
                                <>
                                    <StyledBreadcrumbSingleItem
                                        key={item.id}
                                        href={item.href!}
                                        label={item.label}
                                        icon={item.icon}
                                        isLast={isLast}
                                    />
                                </>
                            )
                        }) : null}
                    </>
            }

            </Breadcrumbs>
        </BreadStyled>
    )
}
export default BreadCrumbComponent

export const BreadStyled = styled.div`
display:flex;
flex-direction:row;
width:80%;
margin:10px;

.MuiBreadcrumbs-li{
    display:flex ;
    flex-direction : row;
    gap:10px;
    min-width:100px;

}
`

