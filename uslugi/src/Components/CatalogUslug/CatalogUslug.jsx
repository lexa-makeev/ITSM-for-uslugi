import React, { useEffect, useState } from "react";
import axios from "axios";

function CatalogUslug() {
  const [arrayCatalog, setArrayCatalog] = useState(null);
  const [idCatalog, setIdCatalog] = useState("");

  const [nameCatalog, setNameCatalog] = useState("");
  const [componentCatalog, setComponentCatalog] = useState("");
  const [refreshTables, setRefreshTables] = useState(false);

  const [addButton, setAddButton] = useState(true);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:80/uslugi/api/getCatalog.php",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        setArrayCatalog(response.data);
        setRefreshTables(false);
        setNameCatalog("");
        setComponentCatalog("");
        setAddButton(true);
      })
      .catch(function () {
        console.log("Ошибка");
      });
  }, [refreshTables]);
  function edit(id, name, components) {
    setIdCatalog(id);
    setNameCatalog(name);
    setComponentCatalog(components);
    setAddButton(false);
  }
  function remove(id) {
    let formData = new FormData();
    formData.append("id", id);
    axios({
      method: "post",
      url: "http://localhost:80/uslugi/api/removeCatalog.php",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        setRefreshTables(true);
      })
      .catch(function () {
        console.log("Ошибка");
      });
  }
  function add(name, components) {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("components", components);
    axios({
      method: "post",
      url: "http://localhost:80/uslugi/api/addCatalog.php",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        setRefreshTables(true);
      })
      .catch(function () {
        console.log("Ошибка");
      });
  }
  function update() {
    let formData = new FormData();
    formData.append("id", idCatalog);
    formData.append("name", nameCatalog);
    formData.append("components", componentCatalog);
    axios({
      method: "post",
      url: "http://localhost:80/uslugi/api/updateCatalog.php",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        setRefreshTables(true);
      })
      .catch(function () {
        console.log("Ошибка");
      });
  }
  return (
    <table>
      <tr>
        <th>Наименование услуги</th>
        <th>Компоненты</th>
      </tr>
      <tr>
        {localStorage.getItem("role") === "1" && (
          <>
            <td>
              <input
                type="text"
                onChange={(e) => setNameCatalog(e.target.value)}
                value={nameCatalog}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={(e) => setComponentCatalog(e.target.value)}
                value={componentCatalog}
              />
            </td>
          </>
        )}
        <td>
          {localStorage.getItem("role") === "1" && (
            <>
              <button
                disabled={addButton === true ? "enabled" : ""}
                onClick={update}
              >
                Сохранить
              </button>

              <button
                disabled={addButton === false ? "enabled" : ""}
                onClick={() => add(nameCatalog, componentCatalog)}
              >
                Добавить
              </button>
            </>
          )}
        </td>
      </tr>
      {arrayCatalog !== null &&
        arrayCatalog.map((data) => (
          <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.components}</td>
            <td>
              {localStorage.getItem("role") === "1" && (
                <button
                  onClick={() => edit(data.id, data.name, data.components)}
                >
                  Изменить
                </button>
              )}
              {localStorage.getItem("role") === "1" && (
                <button onClick={() => remove(data.id)}>Удалить</button>
              )}
            </td>
          </tr>
        ))}
    </table>
  );
}

export default CatalogUslug;
