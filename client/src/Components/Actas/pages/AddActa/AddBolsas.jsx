import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { createBolsas } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Modal
import Modal from "react-modal";
//* Doc
//import generateDoc from "../../generateDoc";
//* Components
import AddEfectos from "./AddEfectos";

//* Initializations
const { redColor, greenColor, principalColor, secondaryColor } = Variables;

const {
  select,
  input,
  form,
  inputLabel,
  inputContainer,
  enProcesoContainer,
  header,
  headerTitle,
  headerDescription,
  formContainer,
  button,
} = GlobalStyles;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "90%",
    backgroundColor: principalColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 0,
  },
};

function AddBolsas() {
  const dispatch = useDispatch();

  const currentActa = useSelector((state) => state?.currentActa);
  const currentIntegrantes = useSelector((state) => state?.currentIntegrantes);
  const currentBolsas = useSelector((state) => state?.currentBolsas);
  const currentEfectos = useSelector((state) => state?.currentEfectos);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [bolsa, setBolsa] = useState({
    acta_id: currentActa.id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "",
  });

  useEffect(() => {
    console.log(currentActa, currentIntegrantes, currentBolsas, currentEfectos);
  }, [currentBolsas]);

  const handleSubmitBolsa = (e) => {
    e.preventDefault();
    dispatch(createBolsas(bolsa));
  };

  return (
    <Container>
      <Header>
        <Title>Creacion de Bolsas</Title>
        <Description>Bolsas y Efectos</Description>
      </Header>
      <FormContainer>
        <Form onSubmit={(e) => handleSubmitBolsa(e)}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
            <InputContainer>
              <Label>Color del Precinto</Label>
              <Select
                value={bolsa.colorPrecinto}
                onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}
              >
                <SelectOpt value="">Color del Precinto</SelectOpt>
                <SelectOpt value="rojo">Rojo</SelectOpt>
                <SelectOpt value="verde">Verde</SelectOpt>
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Nro Precinto</Label>
              <Input
                type="number"
                name="Numero Precinto"
                value={bolsa.nroPrecinto}
                placeholder="Numero Precinto"
                onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
              />
            </InputContainer>
          </div>
          <InputContainer style={{ width: "100%" }}>
            <Label>Observaciones/Descripción de la Bolsa</Label>
            <Input
              type="text"
              name="Observaciones/Descripcion de la Bolsa"
              value={bolsa.observaciones}
              placeholder="Observaciones/Descripcion de la Bolsa"
              onChange={(e) => setBolsa({ ...bolsa, observaciones: e.target.value })}
            />
          </InputContainer>
          <Submit
            type="submit"
            value="Cargar Bolsa"
            complete={bolsa.colorPrecinto && bolsa.nroPrecinto ? "true" : "false"}
          />
        </Form>
      </FormContainer>
      <EfectosContainer>
        {/*
        {currentEfectos
          ? currentEfectos.map((efecto) => (
              <EfectoContainer key={efecto.id} estado={efecto.estado}>
                <Info>
                  <CardTitle>Nro Precinto</CardTitle>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <CardTitle>Tipo</CardTitle>
                  <br />
                  {efecto.tipo}
                </Info>
                <Info>
                  <CardTitle>Marca</CardTitle>
                  <br />
                  {efecto.marca}
                </Info>
                <Info>
                  <CardTitle>Modelo</CardTitle>
                  <br />
                  {efecto.modelo}
                </Info>
                <Info>
                  <CardTitle>Estado</CardTitle>
                  <br />
                  <Estado estado={efecto.estado}>{efecto.estado}</Estado>
                </Info>
                <CheckBoxContainer>
                  {efecto.estado === "completo" ? (
                    <CheckIcon />
                  ) : (
                    <CheckBox type="checkbox" onClick={() => handleCheckClick(efecto.id)} />
                  )}
                </CheckBoxContainer>
              </EfectoContainer>
            ))
          : null}
          */}
      </EfectosContainer>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <CloseIcon onClick={() => setIsOpen(!modalIsOpen)} />
        <AddEfectos />
      </Modal>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <Button complete={currentBolsas.length !== 0 ? "true" : "false"} onClick={() => setIsOpen(!modalIsOpen)}>
          Añadir Elementos
        </Button>
        <Button
          to={"/actas/crear/4"}
          complete={currentBolsas?.length !== 0 && currentEfectos?.length !== 0 ? "true" : "false"}
        >
          Siguente
        </Button>
      </div>
    </Container>
  );
}

export default AddBolsas;

const Container = styled.div`
  ${enProcesoContainer}
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const Header = styled.header`
  ${header}
  margin-bottom: 2%;
`;

const Title = styled.h1`
  ${headerTitle}
`;

const Description = styled.h1`
  ${headerDescription}
`;

const FormContainer = styled.div`
  ${formContainer}
  height: 25%;
  min-height: 0;
  padding: 0;
  justify-content: center;
  border-bottom: 2px solid ${principalColor};
`;

const InputContainer = styled.div`
  ${inputContainer}
`;

const Label = styled.label`
  ${inputLabel}
`;

const Select = styled.select`
  ${select}
`;

const SelectOpt = styled.option`
  font-size: medium;
  font-weight: 400;
`;

const Form = styled.form`
  ${form}
  justify-content: space-evenly;
  height: 35%;
`;

const Input = styled.input`
  ${input}
`;

const EfectosContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const Button = styled(NavLink)`
  ${button}
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const CloseIcon = styled(Close)`
  width: 8%;
  color: white;
  transition: all 0.5s ease;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;

const Submit = styled.input`
  ${button}
  padding: 2px;
  padding-inline: 10px;
  margin-top: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;
