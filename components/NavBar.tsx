import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <Main>
      <NavLink href="/add">Add</NavLink>
      <NavLink href="/stops">Stops</NavLink>
      <NavLink href="" onClick={logout}>
        Log Out
      </NavLink>
    </Main>
  );
}

// export default withRouter(NavBar);
export default NavBar;

const Main = styled.div`
  background: #d0d1d4;
  text-align: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
`;

const NavLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  text-decoration: none;
  color: black;
`;
