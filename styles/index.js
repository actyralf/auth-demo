import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
	}

	body {
        background-color: #2b2d42;
		margin: 0;
		font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width:100vw;
        height:100vh;
        color: #2b2d42;
        
	}
    a, a:link, a:visited {
        cursor:pointer;
        text-decoration:none;
        color: #2b2d42;
    }
    a:hover, a:active {
        color: white;

    }
`;
