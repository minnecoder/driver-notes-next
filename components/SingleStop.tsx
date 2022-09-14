import React, { useState } from "react";
import { Stop } from "../types";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  stop: Stop;
}

const SingleStop: React.FC<Props> = (stop) => {
  const [signerName, setSignerName] = useState("");
  function refreshPage() {
    window.location.reload();
  }

  function onSignerChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    // setSignerName(prevSigner => ({ ...prevSigner, [event.target.name]: event.target.value }))
    setSignerName(event.target.value);
  }
  {
    console.log(stop.stop);
  }
  const handleSubmit = async (id: string) => {
    const token = localStorage.getItem("token");
    const data = { signerName, id };
    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };
    await fetch("/api/v1/notes", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));

    await refreshPage();
  };

  return (
    <Main>
      <StopTitle>{stop.stop.custName}</StopTitle>
      <StopData>
        <Left>
          <p>
            Address: <span>{stop.stop.address}</span>
          </p>
          {stop.stop.suite !== "" && (
            <p>
              Suite: <span>{stop.stop.suite}</span>
            </p>
          )}
          <p>
            City:<span> {stop.stop.city}</span>
          </p>
          <p>
            Delivery Location: <span>{stop.stop.deliveryLocation}</span>
          </p>

          {stop.stop.notes !== "" && (
            <p>
              Notes: <span>{stop.stop.notes}</span>
            </p>
          )}
        </Left>
        <Right>
          {stop.stop.signers.length > 0 && (
            <SignerList>
              <p>Past Signers</p>
              <ul>
                {stop.stop.signers.map((signer) => {
                  return <li key={signer}>{signer}</li>;
                })}
              </ul>
            </SignerList>
          )}
          <div>
            <AddSignerText
              placeholder="Signer Name"
              type="text"
              value={signerName}
              onChange={onSignerChange}
            />
            <AddSignerBtn
              onClick={() => {
                handleSubmit(stop.stop._id);
                setSignerName("");
              }}
            >
              Add Signer
            </AddSignerBtn>
          </div>
        </Right>
      </StopData>
      <LinkArea>
        <UpdateLink href={{ pathname: "/update", query: stop }}>
          Update Note
        </UpdateLink>
      </LinkArea>
    </Main>
  );
};

export default SingleStop;
const Main = styled.div`
  width: 70%;
  padding-left: 2rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  background-color: white;
  p {
    font-weight: bold;
  }
  span {
    font-weight: normal;
  }
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const StopTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
`;

const Left = styled.div`
  padding: 0 1rem;
  width: 50%;
  @media (max-width: 676px) {
    width: 100%;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  width: 50%;
  @media (max-width: 676px) {
    width: 100%;
  }
`;

const SignerList = styled.div`
  ul {
    list-style-type: none;
  }
`;

const StopData = styled.div`
  display: flex;
  margin-right: 2rem;
  @media (max-width: 676px) {
    flex-direction: column;
  }
`;

const LinkArea = styled.div`
  text-align: center;
`;

const UpdateLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  color: white;
  overflow: hidden;
  background-color: #767676;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: 1px solid #767676;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const AddSignerBtn = styled.button`
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  color: white;
  overflow: hidden;
  background-color: #767676;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: 1px solid #767676;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const AddSignerText = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
`;
