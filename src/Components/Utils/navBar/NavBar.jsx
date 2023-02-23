import React from "react";
import { Link, useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { admin } from "../../../redux/actions";
//* Styles
import styled, { css } from "styled-components";
import Variables from "../../../Styles/Variables";
import GlobalStyles from "../../../Styles/GlobalStyles";
import { toast } from "react-toastify";
import { Close } from "@styled-icons/ionicons-outline/Close";
import logo from "../../../Assets/logo.png";
//* Modal
import Modal from "react-modal";
//* Utils
import CreateBugReport from "../BugsReport/CreateBugReport";
//* Initializations
const { input, modal40x40, button } = GlobalStyles;
const { principalColor, secondaryColor, redColor, greenColor } = Variables;
const adminModal = {
  content: {
    ...modal40x40.content,
    width: "40%",
    height: "max-content",
  },
};

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const adminState = useSelector((s) => s.admin);

  const [adminPassModal, setAdminPassModal] = React.useState(false);
  const [adminPass, setAdminPass] = React.useState("");

  const handleAdm = (e) => {
    e.preventDefault();
    if (adminPass.toUpperCase() === "CIJGIDSI") {
      navigate("/admin");
      dispatch(admin());
    } else {
      toast.error("Contraseña Incorrecta");
    }
  };

  React.useEffect(() => {
    setAdminPassModal(false);
  }, [adminState === true]);

  return (
    <NavBarContainer>
      <Container>
        <HiddenButton onDoubleClick={() => setAdminPassModal(!adminPassModal)} />
        <Logo src={logo} alt="logo" />
        {currentActa.estado && <HomeLinks to="/">Volver a Inicio</HomeLinks>}
        {adminState && (
          <>
            {!currentActa.estado && <HomeLinks to="/">Volver a Inicio</HomeLinks>}
            <HomeLinks to="/admin">Panel de Administrador</HomeLinks>
            <HomeLinks to="/" onClick={() => dispatch(admin())}>
              Cerrar
            </HomeLinks>
          </>
        )}
        <CreateBugReport />
      </Container>

      <Modal isOpen={adminPassModal} style={adminModal} ariaHideApp={false}>
        <CloseIcon onClick={() => setAdminPassModal(!adminPassModal)} />
        <Form onSubmit={handleAdm}>
          <Title onClick={() => setAdminPassModal(!adminPassModal)}>Contraseña Administrador</Title>
          <InputContainer>
            <Input
              type="password"
              name="adminPass"
              value={adminPass}
              placeholder="Contraseña"
              onChange={(e) => setAdminPass(e.target.value)}
            />
          </InputContainer>
          <Button type="submit" value="Entrar" complete={adminPass ? "true" : "false"} />
        </Form>
      </Modal>
    </NavBarContainer>
  );
}

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  position: fixed;
  background: ${principalColor};
  transition: all 0.5s ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 20%;
  padding-inline: 5px;
  transition: all 0.5s ease;
`;

const HomeLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  font-size: larger;
  padding: 20px;
  margin-bottom: 15%;
  border-radius: 10px;
  text-decoration: none;
  background: #ffffff;
  color: ${Variables.principalColor};
  border: 2px solid #ffffff;

  transition: all 0.3s ease-in;

  &:hover {
    background: ${principalColor};
    border: 2px solid #ffffff;
    color: #ffffff;
  }
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 30%;
  transition: all 0.5s ease;
`;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 50px;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;
`;

const Button = styled.input`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  height: 100%;
  text-align: center;
`;

const HiddenButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  background: transparent;
  background-color: transparent;
  border: transparent;

  &:hover {
    cursor: help;
  }
`;

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 8%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
