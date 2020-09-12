import React from 'react';
import { RotateLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Loader = () => {
    return (
        <LoaderWrapper>
            <RotateLoader />
        </LoaderWrapper>
    )
}

export default Loader;
