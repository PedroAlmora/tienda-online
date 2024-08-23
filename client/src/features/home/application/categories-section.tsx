import { Row, Col, Pagination } from "antd";
import CategoryItem from "./category-items";
import PhotoNeumaticos from "../../../assets/categories/neummaticos y productos relacionados.png";
import PhotoLubricantes from "../../../assets/categories/ACEITES Y LIQ.png";
import PhotoFrenos from "../../../assets/categories/frenos.png";
import PhotoFiltros from "../../../assets/categories/Filtros.png";
import PhotoMotor from "../../../assets/categories/Motor.png";
import PhotoLimpiaparabrisas from "../../../assets/categories/Sistema limpiaparabrisas.png";
import PhotoEncendido from "../../../assets/categories/Encendido y precalentamiento.png";
import PhotoSuspension from "../../../assets/categories/Suspensión.png";
import PhotoElectrico from "../../../assets/categories/Sistema eléctrico.png";
import PhotoAmortiguacion from "../../../assets/categories/Amortiguación.png";
import PhotoCorreas from "../../../assets/categories/Correas, cadenas, rodillos.png";
import PhotoRefrigeracion from "../../../assets/categories/Sistema de refrigeración del motor.png";
import PhotoCarroceria from "../../../assets/categories/Carrocería.png";
import PhotoCalefaccion from "../../../assets/categories/Calefacción y ventilación.png";
import PhotoJuntas from "../../../assets/categories/Juntas y retenes.png";
import PhotoEscape from "../../../assets/categories/Escape.png";
import PhotoInterior from "../../../assets/categories/Interior.png";
import PhotoCombustible from "../../../assets/categories/Sistema de combustible.png";
import PhotoDireccion from "../../../assets/categories/Dirección.png";
import PhotoEmbrague from "../../../assets/categories/Embrague.png";
import PhotoCambios from "../../../assets/categories/Caja de cambios.png";
import PhotoAireAcondicionado from "../../../assets/categories/Aire acondicionado.png";
import PhotoRodamientos from "../../../assets/categories/Rodamientos.png";
import PhotoTransmision from "../../../assets/categories/Árboles de transmisión y diferenciales.png";
import PhotoKitReparacion from "../../../assets/categories/Kits de reparación y Herramientas.png";
import PhotoAccesorios from "../../../assets/categories/Accesorios para coches.png";
import PhotoTuberias from "../../../assets/categories/Tuberías y mangueras.png";
import PhotoIluminacion from "../../../assets/categories/Iluminación.png";
import PhotoPailerJuntas from "../../../assets/categories/Palier y junta homocinética.png";
import PhotoRemolque from "../../../assets/categories/Remolque y piezas adicionales.png";
import PhotoSensores from "../../../assets/categories/Sensores, relés, unidades de control.png";
import PhotoSujeciones from "../../../assets/categories/Sujeciones.png";
import { SetStateAction, useState } from "react";

const CategoriesSection = () => {
  const categories = [
    { name: "Neumáticos y productos relacionados", imageUrl: PhotoNeumaticos },
    { name: "Aceites y líquidos", imageUrl: PhotoLubricantes },
    { name: "Frenos", imageUrl: PhotoFrenos },
    { name: "Filtros", imageUrl: PhotoFiltros },
    { name: "Motor", imageUrl: PhotoMotor },
    { name: "Sistema limpiaparabrisas", imageUrl: PhotoLimpiaparabrisas },
    { name: "Encendido y precalentamiento", imageUrl: PhotoEncendido },
    { name: "Suspensión", imageUrl: PhotoSuspension },
    { name: "Sistema eléctrico", imageUrl: PhotoElectrico },
    { name: "Amortiguación", imageUrl: PhotoAmortiguacion },
    { name: "Correas, cadenas, rodillos", imageUrl: PhotoCorreas },
    {
      name: "Sistema de refrigeración del motor",
      imageUrl: PhotoRefrigeracion,
    },
    { name: "Carrocería", imageUrl: PhotoCarroceria },
    { name: "Calefacción y ventilación", imageUrl: PhotoCalefaccion },
    { name: "Juntas y retenes", imageUrl: PhotoJuntas },
    { name: "Escape", imageUrl: PhotoEscape },
    { name: "Interior", imageUrl: PhotoInterior },
    { name: "Sistema de combustible", imageUrl: PhotoCombustible },
    { name: "Dirección", imageUrl: PhotoDireccion },
    { name: "Embrague", imageUrl: PhotoEmbrague },
    { name: "Palier y junta homocinética", imageUrl: PhotoPailerJuntas },
    { name: "Remolque / piezas adicionales", imageUrl: PhotoRemolque },
    { name: "Caja de cambios", imageUrl: PhotoCambios },
    { name: "Aire acondicionado", imageUrl: PhotoAireAcondicionado },
    { name: "Rodamientos", imageUrl: PhotoRodamientos },
    {
      name: "Árboles de transmisión y diferenciales",
      imageUrl: PhotoTransmision,
    },
    { name: "Sensores, relés, unidades de control", imageUrl: PhotoSensores },
    { name: "Accesorios para coches", imageUrl: PhotoAccesorios },
    { name: "Kits de reparación Y Herramientas", imageUrl: PhotoKitReparacion },
    { name: "Tuberías y mangueras", imageUrl: PhotoTuberias },
    { name: "Iluminación", imageUrl: PhotoIluminacion },
    { name: "Sujeciones", imageUrl: PhotoSujeciones },
  ];

  const chunkSize = 8;
  const categoriesChunks = Array.from(
    { length: Math.ceil(categories.length / chunkSize) },
    (_, index) => categories.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const currentPageCategories = categoriesChunks[currentPage - 1];

  return (
    <div>
      <h2>Categorías</h2>
      <Row gutter={[16, 16]}>
        {currentPageCategories.map((category, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <CategoryItem name={category.name} imageUrl={category.imageUrl} />
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ marginTop: "20px" }}
        current={currentPage}
        pageSize={1}
        total={categoriesChunks.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CategoriesSection;
