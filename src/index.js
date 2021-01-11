import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from 'styled-components'

import Sidebar from './Sidebar'
import Kanban from './Kanban';






const NavBar = styled.div`
height: 100%; /* Full-height: remove this if you want "auto" height */
width: 200px; /* Set the width of the sidebar */
position: fixed; /* Fixed Sidebar (stay in place on scroll) */
z-index: 1; /* Stay on top */
top: 0; /* Stay at the top */
left: 0;
background-color: #111; /* Black */
overflow-x: hidden; /* Disable horizontal scroll */
padding-top: 20px;
`

const MainContent = styled.div`
margin-left: 200px; /* Same as the width of the sidebar */
padding: 0px 10px;
`

ReactDOM.render(
  <React.StrictMode>
    


<NavBar>
  <Sidebar/>  
</NavBar>


<MainContent>
  <Kanban/>
</MainContent>


  </React.StrictMode>,
  document.getElementById('root')
);

