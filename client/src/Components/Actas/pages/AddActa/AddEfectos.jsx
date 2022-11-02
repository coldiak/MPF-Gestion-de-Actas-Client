import React, { useState } from "react";
//* Redux
import { createEfecto } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//* Style
import styled from "styled-components";
//* Doc
//import generateDoc from "../../generateDoc";

function AddEfectos() {
  const dispatch = useDispatch();

  const currentBolsas = useSelector((state) => state?.currentBolsas);

  const [efecto, setEfecto] = useState({
    bolsa_id: "",
    tipoDeElemento: "",
    marca: "",
    modelo: "",
    imei: "",
    imei2: "",
    estado: "",
    sistemaOperativo: "",
    seguridad: "",
    tipoSeguridad: "",
    desbloqueo: "",
    herramientaSoft: "",
    tipoExtraccion: "",
    descripcionTarea: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEfecto(efecto));
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <InputContainer>
          <Label>Nro Bolsa</Label>
          <Select value={efecto.bolsa_id} onChange={(e) => setEfecto({ ...efecto, bolsa_id: Number(e.target.value) })}>
            <SelectOpt value="">Nro Bolsa</SelectOpt>
            {currentBolsas.length !== 0 &&
              currentBolsas.map((b) => (
                <SelectOpt value={b.nroPrecinto} key={b.id}>
                  {b.nroPrecinto}
                </SelectOpt>
              ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Elemento</Label>
          <Select
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <SelectOpt value="">Tipo de Elemento</SelectOpt>
            <SelectOpt value="celular">Celular</SelectOpt>
            <SelectOpt value="tablet">Tablet</SelectOpt>
            <SelectOpt value="notebook">Notebook</SelectOpt>
            <SelectOpt value="pc">PC</SelectOpt>
            <SelectOpt value="hdd">Disco HDD</SelectOpt>
            <SelectOpt value="ssd">Disco SSD</SelectOpt>
            <SelectOpt value="sim">Tarjeta SIM</SelectOpt>
            <SelectOpt value="sd">Tarjeta SD</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={efecto.marca}
            placeholder="Marca"
            onChange={(e) => setEfecto({ ...efecto, marca: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={efecto.modelo}
            placeholder="Modelo"
            onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>IMEI</Label>
          <Input
            type="text"
            name="imei"
            value={efecto.imei}
            placeholder="Imei"
            onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>IMEI 2</Label>
          <Input
            type="text"
            name="imei 2"
            value={efecto.imei2}
            placeholder="Imei 2"
            onChange={(e) => setEfecto({ ...efecto, imei2: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Estado</Label>
          <Select value={efecto.estado} onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}>
            <SelectOpt value="">Estado</SelectOpt>
            <SelectOpt value="completo">Completo</SelectOpt>
            <SelectOpt value="en proceso">En Proceso</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Sistema Operativo</Label>
          <Input
            type="text"
            name="sistemaOperativo"
            value={efecto.sistemaOperativo}
            placeholder="SistemaOperativo"
            onChange={(e) => setEfecto({ ...efecto, sistemaOperativo: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Seguridad</Label>
          <Input
            type="text"
            name="seguridad"
            value={efecto.seguridad}
            placeholder="Seguridad"
            onChange={(e) => setEfecto({ ...efecto, seguridad: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Seguridad</Label>
          <Select
            value={efecto.tipoSeguridad}
            onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}
          >
            <SelectOpt value="">Tipo de Seguridad</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="patron">Patron</SelectOpt>
            <SelectOpt value="contraseña">Contraseña</SelectOpt>
            <SelectOpt value="pin">Pin</SelectOpt>
            <SelectOpt value="facial">Facial</SelectOpt>
            <SelectOpt value="huella">Huella</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Desbloqueo</Label>
          <Select value={efecto.desbloqueo} onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}>
            <SelectOpt value="">Desbloqueo</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="patron">Patron</SelectOpt>
            <SelectOpt value="contraseña">Contraseña</SelectOpt>
            <SelectOpt value="pin">Pin</SelectOpt>
            <SelectOpt value="facial">Facial</SelectOpt>
            <SelectOpt value="huella">Huella</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Herramiento Software</Label>
          <Select
            value={efecto.herramientaSoft}
            onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
          >
            <SelectOpt value="">Herramiento Software</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="UFED">UFED</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Extracción</Label>
          <Select
            value={efecto.tipoExtraccion}
            onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}
          >
            <SelectOpt value="">Tipo de Extracción</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="fisica">Fisica</SelectOpt>
            <SelectOpt value="logica">Logica</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Descripcion Tarea</Label>
          <TextArea
            value={efecto.descripcionTarea}
            onChange={(e) => setEfecto({ ...efecto, descripcionTarea: e.target.value })}
          />
        </InputContainer>
        <Button type="submit" value="Cargar Elemento" />
      </Form>
    </>
  );
}

export default AddEfectos;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label``;

const Input = styled.input``;

const Select = styled.select``;

const SelectOpt = styled.option``;

const Button = styled.input``;

const TextArea = styled.textarea``;
