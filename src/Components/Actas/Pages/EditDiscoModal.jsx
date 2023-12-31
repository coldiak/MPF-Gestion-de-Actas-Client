import React from "react";
//* Style
import { DeviceHddFill, DeviceSsdFill } from "styled-icons/bootstrap";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { AppsAddIn } from "@styled-icons/fluentui-system-regular/AppsAddIn";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";

function EditDiscoModal({ setEditDiscosModal, setAddDiscosModal, discos, renderAddDiscoModal }) {
  const handleAddAnotherDisk = (e) => {
    e.preventDefault();
    setEditDiscosModal(false);
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  const handleEditDisco = (disco) => {
    setEditDiscosModal(false);
    localStorage.setItem("currentDisco", JSON.stringify({ ...disco, edit: true }));
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar o Editar Discos</span>
      </header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {discos.map((d) => (
          <div className={`flex h-14 w-full items-center justify-center rounded-md border-2 border-white bg-white`}>
            {d.tipoDeDisco === "Disco Rigido" ? (
              <DeviceHddFill className="ml-4 w-6 text-secondary" />
            ) : (
              <DeviceSsdFill className="ml-4 w-6 text-secondary" />
            )}
            <div className="cardInfoContainer">
              <span className="cardTitle">Marca</span>
              <br />
              {d.marca}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">S/N</span>
              <br />
              {d.serialNumber || "Ninguno"}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">Alm.</span>
              <br />
              {d.almacenamiento}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">Adquisicion</span>
              <br />
              {d.adquisicion}
            </div>
            <DocumentEdit className="icons mr-4" onClick={() => handleEditDisco(d)} />
          </div>
        ))}
        {discos.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay Discos, agrega uno!</span>
            <AppsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <PlusSquareDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherDisk(e)}
        />
      </div>
    </>
  );
}

export default EditDiscoModal;
