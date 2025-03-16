import { useState, useEffect } from "react";
import Page from "../shared/components/page";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as tmImage from "@teachablemachine/image";
import { cortes, faceShapes } from "../assets/data/data";
import HeaderComponent from "../shared/components/header";
import { FaceMesh } from "@mediapipe/face_mesh";

const H2 = styled.h2`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  color: var(--black);
  margin: 20px 0 0;
`;

const H3 = styled.h3`
  font-size: 15px;
  font-style: normal;
`;

const P = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  color: var(--black);
  margin: 10px 0;
`;

const DivService = styled.div`
  padding: 100px 20px 0;
  color: var(--black);
  text-decoration: none;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  font-family: Raleway;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  border-radius: 4px;
  color: var(--black);
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background-color: var(--light-secondary);
    transform: scale(0.95);
  }
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

const Input = styled.input`
  margin: 10px 0;
`;

const LoadingContainerStyles = styled.div`
  width: 100%;
  margin-top: 50px;
  max-width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
`;

const ImgContainer = styled.div`
  width: 100%;
  margin: 0;
`;

const DivCortes = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 15px 0 10px;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Photo = styled.img`
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  cursor: pointer;
`;

const CardPhoto = styled.div`
  display: flex;
  width: 100px;
  flex-direction: column;
`;

const Modal = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 425px;
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
`;

const ModalTitle = styled.h3`
  margin: 10px 0 0;
  font-size: 20px;
  font-weight: 600;
  text-align: start;
  color: var(--black);
`;

const ModalDescription = styled.p`
  font-size: 15px;
  margin: 10px 0 0;
  padding: 0;
  font-weight: 400;
  text-align: start;
  color: var(--black);
`;

function Visagism() {
  const navigate = useNavigate();
  const [showUploadField, setShowUploadField] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFace, setIsFace] = useState(true);
  const [image, setImage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [showTakePhotoButton, setShowTakePhotoButton] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      const URL = "https://teachablemachine.withgoogle.com/models/_tqfIDwLW/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      try {
        const model = await tmImage.load(modelURL, metadataURL);
        setModel(model);
      } catch (error) {
        console.error("Erro ao carregar o modelo:", error);
      }
    };

    loadModel();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
        setShowButton(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const takePicture = () => {
    setShowUploadField(true);
  };

  const sendPicture = async () => {
    setPrediction(null);
    setLoading(true);
    setIsFace(true);

    if (model && imageDataUrl) {
      try {
        const isFaceDetected = await detectFace(imageDataUrl);

        if (isFaceDetected) {
          const image = await createImageBitmap(dataUrlToBlob(imageDataUrl));
          const predictions = await model.predict(image);
          const highestPrediction = getHighestPrediction(predictions);

          setLoading(false);
          setPrediction(highestPrediction);
          setShowUploadField(false);
          setShowInstructions(false);
          setShowButton(false);
          setShowTakePhotoButton(false);
        } else {
          setLoading(false);
          setIsFace(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Erro ao processar a imagem:", error);
      }
    }
  };

  const detectFace = (imageDataUrl) => {
    return new Promise((resolve) => {
      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        resolve(results.multiFaceLandmarks.length > 0);
      });

      const videoElement = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = imageDataUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        faceMesh.send({ image: canvas });
      };
    });
  };


  const getHighestPrediction = (predictions) => {
    let highestPrediction = null;
    let highestProbability = 0;

    for (const pred of predictions) {
      if (pred.probability > highestProbability) {
        highestPrediction = pred.className;
        highestProbability = pred.probability;
      }
    }

    return highestPrediction;
  };

  const dataUrlToBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handlePhotoClick = (photo, name, description) => {
    setModalImage(photo);
    setModalTitle(name);
    setModalDescription(description);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <Page>
      <HeaderComponent name="Visagismo" onClick={handleGoBack} />
      <DivService>
        {showInstructions && (
          <>
            <H2 style={{ margin: "0 0 16px" }}>O que é o visagismo?</H2>
            <P
              style={{
                fontSize: "18px",
                textAlign: "start",
                margin: "0",
                padding: "0",
              }}
            >
              O Visagismo é uma técnica que analisa a forma do rosto de uma
              pessoa e sugere cortes de cabelo e estilos que melhor se adequam a
              suas características faciais. Isso ajuda a realçar os traços e
              criar um visual mais harmonioso e favorecedor. Nosso sistema
              realiza o Visagismo utilizando técnicas de Inteligência Artificial
              para analisar a foto do seu rosto e sugerir cortes de cabelo
              apropriados. No entanto, é importante ressaltar que as sugestões
              de cortes apresentadas são apenas recomendações, e a decisão final
              cabe a você.
            </P>
            <P
              style={{
                color: "var(--red)",
                fontWeight: "600",
                margin: "15px 0 0",
              }}
            >
              Aviso: Para obter os melhores resultados, por favor, envie uma
              foto frontal nítida do seu rosto.
            </P>
          </>
        )}
        {showTakePhotoButton && (
          <Button onClick={takePicture}>Tirar Foto</Button>
        )}
        {showUploadField && (
          <Input type="file" accept="image/*" onChange={handleUpload} />
        )}
        {showButton && (
          <Button style={{ marginBottom: "1rem" }} onClick={sendPicture}>
            Enviar foto
          </Button>
        )}
        {loading && (
          <LoadingContainerStyles>
            <ClipLoader loading={loading} size={80} color={"var(--primary)"} />
          </LoadingContainerStyles>
        )}
        {isFace && prediction && (
          <>
            <ImgContainer>
              <ImgStyle src={image} alt="Processed" />
            </ImgContainer>
            <div>
              <H2>Seu formato de rosto é: {prediction}</H2>
              <P style={{ padding: "0" }}>{faceShapes[prediction]}</P>
            </div>
            <H2>Confira algumas sugestões de cortes:</H2>
            <DivCortes>
              {cortes[prediction].map((corte, index) => (
                <CardPhoto key={index}>
                  <Photo
                    src={corte.photo}
                    alt={corte.name}
                    onClick={() =>
                      handlePhotoClick(
                        corte.photo,
                        corte.name,
                        corte.description,
                      )
                    }
                  />
                  <H3>{corte.name}</H3>
                </CardPhoto>
              ))}
            </DivCortes>
          </>
        )}
        {!isFace && (
          <div>
            <P style={{ marginBottom: "2rem" }}>
              Não foi possível detectar um rosto na foto enviada. Por favor,
              tente novamente com uma foto frontal e nítida.
            </P>
          </div>
        )}
      </DivService>
      <Modal show={modalShow} onClick={closeModal}>
        <ModalContent>
          <ModalImage src={modalImage} alt={modalTitle} />
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalDescription>{modalDescription}</ModalDescription>
        </ModalContent>
        <Button 
  style={{ 
    marginTop: "1rem", 
    position: "fixed", // Fixa o botão em relação à janela
    bottom: "20px",    // Distância do botão em relação à parte inferior
    left: "50%",       // Centraliza horizontalmente
    transform: "translateX(-50%)", // Ajusta o alinhamento horizontal
    zIndex: "1000"     // Garante que o botão fique acima de outros elementos
  }} 
  onClick={handleGoBack}
>
  Confirmar Corte
</Button>

      </Modal>
    </Page>
  );
}

export default Visagism;
